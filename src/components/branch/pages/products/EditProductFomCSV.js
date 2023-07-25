import React, { useEffect } from "react";
import Papa from "papaparse";
import { useState } from "react";
import Config from "../../../config/Config";
import M from "materialize-css";
import { useHistory, Link } from "react-router-dom";
import { CSVLink } from "react-csv";

const EditProductFromCSV = () => {
  const history = useHistory();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [isAllRecordLoaded, setIsAllRecordLoaded] = useState(false);
  const [headers, setHeaders] = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    setIsAllRecordLoaded(false);
    const headers = [
      { label: "id", key: "id" },
      { label: "name", key: "name" },
      { label: "mrp", key: "mrp" },
      { label: "selling_price", key: "selling_price" },
      { label: "status", key: "status" },
      { label: "size", key: "size" },
      { label: "code", key: "code" },
      { label: "weight", key: "weight" },
      { label: "par_cat_id", key: "par_cat_id" },
      { label: "cat_id", key: "cat_id" },
      { label: "child_cat_id", key: "child_cat_id" },
      { label: "range_id", key: "range_id" },
      { label: "color_ids", key: "color_ids" },
      { label: "description", key: "description" },
      { label: "default_image", key: "default_image" },
      { label: "images", key: "images" },
    ];
    setHeaders(headers);
    const data = [];

    fetch(`${Config.SERVER_URL}/products/withColorAndImages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            result.body.map((item, index) => {
              let d = {
                id: item.id,
                name: item.name,
                mrp: item.mrp,
                selling_price: item.selling_price,
                status: item.status,
                size: item.size,
                code: item.code,
                weight: item.weight,
                par_cat_id: item.par_cat_id,
                cat_id: item.cat_id,
                child_cat_id: item.child_cat_id,
                range_id: item.range_id,
                color_ids: item.color_ids,
                description: item.description,
                default_image: item.default_image,
                images: item.images,
              };
              data.push(d);
            });
            setData(data);
            setIsAllRecordLoaded(true);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllRecordLoaded(true);
        }
      );
  }, []);

  const fileChangeHandler = (event) => {
    const files = event.target.files;
    if (files) {
      // setUploadLoading(true);

      Papa.parse(event.target.files[0], {
        complete: async (results) => {
          let keys = results.data[0];
          // I want to remove some óíúáé, blank spaces, etc
          keys = results.data[0].map((v) =>
            v
              .toLowerCase()
              .replace(/ /g, "_")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          );
          let values = results.data.slice(1);
          let objects = values.map((array) => {
            let object = {};
            keys.forEach((key, i) => (object[key] = array[i]));
            return object;
          });
          // Now I call to my API and everything goes ok

          // get items from the array and call the api
          objects.map(async (item, index) => {
            const product = { ...item };
            if (product.color_ids) {
              product.color_ids = product.color_ids.split("_");
            }
            if (product.images) {
              product.images = product.images.split("_");
            }

            if (product.id) {
              // item.slug = item.name
              //   .toLowerCase()
              //   .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
              //   .replace(/\s+/g, "-");
              submitHandler(product);
            }
          });
        },
      });
      // Papa.parse(files[0], {
      //   complete: function (results) {
      //     insertDataHandler({ array: results.data });
      //   },
      // });
    }
  };

  // Submit Handler
  const submitHandler = async (product) => {
    const newProduct = { ...product };
    product.images = undefined;
    product.color_ids = undefined;
    product.id = undefined;

    product.name = product.name || undefined;
    product.slug = product.slug || undefined;
    product.mrp = product.mrp || undefined;
    product.selling_price = product.selling_price || undefined;
    product.status = product.status || undefined;
    product.size = product.size || undefined;
    product.code = product.code || undefined;
    product.weight = product.weight || undefined;
    product.range_id = product.range_id || undefined;
    product.par_cat_id = product.par_cat_id || undefined;
    product.cat_id = product.cat_id || undefined;
    product.child_cat_id = product.child_cat_id || undefined;
    product.description = product.description || undefined;
    product.default_image = product.default_image || undefined;

    fetch(`${Config.SERVER_URL}/products/${newProduct.id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            // M.toast({ html: result.message, classes: "bg-success" });
            removeOldImageHandler(result.body.id, newProduct.images);
            removeOldColorHandler(result.body.id, newProduct.color_ids);
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          setUploaded((old) => {
            return [
              ...old,
              {
                name: result.body.name || "",
                message: result.message || result.errors.message,
              },
            ];
          });
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Remove Old Images Handler
  const removeOldImageHandler = (product_id, urls) => {
    fetch(
      `${Config.SERVER_URL}/productImages/deleteByProductId/${product_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          imageSubmitHandler(product_id, urls);
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Image Submit Handler
  const imageSubmitHandler = (product_id, urls) => {
    const addProductImages = {
      product_id: product_id,
      urls: urls,
    };

    fetch(Config.SERVER_URL + "/productImages", {
      method: "POST",
      body: JSON.stringify(addProductImages),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Remove Old Images Handler
  const removeOldColorHandler = (product_id, colorsIds) => {
    fetch(
      `${Config.SERVER_URL}/productColors/deleteByProductId/${product_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          colorSubmitHandler(product_id, colorsIds);
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Color Submit Handler
  const colorSubmitHandler = (product_id, colorsIds) => {
    const addProductColors = {
      product_id: product_id,
      colors: colorsIds,
    };

    fetch(Config.SERVER_URL + "/productColors", {
      method: "POST",
      body: JSON.stringify(addProductColors),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            // M.toast({ html: result.message, classes: "bg-success" });
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ============================================================== --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">Products</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Update Product</li>
            </ol>
          </div>
        </div>
        {/* <CSVLink data={data} headers={headers}>
          Download me
        </CSVLink> */}
        {/* Add Color Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            <form
              //   onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Color Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <button
                    className="btn btn-info"
                    type="button"
                    onClick={(evt) => {
                      history.goBack();
                    }}
                  >
                    <i className="fa fa-arrow-left"></i> Go Back
                  </button>
                </div>
                <div className="col-md-12 d-flex justify-content-between">
                  <h3 className={"my-3 text-info"}>Upload CSV File</h3>
                  <div className="">
                    {isAllRecordLoaded ? (
                      <CSVLink
                        className="btn btn-info"
                        data={data}
                        headers={headers}
                        filename="products.csv"
                      >
                        Download CSV Format
                      </CSVLink>
                    ) : (
                      <button className="btn btn-info" type="button">
                        <span
                          className="spinner-border spinner-border-sm mr-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading..
                      </button>
                    )}
                  </div>
                </div>

                {/* Color Name */}
                <div className={"form-group col-md-6"}>
                  <input
                    type="file"
                    // value={color.name}
                    onChange={fileChangeHandler}
                    className="form-control"
                    placeholder={"Chocolaty"}
                  />
                </div>
                <div className={"form-group col-md-6"}>
                  {uploadLoading ? (
                    <div className={"bg-white p-3 text-center"}>
                      <span
                        className="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading..
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-11 mx-auto">
            <div className={"row shadow-sm bg-white py-3"}>
              <div className="col-md-12">
                {uploaded.map((item, index) => {
                  return (
                    <div className="card card-body">
                      {" "}
                      {item.name} {item.message}{" "}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductFromCSV;
