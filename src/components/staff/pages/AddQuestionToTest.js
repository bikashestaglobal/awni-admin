import React, { useState, useEffect, useMemo } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../config/Config";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';

// var uniqid = require('uniqid');
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const AddQuestionToOnlineTest = (props) => {
  const [selectQuestion, setSelectQuestion] = useState(JSON.parse(localStorage.getItem("selectedQuestion")));
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "");
  const [isallQuestionLoaded, setIsallQuestionLoaded] = useState(false);
  const [allQuestion, setAllQuestion] = useState([]);
  const [data, setData] = useState({});
  const [selectedTest, setSelectedTest] = useState(JSON.parse(localStorage.getItem("selectedTestForBranch")) || { name: "" })


  // Update the state while clicking the edit button
  const updateState = (list) => {
    setData({ ...list });
  };

  // selectQuestionHandler
  const selectQuestionHandler = (ques) => {
    let question = JSON.parse(JSON.stringify(ques));
    delete question.chapter;
    delete question.course_type;
    delete question.standard;
    question.questionId = question._id;
    delete question._id;
    delete question.status;
    delete question.session;
    delete question.created_date;
    delete question.branch;
    delete question.comment;
    let selectedQuestion = localStorage.getItem("selectedQuestion") || [];
    if (selectedQuestion.length == 0) {
      selectedQuestion.push(question);
      localStorage.setItem("selectedQuestion", JSON.stringify(selectedQuestion));
    } else {
      selectedQuestion = JSON.parse(selectedQuestion);
      if (selectedQuestion.find(val => val.questionId == question.questionId)) {
        selectedQuestion = selectedQuestion.filter(val => val.questionId != question.questionId);
        localStorage.setItem("selectedQuestion", JSON.stringify(selectedQuestion));
      } else {
        selectedQuestion.push(question);
        localStorage.setItem("selectedQuestion", JSON.stringify(selectedQuestion));
      }
    }
    // Update State
    setSelectQuestion(selectedQuestion);
  }

  // Submit Handler
  const addQuestionsToOnlineTest = (evt) => {
    // setIsUpdated(false);
    // setIsUpdateLaoded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/branch/addQuestionsToOnlineTest", {
      method: "PUT",
      body: JSON.stringify({ questions: selectQuestion, testId: selectedTest._id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //   setIsUpdateLaoded(true);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            // setIsUpdated(true);
            // $("#closeUpdateModalButton").click();
          } else {
            if (result.testId)
              M.toast({ html: result.testId, classes: "bg-danger" });
            if (result.questions)
              M.toast({ html: result.questions, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          //   setIsUpdateLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }

  // Get Data From Database
  useEffect(() => {
    fetch(Config.SERVER_URL + "/branch/searchQuestion?session=" + selectedSession, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsallQuestionLoaded(true);
          if (result.success) {
            setAllQuestion(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsallQuestionLoaded(true);
        }
      );


  }, []);


  // Create Column for Table
  const COLUMNS = [
    {
      Header: "#SN",
      accessor: "",
      Cell: (({ row }) => { return (Number(row.id) + 1) })
    },
    {
      Header: "QUESTION",
      accessor: "question",
    },
    {
      Header: "MARKS",
      accessor: "marks",
    },
    {
      Header: "STANDARD",
      accessor: "standard.name",
    },

    {
      Header: "COURSE-TYPE",
      accessor: "course_type.name",
    },

    {
      Header: "QUES-TYPE",
      accessor: "question_type",
    },

    {
      Header: "ACTION",
      accessor: "",
      disableSortBy: true,
      Cell: row => {
        if (selectQuestion.find(val => val.questionId == row.row.original._id)) {
          $(`#${row.row.original._id}`).attr("checked", "checked");
        } else {
          // checked = false
        }
        return (
          <div>
            <div className="form-check form-check-inline float-left">
              <input
                className="form-check-input"
                type="checkbox"
                id={row.row.original._id}
                value={row.row.original}
                onClick={() => selectQuestionHandler(row.row.original)}
              />
              <label className="form-check-label" htmlFor={row.row.original._id} ></label>
            </div>


            {/* View Modal Button */}
            <button
              type="button"
              className="ml-2 btn btn-primary footable-edit float-right"
              data-toggle="modal"
              data-target="#viewModal"
              onClick={() => updateState(row.row.original)}
            >
              <span
                className="fas fa-eye"
                aria-hidden="true"
              ></span>
            </button>
          </div>

        )
      }
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allQuestion, [allQuestion]);
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
    state,
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
  const { globalFilter } = state;
  // Destructuring the state
  const { pageIndex, pageSize } = state;
  // Return function
  return (
    <div className="page-wrapper">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Question</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">questions</li>
            </ol>
          </div>
        </div>

        {/* End Bread crumb and right sidebar toggle */}
        <div className={"row page-titles shadow-none p-0"} style={{ background: "none" }}>
          <div className={"col-md-12 px-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div className={"row"}>
                  <div className={"col-5"}>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                  </div>
                  <div className={"col-5"}>
                    <h4 className="mt-2 mr-2">Test:
                        <span className={"badge badge-info mr-2"}>{selectedTest.name}</span>
                        Question : <span className={"badge badge-info"}>{selectQuestion.length}</span>
                    </h4>
                  </div>
                  <div className={"col-2 text-right"}>
                    <button onClick={addQuestionsToOnlineTest} className={"btn btn-info border-0 rounded-0"}>Save</button>
                    <button className={"btn btn-info border-0 rounded-0 ml-2"}>Filter</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Data */}
            {isallQuestionLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allQuestion.length ? (
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

          {/* -- View Modal -- */}
          <div className="modal fade" id="viewModal">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content rounded-0">
                <div className={"modal-header"}>
                  <h4 className={"float-left"}>View Question</h4>
                </div>
                <div className="modal-body">
                  {/* Question */}
                  <div className={"row"}>
                    <div className={"col-md-12"}>
                      <h5 className={""}> {`Q) ${data.question}` || "N/A"}  </h5>
                    </div>
                    <div className={"col-md-12"}>
                      {data.question_image ? <img className={"img img-fluid"} src={data.question_image} /> : ""}
                    </div>
                  </div>
                  {/* Options */}
                  <div className={"row px-3"}>
                    {data.options ? data.options.map((value, index) => {
                      return (
                        <div className={"col-md-6"}>
                          <h6> {`${(index + 10).toString(36)}) ${value.title ? value.title : ""}` || "N/A"} </h6>
                          {value.image ? <img className={"img img-fluid"} src={value.image} /> : ""}
                        </div>
                      )
                    }) : ""}
                    <div className={"col-md-12"}>
                      <h6 className={"text-success"}>Right Answer : {data.answer} </h6>
                    </div>
                  </div>
                  {/* Options */}
                  <div className={"row"}>
                    <div className={"col-md-12 mt-3"}>
                      <h5>Other Information</h5>
                      <table className={"table table-border table-striped"}>
                        <tbody>
                          <tr>
                            <th>Standard</th>
                            <th>{data.standard ? data.standard.name : "N/A"}</th>
                            <th>Question Type</th>
                            <th>{data.question_type ? data.question_type : "N/A"}</th>
                          </tr>
                          <tr>
                            <th>Course Type</th>
                            <th>{data.course_type ? data.course_type.name : "N/A"}</th>
                            <th>Chapter</th>
                            <th>{data.chapter ? data.chapter.title : "N/A"}</th>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <th>{data.status ? data.status ? <span className={"badge badge-info"}>Active</span> : <span className={"badge badge-danger"}>Disabled</span> : "N/A"}</th>
                            <th>Created Date</th>
                            <th>{data.created_date ? format(new Date(data.created_date), "dd/MM/yyyy") : "N/A"}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className={"form-group"}>
                    <button
                      className="btn btn-secondary rounded-0 ml-2 px-3"
                      data-dismiss="modal"
                      id={"closeViewModalButton"}
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

export default AddQuestionToOnlineTest;
