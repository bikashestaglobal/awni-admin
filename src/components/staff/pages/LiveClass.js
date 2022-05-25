import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Config from "../../config/Config";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import date from "date-and-time";
import { StaffContext } from '../StaffRoutes'

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const LiveClass = React.memo((props) => {
  const { state, dispatch } = useContext(StaffContext);
  const history = useHistory();
  const [addingFormData, setAddingFormData] = useState({
    topic: "",
    zoom_meeting_id: "",
    zoom_meeting_pwd: "",
    start_time: "",
    end_time: "",
    date: "",
    comment: "",
    session: localStorage.getItem("branchSession")
  });

  const [selectBatch, setSelectBatch] = useState([]);
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllMeetingLoaded, setIsAllMeetingLoaded] = useState(false);
  const [allMeeting, setAllMeeting] = useState([]);
  const [allBatch, setAllBatch] = useState([]);
  // const [selectedBatch, setSelectedBatch] = useState([]);
  const [data, setData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Update the state while clicking the edit button
  const updateState = (list) => {
    const btch = [];
    list.batch.map(({ batch }) => {
      btch.push({ batch: batch._id, name: batch.name })
    })

    setSelectBatch(btch);
    setData(list);
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();

    const meetingData = data;

    // Set Batch
    meetingData.batch = selectBatch;


    fetch(Config.SERVER_URL + "/staff/updateMeeting", {
      method: "PUT",
      body: JSON.stringify(meetingData),
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

            // Close Modal button click
            $("#closeUpdateModalButton").click();
            $("#closeAddBatchToMeetingModal").click();

            // set empty object
            setData({});
            setSelectBatch([]);
          } else {
            if (result.topic)
              M.toast({ html: result.topic, classes: "bg-danger" });
            if (result.zoom_meeting_id)
              M.toast({ html: result.zoom_meeting_id, classes: "bg-danger" });
            if (result.zoom_meeting_pwd)
              M.toast({ html: result.zoom_meeting_pwd, classes: "bg-danger" });
            if (result.start_time)
              M.toast({ html: result.start_time, classes: "bg-danger" });
            if (result.end_time)
              M.toast({ html: result.end_time, classes: "bg-danger" });
            if (result.date)
              M.toast({ html: result.date, classes: "bg-danger" });
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
    const meetingData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL + "/staff/deleteMeeting", {
      method: "DELETE",
      body: JSON.stringify(meetingData),
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

    fetch(Config.SERVER_URL + "/staff/createMeeting", {
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
              topic: "",
              zoom_meeting_id: "",
              zoom_meeting_pwd: "",
              start_time: "",
              end_time: "",
              date: "",
              comment: "",
            });
          } else {
            if (result.topic)
              M.toast({ html: result.topic, classes: "bg-danger" });
            if (result.zoom_meeting_id)
              M.toast({ html: result.zoom_meeting_id, classes: "bg-danger" });
            if (result.zoom_meeting_pwd)
              M.toast({ html: result.zoom_meeting_pwd, classes: "bg-danger" });
            if (result.start_time)
              M.toast({ html: result.start_time, classes: "bg-danger" });
            if (result.end_time)
              M.toast({ html: result.end_time, classes: "bg-danger" });
            if (result.end_year)
              M.toast({ html: result.end_year, classes: "bg-danger" });
            if (result.date)
              M.toast({ html: result.date, classes: "bg-danger" });
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


  // Batch Select Handler
  const batchSelectHandler = (evt, flag, batchId) => {
    evt.preventDefault();
    const selectedBatch = [...selectBatch];
    if (flag == "add") {
      const value = JSON.parse(evt.target.value);

      if (!selectedBatch.find(val => val.batch == value.batch)) {
        setSelectBatch([...selectBatch, value])
      }
    } else {
      setSelectBatch(selectedBatch.filter(value => value.batch != batchId));
    }
  }

  // Get Data From Database
  useEffect(() => {
    fetch(Config.SERVER_URL + "/staff/searchMeeting?session=" + localStorage.getItem("branchSession"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllMeetingLoaded(true);
          if (result.success) {
            setAllMeeting(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllMeetingLoaded(true);
        }
      );

    // Get All Batches
    fetch(Config.SERVER_URL + "/staff/searchBatch?session=" + localStorage.getItem("branchSession"), {
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
            setAllBatch(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
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
  const meetingHandler = (sessionId) => {

  }

  // Create Column for Table
  const COLUMNS = [
    {
      Header: "#SN",
      accessor: "",
      Cell: (row) => {
        return <div>{Number(row.row.id) + 1}</div>;
      },
      disableSortBy: false,
      disableFilters: false,
    },
    {
      Header: "MEETING TOPIC",
      accessor: "topic",
    },
    {
      Header: "DATE",
      accessor: "date",
      Cell: ({ value }) => { return format(new Date(value), "dd/MM/yyyy") }
    },
    {
      Header: "START TIME",
      accessor: "start_time",
      Cell: ({ value }) => { return date.transform(value, 'HH:mm', 'hh:mm A') }
    },
    {
      Header: "END TIME",
      accessor: "end_time",
      Cell: ({ value }) => { return date.transform(value, 'HH:mm', 'hh:mm A') }
    },
    {
      Header: "STATUS",
      accessor: "status",
      disableSortBy: true,
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
            {state && state.setup.updateLiveClass ?
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

            {/* Delete Button */}
            {state && state.setup.deleteLiveClass ?
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

            {/* add batch to live cllass */}
            {state && state.setup.addBatchToLiveClass ?
              <button
                type="button"
                className="ml-2 btn btn-success"
                data-toggle="modal"
                data-target="#addBatchToMeetingModal"
                onClick={() => updateState(row.original)}
              >
                <span
                  className="fa fa-user"
                  aria-hidden="true"
                ></span>
              </button> : <button
                type="button"
                className="ml-2 btn btn-success"
                disabled
                title={"Permission Required"}
              >
                <span
                  className="fa fa-user"
                  aria-hidden="true"
                ></span>
              </button>}

          </div>
        )
      }
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allMeeting, [allMeeting]);
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
            <h3 className="text-themecolor m-b-0 m-t-0">Live Class Setup</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">Live Class</li>
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
                  {state && state.setup.addLiveClass ?
                    <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      data-toggle="modal"
                      data-target="#addModal"
                    >
                      <span className={"fas fa-plus"}></span> Live Class
                    </button> :
                    <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      disabled
                      title={"Permission Required"}
                    >
                      <span className={"fas fa-plus"}></span> Live Class
                    </button>}
                </div>
              </div>
            </div>

            {/* Data */}
            {isAllMeetingLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allMeeting.length ? (
                  <div className="card-body py-0">
                    <div className="table-responsive" style={{ overflowX: "auto" }}>

                      <table
                        style={{ width: "100%", overflowX: "auto" }}
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
                  <h4>Add Live Class</h4>
                  <form
                    onSubmit={submitHandler}
                    className="form-material"
                  >
                    {/* Class/Meeting Topic */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6 border-none outline-none"}>Live Class Topic</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            topic: evt.target.value,
                          })
                        }
                        value={addingFormData.topic}
                        className="form-control"
                        placeholder={"Eg: About Technology!"}
                      />
                    </div>

                    {/* Zoom Meeting ID */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6 border-none outline-none"}>Zoom Meeting ID</label>
                      <input
                        type="number"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            zoom_meeting_id: evt.target.value,
                          })
                        }
                        value={addingFormData.zoom_meeting_id}
                        className="form-control"
                        placeholder={"Eg: 9275364725"}
                      />
                    </div>

                    {/* Zoom Meeting Password */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6 border-none outline-none"}>Zoom Meeting Password</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            zoom_meeting_pwd: evt.target.value,
                          })
                        }
                        value={addingFormData.zoom_meeting_pwd}
                        className="form-control"
                        placeholder={"Eg: 12345!"}
                      />
                    </div>

                    {/* Class/Meeting Date */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Date</label>
                      <input
                        type="date"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            date: evt.target.value,
                          })
                        }
                        value={addingFormData.date}
                        className="form-control"
                      />
                    </div>

                    {/* Class/Meeting Start Time */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Start Time</label>
                      <input
                        type="time"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            start_time: evt.target.value,
                          })
                        }
                        value={addingFormData.start_time}
                        className="form-control"
                      />
                    </div>

                    {/* Class/Meeting End Time */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>End Time</label>
                      <input
                        type="time"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            end_time: evt.target.value,
                          })
                        }
                        value={addingFormData.end_time}
                        className="form-control"
                      />
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
                  <h4>Update Data</h4>
                  <div className="devider"></div>
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Class/Meeting Topic */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6 border-none outline-none"}>Live Class Topic</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            topic: evt.target.value,
                          })
                        }
                        value={data.topic}
                        className="form-control"
                        placeholder={"Eg: About Technology!"}
                      />
                    </div>

                    {/* Zoom Meeting ID */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6 border-none outline-none"}>Zoom Meeting ID</label>
                      <input
                        type="number"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            zoom_meeting_id: evt.target.value,
                          })
                        }
                        value={data.zoom_meeting_id}
                        className="form-control"
                        placeholder={"Eg: 9275364725"}
                      />
                    </div>

                    {/* Zoom Meeting Password */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6 border-none outline-none"}>Zoom Meeting Password</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            zoom_meeting_pwd: evt.target.value,
                          })
                        }
                        value={data.zoom_meeting_pwd}
                        className="form-control"
                        placeholder={"Eg: 12345!"}
                      />
                    </div>

                    {/* Class/Meeting Date */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Date</label>
                      <input
                        type="date"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            date: evt.target.value,
                          })
                        }
                        value={data.date}
                        className="form-control"
                      />
                    </div>

                    {/* Class/Meeting Start Time */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Start Time</label>
                      <input
                        type="time"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            start_time: evt.target.value,
                          })
                        }
                        value={data.start_time}
                        className="form-control"
                      />
                    </div>

                    {/* Class/Meeting End Time */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>End Time</label>
                      <input
                        type="time"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            end_time: evt.target.value,
                          })
                        }
                        value={data.end_time}
                        className="form-control"
                      />
                    </div>

                    {/* Comments */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Comments!</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            comment: evt.target.value,
                          })
                        }
                        value={data.comment}
                        className="form-control"
                        placeholder={"Comments!"}
                      />
                    </div>

                    {/* Status */}
                    <div className={"form-group"}>
                      <label className={"text-dark h6"}>Select Status!</label>
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

          {/* -- Add Batch To Live Session -- */}
          <div
            className="modal fade"
            id="addBatchToMeetingModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Add Batches</h4>
                  <div className={"devider"}></div>

                  <div className={"row"}>
                    <div className={"col-md-6"}>
                      <form
                        onSubmit={updateSubmitHandler}
                        className="form-horizontal form-material"
                      >
                        {/* Class/Meeting Topic */}
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6 border-none outline-none mb-2"}>Select Class/Batch</label>
                          {/* <div className="form-check">
                            {allBatch.map((value, index) => {

                              return (
                                <div key={index}>
                                  <input onClick={(evt) => checkBoxHandler(evt)} className="form-check-input" type="checkbox" value={value._id} id={`defaultCheck${index + 1}`} />
                                  <label className="form-check-label" for={`defaultCheck${index + 1}`}>
                                    {value.name}
                                  </label>
                                </div>
                              )
                            })}
                          </div> */}

                          <select
                            className="form-select block" multiple aria-label="multiple select example"
                            onChange={(evt) => batchSelectHandler(evt, "add")}
                          >
                            <option value={""} hidden> Available Batches </option>
                            {allBatch.map((value, index) => {
                              return (
                                <option key={index} value={JSON.stringify({ batch: value._id, name: value.name })}> {value.name} </option>
                              )
                            })}
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
                            type={"button"}
                            id={"closeAddBatchToMeetingModal"}
                          >
                            Close
                          </button>
                        </div>
                      </form>

                    </div>
                    <div className={"col-md-6"}>
                      {/* {data.batch ? data.batch.map((value, index) => {
                        return (<span key={index} className={"badge badge-info"}> {value.batch.name} </span>)
                      }) : ""} */}

                      {selectBatch.map((value, index) => {
                        return (
                          <div key={index}>
                            <span className={"badge badge-info"}> {value.name} </span>
                            <button onClick={(evt => batchSelectHandler(evt, "remove", value.batch))} type={"button"} className={"btn btn-danger p-1 ml-3"}>X</button>
                          </div>
                        )
                      })}
                    </div>
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
});

export default LiveClass;
