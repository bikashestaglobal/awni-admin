import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, history, useHistory } from "react-router-dom";
import Config from "../../config/Config"
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import { StaffContext } from '../StaffRoutes';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const Standard = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(StaffContext);
  const [addingFormData, setAddingFormData] = useState({
    name: "",
    comment: "",
    session: localStorage.getItem("branchSession") || ""
  });

  const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "")
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllStandardLoaded, setIsAllStandardLoaded] = useState(false);
  const [allStandard, setAllStandard] = useState([]);
  const [data, setData] = useState({ fields: {} });
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
    setIsUpdateLaoded(false)
    evt.preventDefault();
    fetch(Config.SERVER_URL + "/staff/updateStandard", {
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
          setIsUpdateLaoded(true)
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsUpdated(true);
            $("#closeUpdateModalButton").click();
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });

            if (result.comment)
              M.toast({ html: result.comment, classes: "bg-danger" });
            if (result.status)
              M.toast({ html: result.status, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsUpdateLaoded(true)
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Delete Submit Handler
  const deleteSubmitHandler = () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false)
    const standardData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL + "/staff/deleteStandard", {
      method: "DELETE",
      body: JSON.stringify(standardData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsDeleteLaoded(true)
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
          setIsDeleteLaoded(true)
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAdded(false);
    setIsAddLaoded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/staff/addStandard", {
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
              comment: "",
              session: localStorage.getItem("branchSession") || ""
            });
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
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
    fetch(Config.SERVER_URL + "/staff/searchStandard?session=" + selectedSession, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllStandardLoaded(true);
          if (result.success) {
            setAllStandard(result.data || []);
          } else {
            if (result.session) M.toast({ html: result.session, classes: "bg-danger" });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllStandardLoaded(true);
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
      Header: "STANDARD",
      accessor: "name",
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
            {state && state.setup.updateStandard ?
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
              : <button
                type="button"
                className="btn btn-info footable-edit"
                disabled
                title={"Permission Required"}
              >
                <span
                  className="fas fa-pencil-alt"
                  aria-hidden="true"
                ></span>
              </button>}

            {/* Delete Button */}
            {state && state.setup.deleteStandard ?
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
              </button>
              : <button
                type="button"
                className="ml-2 btn btn-danger footable-delete"
                disabled
                title={"Permission Required"}
              >
                <span
                  className="fas fa-trash-alt"
                  aria-hidden="true"
                ></span>
              </button>}

          </div>
        )
      }
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allStandard, [allStandard]);
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
            <h3 className="text-themecolor m-b-0 m-t-0">Standard</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">Standard</li>
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
                  {state && state.setup.addStandard ?
                    <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      data-toggle="modal"
                      data-target="#addModal"

                    >
                      <span className={"fas fa-plus"}></span> Standard
                    </button> :
                    <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      disabled
                      title={"Permission Required"}
                    >
                      <span className={"fas fa-plus"}></span> Standard
                    </button>
                  }
                </div>
              </div>
            </div>

            {/* Data */}
            {isAllStandardLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allStandard.length ? (
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
                  <h4 className={"text-theme"}>Add Standard</h4>
                  <div className={"devider"} />
                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >

                    {/* Standard Name */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Standard Name</label>
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
                        placeholder={"12th/11th"}
                      />
                    </div>

                    {/* Comments */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Comment</label>
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
                        placeholder={"Comment Here"}
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
                  <h4 className={"text-theme"}>Update Standard</h4>
                  <div className={"devider"} />
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Standard Name */}
                    <div className={"form-group my-3"}>
                      <label className={"text-dark h6"}>Standard Name</label>
                      <input
                        type="text"
                        onChange={(evt) => setData({ ...data, name: evt.target.value })}
                        className="form-control border"
                        value={data.name}
                        placeholder={"11th/12th..."}
                      />
                    </div>


                    {/* Comment */}
                    <div className={"form-group"}>
                      <label className={"text-dark h6"}>Comments</label>
                      <input
                        type="text"
                        value={data.comment}
                        onChange={(evt) => setData({ ...data, comment: evt.target.value })}
                        className="form-control"
                        placeholder={"Comments Here!!"}
                      />
                    </div>

                    {/* Status */}
                    <div className={"form-group"}>
                      <label className={"text-dark h6"}>Select Status!</label>
                      <select
                        className="form-control"
                        value={data.status}
                        onChange={(evt) => setData({ ...data, status: evt.target.value })}
                      >

                        <option value={""} hidden> Select Status </option>
                        <option value={true}> Active </option>
                        <option value={false}> Disable </option>
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
                    All data that connected with this Standard will be automatically deleted.
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
};

export default Standard;
