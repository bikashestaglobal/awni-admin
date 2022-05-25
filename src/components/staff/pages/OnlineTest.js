import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Config from "../../config/Config";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import { StaffContext } from '../StaffRoutes'

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const OnlineTest = React.memo((props) => {
  const { state, dispatch } = useContext(StaffContext);
  const [addingFormData, setAddingFormData] = useState({
    name: "",
    total_questions: "",
    question_type: "",
    total_marks: "",
    date: "",
    duration: "",
    standard: "",
    course_type: "",
    session: "",
    standard: "",
    comment: "",
    status: 0
  });
  const history = useHistory();
  const [selectBatch, setSelectBatch] = useState([]);
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "");
  const [allStandard, setAllStandard] = useState([]);
  const [allCourseType, setAllCourseType] = useState([]);
  const [allBatch, setAllBatch] = useState([]);
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isallOnlineTestLoaded, setIsallOnlineTestLoaded] = useState(false);
  const [allOnlineTest, setAllOnlineTest] = useState([]);
  const [data, setData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Update the state while clicking the edit button
  const updateState = (list) => {
    console.log(list)
    setData({ ...list });
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

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/staff/updateOnlineTest", {
      method: "PUT",
      body: JSON.stringify({ ...data, batches: selectBatch }),
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
            if (result.title)
              M.toast({ html: result.title, classes: "bg-danger" });
            if (result.marks)
              M.toast({ html: result.marks, classes: "bg-danger" });
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });
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
    const questionTypeData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL + "/staff/deleteOnlineTest", {
      method: "DELETE",
      body: JSON.stringify(questionTypeData),
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

    fetch(Config.SERVER_URL + "/staff/addOnlineTest", {
      method: "POST",
      body: JSON.stringify({ ...addingFormData, session: selectedSession, batches: selectBatch }),
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
              ...addingFormData,
              name: "",
              total_marks: "",
              standard: "",
              comment: "",
            });
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.total_questions)
              M.toast({ html: result.total_questions, classes: "bg-danger" });
            if (result.question_type)
              M.toast({ html: result.question_type, classes: "bg-danger" });
            if (result.total_marks)
              M.toast({ html: result.total_marks, classes: "bg-danger" });
            if (result.date)
              M.toast({ html: result.date, classes: "bg-danger" });
            if (result.duration)
              M.toast({ html: result.duration, classes: "bg-danger" });
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });
            if (result.course_type)
              M.toast({ html: result.course_type, classes: "bg-danger" });
            if (result.batches)
              M.toast({ html: result.batches, classes: "bg-danger" });
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

  // Get course Type
  const getCourseType = (evt, fromWhere, standardID) => {
    // set standard
    let standard = "";
    if (fromWhere == "addForm") {
      setAddingFormData({ ...addingFormData, standard: evt.target.value });
      standard = evt.target.value;
    }

    if (fromWhere == "updateForm") {
      setData({ ...data, standard: evt.target.value });
      standard = evt.target.value;
    }

    if (fromWhere == "other") {
      standard = standardID;
    }


    // Get All CourseType
    fetch(
      Config.SERVER_URL +
      "/staff/searchCourseType?session=" +
      selectedSession +
      "&standard=" +
      standard,
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
            setAllCourseType(result.data || []);

          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Get course Type
  const getBatches = (evt, fromWhere, course_typeID) => {
    // set course_type
    let course_type = "";
    if (fromWhere == "addForm") {
      setAddingFormData({ ...addingFormData, course_type: evt.target.value });
      course_type = evt.target.value;
    }

    if (fromWhere == "updateForm") {
      setData({ ...data, course_type: evt.target.value });
      course_type = evt.target.value;
    }

    if (fromWhere == "other") {
      course_type = course_typeID;
    }


    // Get All Batches
    fetch(
      Config.SERVER_URL +
      "/staff/searchBatch?session=" +
      selectedSession +
      "&course_type=" +
      course_type,
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
            setAllBatch(result.data || []);

          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Get Data From Database
  useEffect(() => {
    fetch(Config.SERVER_URL + "/staff/searchOnlineTest?session=" + selectedSession, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsallOnlineTestLoaded(true);
          if (result.success) {
            setAllOnlineTest(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsallOnlineTestLoaded(true);
        }
      );

    // Get All Standard
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
          // setIsAllCourseTypeLoaded(false);
          if (result.success) {
            setAllStandard(result.data || []);
            //   console.log(allCourseType);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            if (result.session) M.toast({ html: result.session, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          // setIsAllCourseTypeLoaded(false);
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

  const setTestToLocalstorage = (evt, data) => {
    fetch(Config.SERVER_URL + "/staff/searchOnlineTest?session=" + selectedSession + "&_id=" + data._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // setIsallQuestionLoaded(false);
          if (result.success) {
            localStorage.setItem("selectedQuestion", JSON.stringify(result.data[0].questions || []))
            localStorage.setItem("selectedTestForBranch", JSON.stringify(data));
            history.push("/staff/addQuestionToOnlineTest");

          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          // setIsallQuestionLoaded(false);
        }
      );
  }

  // Create Column for Table
  const COLUMNS = [
    {
      Header: "#SN",
      accessor: "",
      Cell: (({ row }) => { return (Number(row.id) + 1) })
    },
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "TOTAL QUES",
      accessor: "total_questions",
    },
    {
      Header: "ADDED QUES",
      accessor: "questions",
      Cell: ({ value }) => { return value.length }
    },
    {
      Header: "TOTAL MARKS",
      accessor: "total_marks",
    },
    {
      Header: "STANDARD",
      accessor: "standard.name",
    },
    {
      Header: "COURSE TYPE",
      accessor: "course_type.name",
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
      Cell: (({ row }) => {

        return (
          <div>
            {/* Update Button */}
            {state && state.onlineTest.updateTest ? <button
              type="button"
              title={"Edit"}
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
              title={"Permission Required"}
              className="btn btn-info footable-edit"
              disabled
            >
              <span
                className="fas fa-pencil-alt"
                aria-hidden="true"
              ></span>
            </button>}

            {/* Add Questionn Button */}
            {state && state.onlineTest.addQuestionToTest ? <button
              type="button"
              title={"Add Questions"}
              className="ml-2 btn btn-primary footable-delete"
              onClick={(evt) => setTestToLocalstorage(evt, row.original)}
            >
              <span
                className="fas fa-plus"
                aria-hidden="true"
              ></span>
            </button> : <button
              type="button"
              title={"Permission Required"}
              className="ml-2 btn btn-primary"
              disabled
            >
              <span
                className="fas fa-plus"
                aria-hidden="true"
              ></span>
            </button>}

            {/* Show Details Button */}
            {state && state.onlineTest.showSingleTestDetails ? <Link
              title={"Show Details"}
              className="btn btn-warning footable-edit ml-2"
              to={`/staff/onlineTestDetails/${row.original._id}`}
            >
              <span
                className="fas fa-eye"
                aria-hidden="true"
              ></span>
            </Link> : <Link
              title={"Permission Required"}
              className="btn btn-warning footable-edit ml-2"
              to={`#`}
            >
              <span
                className="fas fa-eye"
                aria-hidden="true"
              ></span>
            </Link>}

            {/* Delete Button */}
            {state && state.onlineTest.deleteTest ?
              <button
                type="button"
                title={"Delete"}
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
                title={"Permission Required"}
                className="ml-2 btn btn-danger footable-delete"
                disabled
              >
                <span
                  className="fas fa-trash-alt"
                  aria-hidden="true"
                ></span>
              </button>}
          </div>
        )
      })
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allOnlineTest, [allOnlineTest]);
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
    <div className="page-wrapper">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Manage Online Test</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">onlineTest</li>
            </ol>
          </div>
        </div>

        {/* End Bread crumb and right sidebar toggle */}
        <div className={"row page-titles shadow-none p-0"} style={{ background: "none" }}>
          <div className={"col-md-12 px-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: {" "} </h4>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                  {/* <!-- Button trigger modal --> */}
                  {state && state.onlineTest.addTest ? <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    <span className={"fas fa-plus"}></span> online test
                  </button> : <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    disabled
                    title={"Permission Required"}
                  >
                    <span className={"fas fa-plus"}></span> online test
                  </button>}
                </div>
              </div>
            </div>

            {/* Data */}
            {isallOnlineTestLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allOnlineTest.length ? (
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
                  <h4>Create Online Test</h4>
                  <div className="devider"></div>
                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Online Test Name Here */}
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
                        placeholder={"Enter name (Eg: Optics Test)"}
                      />
                    </div>

                    {/* Total Questions */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            total_questions: evt.target.value,
                          })
                        }
                        value={addingFormData.total_questions}
                        className="form-control"
                        placeholder={"Enter Total Question"}
                      />
                    </div>

                    {/* Select Questions Types */}
                    <div className={"form-group"}>
                      <select
                        className="form-control"
                        onChange={(evt) => setAddingFormData({ ...addingFormData, question_type: evt.target.value })}
                      >

                        <option value={""} disabled selected hidden> Available Question Type </option>
                        <option value={"Objective"}> Objective </option>

                      </select>
                    </div>

                    {/* Total Marks */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            total_marks: evt.target.value,
                          })
                        }
                        value={addingFormData.total_marks}
                        className="form-control"
                        placeholder={"Enter Total Marks"}
                      />
                    </div>

                    {/* Test Start Date */}
                    <div className={"form-group mb-3"}>
                      <input
                        type={"datetime-local"}
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            start_date: evt.target.value
                          })
                        }
                        value={addingFormData.start_date}
                        className="form-control"
                      />
                    </div>

                    {/* Test End Date */}
                    <div className={"form-group mb-3"}>
                      <input
                        type={"datetime-local"}
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            end_date: evt.target.value
                          })
                        }
                        value={addingFormData.end_date}
                        className="form-control"
                      />
                    </div>

                    {/* Test Duration */}
                    <div className={"form-group mb-3"}>
                      <input
                        type={"number"}
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            duration: evt.target.value,
                          })
                        }
                        value={addingFormData.duration}
                        className="form-control"
                        placeholder={"Duration in Minutes"}
                      />
                    </div>

                    {/* Select Standard */}
                    <div className={"form-group"}>
                      <select
                        className="form-control"
                        onChange={(evt) => getCourseType(evt, "addForm")}
                      >

                        <option value={""} disabled selected hidden> Available Standard </option>
                        {allStandard.map((value, index) => {
                          return (
                            <option key={index} value={value._id}> {value.name} </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Select CourseType */}
                    <div className={"form-group"}>
                      <select
                        className="form-control"
                        onChange={(evt) => getBatches(evt, "addForm")}
                      >

                        <option value={""} disabled selected hidden> Available CourseType </option>
                        {allCourseType.map((value, index) => {
                          return (
                            <option key={index} value={value._id}> {value.name} </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Select Batches */}
                    <div className={" row"}>
                      <div className={"col-6 form-group"}>
                        <select
                          className="form-select block" multiple aria-label="multiple select example"
                          onChange={(evt) => batchSelectHandler(evt, "add")}
                        >
                          <option value={""} disabled selected hidden> Available Batches </option>
                          {allBatch.map((value, index) => {
                            return (
                              <option key={index} value={JSON.stringify({ batch: value._id, name: value.name })}> {value.name} </option>
                            )
                          })}
                        </select>
                      </div>
                      <div className={"col-6"}>
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
                  <h4>Update Test Details</h4>
                  <div className="devider"></div>
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >

                    {/* Online Test Name Here */}
                    <div className={"form-group mb-3"}>
                      <label htmlFor="" className="text-info h6">Test Title</label>
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
                        placeholder={"Enter name (Eg: Optics Test)"}
                      />
                    </div>

                    {/* Total Questions */}
                    <div className={"form-group mb-3"}>
                      <label htmlFor="" className="text-info h6">Total Question</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            total_questions: evt.target.value,
                          })
                        }
                        value={data.total_questions}
                        className="form-control"
                        placeholder={"Enter Total Question"}
                      />
                    </div>

                    {/* Select Questions Types */}
                    <div className={"form-group"}>
                      <label htmlFor="" className="text-info h6">Available Question Type</label>
                      <select
                        className="form-control"
                        value={data.question_type}
                        onChange={(evt) => setData({ ...data, question_type: evt.target.value })}
                      >

                        <option value={""} disabled selected hidden> Available Question Type </option>
                        <option value={"Objective"}> Objective </option>

                      </select>
                    </div>

                    {/* Total Marks */}
                    <div className={"form-group mb-3"}>
                      <label htmlFor="" className="text-info h6">Total Marks</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({
                            ...data,
                            total_marks: evt.target.value,
                          })
                        }
                        value={data.total_marks}
                        className="form-control"
                        placeholder={"Enter Total Marks"}
                      />
                    </div>

                    {/* Test Start Date */}
                    <div className={"form-group mb-3"}>
                      <label htmlFor="" className="text-info h6">Test Date</label>
                      <input
                        type={"datetime-local"}
                        onChange={(evt) =>
                          setData({
                            ...data,
                            start_date: evt.target.value
                          })
                        }
                        value={data.start_date}
                        className="form-control"
                      />
                    </div>

                    {/* Test End Date */}
                    <div className={"form-group mb-3"}>
                      <label htmlFor="" className="text-info h6">End Date</label>
                      <input
                        type={"datetime-local"}
                        onChange={(evt) =>
                          setData({
                            ...data,
                            end_date: evt.target.value
                          })
                        }
                        value={data.end_date}
                        className="form-control"
                      />
                    </div>

                    {/* Test Duration */}
                    <div className={"form-group mb-3"}>
                      {/* Test Duration */}
                      <label htmlFor="" className="text-info h6">Test Duration</label>
                      <input
                        type={"number"}
                        onChange={(evt) =>
                          setData({
                            ...data,
                            duration: evt.target.value,
                          })
                        }
                        value={data.duration}
                        className="form-control"
                        placeholder={"Duration in Minutes"}
                      />
                    </div>

                    {/* Select Standard */}
                    <div className={"form-group"}>
                      <label htmlFor="" className="text-info h6">Select Standard</label>
                      <select
                        className="form-control"
                        onChange={(evt) => getCourseType(evt, "updateForm")}
                      >

                        <option value={""} disabled selected hidden> Available Standard </option>
                        {allStandard.map((value, index) => {
                          return (
                            <option key={index} value={value._id}> {value.name} </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Select CourseType */}
                    <div className={"form-group"}>
                      <label htmlFor="" className="text-info h6">Availabe CourseType</label>
                      <select
                        className="form-control"
                        onChange={(evt) => getBatches(evt, "updateForm")}
                      >

                        <option value={""} disabled selected hidden> Select CourseType </option>
                        {allCourseType.map((value, index) => {
                          return (
                            <option key={index} value={value._id}> {value.name} </option>
                          )
                        })}
                      </select>
                    </div>

                    {/* Select Batches */}
                    <div className={" row"}>
                      <div className={"col-6 form-group"}>
                        <label htmlFor="" className="text-info h6">Select Batch</label>
                        <select
                          className="form-select block" multiple aria-label="multiple select example"
                          onChange={(evt) => batchSelectHandler(evt, "add")}
                        >
                          <option value={""} disabled selected hidden> Available Batches </option>
                          {allBatch.map((value, index) => {
                            return (
                              <option key={index} value={JSON.stringify({ batch: value._id, name: value.name })}> {value.name} </option>
                            )
                          })}
                        </select>
                      </div>
                      <div className={"col-6"}>
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

                    {/* Select Status */}
                    <div className={"form-group"}>
                      <label htmlFor="" className="text-info h6">Test Status</label>
                      <select
                        className="form-control"
                        onChange={(evt) => setData({ ...data, status: evt.target.value })}
                        value={data.status}
                      >

                        <option value={""} disabled selected hidden> Select Status </option>
                        <option value={"false"}> Disable </option>
                        <option value={"true"}> Active </option>

                      </select>
                    </div>


                    {/* Comments */}
                    <div className={"form-group mb-3"}>
                      <label htmlFor="" className="text-info h6">Comments</label>
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

export default OnlineTest;
