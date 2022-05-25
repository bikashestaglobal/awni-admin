import React, { useState, useEffect, useRef, useMemo } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../config/Config";
import { format } from "date-fns";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

import Webcam from 'webcam-easy';

import { storage } from "../../../firebase/FirebaseConfig";
import imageDataURI from 'image-data-uri';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span className={""}>
      <input placeholder={"Query Here!"} className={"py-1 px-3"} value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

//  Component Function
const StudentRegistration = (props) => {
  const componentRef = useRef();
  const [addingFormData, setAddingFormData] = useState({
    // Personal Details
    name: "",
    gender: "",
    dob: "",
    father_name: "",
    mother_name: "",
    father_mobile: "",
    mother_mobile: "",
    student_mobile: "",
    father_email: "",
    student_email: "",
    address: "",
    state: "",
    city: "",
    profile_picture: "",

    // Other Details
    school_college: "",
    board: "",
    university: "",
    standard: "",
    course_type: "",
    batch: "",
    ref_by: "",
    comment: "",
    session: localStorage.getItem("branchSession") || "",
  });

  const [selectedSession, setSelectedSession] = useState(
    localStorage.getItem("branchSession") || ""
  );
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isMakePaymentLaoded, setIsMakePaymentLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [amount, setAmount] = useState('')
  const [isAdded, setIsAdded] = useState(false);
  const [isAllStudentLoaded, setIsAllStudentLoaded] = useState(false);
  const [allBatch, setAllBatch] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState("");



  const [viewData, setViewData] = useState({
    session: {
      standard: {},
      course_type: {},
      batch: {},
      session: {},
    }
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [allStandard, setAllStandard] = useState([]);
  const [allCourseType, setAllCourseType] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  // For Image
  const imgChangeHandler = e => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      handleUpload(e.target.files[0])
    }
  };


  // Upload Image
  const handleUpload = (image) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setImageUrl(url)
            // setCategory({ ...category, category_image: url })
          });
      }
    );
  };


  // Update the state while clicking the View button
  const updateStateForViewData = (list) => {
    const dupList = { ...list }
    // Get Selected Session Data
    dupList.session.forEach(element => {
      if (selectedSession == element.session._id) {
        dupList.session = element;
      }
    });
    console.log(dupList)

    // get paid amount of this session
    dupList.payment = dupList.payment.filter(({ session }) => session == selectedSession);

    // Get all payment amount
    let ttl = 0;
    dupList.payment.forEach(element => {
      ttl += element.amount;
    });


    // set total amount to dupList
    dupList.totalAmount = ttl;
    // console.log(dupList);

    setViewData(dupList);
    setStartTime(timeChangeHandler(dupList.session.batch.start_time));
    setEndTime(timeChangeHandler(dupList.session.batch.end_time));
  };

  // Update the state while clicking the edit button
  const updateState = (list) => {

    let modifyingData = JSON.parse(JSON.stringify(list));
    modifyingData.session.map((val, indx) => {
      if (val.session._id == selectedSession) {
        modifyingData.session = val.session._id;
        modifyingData.batch = val.batch._id;
        modifyingData.course_type = val.course_type._id;
        modifyingData.standard = val.standard._id;
      }
    })
    setData(modifyingData);
  };

  // Update the state while clicking the edit button
  const updateStateForPayment = (list) => {
    setData(list)
  };
  // Change time 24 hour to 12 hour
  const timeChangeHandler = (time) => {
    // var inputEle = document.getElementById(inputElementID);
    // var timeSplit = inputEle.value.split(':'),
    var timeSplit = time.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    return `${hours}:${minutes} ${meridian}`;
  };
  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();

    const stdData = JSON.parse(JSON.stringify(data))
    stdData.session = {
      session: stdData.session,
      course_type: stdData.course_type,
      batch: stdData.batch,
      standard: stdData.standard
    }


    fetch(Config.SERVER_URL + "/branch/updateStudent", {
      method: "PUT",
      body: JSON.stringify(stdData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
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
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
            if (result.gender)
              M.toast({ html: result.gender, classes: "bg-danger" });
            if (result.dob) M.toast({ html: result.dob, classes: "bg-danger" });
            if (result.father_name)
              M.toast({ html: result.father_name, classes: "bg-danger" });
            if (result.mother_name)
              M.toast({ html: result.mother_name, classes: "bg-danger" });
            if (result.student_mobile)
              M.toast({ html: result.student_mobile, classes: "bg-danger" });
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
    const studentData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL + "/branch/deleteStudent", {
      method: "DELETE",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
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
    const studentData = {
      ...addingFormData,
      session: {
        session: addingFormData.session,
        standard: addingFormData.standard,
        course_type: addingFormData.course_type,
        batch: addingFormData.batch,
      },
      profile_picture: imageUrl
    };
    fetch(Config.SERVER_URL + "/branch/addStudent", {
      method: "POST",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
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
            });
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
            if (result.gender)
              M.toast({ html: result.gender, classes: "bg-danger" });
            if (result.dob) M.toast({ html: result.dob, classes: "bg-danger" });
            if (result.father_name)
              M.toast({ html: result.father_name, classes: "bg-danger" });
            if (result.mother_name)
              M.toast({ html: result.mother_name, classes: "bg-danger" });
            if (result.student_mobile)
              M.toast({ html: result.student_mobile, classes: "bg-danger" });
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

  // Make Payment Handler
  const makePaymentHandler = (evt) => {
    setIsUpdated(false)
    setIsMakePaymentLaoded(false);

    evt.preventDefault();
    const studentData = {
      _id: data._id,
      student_mobile: data.student_mobile,
      name: data.name,
      session: selectedSession,
      amount: amount,
      payment_id: null,
      payment_mode: "OFFLINE"
    }

    fetch(Config.SERVER_URL + "/branch/makePayment", {
      method: "POST",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsUpdated(true);
          setIsMakePaymentLaoded(true)
          if (result.success) {
            setAmount("")
            M.toast({ html: result.message, classes: "bg-success" });
            $("#closeMakePaymentModalButton").click();
          } else {
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
            if (result.amount)
              M.toast({ html: result.amount, classes: "bg-danger" });
            if (result.payment_id)
              M.toast({ html: result.payment_id, classes: "bg-danger" });
            if (result.payment_mode)
              M.toast({ html: result.payment_mode, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsUpdated(true);
          setIsMakePaymentLaoded(true)
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }

  // Get course Type
  const getCourseType = (evt) => {
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
      "/branch/searchCourseType?session=" +
      selectedSession +
      "&standard=" +
      evt.target.value,
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
      "/branch/searchBatch?session=" +
      selectedSession +
      "&course_type=" +
      course_type,
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

  var webcamElement;
  var canvasElement;
  var snapSoundElement;
  var webcam;
  var picture;

  // Start WebCam
  const startWebCam = (evt) => {
    webcamElement = document.getElementById('webcam');
    canvasElement = document.getElementById('canvas');
    snapSoundElement = document.getElementById('snapSound');
    webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
    webcam.start()
      .then(result => {
        console.log("webcam started");
      })
      .catch(err => {
        console.log(err);
      });
  }

  const takePicture = (evt) => {
    if (webcam) {
      picture = webcam.snap();
      setPhoto(picture);
      webcam.start();
    }

  }

  const stopWebCam = (evt) => {
    if (webcam) {
      webcam.stop();
    }
  }

  const flipWebCam = (evt) => {
    if (webcam) {
      webcam.flip();
      webcam.start();
    }
  }

  // Get All Batch
  useEffect(() => {
    // Search Batches

    fetch(
      Config.SERVER_URL + "/branch/searchBatch?session=" + selectedSession,
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

          if (result.success) {
            // setAllBatch(result.data || []);
          } else {
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );

    // Get All Standard
    fetch(
      Config.SERVER_URL + "/branch/searchStandard?session=" + selectedSession,
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
          if (result.success) {
            setAllStandard(result.data || []);
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

    // Get All CourseType
    fetch(
      Config.SERVER_URL + "/branch/searchCourseType?session=" + selectedSession,
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
          if (result.success) {
            // setAllCourseType(result.data || []);
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

    // Get All Student
    fetch(
      Config.SERVER_URL + "/branch/searchStudent?session=" + selectedSession,
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
          if (result.success) {
            const filteredData = [];
            result.data.map((value, index) => {
              value.session.map((val, indx) => {
                if (val.session._id == selectedSession) {
                  value.batch = val.batch;
                  value.course_type = val.course_type;
                  value.standard = val.standard;
                }
              })
              filteredData.push(value);
            })
            setAllStudent(filteredData || []);
            setIsAllStudentLoaded(true);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllStudentLoaded(true);
        }
      );

  }, [isAdded, isUpdated, isDeleted]);

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
      Header: "STUDENT NAME",
      accessor: "name",
    },
    {
      Header: "MOBILE",
      accessor: "student_mobile"
    },
    {
      Header: "STANDARD",
      accessor: "session",
      Cell: ({ value }) => {
        return (
          value.map((val, indx) => {
            return (selectedSession == val.session._id ? val.standard.name : "");
          })
        )
      }

    },

    {
      Header: "COURSE TYPE",
      accessor: "course_type.name"
    },

    {
      Header: "BATCH",
      accessor: "batch.name"
    },

    {
      Header: "REG DATE",
      accessor: "created_date",
      Cell: ({ value }) => { return format(new Date(value), "dd/MM/yyyy") }
    },

    {
      Header: "PAYMENT",
      accessor: "payment",
      Cell: ({ value }) => {
        let totalPayment = 0;
        value.forEach(element => {
          if (selectedSession == element.session) totalPayment += element.amount;
        })
        return totalPayment;
      }
    },

    {
      Header: "STATUS",
      // accessor: "status",
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
      Cell: row => {

        return (
          <div>
            {/* Edit Button */}
            <button
              type="button"
              className="btn btn-info p-1"
              data-toggle="modal"
              data-target="#updateModal"
              onClick={() => updateState(row.row.original)}
            >
              <span
                className="fas fa-pencil-alt"
                aria-hidden="true"
              ></span>
            </button>

            {/* View Button */}
            <button
              type="button"
              className="btn btn-success ml-2 p-1"
              data-toggle="modal"
              data-target="#viewModal"
              onClick={() =>
                updateStateForViewData(row.row.original)
              }
            >
              <span
                className="fas fa-eye text-white"
                aria-hidden="true"
              ></span>
            </button>

            {/* Payment Button */}
            <button
              type="button"
              className="ml-2 btn btn-primary p-1"
              data-toggle="modal"
              data-target="#makePaymentModal"
              onClick={(evt) => updateStateForPayment(row.row.original)}
            >
              <span
                className="mdi mdi-currency-inr"
                aria-hidden="true"
              ></span>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              className="ml-2 btn btn-danger p-1"
              data-toggle="modal"
              data-target="#deleteModal"
              onClick={(evt) => setDeleteId(row.row.original._id)}
            >
              <span
                className="fas fa-trash-alt"
                aria-hidden="true"
              ></span>
            </button>

          </div>
        )
      }
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const rows_data = useMemo(() => allStudent, [allStudent]);
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
            <h3 className="text-themecolor m-b-0 m-t-0">
              Student Registration
            </h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">Registration</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        {/* All Data */}
        <div className={"row p-0"}>
          <div className={"col-md-12 p-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: {" "} </h4>
                  <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    <span className={"fas fa-plus"}></span> Registration
                  </button>
                </div>
              </div>
            </div>

            {/* Data */}
            {isAllStudentLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allStudent.length ? (
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
                            [10, 20, 50, 100, pageCount * 10].map((val, i) => {
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
                    <h4 className={"text-theme"}>New Student Registration</h4>
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

                      {/* Student Full Name */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Student Full Name
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
                            placeholder={"Rahul Kumar"}
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

                      {/* DOB */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>DOB</label>
                          <input
                            type="date"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                dob: evt.target.value,
                              })
                            }
                            value={addingFormData.dob}
                            className="form-control"
                            placeholder={""}
                          />
                        </div>
                      </div>

                      {/* Father Name */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Father Name</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                father_name: evt.target.value,
                              })
                            }
                            value={addingFormData.father_name}
                            className="form-control"
                            placeholder={"Father Name"}
                          />
                        </div>
                      </div>

                      {/* Mother Name */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Mother Name</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                mother_name: evt.target.value,
                              })
                            }
                            value={addingFormData.mother_name}
                            className="form-control"
                            placeholder={"Mother Name"}
                          />
                        </div>
                      </div>

                      {/* Father Mobile */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Father Mobile
                          </label>
                          <input
                            type="tel"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                father_mobile: evt.target.value,
                              })
                            }
                            value={addingFormData.father_mobile}
                            className="form-control"
                            placeholder={"Father Mobile"}
                          />
                        </div>
                      </div>

                      {/* Mother Mobile */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Mother Mobile
                          </label>
                          <input
                            type="tel"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                mother_mobile: evt.target.value,
                              })
                            }
                            value={addingFormData.mother_mobile}
                            className="form-control"
                            placeholder={"Mother Mobile"}
                          />
                        </div>
                      </div>

                      {/* Student Mobile */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Student Mobile
                          </label>
                          <input
                            type="tel"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                student_mobile: evt.target.value,
                              })
                            }
                            value={addingFormData.student_mobile}
                            className="form-control"
                            placeholder={"Student Mobile"}
                          />
                        </div>
                      </div>

                      {/* Father Email */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Father Email</label>
                          <input
                            type="email"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                father_email: evt.target.value,
                              })
                            }
                            value={addingFormData.father_emal}
                            className="form-control"
                            placeholder={"Father Email"}
                          />
                        </div>
                      </div>

                      {/* Student Email */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Student Email
                          </label>
                          <input
                            type="email"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                student_email: evt.target.value,
                              })
                            }
                            value={addingFormData.student_email}
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
                            placeholder={"Address"}
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
                          <input type="file" name="" className="form-control" onChange={imgChangeHandler} />
                          {
                            progress ? <div className="progress mt-2">
                              <div className="progress-bar bg-success" style={{ width: `${progress}%`, height: "15px" }} role="progressbar"> {progress}% </div>
                            </div> : ""
                          }
                        </div>
                      </div>
                      {/* Profile Picture */}
                      <div className={"col-md-12"}>
                        {/* Webcam */}
                        <div className={"row"}>
                          <div className={"col-md-4"}>
                            <video id="webcam" autoplay playsinline width="150" height="150"></video>
                            <canvas id="canvas" class="d-none"></canvas>
                            <audio id="snapSound" src="/assets/audio/snap.wav" preload="auto"></audio>
                          </div>
                          <div className={"col-md-4"}>
                            <img src={photo} style={{ height: "110px", width: "150px" }}></img>
                          </div>
                          <div className={"col-md-4"}>
                            <button type={"button"} id={"webCamStartButton"} onClick={(evt) => startWebCam()}>Start Webcam</button>
                            <button type={"button"} onClick={(evt) => takePicture()}>TakePicture</button>
                            <button type={"button"} onClick={(evt) => stopWebCam()}>Stop Webcam</button>
                            <button type={"button"} onClick={(evt) => flipWebCam()}>Flip Camera</button>
                            <a
                              href={photo}
                              target="_blank"
                              download="x.png"
                            >Download Image
                          </a>
                          </div>
                        </div>


                      </div>
                    </div>

                    {/* Other Details */}
                    <div className={"row px-3"}>
                      {/* Heading */}
                      <div className={"col-md-12 mb-2"}>
                        <h4 className={"text-theme"}>Other Details</h4>
                        <div className={"devider"} />
                      </div>

                      {/* School/College */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            School/College
                          </label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                school_college: evt.target.value,
                              })
                            }
                            value={addingFormData.school_college}
                            className="form-control"
                            placeholder={"School/College"}
                          />
                        </div>
                      </div>

                      {/* Board */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Board</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                board: evt.target.value,
                              })
                            }
                            value={addingFormData.board}
                            className="form-control"
                            placeholder={"BSEB/CBSE"}
                          />
                        </div>
                      </div>

                      {/* University */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>University</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                university: evt.target.value,
                              })
                            }
                            value={addingFormData.university}
                            className="form-control"
                            placeholder={"University"}
                          />
                        </div>
                      </div>

                      {/* Select Standard */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>
                            Select Standard
                          </label>
                          <select
                            className="form-control"
                            onChange={(evt) => getCourseType(evt)}
                          >
                            <option value={""} disabled selected hidden>
                              Available Standard
                            </option>
                            {allStandard.map((value, index) => {
                              return (
                                <option key={index} value={value._id}>
                                  {value.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Course Type */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>Course Type</label>
                          <select
                            className="form-control"
                            onChange={(evt) => getBatches(evt, "addForm")}
                          >
                            <option value={""} disabled selected hidden>
                              Available Course Type
                            </option>
                            {allCourseType.map((value, index) => {
                              return (
                                <option key={index} value={value._id}>
                                  {value.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Class/Batch */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>
                            Select Class/Batch
                          </label>
                          <select
                            className="form-select"
                            multiple
                            aria-label="multiple select example"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                batch: evt.target.value,
                              })
                            }
                          >
                            {allBatch.map((value, index) => {
                              return (
                                <option key={index} value={value._id}>
                                  {value.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Referenced By */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Referenced By
                          </label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                ref_by: evt.target.value,
                              })
                            }
                            value={addingFormData.refBy}
                            className="form-control"
                            placeholder={"Name of Ref Person"}
                          />
                        </div>
                      </div>

                      {/* Comments */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Comments</label>
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
                            placeholder={"Comments"}
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
                    <h4 className={"text-theme"}>Update Student Details</h4>
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

                      {/* Student Full Name */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Student Full Name
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
                            placeholder={"Rahul Kumar"}
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
                          >
                            <option value={""} disabled selected hidden>
                              Select Gender
                            </option>
                            <option
                              value={"MALE"}
                              selected={data.gender == "MALE" ? "selected" : ""}
                            >
                              MALE
                            </option>
                            <option
                              value={"FEMALE"}
                              selected={
                                data.gender == "FEMALE" ? "selected" : ""
                              }
                            >
                              FEMALE
                            </option>
                            <option
                              value={"OTHER"}
                              selected={
                                data.gender == "OTHER" ? "selected" : ""
                              }
                            >
                              OTHER
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* DOB */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>DOB</label>
                          <input
                            type="date"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                dob: evt.target.value,
                              })
                            }
                            value={data.dob}
                            className="form-control"
                            placeholder={""}
                          />
                        </div>
                      </div>

                      {/* Father Name */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Father Name</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                father_name: evt.target.value,
                              })
                            }
                            value={data.father_name}
                            className="form-control"
                            placeholder={"Father Name"}
                          />
                        </div>
                      </div>

                      {/* Mother Name */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Mother Name</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                mother_name: evt.target.value,
                              })
                            }
                            value={data.mother_name}
                            className="form-control"
                            placeholder={"Mother Name"}
                          />
                        </div>
                      </div>

                      {/* Father Mobile */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Father Mobile
                          </label>
                          <input
                            type="tel"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                father_mobile: evt.target.value,
                              })
                            }
                            value={data.father_mobile}
                            className="form-control"
                            placeholder={"Father Mobile"}
                          />
                        </div>
                      </div>

                      {/* Mother Mobile */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Mother Mobile
                          </label>
                          <input
                            type="tel"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                mother_mobile: evt.target.value,
                              })
                            }
                            value={data.mother_mobile}
                            className="form-control"
                            placeholder={"Mother Mobile"}
                          />
                        </div>
                      </div>

                      {/* Student Mobile */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Student Mobile
                          </label>
                          <input
                            type="tel"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                student_mobile: evt.target.value,
                              })
                            }
                            value={data.student_mobile}
                            className="form-control"
                            placeholder={"Student Mobile"}
                          />
                        </div>
                      </div>

                      {/* Father Email */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Father Email</label>
                          <input
                            type="email"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                father_email: evt.target.value,
                              })
                            }
                            value={data.father_emal}
                            className="form-control"
                            placeholder={"Father Email"}
                          />
                        </div>
                      </div>

                      {/* Student Email */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Student Email
                          </label>
                          <input
                            type="email"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                student_email: evt.target.value,
                              })
                            }
                            value={data.student_email}
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
                            placeholder={"Address"}
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
                    </div>

                    {/* Other Details */}
                    <div className={"row px-3"}>
                      <div className={"col-md-12"}>
                        <h4 className={"text-theme"}>Other Details</h4>
                        <div className={"devider"} />
                      </div>

                      {/* School/College */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            School/College
                          </label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                school_college: evt.target.value,
                              })
                            }
                            value={data.school_college}
                            className="form-control"
                            placeholder={"School/College"}
                          />
                        </div>
                      </div>

                      {/* Board */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Board</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                board: evt.target.value,
                              })
                            }
                            value={data.board}
                            className="form-control"
                            placeholder={"BSEB/CBSE"}
                          />
                        </div>
                      </div>

                      {/* University */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>University</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                university: evt.target.value,
                              })
                            }
                            value={data.university}
                            className="form-control"
                            placeholder={"University"}
                          />
                        </div>
                      </div>

                      {/* Select Standard */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>
                            Select Standard
                          </label>
                          <select
                            className="form-control"
                            onChange={(evt) => getCourseType(evt)}
                          // value={data.standard}
                          >
                            <option value="">Select Standard</option>
                            {allStandard.map((value, index) => {
                              return (
                                <option
                                  key={index}
                                  value={value._id}
                                >
                                  {value.name}
                                </option>
                              );
                            })
                            }
                          </select>
                        </div>
                      </div>

                      {/* Select Course Type */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>Course Type</label>
                          <select
                            className="form-control"
                            value={data.course_type}
                            onChange={(evt) => getBatches(evt, "updateForm")}
                          >
                            <option value={""}>
                              Available Course Type
                            </option>
                            {allCourseType.map((value, index) => {
                              return (
                                <option key={index} value={value._id}>
                                  {value.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Select Class/Batch */}
                      <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>
                            Select Class/Batch
                          </label>
                          <select
                            className="form-control"
                            value={data.batch}
                            onChange={(evt) =>
                              setData({
                                ...data,
                                batch: evt.target.value,
                              })
                            }
                          >
                            <option value="">Availabe Batch</option>
                            {allBatch.map((value, index) => {
                              return (
                                <option key={index} value={value._id}>
                                  {value.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Referenced By */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Referenced By
                          </label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                ref_by: evt.target.value,
                              })
                            }
                            value={data.refBy}
                            className="form-control"
                            placeholder={"Name of Ref Person"}
                          />
                        </div>
                      </div>

                      {/* Comments */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Comments</label>
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
                            placeholder={"Comments"}
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

          {/* -- Make Payment Modal -- */}
          <div className="modal fade" id="makePaymentModal">
            <div className="modal-dialog " role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <div className={"text-center"}>
                    <button type="button" className="close p-2 border" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className={"text-theme"}>Make Payment</h4>
                    <div className={"devider m-auto"} />
                  </div>

                  <form
                    onSubmit={makePaymentHandler}
                    className="form-horizontal form-material"
                  >
                    {/*  */}
                    <div className={"row"}>
                      {/* Enter Amount */}
                      <div className={"col-md-12"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Enter Amount
                          </label>
                          <input
                            type="number"
                            onChange={(evt) =>
                              setAmount(evt.target.value)
                            }
                            value={amount}
                            className="form-control"
                            placeholder={"500"}
                          />
                        </div>
                      </div>
                    </div>


                    {/* Buttons */}
                    <div className={"form-group col-md-12"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isMakePaymentLaoded ? (
                          <div>
                            <i className="mdi mdi-currency-inr"></i> Submit
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
                        id={"closeMakePaymentModalButton"}
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

                  {/* Buttons */}
                  <div className={"form-group"}>

                    <div>
                      {/* Printable Area */}
                      <ComponentToPrint div={<div>
                        {/* Header Section */}
                        <div className={"modal-header studentPrintHeader"}>
                          <div className={"m-auto"}>
                            <img className={"img img-fluid"} src={"https://vijayphysics.com/assets/website/images/logo/logo.png"} />
                          </div>
                        </div>
                        <div className={"text-center"}>
                          <h4 className={"text-theme"} style={{ fontSize: "20px", fontWeight: "700" }}>Student Details</h4>
                          <div className={"devider m-auto"} />
                        </div>

                        {/* Profile Section */}
                        <div className={"row mt-2 px-2"}>
                          <div className={"col-3"}>
                            <img
                              src={
                                viewData.profile_picture || "https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
                              }
                              className={"img img-fluid"}
                            />
                          </div>
                          <div className={"col-9 py-3"} >
                            <h5 className={"text-left"}>{viewData.name}</h5>
                            <h5 className={"text-left"}>{viewData.email}</h5>
                            <h5 className={"text-left"}>{viewData.student_mobile}</h5>
                          </div>
                        </div>

                        <div id="accordion">
                          {/* Personal Details */}
                          <div className="card m-1">
                            <div className="card-header p-2 rounded-0 bg-white" id="headingOne">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-info shadow-none"
                                  data-toggle="collapse"
                                  data-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  Personal Details
                          </button>
                              </h5>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordion"
                            >

                              <table className={"table table-bordered"}>
                                <tbody>
                                  <tr>
                                    <th className={"border p-1"}>Gender</th>
                                    <td className={"p-1"}>{viewData.gender}</td>
                                    <th className={"border p-1"}>DOB</th>
                                    <td className={"p-1"}>{viewData.dob}</td>
                                  </tr>
                                  <tr>
                                    <th className={"border p-1"}>Father Name</th>
                                    <td className={"p-1"}>{viewData.father_name}</td>
                                    <th className={"border p-1"}>Mother Name</th>
                                    <td className={"p-1"}>{viewData.mother_name}</td>
                                  </tr>
                                  <tr>
                                    <th className={"border p-1"}>Student Mobile</th>
                                    <td className={"p-1"}>{viewData.student_mobile}</td>
                                    <th className={"border p-1"}>Student Email</th>
                                    <td className={"p-1"}>{viewData.student_email || "Not Available"}</td>
                                  </tr>
                                  <tr>
                                    <th className={"border p-1"}>Father Mobile</th>
                                    <td className={"p-1"}>{viewData.father_mobile || "Not Available"}</td>
                                    <th className={"border p-1"}>Mother Mobile</th>
                                    <td className={"p-1"}>{viewData.mother_mobile || "Not Available"}</td>
                                  </tr>
                                  <tr>
                                    <th className={"border p-1"}>Father Email</th>
                                    <td className={"p-1"}>{viewData.father_email || "Not Available"}</td>
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

                          {/* Other Details */}
                          <div className="card m-1">
                            <div className="card-header p-2 bg-white" id="headingTwo">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-info collapsed shadow-none"
                                  data-toggle="collapse"
                                  data-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  Other Details
                          </button>
                              </h5>
                            </div>
                            <div
                              id="collapseTwo"
                              className="collapse show"
                              aria-labelledby="headingTwo"
                              data-parent="#accordion"
                            >
                              <table className={"table table-bordered"}>
                                <tbody>
                                  <tr>
                                    <th className={"border p-1"}>Standard</th>
                                    <td className={"p-1"}>{viewData.session.standard ? viewData.session.standard.name : ""}</td>
                                    <th className={"border p-1"}>Course Type</th>
                                    <td className={"p-1"}>{viewData.session.course_type ? viewData.session.course_type.name : ""}</td>
                                  </tr>
                                  <tr>
                                    <th className={"border p-1"}>Course Fee</th>
                                    <td className={"p-1"} colSpan={3}><span className={"mdi mdi-currency-inr"} />{viewData.session.course_type.fee ? viewData.session.course_type.fee : ""}</td>
                                  </tr>
                                  <tr>
                                    <th className={"border p-1"}>Batch/Class</th>
                                    <td className={"p-1"}>{viewData.session.batch ? viewData.session.batch.name : ""}</td>
                                    <th className={"border p-1"}>Batch Time</th>
                                    <td className={"p-1"}>{`${startTime}-${endTime}`}</td>
                                  </tr>
                                  <tr>
                                    <th className={"border p-1"}>School/College</th>
                                    <td className={"p-1"}>
                                      {viewData.school_college || "Not Available"}
                                    </td>
                                    <th className={"border p-1"}>BOARD</th>
                                    <td className={"p-1"}>{viewData.board || "Not Available"}</td>
                                  </tr>
                                  <tr>
                                    <th className={"border p-1"}>University</th>
                                    <td className={"p-1"}>{viewData.university || "Not Available"}</td>
                                    <th className={"border p-1"}>Ref By</th>
                                    <td className={"p-1"}>{viewData.ref_by || "Not Available"}</td>
                                  </tr>
                                </tbody>
                              </table>

                            </div>
                          </div>

                          {/* Payment details */}
                          <div className="card m-1">
                            <div className="card-header p-2 bg-white" id="headingThree">
                              <h5 className="mb-0">
                                <button
                                  className="btn btn-info shadow-none collapsed"
                                  data-toggle="collapse"
                                  data-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                >
                                  Payment Details
                          </button>
                              </h5>
                            </div>
                            <div
                              id="collapseThree"
                              className="collapse show"
                              aria-labelledby="headingThree"
                              data-parent="#accordion"
                            >
                              <table className={"table table-bordered"}>
                                <tr>
                                  <td className={"p-1"}>#SN</td>
                                  <td className={"p-1"}>Payment Date</td>
                                  <td className={"p-1"}>Payment Mode</td>
                                  <td className={"p-1"}>Payment ID</td>
                                  <td className={"p-1 text-center"}>Amount</td>
                                </tr>
                                {viewData.payment ? viewData.payment.map((value, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className={"p-1"}>{index + 1}</td>
                                      <td className={"p-1"}>{format(new Date(value.date), "dd/MM/yyyy")}</td>
                                      <td className={"p-1"}>{value.payment_mode}</td>
                                      <td className={"p-1"}>{value.payment_id || "N/A"}</td>
                                      <td className={"p-1 text-center"}><span className={"mdi mdi-currency-inr"} />{value.amount}</td>
                                    </tr>
                                  )
                                }) : ""}
                                <tr>
                                  <td className={"p-1"} colSpan={4}>Sub Total</td>
                                  <td className={"p-1 text-center"}><span className={"mdi mdi-currency-inr"} />{viewData.totalAmount}</td>
                                </tr>
                                <tr>
                                  <td className={"border p-1"} colSpan={4}>Discount Amount</td>
                                  <td className={"p-1 text-center"}> <span className={"mdi mdi-currency-inr"} />{0}</td>
                                </tr>
                                <tr>
                                  <td className={"border p-1"} colSpan={4}>Total Amount</td>
                                  <td className={"p-1 text-center"}> <span className={"mdi mdi-currency-inr"} />{Number(viewData.totalAmount)}</td>
                                </tr>
                                <tr>
                                  <td className={"border p-1"} colSpan={4}>Rest Amount (CourseFee-PaidAmount) </td>
                                  <td className={"p-1 text-center"}> <span className={"mdi mdi-currency-inr"} />{Number(viewData.session.course_type.fee) - Number(viewData.totalAmount)}</td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>;

                  </div>} ref={componentRef} />

                    </div>
                    <button
                      className="btn btn-secondary rounded-0 ml-2"
                      data-dismiss="modal"
                      id={"closeViewModalButton"}
                      onClick={() => $("#closeMdalButton").click()}
                    >
                      Close
                    </button>
                    <ReactToPrint
                      trigger={() => <button data-dismiss="modal" className={"btn btn-secondary rounded-0 ml-2"}>Print</button>}
                      content={() => componentRef.current}
                    />
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
    </div >
  );
};

export default StudentRegistration;
