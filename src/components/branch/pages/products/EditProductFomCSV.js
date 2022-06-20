import React from "react";
import Papa from "papaparse";
import { useState } from "react";
import Config from "../../../config/Config";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import tableToCSV from "../../helpers";

const EditProductFromCSV = () => {
  const history = useHistory();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState([]);

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
              product.color_ids = product.color_ids.split(",");
            }
            if (product.images) {
              product.images = product.images.split(",");
            }

            if (product.id) {
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

  const makeElement = (elemName, innerText = null) => {
    const elem = document.createElement(elemName);
    if (innerText) {
      elem.innerHTML = innerText;
    }
    return elem;
  };

  const downloadCSVHandler = () => {
    let table = makeElement("table");
    table.setAttribute("id", "download-csv");
    let thead = makeElement("thead");
    table.appendChild(thead);

    let row = makeElement("tr");
    let thForId = makeElement("th", "id");
    let thForName = makeElement("th", "name");
    let thForSlug = makeElement("th", "slug");
    let thForMRP = makeElement("th", "mrp");
    let thForSellingPrice = makeElement("th", "selling_price");
    let thForStatus = makeElement("th", "status");
    let thForSize = makeElement("th", "size");
    let thForCode = makeElement("th", "code");
    let thForWeight = makeElement("th", "weight");
    let thForParCatId = makeElement("th", "par_cat_id");
    let thForCatId = makeElement("th", "cat_id");
    let thForChildCatId = makeElement("th", "child_cat_id");
    let thForRange = makeElement("th", "range_id");
    let thForColor = makeElement("th", "color_ids");
    let thForDescription = makeElement("th", "description");
    let thForDefaultImage = makeElement("th", "default_image");
    let thForImages = makeElement("th", "images");

    row.appendChild(thForId);
    row.appendChild(thForName);
    row.appendChild(thForSlug);
    row.appendChild(thForMRP);
    row.appendChild(thForSellingPrice);
    row.appendChild(thForStatus);
    row.appendChild(thForSize);
    row.appendChild(thForCode);
    row.appendChild(thForWeight);
    row.appendChild(thForParCatId);
    row.appendChild(thForCatId);
    row.appendChild(thForChildCatId);
    row.appendChild(thForRange);
    row.appendChild(thForColor);
    row.appendChild(thForDescription);
    row.appendChild(thForDefaultImage);
    row.appendChild(thForImages);

    thead.appendChild(row);

    document.body.appendChild(table);

    tableToCSV("product.csv");
  };

  const insertDataHandler = (data) => {
    fetch(Config.SERVER_URL + "/products/byCSV", {
      method: "POST",
      body: JSON.stringify(data),
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
            history.goBack();
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          setUploadLoading(false);
        },
        (error) => {
          setUploadLoading(false);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
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
            // imageSubmitHandler(result.body.id, images);
            // colorSubmitHandler(result.body.id, color_ids);
            // history.goBack();
          } else {
            // const errorKeys = Object.keys(result.errors);
            // errorKeys.forEach((key) => {
            //   M.toast({ html: result.errors[key], classes: "bg-danger" });
            // });
            // M.toast({ html: result.message, classes: "bg-danger" });
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
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Update Product</li>
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
                <div className="col-md-12 d-flex justify-content-between">
                  <h3 className={"my-3 text-info"}>Upload CSV File</h3>
                  <div className="">
                    <button
                      onClick={downloadCSVHandler}
                      className="btn btn-info"
                      type="button"
                    >
                      <i className="fa fa-download"></i> Download CSV Format
                    </button>
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
