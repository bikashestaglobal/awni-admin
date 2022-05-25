import React, { useState, useEffect, useMemo, useContext } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory } from "react-router-dom";
import Config from "../../config/Config";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { format } from 'date-fns';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { storage } from "../../../firebase/FirebaseConfig";
import uniqid from 'uniqid';
import ReactHtmlParser from 'react-html-parser';
import { StaffContext } from '../StaffRoutes'

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const Video = React.memo((props) => {
  const { state, dispatch } = useContext(StaffContext);
  const history = useHistory();
  const [addingFormData, setAddingFormData] = useState({
    name: "",
    source: "",
    video_link: "",
    type: "",
    standard: "",
    course_type: "",
    chapter: "",
    notes_file: "",
    notes_link: "",
    comment: "",
    description: "",
  });
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "");
  const [allStandard, setAllStandard] = useState([]);
  const [allCourseType, setAllCourseType] = useState([]);
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllAllVideoLoaded, setAllVideoLoaded] = useState(true);
  const [allChapters, setAllChapters] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [selectBatch, setSelectBatch] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [data, setData] = useState({});
  const [showData, setShowData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [updateDescription, setUpdateDescription] = useState("");

  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState({ _id: "", notes_file: "" });
  const [progress, setProgress] = useState(0);

  // Update the state while clicking the edit button
  const updateState = (list) => {
    const std = list.standard ? list.standard._id : "";
    const cType = list.course_type ? list.course_type._id : "";
    const chptr = list.chapter ? list.chapter._id : "";

    let btchs = [];
    if (list.batches) {
      list.batches.map(value => {
        btchs.push({ batch: value.batch._id, name: value.batch.name });
      })
    }

    setUpdateData({ ...list, standard: std, course_type: cType, chapter: chptr });
    setSelectBatch(btchs);
    setUpdateDescription(list.description);
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();
    fetch(Config.SERVER_URL + "/staff/updateVideo", {
      method: "PUT",
      body: JSON.stringify({ ...updateData, batches: selectBatch, description: updateDescription }),
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
            if (result.source)
              M.toast({ html: result.source, classes: "bg-danger" });
            if (result.video_link)
              M.toast({ html: result.video_link, classes: "bg-danger" });
            if (result.type)
              M.toast({ html: result.type, classes: "bg-danger" });
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });
            if (result.course_type)
              M.toast({ html: result.course_type, classes: "bg-danger" });
            if (result.chapter)
              M.toast({ html: result.chapter, classes: "bg-danger" });
            if (result.notes_file)
              M.toast({ html: result.notes_file, classes: "bg-danger" });
            if (result.notes_link)
              M.toast({ html: result.notes_link, classes: "bg-danger" });
            if (result.comment)
              M.toast({ html: result.comment, classes: "bg-danger" });
            if (result.description)
              M.toast({ html: result.description, classes: "bg-danger" });
            if (result.batchesc)
              M.toast({ html: result.batchesc, classes: "bg-danger" });
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

  // Delete Submit Handler
  const deleteSubmitHandler = () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false);
    const questionTypeData = {
      _id: deleteId._id,
    };

    // Delete Notes file if available
    if (deleteId.notes_file) {
      handleDelete(deleteId.notes_file);
    }

    fetch(Config.SERVER_URL + "/staff/deleteVideo", {
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

    fetch(Config.SERVER_URL + "/staff/addVideo", {
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
              source: "",
              video_link: "",
              type: "",
              standard: "",
              course_type: "",
              chapter: "",
              notes_file: "",
              notes_link: "",
              comment: "",
              description: "",
            });
            setSelectBatch([]);
            clearSelectedFile("#file", null);
            setProgress(0);
          } else {
            if (result.title)
              M.toast({ html: result.title, classes: "bg-danger" });
            if (result.batches)
              M.toast({ html: result.batches, classes: "bg-danger" });
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });

            if (result.source)
              M.toast({ html: result.source, classes: "bg-danger" });
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
      setUpdateData({ ...updateData, standard: evt.target.value });
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
  const getChapterAndBatches = (evt, fromWhere, course_typeID) => {
    // set course_type
    let course_type = "";
    if (fromWhere == "addForm") {
      setAddingFormData({ ...addingFormData, course_type: evt.target.value });
      course_type = evt.target.value;
    }

    if (fromWhere == "updateForm") {
      setUpdateData({ ...data, course_type: evt.target.value });
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
            setAllBatches(result.data || []);

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


    // Get All Chapters
    fetch(
      Config.SERVER_URL +
      "/staff/searchChapter?session=" +
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
            setAllChapters(result.data || []);

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

  // For Image
  const fileChangeHandler = (e, name) => {
    if (e.target.files[0]) {
      handleUpload(renameFile(e.target.files[0]), name);
    }
  };

  // Rename Files
  function renameFile(originalFile) {
    const newName = uniqid() + originalFile.name;
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  // Clear selected File
  const clearSelectedFile = async (id, action) => {
    if (action == "delete") {
      let res = await handleDelete(addingFormData.notes_file);
      if (res) {
        setAddingFormData({ ...addingFormData, notes_file: "" });
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
        resolve(true)
        console.log(error)
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
            if (name == "notes_file") setAddingFormData({ ...addingFormData, notes_file: url });

            if (name == "update_notes_file") setUpdateData({ ...updateData, notes_file: url });
          });
      }
    );
  };


  // Get Data From Database
  useEffect(() => {
    setAllVideoLoaded(true);
    fetch(Config.SERVER_URL + "/staff/searchVideo?session=" + selectedSession, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setAllVideoLoaded(false);
          if (result.success) {
            setAllVideos(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setAllVideoLoaded(false);
        }
      );

    // Search Chapters
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
          if (result.success) {
            setAllChapters(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );


    // Get Batches
    fetch(Config.SERVER_URL + "/staff/searchBatch?session=" + selectedSession, {
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
            setAllBatches(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
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
          if (result.success) {
            setAllStandard(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            if (result.session) M.toast({ html: result.session, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );

    // Get All CouyseType
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
          if (result.success) {
            setAllCourseType(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            if (result.session) M.toast({ html: result.session, classes: "bg-danger" });
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

  // Create Column for Table
  const COLUMNS = [
    {
      Header: "#SN",
      accessor: "",
      Cell: (row) => {
        return <div>{Number(row.row.id) + 1}</div>;
      },
      disableSortBy: true,
      disableFilters: true,
    },
    {
      Header: "TITLE",
      accessor: "name",
    },
    {
      Header: "SOURCE",
      accessor: "source",
    },
    {
      Header: "TYPE",
      accessor: "type",
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
            {state && state.video.addVideo ? <button
              type="button"
              className="btn btn-info footable-edit"
              data-toggle="modal"
              data-target="#updateModal"
              onClick={() => {
                updateState(row.original, "update");
              }}
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

            {/* view button */}
            {state && state.video.showSingleVideoDetails ?
              <button
                type="button"
                className="ml-2 btn btn-success footable-delete"
                data-toggle="modal"
                data-target="#viewModal"
                onClick={(evt) => setShowData(JSON.parse(JSON.stringify(row.original)))}
              >
                <span
                  className="fas fa-eye"
                  aria-hidden="true"
                ></span>
              </button> : <button
                type="button"
                className="ml-2 btn btn-success footable-delete"
                disabled
                title={"Permission Required"}
              >
                <span
                  className="fas fa-eye"
                  aria-hidden="true"
                ></span>
              </button>}

            {/* Delete Video */}
            {state && state.video.deleteVideo ?
              <button
                type="button"
                className="ml-2 btn btn-danger footable-delete"
                data-toggle="modal"
                data-target="#deleteModal"
                onClick={(evt) => setDeleteId({ _id: row.original._id, notes_file: row.original.notes_file || "" })}
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
  const rows_data = useMemo(() => allVideos, [allVideos]);
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
            <h3 className="text-themecolor m-b-0 m-t-0">Video</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">video</li>
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
                  {state && state.video.addVideo ? <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    data-toggle="modal"
                    data-target="#addModal"
                    onClick={() => setSelectBatch([])}
                  >
                    <span className={"fas fa-plus"}></span> video
                  </button> : <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    disabled
                    title={"Permission Required"}
                  >
                    <span className={"fas fa-plus"}></span> video
                  </button>}
                </div>
              </div>
            </div>

            {/* Data */}
            {!isAllAllVideoLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allVideos.length ? (
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
                <div className="modal-header">
                  <h4 className={"modal-title"}>Add Video</h4>
                  <button type="button" className="btn btn-outline-danger rounded-0 shadow-none" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">

                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >

                    <div className="row">
                      {/* Image Upload Progressbar */}
                      <div className="col-md-12">
                        {
                          progress ? <div className="progress border-none">
                            <div className="progress-bar bg-success" style={{ width: `${progress}%`, height: "15px" }} role="progressbar"> {progress}% </div>
                          </div> : ""
                        }
                      </div>

                      {/* Video Name Here */}
                      <div className="col-md-4">
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
                            placeholder={"Video Title"}
                          />
                        </div>
                      </div>

                      {/* Select Video Website */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={addingFormData.source ? addingFormData.source : ""}
                            onChange={(evt) => setAddingFormData({ ...addingFormData, source: evt.target.value })}
                          >

                            <option value={""} disabled hidden> Available Video Source </option>
                            <option value={"YOUTUBE"}> {"YOUTUBE"} </option>
                            <option value={"DAILYMOTION"}> {"DAILYMOTION"} </option>
                          </select>
                        </div>
                      </div>

                      {/* Video Link Here */}
                      <div className="col-md-4">
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                video_link: evt.target.value,
                              })
                            }
                            value={addingFormData.video_link}
                            className="form-control"
                            placeholder={"Video ID"}
                          />
                        </div>
                      </div>

                      {/* Select Video Type */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={addingFormData.type ? addingFormData.type : ""}
                            onChange={(evt) => setAddingFormData({ ...addingFormData, type: evt.target.value })}
                          >

                            <option value={""} disabled hidden> Available Video Type </option>
                            <option value={"THEORY"}> THEORY </option>
                            <option value={"NUMERICAL"}> NUMERICAL </option>

                          </select>
                        </div>
                      </div>

                      {/* Select Standard */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={addingFormData.standard ? addingFormData.standard : ""}
                            onChange={(evt) => getCourseType(evt, "addForm")}
                          >

                            <option value={""} disabled hidden> Available Standard </option>
                            {allStandard.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.name} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Course Type */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={addingFormData.course_type ? addingFormData.course_type : ""}
                            onChange={(evt) => getChapterAndBatches(evt, "addForm")}
                          >

                            <option value={""} disabled hidden> Available Course Type </option>
                            {allCourseType.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.name} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Chapter */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={addingFormData.chapter ? addingFormData.chapter : ""}
                            onChange={(evt) => setAddingFormData({ ...addingFormData, chapter: evt.target.value })}
                          >

                            <option value={""} disabled hidden> Available Chapters </option>
                            {allChapters.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.title} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Batches */}
                      <div className="col-md-8">
                        <div className={" row"}>
                          <div className={"col-6 form-group"}>
                            <select
                              className="form-select block" multiple aria-label="multiple select example"
                              onChange={(evt) => batchSelectHandler(evt, "add")}
                            >
                              {allBatches.map((value, index) => {
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
                      </div>

                      {/* Notes Files */}
                      <div className={"col-md-4"} style={{ position: "relative" }}>
                        <div className={"form-group mb-3"}>
                          <input type="file" id={"file"} name="" className="form-control" onChange={(evt) => fileChangeHandler(evt, "notes_file")} />
                        </div>
                        <button type={"button"} className={"btn btn-danger"} style={{ position: "absolute", right: 0, top: 0, zIndex: 5 }} onClick={() => clearSelectedFile("#file", "delete")}>X</button>
                      </div>

                      {/* Notes Link */}
                      <div className="col-md-4">
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                notes_link: evt.target.value,
                              })
                            }
                            value={addingFormData.notes_link}
                            className="form-control"
                            placeholder={"Notes Link"}
                          />
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="col-md-4">
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

                      {/* Descriptions */}
                      <div className="col-md-12">
                        <CKEditor
                          editor={ClassicEditor}
                          style={{ height: "100px" }}
                          onChange={(event, editor) => {
                            const val = editor.getData();
                            setAddingFormData({
                              ...addingFormData,
                              description: val,
                            })
                          }}
                          data={addingFormData.description}
                        />
                      </div>

                      {/* Buttons */}
                      <div className="col-md-12 mt-3">
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
                      </div>

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
                <div className="modal-header">
                  <h4 className={"modal-title"}>Update Video</h4>
                  <button type="button" className="btn btn-outline-danger rounded-0 shadow-none" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">

                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >

                    <div className="row">
                      {/* Image Upload Progressbar */}
                      <div className="col-md-12">
                        {
                          progress ? <div className="progress border-none">
                            <div className="progress-bar bg-success" style={{ width: `${progress}%`, height: "15px" }} role="progressbar"> {progress}% </div>
                          </div> : ""
                        }
                      </div>

                      {/* Video Name Here */}
                      <div className="col-md-4">
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setUpdateData({
                                ...updateData,
                                name: evt.target.value,
                              })
                            }
                            value={updateData.name}
                            className="form-control"
                            placeholder={"Video Title"}
                          />
                        </div>
                      </div>

                      {/* Select Video Website */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={updateData.source ? updateData.source : ""}
                            onChange={(evt) => setUpdateData({ ...updateData, source: evt.target.value })}
                          >

                            <option value={""} disabled hidden> Available Video Source </option>
                            <option value={"YOUTUBE"}> {"YOUTUBE"} </option>
                            <option value={"DAILYMOTION"}> {"DAILYMOTION"} </option>
                          </select>
                        </div>
                      </div>

                      {/* Video Link Here */}
                      <div className="col-md-4">
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setUpdateData({
                                ...updateData,
                                video_link: evt.target.value,
                              })
                            }
                            value={updateData.video_link}
                            className="form-control"
                            placeholder={"Video ID"}
                          />
                        </div>
                      </div>

                      {/* Select Video Type */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={updateData.type ? updateData.type : ""}
                            onChange={(evt) => setUpdateData({ ...updateData, type: evt.target.value })}
                          >

                            <option value={""} disabled hidden> Available Video Type </option>
                            <option value={"THEORY"}> THEORY </option>
                            <option value={"NUMERICAL"}> NUMERICAL </option>

                          </select>
                        </div>
                      </div>

                      {/* Select Standard */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={updateData.standard ? updateData.standard : ""}
                            onChange={(evt) => getCourseType(evt, "addForm", "updateForm")}
                          >

                            <option value={""} disabled hidden> Available Standard </option>
                            {allStandard.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.name} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Course Type */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={updateData.course_type ? updateData.course_type : ""}
                            onChange={(evt) => getChapterAndBatches(evt, "addForm", "updateForm")}
                          >

                            <option value={""} disabled hidden> Available Course Type </option>
                            {allCourseType.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.name} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Chapter */}
                      <div className="col-md-4">
                        <div className={"form-group"}>
                          <select
                            className="form-control"
                            value={updateData.chapter ? updateData.chapter : ""}
                            onChange={(evt) => setUpdateData({ ...updateData, chapter: evt.target.value })}
                          >

                            <option value={""} disabled hidden> Available Chapters </option>
                            {allChapters.map((value, index) => {
                              return (
                                <option key={index} value={value._id}> {value.title} </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Batches */}
                      <div className="col-md-8">
                        <div className={" row"}>
                          <div className={"col-6 form-group"}>
                            <select
                              className="form-select block" multiple aria-label="multiple select example"
                              onChange={(evt) => batchSelectHandler(evt, "add")}
                            >
                              {allBatches.map((value, index) => {
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
                      </div>

                      {/* Notes Files */}
                      {updateData.notes_file ? <div className="col-md-12 shadow-sm">
                        <div className="row">
                          <div className="col h6">Available Notes</div>
                          <div className="col">
                            <a href={updateData.notes_file} className={"btn btn-info"} target={"_blank"}>Show</a>
                            <button onClick={() => {
                              handleDelete(updateData.notes_file).then(value => {
                                if (value) {
                                  setUpdateData({ ...updateData, notes_file: "" });
                                  M.toast({ html: "File Deleted Successfully", classes: "bg-success" })
                                }
                              }).catch((error) => console.log(error));
                            }} type={"button"} className={"btn btn-danger"}>Delete</button>
                          </div>
                        </div>
                      </div> : null}
                      <div className={"col-md-4"} style={{ position: "relative" }}>
                        <div className={"form-group mb-3"}>
                          <input type="file" id={"file"} name="" className="form-control" onChange={(evt) => fileChangeHandler(evt, "update_notes_file")} />
                        </div>
                        <button type={"button"} className={"btn btn-danger"} style={{ position: "absolute", right: 0, top: 0, zIndex: 5 }} onClick={() => clearSelectedFile("#file", "delete")}>X</button>


                      </div>

                      {/* Notes Link */}
                      <div className="col-md-4">
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setUpdateData({
                                ...updateData,
                                notes_link: evt.target.value,
                              })
                            }
                            value={updateData.notes_link}
                            className="form-control"
                            placeholder={"Notes Link"}
                          />
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="col-md-4">
                        <div className={"form-group mb-3"}>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setUpdateData({
                                ...updateData,
                                comment: evt.target.value,
                              })
                            }
                            value={updateData.comment}
                            className="form-control"
                            placeholder={"Comments!"}
                          />
                        </div>
                      </div>

                      {/* Descriptions */}
                      <div className="col-md-12">
                        <CKEditor
                          editor={ClassicEditor}
                          style={{ height: "100px" }}
                          onChange={(event, editor) => {
                            const val = editor.getData();
                            setUpdateDescription(val);
                          }}
                          data={updateDescription}
                        />
                      </div>

                      {/* Buttons */}
                      <div className={"form-group px-3 py-2"}>
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

                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>

          {/* -- View Modal -- */}
          <div className="modal fade" id="viewModal">
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-header">
                  <h4 className={"modal-title"}>View Video</h4>
                  <button type="button" className="btn btn-outline-danger rounded-0 shadow-none" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      {/* Play Video */}
                      {showData.source == "YOUTUBE" ? <iframe width={"100%"} height={"315"} src={`https://www.youtube.com/embed/${showData.video_link}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : showData.source == "DAILYMOTION" ? <iframe frameBorder="0" allowFullScreen width="100%" height="315" src={`//www.dailymotion.com/embed/video/${showData.video_link}?ui-logo=0&queue-enable=false&sharing-enable=false&fullscreen=true`}></iframe> : null}
                    </div>

                    <div className="col-md-6">
                      {/* Batches */}
                      <div className={"mb-3"}>
                        <h4>Selected Batches</h4>
                        <div className="devider"></div>
                        {showData.batches ? showData.batches.map((value, index) => {
                          return (
                            <p key={index} className={"badge badge-info"}> {value.batch.name} </p>
                          )
                        }) : ""}
                      </div>

                      {/* Available notes */}
                      <div className="mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
                        <h4>Available Notes</h4>
                        {showData.notes_file ? <a className={"btn btn-info"} target={"_blank"} href={showData.notes_file}> View Notes </a> : 'Not available'}
                      </div>

                      {/* Description */}
                      <div className="">
                        <h4>Descriptions</h4>
                        <div className="devider"></div>
                        {showData.description ? ReactHtmlParser(showData.description) : "Not Available"}
                      </div>
                    </div>
                  </div>

                  <div className={""}>
                    <button
                      className="btn btn-secondary rounded-0 px-3"
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
                    All data that connected with this Video will be
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

export default Video;
