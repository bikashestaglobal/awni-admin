import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Config from "../../config/Config";
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
const Staff = (props) => {
  const { state, dispatch } = useContext(StaffContext);
  const history = useHistory();
  const [addingFormData, setAddingFormData] = useState({
    // Personal Details
    name: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
    state: "",
    city: "",
    joining_date: "",
    profile_picture: "",
  });

  const [selectedSession, setSelectedSession] = useState(
    localStorage.getItem("branchSession") || ""
  );
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllStaffLoaded, setIsAllStaffLoaded] = useState(true);
  const [allBatch, setAllBatch] = useState([]);
  const [allStaff, setAllStaff] = useState([]);

  const [data, setData] = useState({
    standard: { _id: "" }
  }
  );



  const [viewData, setViewData] = useState({
    standard: { name: "" },
    course_type: { name: "" }
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [allStandard, setAllStandard] = useState([]);
  const [allCourseType, setAllCourseType] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [endTime, setEndTime] = useState("");

  // Update the state while clicking the View button
  const updateStateForViewData = (list) => {
    setViewData(JSON.parse(JSON.stringify(list)));
  };

  // Update the state while clicking the edit button
  const updateState = (list) => {
    console.log(list.status);
    setData(JSON.parse(JSON.stringify(list)));
  };


  // Update Submit Handler
  const updateSubmitHandler = (evt) => {

    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/staff/updateStaff", {
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
            setData({})
            $("#closeUpdateModalButton").click();
            $("#closeUpdateStatusModalButton").click();
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.gender)
              M.toast({ html: result.gender, classes: "bg-danger" });
            if (result.mobile)
              M.toast({ html: result.mobile, classes: "bg-danger" });
            if (result.address)
              M.toast({ html: result.address, classes: "bg-danger" });
            if (result.state)
              M.toast({ html: result.state, classes: "bg-danger" });
            if (result.city)
              M.toast({ html: result.city, classes: "bg-danger" });

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
    const staffId = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL + "/staff/deleteStaff", {
      method: "DELETE",
      body: JSON.stringify(staffId),
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
    fetch(Config.SERVER_URL + "/staff/addStaff", {
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
            // set added data to allStaff state variable
            const addedData = result.data;
            const hasStaff = [...allStaff];
            hasStaff.unshift(addedData);
            setAllStaff(hasStaff);

            // 
            M.toast({ html: result.message, classes: "bg-success" });
            $("#closeAddModalButton").click();
            setIsAdded(true);
            setAddingFormData({
              name: "",
              genger: "",
              password: "",
              mobile: "",
              email: "",
              address: "",
              state: "",
              city: "",
              joining_date: "",
              comment: "",
            });
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.gender)
              M.toast({ html: result.gender, classes: "bg-danger" });
            if (result.password)
              M.toast({ html: result.password, classes: "bg-danger" });
            if (result.mobile)
              M.toast({ html: result.mobile, classes: "bg-danger" });
            if (result.address)
              M.toast({ html: result.address, classes: "bg-danger" });
            if (result.state)
              M.toast({ html: result.state, classes: "bg-danger" });
            if (result.city)
              M.toast({ html: result.city, classes: "bg-danger" });
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


  // Get All Batch
  useEffect(() => {
    setIsAllStaffLoaded(true);

    // Get All Staff Data
    fetch(
      Config.SERVER_URL + "/staff/searchStaff",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setAllStaff(result.data || []);
            setIsAllStaffLoaded(false);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllStaffLoaded(false);
        }
      );
  }, [isUpdated, isDeleted]);

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
      Cell: ({ row }) => {
        return (Number(row.id) + 1)
      }
    },
    {
      Header: "Staff Name",
      accessor: "name",
    },
    {
      Header: "Mobile",
      accessor: "mobile",
    },


    {
      Header: "Joining Date",
      accessor: "joining_date",
      Cell: ({ value }) => { return format(new Date(value), "dd/MM/yyyy") }
    },
    {
      Header: "STATUS",
      accessor: "status",
      // disableSortBy: true,
      Cell: ({ row }) => {
        const status = row.original.status;

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
            {/* Edit Buttons */}
            {state && state.staff.updateStaff ?
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
              </button> : <button
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

            {/* View Button */}
            {state && state.staff.showPersonalStaffDetails ?
              <button
                type="button"
                className="btn btn-success ml-2"
                data-toggle="modal"
                data-target="#viewModal"
                onClick={() =>
                  updateStateForViewData(row.original)
                }
              >
                <span
                  className="fas fa-eye text-white"
                  aria-hidden="true"
                ></span>
              </button> : <button
                type="button"
                className="btn btn-success ml-2"
                disabled
                title={"Permission Required"}
              >
                <span
                  className="fas fa-eye text-white"
                  aria-hidden="true"
                ></span>
              </button>}

            {/* Delete Buttons */}
            {state && state.staff.deleteStaff ?
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
              </button> : <button
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
  const rows_data = useMemo(() => allStaff, [allStaff]);
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
    <div className="page-wrapper pt-0 px-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Staff</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">staff</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        <div className={"row p-0"}>
          <div className={"col-md-12 p-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: {" "} </h4>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

                  {/* <!-- Button trigger modal --> */}
                  {state && state.staff.addStaff ? <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    <span className={"fas fa-plus"}></span> Staff
                  </button> : <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    disabled
                    title={"Permission Required"}
                  >
                    <span className={"fas fa-plus"}></span> Staff
                  </button>}
                </div>
              </div>
            </div>

            {/* Data */}
            {!isAllStaffLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allStaff.length ? (
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
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <div className={"text-center"}>
                    <button type="button" className="close p-2 border" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className={"text-theme"}>Sraff Registration</h4>
                    <div className={"devider m-auto"} />
                  </div>

                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Personal Details */}
                    <div className={"row"}>
                      <div className={"col-md-12"}>
                        <h4 className={"text-theme"}>Personal Details</h4>
                        <div className={"devider"} />
                      </div>

                      {/* Staff Full Name */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Staff Full Name
                          </label>
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
                            placeholder={"Eg. Rahul Kumar"}
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>Gender</label>
                          <select
                            className="form-control"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                gender: evt.target.value,
                              })
                            }
                          >
                            <option value={""} disabled selected hidden>
                              Select Gender
                            </option>
                            <option value={"MALE"}>MALE</option>
                            <option value={"FEMALE"}>FEMALE</option>
                            <option value={"OTHER"}>OTHER</option>
                          </select>
                        </div>
                      </div>

                      {/* Staff Mobile */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Mobile
                          </label>
                          <input
                            type="tel"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                mobile: evt.target.value,
                              })
                            }
                            value={addingFormData.mobile}
                            className="form-control"
                            placeholder={"Mobile NUmber"}
                          />
                        </div>
                      </div>

                      {/* Staff Email */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Staff Email
                          </label>
                          <input
                            type="email"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                email: evt.target.value,
                              })
                            }
                            value={addingFormData.email}
                            className="form-control"
                            placeholder={"Student Email"}
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Address</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                address: evt.target.value,
                              })
                            }
                            value={addingFormData.address}
                            className="form-control"
                            placeholder={"Full Address"}
                          />
                        </div>
                      </div>

                      {/* State */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>State</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                state: evt.target.value,
                              })
                            }
                            value={addingFormData.state}
                            className="form-control"
                            placeholder={"State"}
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>City</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                city: evt.target.value,
                              })
                            }
                            value={addingFormData.city}
                            className="form-control"
                            placeholder={"City"}
                          />
                        </div>
                      </div>

                      {/* Profile Picture */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Profile Picture
                          </label>
                          <input
                            type="file"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                profile_picture: evt.target.value,
                              })
                            }
                            value={addingFormData.profile_picture}
                            className="form-control"
                            placeholder={"Profile Picture"}
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Password</label>
                          <input
                            type="password"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                password: evt.target.value,
                              })
                            }
                            value={addingFormData.password}
                            className="form-control"
                            placeholder={"*****"}
                          />
                        </div>
                      </div>

                      {/* Joining Date */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Joining Date</label>
                          <input
                            type="date"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                joining_date: evt.target.value,
                              })
                            }
                            value={addingFormData.joining_date}
                            className="form-control"
                          />
                        </div>
                      </div>


                    </div>

                    {/* Buttons */}
                    <div className={"form-group px-3"}>
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
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <div className={"text-center"}>
                    <button type="button" className="close p-2 border" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className={"text-theme"}>Update Staff Details</h4>
                    <div className={"devider m-auto"} />

                  </div>

                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Personal Details */}
                    <div className={"row"}>
                      <div className={"col-md-12"}>
                        <h4 className={"text-theme"}>Personal Details</h4>
                        <div className={"devider"} />
                      </div>

                      {/* Staff Full Name */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Staff Full Name
                          </label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                name: evt.target.value,
                              })
                            }
                            value={data.name}
                            className="form-control"
                            placeholder={"Eg. Rahul Kumar"}
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>Gender</label>
                          <select
                            className="form-control"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                gender: evt.target.value,
                              })
                            }
                            value={data.gender}
                          >
                            <option value={""} disabled selected hidden>
                              Select Gender
                            </option>
                            <option value={"MALE"} >MALE</option>
                            <option value={"FEMALE"}>FEMALE</option>
                            <option value={"OTHER"}>OTHER</option>
                          </select>
                        </div>
                      </div>

                      {/* Staff Mobile */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Mobile
                          </label>
                          <input
                            type="tel"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                mobile: evt.target.value,
                              })
                            }
                            value={data.mobile}
                            className="form-control"
                            placeholder={"Mobile NUmber"}
                          />
                        </div>
                      </div>

                      {/* Staff Email */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Staff Email
                          </label>
                          <input
                            type="email"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                email: evt.target.value,
                              })
                            }
                            value={data.email}
                            className="form-control"
                            placeholder={"Student Email"}
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Address</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                address: evt.target.value,
                              })
                            }
                            value={data.address}
                            className="form-control"
                            placeholder={"Full Address"}
                          />
                        </div>
                      </div>

                      {/* State */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>State</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                state: evt.target.value,
                              })
                            }
                            value={data.state}
                            className="form-control"
                            placeholder={"State"}
                          />
                        </div>
                      </div>

                      {/* City */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>City</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                city: evt.target.value,
                              })
                            }
                            value={data.city}
                            className="form-control"
                            placeholder={"City"}
                          />
                        </div>
                      </div>

                      {/* Status */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>Status</label>
                          <select
                            className="form-control"
                            value={`${data.status}`}
                            onChange={(evt) =>
                              setData({
                                ...data,
                                status: evt.target.value,
                              })
                            }
                          >
                            <option value={""} disabled selected hidden>
                              Select Status
                            </option>
                            <option value={"true"}>Active</option>
                            <option value={"false"}>Disabled</option>
                          </select>
                        </div>
                      </div>
                    </div>


                    {/* Buttons */}
                    <div className={"form-group px-3"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isUpdateLaoded ? (
                          <div>
                            <i className="fas fa-plus"></i> Update
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
                        type={"button"}
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

          {/* -- View Modal -- */}
          <div className="modal fade" id="viewModal">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  {/* Header Section */}
                  <div className={"text-center"}>
                    <button type="button" className="close p-2 border" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className={"text-theme"}>Staff Details</h4>
                    <div className={"devider m-auto"} />
                  </div>

                  {/* Profile Section */}
                  <div className={"row mt-2 px-2"}>
                    <div className={"col-3"}>
                      <img
                        src={
                          "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
                        }
                        className={"img img-fluid"}
                      />
                    </div>
                    <div className={"col-9 py-3"}>
                      <h5 className={"text-left"}>{viewData.name}</h5>
                      <h5 className={"text-left"}>{viewData.email}</h5>
                      <h5 className={"text-left"}>{viewData.mobile}</h5>
                    </div>
                  </div>

                  <div className={"row mt-2 px-2"}>
                    <div className={"col-md-12 table-responsive"}>
                      <table className={"table table-bordered"}>
                        <tbody>
                          <tr>
                            <th className={"border p-1"}>Date of Joining</th>
                            <td className={"p-1"}>{viewData.joining_date}</td>
                            <th className={"border p-1"}>Status</th>
                            <td className={"p-1"}>{viewData.status ? <span className={"badge badge-info"}>Active</span> : <span className={"badge badge-danger"}>Disabled</span>}</td>
                          </tr>
                          <tr>
                            <th className={"border p-1"}>Staff Mobile</th>
                            <td className={"p-1"}>{viewData.mobile}</td>
                            <th className={"border p-1"}>Staff Email</th>
                            <td className={"p-1"}>{viewData.email || "Not Available"}</td>
                          </tr>
                          <tr>
                            <th className={"border p-1"}>Gender</th>
                            <td className={"p-1"}>{viewData.gender}</td>
                            <th className={"border p-1"}>Address</th>
                            <td className={"p-1"}>{viewData.address}</td>
                          </tr>
                          <tr>
                            <th className={"border p-1"}>City</th>
                            <td className={"p-1"}>{viewData.city}</td>
                            <th className={"border p-1"}>State</th>
                            <td className={"p-1"}>{viewData.state}</td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className={"form-group"}>
                    <button
                      className="btn btn-secondary rounded-0 ml-2"
                      data-dismiss="modal"
                      id={"closeViewModalButton"}
                      onClick={() => $("#closeMdalButton").click()}
                    >
                      Close
                    </button>
                  </div>
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

export default Staff;
