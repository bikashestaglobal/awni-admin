import React, { useState, useEffect, useMemo } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../../config/Config";
import date from "date-and-time";
// import { storage } from "../../../firebase/FirebaseConfig";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
//  Component Function
function RangeList(props) {
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
    totalRecord: 0,
    totalPage: 0,
    currentPage: 1,
  });

  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAllRecordLoaded, setIsAllRecordLoaded] = useState(false);
  const [allRecords, setAllRecords] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [queryText, setQueryText] = useState("");

  // Delete Submit Handler
  const deleteSubmitHandler = () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false);

    fetch(`${Config.SERVER_URL}/ranges/${deleteId}`, {
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
        pagination.currentPage == 1
          ? pagination.limit
          : (pagination.currentPage + 1) * pagination.limit,
    });
  };

  // Get Data From Database
  useEffect(() => {
    setIsAllRecordLoaded(false);
    fetch(
      `${Config.SERVER_URL}/ranges?skip=${pagination.skip}&limit=${
        pagination.limit
      }&query=${queryText || "null"}`,
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
          setIsAllRecordLoaded(true);
          if (result.status === 200) {
            setAllRecords(result.body || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllRecordLoaded(true);
        }
      );
  }, [pagination.skip, pagination.limit, isDeleted, queryText]);

  // Count Records
  useEffect(() => {
    fetch(
      `${Config.SERVER_URL}/ranges?skip=0&limit=50000&query=${
        queryText || "null"
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
          setIsAllRecordLoaded(true);
        }
      );
  }, [isDeleted, queryText]);

  // Return function
  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Range Lists</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Range List</li>
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
                        setIsAllRecordLoaded(false);
                        setQueryText(evt.target.value);
                      }}
                      className="form-control search-input"
                      placeholder="Name"
                    />
                  </div>

                  {/* <!-- Button trigger modal --> */}
                  <Link
                    className="btn btn-info float-right rounded"
                    to={{
                      pathname: "/awni-admin/range/add",
                    }}
                  >
                    <span className={"fas fa-plus"}></span> Add Range
                  </Link>

                  <Link
                    className="btn btn-info float-right rounded mr-2"
                    to={{
                      pathname: "/awni-admin/range/addFromCSV",
                    }}
                  >
                    <span className={"fas fa-file"}></span> Add By CSV
                  </Link>

                  <Link
                    className="btn btn-info float-right rounded mr-2"
                    to={{
                      pathname: "/awni-admin/range/editFromCSV",
                    }}
                  >
                    <span className={"fas fa-edit"}></span> Update By CSV
                  </Link>
                </div>
              </div>
            </div>

            {/* Data */}
            {isAllRecordLoaded ? (
              <div className="card border-0 rounded m-0 py-1">
                {allRecords.length ? (
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
                            <th>CREATED AT</th>
                            <th className="text-center">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allRecords.map(function (record, index) {
                            return (
                              <tr key={index}>
                                <td>{record.id}</td>
                                <td>{record.name}</td>
                                <td>
                                  {date.format(
                                    new Date(record.created_at),
                                    "DD-MM-YYYY"
                                  )}
                                </td>
                                <td className="text-center">
                                  {/* Update Button */}
                                  <Link
                                    className="ml-2 btn btn-info footable-edit rounded"
                                    to={{
                                      pathname: `/awni-admin/range/edit/${record.id}`,
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
                                      setDeleteId(record.id);
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
                              value={pagination.limit}
                              className="form-control"
                              onChange={limitHandler}
                            >
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="30">30</option>
                              <option value={pagination.totalRecord}>
                                All
                              </option>
                            </select>
                          </div>
                          <div className="pl-1">
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="btn btn-info"
                              table="table-to-xls"
                              filename="ranges"
                              sheet="ranges"
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
                                tabindex="-1"
                                onClick={previousPageHandler}
                              >
                                Previous
                              </a>
                            </li>
                            {[...Array(pagination.totalPage)].map((_, i) => {
                              return (
                                <li className="page-item">
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
}

export default RangeList;
