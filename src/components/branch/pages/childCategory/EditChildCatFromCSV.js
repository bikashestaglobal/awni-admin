import React, { useEffect } from "react";
import Papa from "papaparse";
import { useState } from "react";
import Config from "../../../config/Config";
import M from "materialize-css";
import { useHistory, Link } from "react-router-dom";
import tableToCSV from "../../helpers";
import { CSVLink } from "react-csv";

const EditChildCatFromCSV = () => {
  const history = useHistory();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [isAllRecordLoaded, setIsAllRecordLoaded] = useState(true);
  const [tableHeaders, setTableHeaders] = useState([
    { label: "id", key: "id" },
    { label: "par_cat_id", key: "par_cat_id" },
    { label: "cat_id", key: "cat_id" },
    { label: "name", key: "name" },
  ]);
  const [tableData, setTableData] = useState([]);

  const fileChangeHandler = (event) => {
    const files = event.target.files;
    if (files) {
      Papa.parse(event.target.files[0], {
        complete: async (results) => {
          let keys = results.data[0];
          // I want to remove some óíúáé, blan spaces, etc
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

          // Get data from array and call the api
          objects.map((item, i) => {
            if (item.id != "") {
              // item.slug = item.name
              //   .toLowerCase()
              //   .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
              //   .replace(/\s+/g, "-");
              submitHandler(item);
            }
          });
        },
      });

      // Papa.parse(files[0], {
      //   complete: function (results) {
      //     console.log("Finished:", results.data);
      //     insertDataHandler({ name: results.data });
      //   },
      // });
    }
  };

  // Update Submit Handler
  const submitHandler = ({ id, par_cat_id, cat_id, name, slug }) => {
    const updateData = {
      name: name || undefined,
      slug: slug || undefined,
      par_cat_id: par_cat_id || undefined,
      cat_id: cat_id || undefined,
    };
    fetch(`${Config.SERVER_URL}/childCategories/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
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

  const makeElement = (elemName, innerText = null, row = null) => {
    const elem = document.createElement(elemName);
    if (innerText) {
      elem.innerHTML = innerText;
    }
    if (row) {
      row.appendChild(elem);
    }
    return elem;
  };

  const downloadCSVHandler = () => {
    let table = makeElement("table");
    table.setAttribute("id", "download-csv");
    let thead = makeElement("thead");
    table.appendChild(thead);

    let row = makeElement("tr");
    makeElement("th", "id", row);
    makeElement("th", "par_cat_id", row);
    makeElement("th", "cat_id", row);
    makeElement("th", "name", row);

    thead.appendChild(row);
    // Load Data from the Database
    setIsAllRecordLoaded(false);
    fetch(`${Config.SERVER_URL}/childCategories?limit=${50000}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllRecordLoaded(true);
          if (result.status === 200) {
            result.body.map((item, index) => {
              let dataRow = document.createElement("tr");
              makeElement("td", item.id.toString(), dataRow);
              makeElement("td", item.par_cat_id.toString(), dataRow);
              makeElement("td", item.cat_id.toString(), dataRow);
              makeElement("td", item.name, dataRow);

              thead.appendChild(dataRow);
            });
            tableToCSV("child-category.csv", table);
            // setAllRecords(result.body || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllRecordLoaded(true);
        }
      );
  };

  // Load data
  useEffect(() => {
    setIsAllRecordLoaded(false);
    fetch(`${Config.SERVER_URL}/childCategories?limit=${50000}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllRecordLoaded(true);
          if (result.status === 200) {
            const dataArray = [];
            result.body.map((item, index) => {
              let data = {
                id: item.id,
                par_cat_id: item.par_cat_id,
                cat_id: item.cat_id,
                name: item.name,
              };
              dataArray.push(data);
            });
            setTableData(dataArray);
            setIsAllRecordLoaded(true);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            setIsAllRecordLoaded(true);
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllRecordLoaded(true);
        }
      );
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ============================================================== --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">Child Category</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Update Category</li>
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
                    {isAllRecordLoaded ? (
                      <CSVLink
                        className="btn btn-info"
                        data={tableData}
                        headers={tableHeaders}
                        filename="child-category.csv"
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
                    onChange={fileChangeHandler}
                    className="form-control"
                    placeholder={"Range Name"}
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

export default EditChildCatFromCSV;
