import React from "react";
import Papa from "papaparse";
import { useState } from "react";
import Config from "../../../config/Config";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";

const AddProductFromCSV = () => {
  const history = useHistory();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([
    { label: "name", key: "name" },
    { label: "mrp", key: "mrp" },
    { label: "selling_price", key: "selling_price" },
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
  ]);

  const [tableData, setTableData] = useState([
    {
      name: "Dummy Product",
      mrp: "1000",
      selling_price: "900",
      size: "100X200X100 MM",
      code: "PROD129CC",
      weight: "5K",
      par_cat_id: "1",
      cat_id: "1",
      child_cat_id: "1",
      range_id: "1",
      color_ids: "1_2_3",
      description: "<p>Awesome</p>",
      default_image:
        "https://firebasestorage.googleapis.com/v0/b/perfect-app-5eef5.appspot.com/o/products%2Ft3.jpg?alt=media&token=04bca1bb-7647-4de2-8b22-64dff00669dd",
      images:
        "https://firebasestorage.googleapis.com/v0/b/perfect-app-5eef5.appspot.com/o/products%2Ft4.jpg?alt=media&token=38e4bdf9-40de-43be-b35a-16cf819ac8f2_https://firebasestorage.googleapis.com/v0/b/perfect-app-5eef5.appspot.com/o/products%2Ft1.jpg?alt=media&token=2150140e-3568-4e47-a6c6-446454894fdf",
    },
  ]);

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

            if (product.name) {
              product.slug = product.name
                .toLowerCase()
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
                .replace(/\s+/g, "-");
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

    fetch(Config.SERVER_URL + "/products", {
      method: "POST",
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
            imageSubmitHandler(result.body.id, newProduct.images);
            colorSubmitHandler(result.body.id, newProduct.color_ids);

            // history.goBack();
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
              <li className="breadcrumb-item active">Add Product</li>
            </ol>
          </div>
        </div>

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
                    <CSVLink
                      className="btn btn-info"
                      data={tableData}
                      headers={tableHeaders}
                      filename="products.csv"
                    >
                      Download CSV Format
                    </CSVLink>
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

export default AddProductFromCSV;
