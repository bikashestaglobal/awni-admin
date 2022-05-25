import React, { useState, useEffect, useMemo } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Config from "../../../config/Config";
const date = require("date-and-time");

//  Component Function
const AddDeals = (props) => {
  const history = useHistory();
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
    totalRecord: 0,
    totalPage: 0,
    currentPage: 1,
  });

  const [isAllDealsLoaded, setIsAllDealsLoaded] = useState(false);
  const [allDeals, setAllDeals] = useState([]);
  const [isAddLoaded, setIsAddLoaded] = useState(true);
  const [deals, setDeals] = useState({
    name: "",
    discountPercentage: "",
    // startDate: "",
    validity: "",
    products: [],
  });

  const selectProductHandler = (productId) => {
    if (deals.products.length) {
      const isExist = deals.products.find((value) => {
        return value.productId == productId;
      });

      if (isExist) {
        const filteredArr = deals.products.filter((value) => {
          return value.productId != productId;
        });
        setDeals({ ...deals, products: [...filteredArr] });
      } else {
        setDeals({ ...deals, products: [...deals.products, { productId }] });
      }
    } else {
      setDeals({ ...deals, products: [{ productId }] });
    }
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    console.log(deals);

    fetch(Config.SERVER_URL + "/deals", {
      method: "POST",
      body: JSON.stringify(deals),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            history.goBack();
          } else {
            const errorKeys = Object.keys(result.error);
            errorKeys.forEach((key) => {
              M.toast({ html: result.error[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          setIsAddLoaded(true);
        },
        (error) => {
          setIsAddLoaded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };
  const limitHandler = (e) => {
    const limit = e.target.value;
    const totalPage = Math.ceil(pagination.totalRecord / limit);
    setPagination({
      ...pagination,
      limit,
      totalPage,
    });
  };

  const pageHandler = (e, page) => {
    e.preventDefault();
    setPagination({
      ...pagination,
      skip: page == 1 ? 0 : (page - 1) * pagination.limit,
      currentPage: page,
    });
  };

  const previousPageHandler = (e) => {
    e.preventDefault();
    console.log(pagination);
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage == 1 ? 1 : pagination.currentPage - 1,
      skip:
        pagination.currentPage == 1
          ? 0
          : (pagination.currentPage - 2) * pagination.limit,
    });
  };

  const nextPageHandler = (e) => {
    e.preventDefault();
    console.log(pagination);
    setPagination({
      ...pagination,
      currentPage:
        pagination.currentPage == pagination.totalPage
          ? pagination.totalPage
          : pagination.currentPage + 1,
      skip:
        pagination.currentPage == 1
          ? pagination.limit
          : (pagination.currentPage + 1) * pagination.limit,
    });
  };

  // Get Data From Database
  useEffect(() => {
    fetch(
      `${Config.SERVER_URL}/product?skip=${pagination.skip}&limit=${pagination.limit}`,
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
          setIsAllDealsLoaded(true);
          if (result.status === 200) {
            setAllDeals(result.body || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllDealsLoaded(true);
        }
      );
  }, [pagination]);

  // Count Records
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/product?skip=0&limit=0`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setPagination({
            ...pagination,
            totalRecord: result.body.length,
            totalPage: Math.ceil(result.body.length / pagination.limit),
          });
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllDealsLoaded(true);
        }
      );
  }, []);

  // Return function
  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Deals</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Add Deals</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        {/* Add Deals Form */}
        <div className="row mt-2">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Deals Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Deals Details</h3>
                </div>

                {/* Deals Name */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    DEALS NAME HERE !
                  </label>
                  <input
                    type="text"
                    value={deals.name}
                    onChange={(evt) =>
                      setDeals({ ...deals, name: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Deals of the Day"}
                  />
                </div>

                {/* Discount Percentage */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    DISCOUNT PERCENTAGE!
                  </label>
                  <input
                    type="number"
                    value={deals.discountPercentage}
                    onChange={(evt) =>
                      setDeals({
                        ...deals,
                        discountPercentage: evt.target.value,
                      })
                    }
                    name={"discount"}
                    className="form-control"
                    placeholder={"10"}
                  />
                </div>

                {/* start Date */}
                {/* <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    DEALS START DATE
                  </label>
                  <input
                    type="date"
                    value={deals.startDate}
                    onChange={(evt) =>
                      setDeals({ ...deals, startDate: evt.target.value })
                    }
                    name={"startDate"}
                    className="form-control"
                    placeholder={"Staring date"}
                  />
                </div> */}

                {/* Valid Upto */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    DEALS VALIDITY
                  </label>
                  <input
                    type="date"
                    value={deals.validity}
                    onChange={(evt) =>
                      setDeals({ ...deals, validity: evt.target.value })
                    }
                    name={"startDate"}
                    className="form-control"
                    placeholder={"Valid Upto"}
                  />
                </div>
              </div>

              {/* Deals Products Details */}
              <div className={"row shadow-sm bg-white py-3 mt-2"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Products Details</h3>
                </div>

                <div className={"col-md-12 px-0"}>
                  {/* Heading */}
                  <div className={"card mb-0 mt-2 border-0 rounded"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <div>
                        <h4 className="float-left mt-2 mr-2">Search: </h4>
                      </div>
                    </div>
                  </div>

                  {/* Data */}
                  {isAllDealsLoaded ? (
                    <div className="card border-0 rounded m-0 py-1">
                      {allDeals.length ? (
                        <div className="card-body py-0">
                          <div className="table-responsive">
                            <table
                              className={
                                "table table-bordered table-striped my-0"
                              }
                            >
                              <thead>
                                <tr>
                                  <th>SN</th>
                                  <th>NAME</th>
                                  <th>IMAGE</th>

                                  <th className="text-center">ACTION</th>
                                </tr>
                              </thead>
                              <tbody>
                                {allDeals.map((product, index) => {
                                  return (
                                    <tr key={product.id}>
                                      <td>{index + 1}</td>
                                      <td>{product.name}</td>
                                      <td>
                                        {product.images.length ? (
                                          <img
                                            src={product.images[0].url}
                                            style={{
                                              height: "50px",
                                              width: "50px",
                                              borderRadius: "25px",
                                            }}
                                          />
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>

                                      <td className="text-center">
                                        <div className="form-check form-check-inline">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`product-${index}`}
                                            onChange={(evt) =>
                                              selectProductHandler(product._id)
                                            }
                                          />

                                          <label
                                            className="form-check-label"
                                            htmlFor={`product-${index}`}
                                          ></label>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            {/* Pagination */}
                            <div className="mt-2 d-flex justify-content-between">
                              <div className="limit form-group shadow-sm px-3 border">
                                <select
                                  name=""
                                  id=""
                                  className="form-control"
                                  onChange={limitHandler}
                                >
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                  <option value="30">30</option>
                                </select>
                              </div>
                              <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                  <li
                                    className={`page-item ${
                                      pagination.currentPage == 1
                                        ? "disabled"
                                        : ""
                                    }`}
                                  >
                                    <a
                                      className="page-link"
                                      href="#"
                                      tabindex="-1"
                                      onClick={previousPageHandler}
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  {[...Array(pagination.totalPage)].map(
                                    (_, i) => {
                                      return (
                                        <li className="page-item">
                                          <a
                                            className="page-link"
                                            href="#"
                                            onClick={(e) =>
                                              pageHandler(e, i + 1)
                                            }
                                          >
                                            {i + 1}
                                          </a>
                                        </li>
                                      );
                                    }
                                  )}

                                  <li
                                    className={`page-item ${
                                      pagination.currentPage ==
                                      pagination.totalPage
                                        ? "disabled"
                                        : ""
                                    }`}
                                  >
                                    <a
                                      className="page-link"
                                      href="#"
                                      onClick={nextPageHandler}
                                    >
                                      Next
                                    </a>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={
                            "alert alert-danger mx-3 rounded border-0 py-2"
                          }
                        >
                          No Data Available
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={"bg-white p-3 text-center"}>
                      <span
                        className="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading..
                    </div>
                  )}
                </div>

                <div className={"form-group col-md-12"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isAddLoaded ? (
                      <div>
                        <i className="fas fa-plus"></i> Add Deals
                      </div>
                    ) : (
                      <div>
                        <span
                          className="spinner-border spinner-border-sm mr-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading..
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeals;
