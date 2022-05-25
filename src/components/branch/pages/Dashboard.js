import React, { useContext, useState, useEffect } from "react";
import { BranchContext } from "../../branch/Branch";
import M from "materialize-css";
import { Link } from "react-router-dom";
import Config from "../../config/Config";
import Chart from "chart.js/auto";

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
            console.log(result.body);
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
            <div className={"col-md-12 px-0"}>
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

          {/* <!-- Row --> */}
          {/* <div
            className={"row page-titles px-1 my-0 shadow-none "}
            style={{ background: "none" }}
          >
            <div className="col-md-8 px-0">
              <div className={"card"}>
                <div className={"card-body"}>
                  {isChartDataLoaded ? (
                    <canvas className={"bg-white"} id="batchBarChart"></canvas>
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
            </div>

            <div className="col-md-4 px-0">
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
            </div>
          </div> */}

          {/* <!-- Row --> */}
          <div
            className="row page-titles px-1 my-0 shadow-none"
            style={{ background: "none" }}
          >
            {/* <!-- Column --> */}
            <div className="col-lg-4 col-xlg-3 col-md-5 px-0">
              {/* <!-- Column --> */}
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

                  {/* {state && (
                    <a
                      target={"_blank"}
                      href={state.youtube}
                      className="btn btn-circle btn-secondary"
                    >
                      <i className="mdi mdi-youtube"></i>
                    </a>
                  )} */}
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-xlg-9 col-md-7 px-0">
              <div className="card">
                {/* <!-- Nav tabs --> */}
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
                {/* <!-- Tab panes --> */}
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
          </div>
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
