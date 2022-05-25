import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Config from "../../config/Config";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import { StaffContext } from "../StaffRoutes";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const Session = React.memo((props) => {
  const { state, dispatch } = useContext(StaffContext);
  const history = useHistory();
  const [addingFormData, setAddingFormData] = useState({
    name: "",
    start_year: "",
    end_year: "",
    comment: "",
  });


  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllSessionLoaded, setIsAllSessionLoaded] = useState(false);
  const [allSession, setAllSession] = useState([]);
  const [data, setData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Update the state while clicking the edit button
  const updateState = (list) => {
    setData(list);
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();
    fetch(Config.SERVER_URL + "/staff/updateSession", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsUpdateLaoded(true);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsUpdated(true);
            $("#closeUpdateModalButton").click();
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.start_year)
              M.toast({ html: result.start_year, classes: "bg-danger" });
            if (result.end_year)
              M.toast({ html: result.end_year, classes: "bg-danger" });
            if (result.comment)
              M.toast({ html: result.comment, classes: "bg-danger" });
            if (result.status)
              M.toast({ html: result.status, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsUpdateLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Delete Submit Handler
  const deleteSubmitHandler = () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false);
    const sessionData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL + "/staff/deleteSession", {
      method: "DELETE",
      body: JSON.stringify(sessionData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsDeleteLaoded(true);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsDeleted(true);
            $("#closeDeleteModalButton").click();
            setDeleteId("");
          } else {
            if (result.Id) M.toast({ html: result._id, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsDeleteLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAdded(false);
    setIsAddLaoded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/staff/addSession", {
      method: "POST",
      body: JSON.stringify(addingFormData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAddLaoded(true);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            $("#closeAddModalButton").click();
            setIsAdded(true);
            setAddingFormData({
              name: "",
              end_year: "",
              start_year: "",
              comment: "",
            });
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.start_year)
              M.toast({ html: result.start_year, classes: "bg-danger" });
            if (result.end_year)
              M.toast({ html: result.end_year, classes: "bg-danger" });

            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsAddLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Get Data From Database
  useEffect(() => {
    fetch(Config.SERVER_URL + "/staff/searchSession", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllSessionLoaded(true);
          if (result.success) {
            setAllSession(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllSessionLoaded(true);
        }
      );
  }, [isAdded, isUpdated, isDeleted]);

  // Fetching staff profile information
  useEffect(() => {
    fetch(Config.SERVER_URL + "/staff/myProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            dispatch({ type: "STAFF", payload: result.data });
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            localStorage.removeItem("staff");
            localStorage.removeItem("jwt_staff_token");
            dispatch({ type: "CLEAR" })
            history.push('/staff/login');
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // Change Branch Session
  const branchSessionHandler = (sessionId) => {
    localStorage.setItem("branchSession", sessionId);
    window.location.reload();
  }

  // Create Column for Table
  const COLUMNS = [
    {
      Header: "#SN",
      accessor: "",
      Cell: (row) => {
        return (Number(row.row.id) + 1)
      }
    },
    {
      Header: "SESSION NAME",
      accessor: "name",
    },
    {
      Header: "START YEAR",
      accessor: "start_year",
    },
    {
      Header: "END YEAR",
      accessor: "end_year",
    },

    {
      Header: "CREATED DATE",
      accessor: "created_date",
      Cell: ({ value }) => { return format(new Date(value), "dd/MM/yyyy") }
    },
    {
      Header: "STATUS",
      accessor: "status",
      // disableSortBy: true,
      Cell: row => {
        const status = row.row.original.status;

        return (
          <span>
            {status ? <span className={"badge badge-info"}>Active</span> : <span className={"badge badge-danger"}>Disable</span>}
          </span>
        )
      }
    },
    {
      Header: "ACTION",
      accessor: "",
      disableSortBy: true,
      Cell: ({ row }) => {

        return (
          <div>
            {/* Update Button */}
            {state && state.setup.updateSession ?
              <button
                type="button"
                className="btn btn-info footable-edit"
                data-toggle="modal"
                data-target="#updateModal"
                onClick={() => updateState(row.original)}
              >
                <span
                  className="fas fa-pencil-alt"
                  aria-hidden="true"
                ></span>
              </button>
              :
              <button
                type="button"
                className="btn btn-info footable-edit"
                disabled
                title={"Permission Required"}
              >
                <span
                  className="fas fa-pencil-alt"
                  aria-hidden="true"
                ></span>
              </button>
            }

            {/* Delete Buttons */}
            {state && state.setup.deleteSession ?
              <button
                type="button"
                className="ml-2 btn btn-danger footable-delete"
                data-toggle="modal"
                data-target="#deleteModal"
                onClick={(evt) => setDeleteId(row.original._id)}
              >
                <span
                  className="fas fa-trash-alt"
                  aria-hidden="true"
                ></span>
              </button> :
              <button
                type="button"
                className="ml-2 btn btn-danger footable-delete"
                disabled
                title={"Permission Required"}
              >
                <span
                  className="fas fa-trash-alt"
                  aria-hidden="true"
                ></span>
              </button>
            }

            <button
              type="button"
              className="ml-2 btn btn-success"
              onClick={(evt) => branchSessionHandler(row.original._id)}
            >
              <span
                className="fa fa-check"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        )
      }
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allSession, [allSession]);
  const tableInstance = useTable(
    {
      columns,
      data: rows_data,
    },
    useGlobalFilter, useSortBy, usePagination
  );

  // destructuring the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: tableState,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter
  } = tableInstance;

  // Destructuring the state
  const { globalFilter } = tableState;
  // Destructuring the state
  const { pageIndex, pageSize } = tableState;
  // Return function
  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Session</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">Session</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        <div className={"row page-titles px-1 my-0 shadow-none"} style={{ background: "none" }}>
          <div className={"col-md-12 px-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: {" "} </h4>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                  {/* <!-- Button trigger modal --> */}
                  {state && state.setup.addSession ?
                    <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      data-toggle="modal"
                      data-target="#addModal"
                      onClick={() => {
                        $("#start_year").val($("#start_year option:first").val());
                        $("#end_year").val($("#end_year option:first").val());
                      }}
                    >
                      <span className={"fas fa-plus"}></span> Session
                    </button> : <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      disabled
                      title={"Permission Required"}
                    >
                      <span className={"fas fa-plus"}></span> Session
                    </button>}
                </div>
              </div>
            </div>

            {/* Data */}
            {isAllSessionLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allSession.length ? (
                  <div className="card-body py-0">
                    <div className="table-responsive">

                      <table
                        {...getTableProps()}
                        className={"table table-bordered table-striped my-0"}
                      >
                        <thead>
                          {
                            // Loop over the header rows
                            headerGroups.map((headerGroup) => (
                              // Apply the header row props
                              <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                  // Loop over the headers in each row
                                  headerGroup.headers.map((column) => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                      {
                                        // Render the header
                                        column.render("Header")
                                      }
                                      <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                      </span>
                                    </th>
                                  ))
                                }
                              </tr>
                            ))
                          }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                          {page.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  return (
                                    <td {...cell.getCellProps()}>
                                      {" "}
                                      {cell.render("Cell")}{" "}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <div>
                        <span>
                          Page:{' '}
                          <strong>
                            {pageIndex + 1} of {pageOptions.length}
                          </strong>
                        </span>
                        <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                          {
                            [10, pageCount * 10].map((val, i) => {
                              return (
                                <option key={i} value={val}> {val} </option>
                              )
                            })
                          }
                        </select>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> {'<<'} </button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} >Previous</button>
                        <button onClick={() => nextPage()} disabled={!canNextPage} >Next</button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> {'>>'} </button>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div
                    className={
                      "alert alert-danger mx-3 rounded-0 border-0 py-2"
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
        </div>

        {/* -- Modal Designing -- */}
        <div>
          {/* -- Add Modal -- */}
          <div className="modal fade" id="addModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Add Session</h4>
                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Session Name Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            name: evt.target.value,
                          })
                        }
                        value={addingFormData.name}
                        className="form-control"
                        placeholder={"Session Name!"}
                      />
                    </div>

                    {/* Start Session */}
                    <div className={"form-group mb-3"}>
                      <select
                        className={"form-control"}
                        id={"start_year"}
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            start_year: evt.target.value,
                          })
                        }
                      >
                        <option value={""} hidden>
                          Sesion Start Year!
                        </option>
                        <option value={2021}>2021</option>
                        <option value={2022}>2022</option>
                        <option value={2022}>2022</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                      </select>
                    </div>

                    {/* End Session */}
                    <div className={"form-group mb-3"}>
                      <select
                        id={"end_year"}
                        className={"form-control"}
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            end_year: evt.target.value,
                          })
                        }
                      >
                        <option value={""} hidden>
                          Sesion Start Year!
                        </option>
                        <option value={2021}>2021</option>
                        <option value={2022}>2022</option>
                        <option value={2022}>2022</option>
                        <option value={2024}>2024</option>
                        <option value={2025}>2025</option>
                        <option value={2026}>2026</option>
                      </select>
                    </div>

                    {/* Comments */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            comment: evt.target.value,
                          })
                        }
                        value={addingFormData.comment}
                        className="form-control"
                        placeholder={"Comments!"}
                      />
                    </div>

                    <div className={"form-group"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isAddLaoded ? (
                          <div>
                            <i className="fas fa-plus"></i> Add
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
                        className="btn btn-secondary rounded-0 ml-2"
                        data-dismiss="modal"
                        id={"closeAddModalButton"}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Update Modal -- */}
          <div
            className="modal fade"
            id="updateModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Update Session</h4>
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Session Name */}
                    <div className={"form-group my-3"}>
                      <label className={"text-success"}>Session Name</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({ ...data, name: evt.target.value })
                        }
                        className="form-control border"
                        value={data.name}
                        placeholder={"Session Name Here!"}
                      />
                    </div>

                    {/* Session Start Year */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Start Year</label>
                      <select
                        className={"form-control"}
                        value={data.start_year}
                        onChange={(evt) =>
                          setData({
                            ...data,
                            start_year: evt.target.value,
                          })
                        }
                      >
                        <option value={""} hidden>
                          Sesion Start Year!
                        </option>
                        <option
                          value={2021}
                        >
                          2021
                        </option>
                        <option
                          value={2022}
                        >
                          2022
                        </option>
                        <option
                          value={2023}
                        >
                          2023
                        </option>
                        <option
                          value={2024}
                        >
                          2024
                        </option>
                        <option
                          value={2025}
                        >
                          2025
                        </option>
                        <option
                          value={2026}
                        >
                          2026
                        </option>
                      </select>
                    </div>

                    {/* Session End Year */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>End Year</label>
                      <select
                        className={"form-control"}
                        onChange={(evt) =>
                          setData({
                            ...data,
                            end_year: evt.target.value,
                          })
                        }
                      >
                        <option value={""} hidden>
                          Sesion Start Year!
                        </option>
                        <option
                          value={2021}
                          selected={data.end_year == 2021 ? "selected" : ""}
                        >
                          2021
                        </option>
                        <option
                          value={2022}
                          selected={data.end_year == 2022 ? "selected" : ""}
                        >
                          2022
                        </option>
                        <option
                          value={2023}
                          selected={data.end_year == 2023 ? "selected" : ""}
                        >
                          2023
                        </option>
                        <option
                          value={2024}
                          selected={data.end_year == 2024 ? "selected" : ""}
                        >
                          2024
                        </option>
                        <option
                          value={2025}
                          selected={data.end_year == 2025 ? "selected" : ""}
                        >
                          2025
                        </option>
                        <option
                          value={2026}
                          selected={data.end_year == 2026 ? "selected" : ""}
                        >
                          2026
                        </option>
                      </select>
                    </div>

                    {/* Comment */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Comments</label>
                      <input
                        type="text"
                        value={data.comment}
                        onChange={(evt) =>
                          setData({ ...data, comment: evt.target.value })
                        }
                        className="form-control"
                        placeholder={"Comments Here!!"}
                      />
                    </div>

                    {/* Status */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Select Status!</label>
                      <select
                        className="form-control"
                        value={data.status}
                        onChange={(evt) =>
                          setData({ ...data, status: evt.target.value })
                        }
                      >
                        <option value={""}> Select Status </option>
                        <option
                          value={true}
                        >
                          Active
                        </option>
                        <option
                          value={false}
                        >
                          Disable
                        </option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className={"form-group"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isUpdateLaoded ? (
                          <div>
                            <i className="fas fa-refresh"></i> Update
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
                        className="btn btn-secondary rounded-0 ml-2"
                        data-dismiss="modal"
                        id={"closeUpdateModalButton"}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Delete Modal -- */}
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body text-center">
                  <img
                    style={{ width: "150px" }}
                    className={"img img-fluid"}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5R1g82DqzH4itsxpVCofNGWbAzKN_PJDBew&usqp=CAU"
                    }
                  />
                  <h4 className={"text-center mt-2"}>Do You Want to Delete?</h4>
                  <p className={"badge badge-warning"}>
                    All data that connected with this Session will be
                    automatically deleted.
                  </p>
                  <div className={"form-group"}>
                    <button
                      className="btn btn-info rounded-0 px-3"
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
                      className="btn btn-secondary rounded-0 ml-2 px-3"
                      data-dismiss="modal"
                      id={"closeDeleteModalButton"}
                    >
                      No
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
});

export default Session;
