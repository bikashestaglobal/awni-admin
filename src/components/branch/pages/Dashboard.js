import React, { useContext, useState, useEffect } from "react";
import { BranchContext } from "../../branch/Branch";
import M from "materialize-css";
import { Link } from "react-router-dom";
import Config from "../../config/Config";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import date from "date-and-time";

// Global Variable For BarChart
var batch = {};
// Global Variable For BarChart
var payment = {};

function Dashboard() {
  const { state, dispatch } = useContext(BranchContext);

  const [allProducts, setAllProducts] = useState(0);
  const [allProductsLoading, setAllProductsLoading] = useState(true);

  const [allCustomers, setAllCustomers] = useState(0);
  const [allCustomersLoading, setAllCustomersLoading] = useState(true);

  const [allEnquiries, setAllEnquiries] = useState(0);
  const [allEnquiriesLoading, setAllEnquiriesLoading] = useState(true);

  const [recComment, setRecCommment] = useState([]);
  const [enqChartLoading, setEnqChartLoading] = useState(false);
  const [enqData, setEnqData] = useState({
    labels: [],
    datasets: [],
  });

  const [enqStartDate, setEnqStartDate] = useState("null");
  const [enqEndDate, setEnqEndDate] = useState("null");
  const [enqDays, setEnqDays] = useState("");

  // All Products
  useEffect(() => {
    fetch(Config.SERVER_URL + "/products?limit=50000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAllProductsLoading(false);
          if (result.status == 200) {
            setAllProducts(result.body.length || 0);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setAllProductsLoading(false);
        }
      );
  }, []);

  // All Customers
  useEffect(() => {
    fetch(Config.SERVER_URL + "/customers?limit=50000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAllCustomersLoading(false);
          if (result.status == 200) {
            setAllCustomers(result.body.length || 0);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setAllCustomersLoading(false);
        }
      );
  }, []);

  // All Enquiry
  useEffect(() => {
    fetch(Config.SERVER_URL + "/enquiries?limit=50000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAllEnquiriesLoading(false);
          if (result.status == 200) {
            setAllEnquiries(result.body.length || 0);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setAllEnquiriesLoading(false);
        }
      );
  }, []);

  // Data for Enquiry Charts
  useEffect(() => {
    setEnqChartLoading(true);
    fetch(
      `${
        Config.SERVER_URL
      }/enquiries/generateReport?startDate=${enqStartDate}&endDate=${enqEndDate}&days=${
        enqDays || "null"
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status == 200) {
            const labels = [];
            const data = [];

            result.body.map((item, index) => {
              if (enqStartDate == "null" && enqEndDate == "null") {
                labels.push(date.format(new Date(item.day), "MMM DD YYYY"));
              } else {
                labels.push(date.format(new Date(item.day), "MMM YYYY"));
              }
              data.push(item.count);
            });

            let datasets = [
              {
                label: "Enquiries",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: data,
              },
            ];

            setEnqData({
              ...enqData,
              labels: labels,
              datasets: datasets,
            });
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          setEnqChartLoading(false);
        },
        (error) => {
          setEnqChartLoading(false);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, [enqStartDate, enqEndDate, enqDays]);

  return (
    <div>
      <div className="page-wrapper px-0 pt-0">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Container fluid  --> */}
        {/* <!-- ============================================================== --> */}
        <div className="container-fluid">
          {/* <!-- ============================================================== --> */}
          {/* <!-- Bread crumb and right siLine toggle --> */}
          {/* <!-- ============================================================== --> */}
          <div className="row page-titles mb-0">
            <div className="col-md-5 col-8 align-self-center">
              <h3 className="text-themecolor">Dashboard</h3>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
          {/* <!-- End Bread crumb and right sidebar toggle --> */}

          {/* <!-- Card Section --> */}
          <div
            className={"row page-titles px-1 my-0 shadow-none"}
            style={{ background: "none" }}
          >
            <div className={"col-md-12"}>
              <div className={"card"}>
                <div className={"card-body"}>
                  <h3 className="card-title mb-3">Stats Overview</h3>
                  <div className={"row"}>
                    {/* All Products */}
                    <div className={"col-md-4"}>
                      <div className={"card bg-primary border-0"}>
                        <Link to={"/awni-admin/products"}>
                          <div className={"card-body py-1"}>
                            <div className={"float-left"}>
                              <i
                                className={
                                  "mdi mdi-collage v-big-icon text-light"
                                }
                              />
                            </div>
                            <div className={"float-right text-right m-2"}>
                              <h2 className={"text-light"}>
                                {allProductsLoading ? (
                                  <div className={"text-center"}>
                                    <span
                                      className="spinner-border spinner-border-sm mr-1"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  </div>
                                ) : (
                                  allProducts
                                )}
                              </h2>
                              <span className={"text-light h6"}>
                                All Products
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* All Customers */}
                    <div className={"col-md-4"}>
                      <div className={"card bg-warning border-0"}>
                        <Link to={"/awni-admin/customers"}>
                          <div className={"card-body py-1"}>
                            <div className={"float-left"}>
                              <i
                                className={
                                  "mdi mdi-account-multiple v-big-icon text-light"
                                }
                              />
                            </div>
                            <div className={"float-right text-right m-2"}>
                              <h2 className={"text-light"}>
                                {allCustomersLoading ? (
                                  <div className={"text-center"}>
                                    <span
                                      className="spinner-border spinner-border-sm mr-1"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  </div>
                                ) : (
                                  allCustomers
                                )}
                              </h2>
                              <span className={"text-light h6"}>
                                All Customers
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* All Enquiries */}
                    <div className={"col-md-4"}>
                      <div className={"card bg-success border-0"}>
                        <Link to={"/awni-admin/enquiries"}>
                          <div className={"card-body py-1"}>
                            <div className={"float-left"}>
                              <i
                                className={
                                  "mdi mdi-comment-text v-big-icon text-light"
                                }
                              />
                            </div>
                            <div className={"float-right text-right m-2"}>
                              <h2 className={"text-light"}>
                                {allEnquiriesLoading ? (
                                  <div className={"text-center"}>
                                    <span
                                      className="spinner-border spinner-border-sm mr-1"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  </div>
                                ) : (
                                  allEnquiries
                                )}
                              </h2>
                              <span className={"text-light h6"}>
                                All Enquiries
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Charts --> */}
          <div
            className={"row page-titles px-1 my-0 shadow-none "}
            style={{ background: "none" }}
          >
            <div className="col-md-8">
              <div className={"card"}>
                <div className={"card-body"}>
                  <div className="d-flex justify-content-between">
                    <h3>Enquiry Data</h3>
                    <div className="form-group d-flex">
                      <div className="">
                        <input
                          type="text"
                          style={{ width: "140px" }}
                          value={enqDays}
                          onChange={(evt) => setEnqDays(evt.target.value)}
                          className="form-control search-input"
                          placeholder="Enter Last Days"
                        />
                      </div>
                      <div className="pl-1">
                        <input
                          type="date"
                          value={enqStartDate}
                          onChange={(evt) => setEnqStartDate(evt.target.value)}
                          className="form-control search-input"
                        />
                      </div>
                      <div className="pl-2">
                        <input
                          type="date"
                          value={enqEndDate}
                          onChange={(evt) => setEnqEndDate(evt.target.value)}
                          className="form-control search-input"
                        />
                      </div>
                    </div>
                    <div className="">
                      <Link
                        className="bnt btn-info p-2 rounded"
                        to={"/awni-admin/enquiries"}
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                  {enqChartLoading ? (
                    <div className={"text-center"}>
                      <span
                        className="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </div>
                  ) : (
                    <div>
                      <Bar
                        data={enqData}
                        options={{
                          title: {
                            display: true,
                            text: "Average Rainfall per month",
                            fontSize: 20,
                          },
                          legend: {
                            display: true,
                            position: "right",
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="col-md-4">
              <div className={"card"}>
                <div className={"card-body"}>
                  {isChartDataLoaded ? (
                    <canvas
                      className={"bg-white"}
                      id="paymentPieChart"
                    ></canvas>
                  ) : (
                    <div className={"text-center"}>
                      <span
                        className="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </div>
                  )}
                </div>
              </div>
            </div> */}
          </div>

          {/* <!-- Row --> */}
          {/* <div
            className="row page-titles px-1 my-0 shadow-none"
            style={{ background: "none" }}
          >
            <div className="col-lg-4 col-xlg-3 col-md-5 px-0">
              <div className="card">
                <img
                  className="card-img-top"
                  src="../assets/images/background/profile-bg.jpg"
                  alt="Card image cap"
                />
                <div className="card-body little-profile text-center">
                  <div className="pro-img">
                    <img
                      src={
                        state &&
                        (state.photo ||
                          "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg")
                      }
                      alt="user"
                    />
                  </div>
                  <h3 className="m-b-0"> {state && state.name} </h3>
                  <h5> {state && state.email} </h5>
                  <h5> {state && state.mobile} </h5>

           
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-xlg-9 col-md-7 px-0">
              <div className="card">
                <ul className="nav nav-tabs profile-tab" role="tablist">
                  <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                    >
                      Activity
                    </a>{" "}
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="home" role="tabpanel">
                    <div className="card-body">
                      <div className="profiletimeline">
                        {recComment.map((list) => {
                          return (
                            <>
                              <div className="sl-item">
                                <div className="sl-left">
                                  {" "}
                                  <img
                                    src={
                                      list.user.photo ||
                                      "/assets/images/users/4.jpg"
                                    }
                                    alt="user"
                                    className="img-circle"
                                  />{" "}
                                </div>
                                <div className="sl-right">
                                  <div>
                                    <Link
                                      to={"/user/receivedComment"}
                                      className="link"
                                    >
                                      {" "}
                                      {list.user.name}{" "}
                                    </Link>{" "}
                                    <span className="sl-date"></span>
                                    <blockquote className="m-t-10">
                                      {list.comment}
                                    </blockquote>
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <!-- ============================================================== --> */}
        </div>
        {/* <!-- ============================================================== --> */}
        {/* <!-- End Container fluid  --> */}
        {/* <!-- footer --> */}
        {/* <!-- ============================================================== --> */}
        <footer className="footer">© {new Date().getFullYear()} Awni</footer>
        {/* <!-- ============================================================== --> */}
        {/* <!-- End footer --> */}
        {/* <!-- ============================================================== --> */}
      </div>
    </div>
  );
}

export default Dashboard;
