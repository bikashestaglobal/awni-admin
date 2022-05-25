import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Config from "../../config/Config";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import { storage } from "../../../firebase/FirebaseConfig";
import uniqid from 'uniqid';
import { StaffContext } from '../StaffRoutes';


// var uniqid = require('uniqid');
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const Questions = React.memo((props) => {
  const { state, dispatch } = useContext(StaffContext);
  const history = useHistory();
  const [addingFormData, setAddingFormData] = useState({
    question_image: "",
    question: "",
    answer: "",
    question_type: "Objective",
    marks: "",
    standard: "",
    course_type: "",
    chapter: "",
    comment: "",
  });
  const [option1, setOption1] = useState({ value: "a" });
  const [option2, setOption2] = useState({ value: "b" });
  const [option3, setOption3] = useState({ value: "c" });
  const [option4, setOption4] = useState({ value: "d" });
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "");
  const [allStandard, setAllStandard] = useState([]);
  const [allCourseType, setAllCourseType] = useState([]);
  const [allChapter, setAllChapter] = useState([]);
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  // const [isallQuestionLoaded, setIsallQuestionLoaded] = useState(true);
  const [allQuestion, setAllQuestion] = useState([]);
  const [data, setData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [progress, setProgress] = useState(0);
  // Update the state while clicking the edit button
  const updateState = (list) => {
    setData({ ...list });
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();
    fetch(Config.SERVER_URL + "/staff/updateQuestionType", {
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
    const questionData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL + "/staff/deleteQuestion", {
      method: "DELETE",
      body: JSON.stringify(questionData),
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

    fetch(Config.SERVER_URL + "/staff/addQuestion", {
      method: "POST",
      body: JSON.stringify({ ...addingFormData, session: selectedSession, options: [option1, option2, option3, option4] }),
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
              title: "",
              marks: "",
              standard: "",
              comment: "",
            });
          } else {
            if (result.question)
              M.toast({ html: result.question, classes: "bg-danger" });
            if (result.answer)
              M.toast({ html: result.answer, classes: "bg-danger" });
            if (result.question_type)
              M.toast({ html: result.question_type, classes: "bg-danger" });
            if (result.marks)
              M.toast({ html: result.marks, classes: "bg-danger" });
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });
            if (result.course_type)
              M.toast({ html: result.course_type, classes: "bg-danger" });
            if (result.chapter)
              M.toast({ html: result.chapter, classes: "bg-danger" });
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
    // setIsallQuestionLoaded(true);
    fetch(Config.SERVER_URL + "/staff/searchQuestion?session=" + selectedSession, {
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
            setAllQuestion(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          // setIsallQuestionLoaded(false);
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

    // Get All Course Type
    fetch(Config.SERVER_URL + "/staff/searchCourseType?session=" + selectedSession, {
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
            setAllCourseType(result.data || []);
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

    // Get All Chapter
    fetch(Config.SERVER_URL + "/staff/searchChapter?session=" + selectedSession, {
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
            setAllChapter(result.data || []);
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


  function renameFile(originalFile) {
    const newName = uniqid() + originalFile.name;
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  // For Image
  const imgChangeHandler = (e, name) => {
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      handleUpload(renameFile(e.target.files[0]), name);
    }
  };

  // Clear selected image
  const clearSelectedImage = (id) => {
    $(id).val("");
  }

  // Upload Image
  const handleUpload = (image, name) => {
    const metadata = {
      contentType: 'image/jpeg'
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image, metadata);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
        M.toast({ html: "Error occured, Image not uploaded" })
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            if (name == "question_image") setAddingFormData({ ...addingFormData, question_image: url });
            if (name == "option1") setOption1({ ...option1, image: url });
            if (name == "option2") setOption2({ ...option2, image: url });
            if (name == "option3") setOption3({ ...option3, image: url });
            if (name == "option4") setOption4({ ...option4, image: url });
            // setCategory({ ...category, category_image: url })
          });
      }
    );
  };

  // Create Column for Table
  const COLUMNS = [
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

            {/* update button */}
            {state && state.onlineTest.updateQuestion ? <button
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

            {/* show button */}
            {state && state.onlineTest.showSingleQuestionDetails ?
              <button
                type="button"
                className="ml-2 btn btn-primary footable-edit"
                data-toggle="modal"
                data-target="#viewModal"
                onClick={() => updateState(row.original)}
              >
                <span
                  className="fas fa-eye"
                  aria-hidden="true"
                ></span>
              </button> : <button
                type="button"
                className="ml-2 btn btn-primary footable-edit"
                disabled
                title={"Permission Required"}
              >
                <span
                  className="fas fa-eye"
                  aria-hidden="true"
                ></span>
              </button>}

            {/* delete button */}
            {state && state.onlineTest.deleteQuestion ?
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
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: {" "} </h4>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                  {/* <!-- Button trigger modal --> */}
                  {state && state.onlineTest.addQuestion ?
                    <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      data-toggle="modal"
                      data-target="#addModal"
                    >
                      <span className={"fas fa-plus"}></span> question
                    </button> : <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      disabled
                      title={"Permission Required"}
                    >
                      <span className={"fas fa-plus"}></span> question
                    </button>}
                </div>
              </div>
            </div>

            {/* Data */}
            {/* {!isallQuestionLoaded ? ( */}
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
            {/* ) : (
              <div className={"bg-white p-3 text-center"}>
                <span
                  className="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading..
              </div>
            )} */}
          </div>
        </div>

        {/* -- Modal Designing -- */}
        <div>
          {/* -- Add Modal -- */}
          <div className="modal fade" id="addModal">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content rounded-0">
                <div className={"modal-header"}>
                  <h4 className={"float-left"}>Add Question</h4>
                  <select className={"float-right p-1"}>
                    <option>Objective</option>
                  </select>
                </div>
                {/* Image Upload Progressbar */}
                {
                  progress ? <div className="progress border-none">
                    <div className="progress-bar bg-success" style={{ width: `${progress}%`, height: "15px" }} role="progressbar"> {progress}% </div>
                  </div> : ""
                }
                <div className="modal-body">

                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Question Title */}
                    <div className={"row"}>
                      {/* Title Here */}
                      <div className={"col-md-8"}>
                        {/* Question */}
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                question: evt.target.value,
                              })
                            }
                            value={addingFormData.question}
                            className="form-control"
                            placeholder={"Question Here!"}
                          />
                        </div>
                      </div>

                      {/* Title Image Here */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <input type="file" id={"qes"} name="" className="form-control" onChange={(evt) => imgChangeHandler(evt, "question_image")} />
                        </div>
                      </div>
                      <button type={"button"} className={"btn btn-danger"} style={{ position: "absolute", right: 0, zIndex: 5 }} onClick={() => clearSelectedImage("#qes")}>X</button>
                    </div>

                    {/* Options-1 */}
                    <div className={"row"}>
                      {/* Option-1 */}
                      <div className={"col-md-8"}>
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setOption1({
                                ...option1,
                                title: evt.target.value,
                              })
                            }
                            value={option1.title}
                            className="form-control"
                            placeholder={"Option 1"}
                          />
                        </div>
                      </div>

                      {/* Option-1 Image Here */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <input
                            type="file"
                            id={"opt1"}
                            onChange={(evt) => imgChangeHandler(evt, "option1")}
                            className="form-control"
                            placeholder={"Enter title (Eg: Objective)"}
                          />
                        </div>

                      </div>
                      <button type={"button"} className={"btn btn-danger"} style={{ position: "absolute", right: 0, zIndex: 5 }} onClick={() => clearSelectedImage("#opt1")}>X</button>
                    </div>

                    {/* Options-2 */}
                    <div className={"row"}>
                      {/* Option-2 */}
                      <div className={"col-md-8"}>
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setOption2({
                                ...option2,
                                title: evt.target.value,
                              })
                            }
                            value={option2.title}
                            className="form-control"
                            placeholder={"Option 2"}
                          />
                        </div>
                      </div>

                      {/* Option-2 Image Here */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <input
                            type="file"
                            id={"opt2"}
                            onChange={(evt) => imgChangeHandler(evt, "option2")}
                            className="form-control"
                            placeholder={"Enter title (Eg: Objective)"}
                          />
                        </div>
                      </div>
                      <button type={"button"} className={"btn btn-danger"} style={{ position: "absolute", right: 0, zIndex: 5 }} onClick={() => clearSelectedImage("#opt2")}>X</button>
                    </div>

                    {/* Options-3 */}
                    <div className={"row"}>
                      {/* Option-3 */}
                      <div className={"col-md-8"}>
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setOption3({
                                ...option3,
                                title: evt.target.value,
                              })
                            }
                            value={option3.title}
                            className="form-control"
                            placeholder={"Option 3"}
                          />
                        </div>
                      </div>

                      {/* Option-3 Image Here */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <input
                            type="file"
                            id={"opt3"}
                            onChange={(evt) => imgChangeHandler(evt, "option3")}
                            className="form-control"
                            placeholder={"Enter title (Eg: Objective)"}
                          />
                        </div>
                      </div>
                      <button type={"button"} className={"btn btn-danger"} style={{ position: "absolute", right: 0, zIndex: 5 }} onClick={() => clearSelectedImage("#opt3")}>X</button>
                    </div>

                    {/* Options-4 */}
                    <div className={"row"}>
                      {/* Option-4 */}
                      <div className={"col-md-8"}>
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setOption4({
                                ...option4,
                                title: evt.target.value,
                              })
                            }
                            value={option4.title}
                            className="form-control"
                            placeholder={"Option 4"}
                          />
                        </div>
                      </div>

                      {/* Option-4 Image Here */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <input
                            type="file"
                            id={"opt4"}
                            onChange={(evt) => imgChangeHandler(evt, "option4")}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <button type={"button"} className={"btn btn-danger"} style={{ position: "absolute", right: 0, zIndex: 5 }} onClick={() => clearSelectedImage("#opt4")}>X</button>
                    </div>

                    {/* Right answer & Marks */}
                    <div className={"row"}>
                      <div className={"col-md-6"}>
                        {/* Right Answer */}
                        <div className={"form-group mb-3"}>
                          <select className={"form-control"}
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                answer: evt.target.value,
                              })
                            }>
                            <option value={""} disabled hidden selected> Select Answer </option>
                            <option value={"a"}>a</option>
                            <option value={"b"}>b</option>
                            <option value={"c"}>c</option>
                            <option value={"d"}>d</option>
                          </select>
                        </div>
                      </div>
                      <div className={"col-md-6"}>
                        {/* Marks */}
                        <div className={"form-group mb-3"}>
                          <input
                            type="number"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                marks: evt.target.value,
                              })
                            }
                            value={addingFormData.marks}
                            className="form-control"
                            placeholder={"Enter Marks (Eg: 1)"}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Standard & Course Type */}
                    <div className={"row"}>
                      {/* Select Standard */}
                      <div className={"col-md-6"}>
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            onChange={(evt) => setAddingFormData({ ...addingFormData, standard: evt.target.value })}
                          >

                            <option value={""} disabled selected hidden> Available Standard </option>
                            {allStandard.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.name} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Course Type */}
                      <div className={"col-md-6"}>
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            onChange={(evt) => setAddingFormData({ ...addingFormData, course_type: evt.target.value })}
                          >

                            <option value={""} disabled selected hidden> Available Course Type </option>
                            {allCourseType.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.name} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Chapters & Comments */}
                    <div className={"row"}>
                      {/* Select Chapters */}
                      <div className={"col-md-6"}>
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            onChange={(evt) => setAddingFormData({ ...addingFormData, chapter: evt.target.value })}
                          >
                            <option value={""} disabled selected hidden> Available Chapter </option>
                            {allChapter.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.title} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Course Type */}
                      <div className={"col-md-6"}>
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
                      </div>
                    </div>

                    {/* Button */}
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
                  <h4>Update Question Type</h4>
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Title Here */}
                    <div className={"form-group my-3"}>
                      <label className={"text-success"}>Title Here</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({ ...data, title: evt.target.value })
                        }
                        className="form-control border"
                        value={data.title}
                        placeholder={"Enter Title (Eg: Objective)"}
                      />
                    </div>

                    {/* Marks Here */}
                    <div className={"form-group my-3"}>
                      <label className={"text-success"}>Marks Here</label>
                      <input
                        type="number"
                        onChange={(evt) =>
                          setData({ ...data, marks: evt.target.value })
                        }
                        className="form-control border"
                        value={data.marks}
                        placeholder={"Enter Marks (Eg: 1)"}
                      />
                    </div>

                    {/* Select Standard */}
                    <div className={"form-group"}>

                      <select
                        className="form-control"
                        onChange={(evt) => setData({ ...data, standard: evt.target.value })}
                      >

                        <option value={""} disabled selected hidden> Available Standard </option>
                        {allStandard.map((value, index) => {
                          return (
                            <option key={index} value={value._id}> {value.name} </option>
                          )
                        })}
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
                        onChange={(evt) =>
                          setData({ ...data, status: evt.target.value })
                        }
                      >
                        <option value={""}> Select Status </option>
                        <option
                          value={true}
                          selected={data.status ? "selected" : ""}
                        >
                          Active
                        </option>
                        <option
                          value={false}
                          selected={data.status ? "" : "selected"}
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

export default Questions;
