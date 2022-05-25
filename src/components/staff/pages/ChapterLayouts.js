import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Config from "../../config/Config";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import { storage } from "../../../firebase/FirebaseConfig";
import uniqid from 'uniqid';
import { StaffContext } from '../StaffRoutes'

// var uniqid = require('uniqid');
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const ChapterLayouts = React.memo((props) => {
  const { state, dispatch } = useContext(StaffContext);
  const history = useHistory();
  const [addingFormData, setAddingFormData] = useState({
    session: "",
    standard: "",
    course_type: "",
    chapter: "",
    batches: [],
    name: "",
    comment: "",
    file: "",
  });

  const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "");
  const [allStandard, setAllStandard] = useState([]);
  const [allCourseType, setAllCourseType] = useState([]);
  const [allChapter, setAllChapter] = useState([]);
  const [allBatch, setAllBatch] = useState([]);
  const [selectBatch, setSelectBatch] = useState([]);
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  // const [isallChapterLayoutsLoaded, setIsallChapterLayoutsLoaded] = useState(true);
  const [allChapterLayouts, setAllChapterLayouts] = useState([]);
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
  const deleteSubmitHandler = async () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false);

    // First Delete the file from the firebase
    if (await handleDelete(deleteId.file)) {
      M.toast({ html: "File deleted", classes: "bg-success" });
    }
    else {
      M.toast({ html: "File deleted", classes: "bg-danger" })
    }

    const chapterLayoutData = {
      _id: deleteId._id
    };

    fetch(Config.SERVER_URL + "/staff/deleteChapterLayout", {
      method: "DELETE",
      body: JSON.stringify(chapterLayoutData),
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

    fetch(Config.SERVER_URL + "/staff/addChapterLayout", {
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
            // Clear selected file
            clearSelectedFile("#file");
            // Set form to empty
            setAddingFormData({
              session: "",
              standard: "",
              course_type: "",
              chapter: "",
              batches: [],
              name: "",
              comment: "",
              file: "",
            });
          } else {
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });
            if (result.course_type)
              M.toast({ html: result.course_type, classes: "bg-danger" });
            if (result.chapter)
              M.toast({ html: result.chapter, classes: "bg-danger" });
            if (result.batches)
              M.toast({ html: result.batches, classes: "bg-danger" });
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.file)
              M.toast({ html: result.file, classes: "bg-danger" });
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
    // setIsallChapterLayoutsLoaded(true);
    fetch(Config.SERVER_URL + "/staff/searchChapterLayout?session=" + selectedSession, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // setIsallChapterLayoutsLoaded(false);
          if (result.success) {
            setAllChapterLayouts(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          // setIsallChapterLayoutsLoaded(false);
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

  function renameFile(originalFile) {
    const newName = uniqid() + originalFile.name;
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  // Get course Type
  const getCourseType = (evt) => {
    // set allChapters to empty array
    setAllChapter([]);

    // set standard
    setAddingFormData({
      ...addingFormData,
      standard: evt.target.value,
    });

    setData({
      ...data,
      standard: evt.target.value,
    });
    // Get All CourseType
    fetch(
      Config.SERVER_URL +
      "/staff/searchCourseType?session=" +
      selectedSession +
      "&standard=" +
      evt.target.value,
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

  // Get Chapters
  const getChapters = (evt) => {
    // set standard
    setAddingFormData({
      ...addingFormData,
      course_type: evt.target.value,
    });

    // Get Batches
    getBatches(addingFormData.standard, evt.target.value);

    setData({
      ...data,
      chapter: evt.target.value,
    });

    // Get All Chapter
    fetch(Config.SERVER_URL + "/staff/searchChapter?session=" + selectedSession + "&course_type=" +
      evt.target.value, {
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
  };

  // Get Batches
  const getBatches = (std, cType) => {
    // Get All Batch
    fetch(Config.SERVER_URL + "/staff/searchBatch?session=" + selectedSession + "&standard=" + std + "&course_type=" + cType, {
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
            setAllBatch(result.data || []);
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
  };

  // For Image
  const fileChangeHandler = (e, name) => {
    if (e.target.files[0]) {
      handleUpload(renameFile(e.target.files[0]), name);
    }
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

  // Clear selected File
  const clearSelectedFile = async (id, action) => {
    if (action == "delete") {
      let res = await handleDelete(addingFormData.file);
      if (res) {
        setAddingFormData({ ...addingFormData, file: "" });
        M.toast({ html: "File Deleted", classes: "bg-success" });
      }
    }
    $(id).val("");
  }

  // Delete File from firebase
  const handleDelete = (fileUrl) => {
    // Create a reference to the file to delete
    const desertRef = storage.refFromURL(fileUrl);
    // const desertRef = storageRef.child(fileUrl);

    // Delete the file
    return new Promise(function (resolve, reject) {
      desertRef.delete().then(() => {
        // File deleted successfully
        setProgress(0);
        resolve(true)
      }).catch((error) => {
        // Uh-oh, an error occurred!
        resolve(false)
      });
    });
  }

  // Upload File
  const handleUpload = (file, name) => {
    // const metadata = {
    //   contentType: 'image/jpeg'
    // }
    // const uploadTask = storage.ref(`files/${file.name}`).put(file, metadata);
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
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
        M.toast({ html: "Error occured, Files not uploaded" })
      },
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            if (name == "file") setAddingFormData({ ...addingFormData, file: url });
          });
      }
    );
  };

  // Create Column for Table
  const COLUMNS = [
    {
      Header: "NAME",
      accessor: "name",
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
      Header: "CHAPTER",
      accessor: "chapter.title",
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

            {/* Update Button */}
            {state && state.classRoomAsset.updateChapterLayout ? <button
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
            {state && state.classRoomAsset.showSingleChapterLayout ? <button
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

            {/* Delete Button */}
            {state && state.classRoomAsset.deleteChapterLayout ? <button
              type="button"
              className="ml-2 btn btn-danger footable-delete"
              data-toggle="modal"
              data-target="#deleteModal"
              onClick={(evt) => setDeleteId(row.original)}
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
  const rows_data = useMemo(() => allChapterLayouts, [allChapterLayouts]);
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
            <h3 className="text-themecolor m-b-0 m-t-0">Chapter Layouts</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">chapterLayouts</li>
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
                  {state && state.classRoomAsset.addChapterLayout ?
                    <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      data-toggle="modal"
                      data-target="#addModal"
                    >
                      <span className={"fas fa-plus"}></span> files
                    </button> : <button
                      type="button"
                      className="btn btn-info float-right rounded-0"
                      disabled
                      title={"Permission Required"}
                    >
                      <span className={"fas fa-plus"}></span> files
                    </button>}
                </div>
              </div>
            </div>

            {/* Data */}
            {/* {!isallChapterLayoutsLoaded ? ( */}
            <div className="card border-0 rounded-0 m-0 py-1">
              {allChapterLayouts.length ? (
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
                  <h4 className={"float-left"}>Add Chapter Layouts</h4>
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
                    {/* Chapter Layout Title */}
                    <div className={"row"}>
                      {/* Title Here */}
                      <div className={"col-md-12"}>
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
                            placeholder={"Chapter Layout Name"}
                          />
                        </div>
                      </div>

                      {/* File Here */}
                      <div className={"col-md-12"} style={{ position: "relative" }}>
                        <div className={"form-group mb-3"}>
                          <input type="file" id={"file"} name="" className="form-control" onChange={(evt) => fileChangeHandler(evt, "file")} />
                        </div>
                        <button type={"button"} className={"btn btn-danger"} style={{ position: "absolute", right: 0, top: 0, zIndex: 5 }} onClick={() => clearSelectedFile("#file", "delete")}>X</button>
                      </div>
                    </div>


                    {/* Standard & Course Type */}
                    <div className={"row"}>
                      {/* Select Standard */}
                      <div className={"col-md-6"}>
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            onChange={(evt) => getCourseType(evt)}
                          // onChange={(evt)=>setAddingFormData({...addingFormData, standard: evt.target.value})}
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
                            onChange={(evt) => getChapters(evt)}
                          // onChange={(evt)=>setAddingFormData({...addingFormData, course_type: evt.target.value})}
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

                      {/* Comments */}
                      <div className={"col-md-6"}>
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
                  <h4 className={"float-left"}>View Chapter Layout</h4>
                </div>
                <div className="modal-body">
                  {/* Information */}
                  <div className={"row"}>
                    <div className={"col-md-12 table-responsive px-0"}>
                      <h4 className={"text-info px-2"}>File Information</h4>
                      <table className={"table table-border table-striped"}>
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <th>{data.name ? data.name : "N/A"}</th>
                            <th>Batches</th>
                            <th>{data.batches ? data.batches.map((value, index) => {
                              return (
                                <span key={index} className={"badge badge-info mr-1"}> {value.batch.name} </span>
                              )
                            }) : "N/A"}</th>
                          </tr>
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
                    <div className={"col-md-12 mt-1"}>
                      {data.file ? data.file.match(/\.(jpeg|jpg|gif|png)$/) ? <img /> : <iframe src={data.file ? data.file : ""} style={{ width: "100%", height: "400px" }}></iframe> : ""}

                    </div>
                    <div className={"form-group col-md-12"}>
                      <button
                        className="btn btn-secondary rounded-0 px-3"
                        data-dismiss="modal"
                        id={"closeViewModalButton"}
                      >
                        Close
                      </button>
                      <a href={data.file ? data.file : ""} target="_blank" className={"btn btn-info rounded-0 px-3 ml-2"} download > Download </a>
                    </div>
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

export default ChapterLayouts;
