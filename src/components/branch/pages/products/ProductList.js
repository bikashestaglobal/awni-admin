import React, { useState, useEffect, useMemo } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../../config/Config";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const date = require("date-and-time");
// import { storage } from "../../../firebase/FirebaseConfig";

//  Component Function
const ProductList = (props) => {
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
    totalRecord: 0,
    totalPage: 0,
    currentPage: 1,
  });

  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAllProductLoaded, setIsAllProductLoaded] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [queryText, setQueryText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");

  // Delete Submit Handler
  const deleteSubmitHandler = () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false);

    fetch(`${Config.SERVER_URL}/products/${deleteId}`, {
      method: "DELETE",
      // body: JSON.stringify({deleteId}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsDeleteLaoded(true);
          if (result.status == 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsDeleted(true);
            setDeleteId("");
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          $("#closeDeleteModalButton").click();
        },
        (error) => {
          setIsDeleteLaoded(true);
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
        pagination.currentPage == pagination.totalPage
          ? 0
          : pagination.currentPage * pagination.limit,
    });
  };

  // Get Data From Database
  useEffect(() => {
    setIsAllProductLoaded(false);
    fetch(
      `${Config.SERVER_URL}/products?skip=${pagination.skip}&limit=${
        pagination.limit
      }&query=${queryText || "null"}&status=${statusFilter || "true"}&min=${
        minPriceFilter || 0
      }&max=${maxPriceFilter || 500000}`,
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
          setIsAllProductLoaded(true);
          if (result.status === 200) {
            setAllProduct(result.body || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllProductLoaded(true);
        }
      );
  }, [
    pagination,
    isDeleted,
    queryText,
    statusFilter,
    minPriceFilter,
    maxPriceFilter,
  ]);

  // Count Records
  useEffect(() => {
    fetch(
      `${Config.SERVER_URL}/products?skip=0&limit=50000&query=${
        queryText || "null"
      }&status=${statusFilter || "true"}&min=${minPriceFilter || 0}&max=${
        maxPriceFilter || 500000
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
          setPagination({
            ...pagination,
            totalRecord: result.body.length,
            totalPage: Math.ceil(result.body.length / pagination.limit),
          });
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllProductLoaded(true);
        }
      );
  }, [isDeleted, queryText, statusFilter, minPriceFilter, maxPriceFilter]);

  // Return function
  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Products</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Product List</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        <div
          className={"row page-titles px-1 my-0 shadow-none"}
          style={{ background: "none" }}
        >
          <div className={"col-md-12 px-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <div className="d-flex float-left">
                    <h4 className="mt-2 mr-2">Search: </h4>
                    <input
                      type="search"
                      onChange={(evt) => {
                        setIsAllProductLoaded(false);
                        setQueryText(evt.target.value);
                      }}
                      className="form-control search-input"
                      placeholder="Search By Everything"
                    />
                  </div>

                  {/* <!-- Button trigger modal --> */}
                  <div className="float-right d-flex">
                    <div className="">
                      <select
                        className="p-2 mr-2 search-input"
                        value={statusFilter}
                        onChange={(evt) => setStatusFilter(evt.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="true">Active</option>
                        <option value="false">Disable</option>
                      </select>
                    </div>
                    <div className="">
                      <input
                        type="number"
                        className="form-control search-input"
                        placeholder="Min Price"
                        value={minPriceFilter}
                        onChange={(evt) => setMinPriceFilter(evt.target.value)}
                      />
                    </div>
                    <div className="">
                      <input
                        type="number"
                        className="form-control search-input"
                        placeholder="Max Price"
                        value={maxPriceFilter}
                        onChange={(evt) => setMaxPriceFilter(evt.target.value)}
                      />
                    </div>

                    <Link
                      className="btn btn-info rounded mx-2"
                      to={{
                        pathname: "/awni-admin/product/addFromCSV",
                      }}
                    >
                      <span className={"fas fa-plus"}></span> By CSV
                    </Link>
                    <Link
                      className="btn btn-info float-right rounded mr-2"
                      to={{
                        pathname: "/awni-admin/product/editFromCSV",
                      }}
                    >
                      <span className={"fas fa-edit"}></span> Update By CSV
                    </Link>

                    <Link
                      className="btn btn-info rounded"
                      to={{
                        pathname: "/awni-admin/product/add",
                      }}
                    >
                      <span className={"fas fa-plus"}></span> Product
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Data */}
            {isAllProductLoaded ? (
              <div className="card border-0 rounded m-0 py-1">
                {allProduct.length ? (
                  <div className="card-body py-0">
                    <div className="table-responsive">
                      <table
                        id="table-to-xls"
                        className={"table table-bordered table-striped my-0"}
                      >
                        <thead>
                          <tr>
                            <th>#ID</th>
                            <th>NAME</th>
                            <th>MRP</th>
                            <th>SELLING PRICE</th>
                            <th>CODE</th>
                            <th>WEIGHT</th>
                            <th>SIZE</th>
                            <th>STATUS</th>
                            <th className="text-center">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProduct.map((product, index) => {
                            console.log(product);
                            return (
                              <tr key={index}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.mrp}</td>
                                <td>{product.selling_price}</td>
                                <td>{product.code}</td>
                                <td>{product.weight}</td>
                                <td>{product.size}</td>
                                <td>
                                  {product.status ? (
                                    <span className="badge bg-info text-light">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="badge bg-danger text-light">
                                      Disable
                                    </span>
                                  )}
                                </td>

                                <td className="text-center">
                                  {/* Update Button */}
                                  <Link
                                    className="ml-2 btn btn-info footable-edit rounded"
                                    to={{
                                      pathname: `/awni-admin/product/edit/${product.id}`,
                                    }}
                                  >
                                    <span
                                      className="fas fa-pencil-alt"
                                      aria-hidden="true"
                                    ></span>
                                  </Link>

                                  {/* Delete Button */}
                                  <button
                                    type="button"
                                    className="ml-2 btn btn-danger footable-delete rounded"
                                    data-toggle="modal"
                                    data-target="#deleteModal"
                                    onClick={(e) => {
                                      setDeleteId(product.id);
                                    }}
                                  >
                                    <span
                                      className="fas fa-trash-alt"
                                      aria-hidden="true"
                                    ></span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {/* Pagination */}
                      <div className="mt-2 d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
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
                          <div className="pl-1">
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="btn btn-info"
                              table="table-to-xls"
                              filename="products"
                              sheet="data"
                              buttonText="Export to Excel"
                            />
                          </div>
                        </div>
                        <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                pagination.currentPage == 1 ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                tabIndex="-1"
                                onClick={previousPageHandler}
                              >
                                Previous
                              </a>
                            </li>
                            {[...Array(pagination.totalPage)].map((_, i) => {
                              return (
                                <li className="page-item" key={i}>
                                  <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => pageHandler(e, i + 1)}
                                  >
                                    {i + 1}
                                  </a>
                                </li>
                              );
                            })}

                            <li
                              className={`page-item ${
                                pagination.currentPage == pagination.totalPage
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
                    className={"alert alert-danger mx-3 rounded border-0 py-2"}
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

          {/* -- Delete Modal -- */}
          <div
            className="modal fade rounded"
            id="deleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded">
                <div className="modal-body text-center">
                  <img
                    style={{ width: "150px" }}
                    className={"img img-fluid"}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5R1g82DqzH4itsxpVCofNGWbAzKN_PJDBew&usqp=CAU"
                    }
                  />
                  <h4 className={"text-center mt-2"}>Do You Want to Delete?</h4>

                  <div className={"form-group"}>
                    <button
                      className="btn btn-danger rounded px-3"
                      type={"submit"}
                      onClick={deleteSubmitHandler}
                    >
                      {isDeleteLaoded ? (
                        <div>
                          <i className="fas fa-trash"></i> Yes
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
                    <button
                      className="btn btn-secondary rounded ml-2 px-3"
                      data-dismiss="modal"
                      id={"closeDeleteModalButton"}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
