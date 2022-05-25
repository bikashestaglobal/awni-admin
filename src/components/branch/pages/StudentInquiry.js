import React, { useState, useEffect } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../config/Config";

//  Component Function
const StudentInquiry = (props) => {
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
    sourse: "",
    remarks: "",
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
  const [isAllStudentLoaded, setIsAllStudentLoaded] = useState(true);
  const [allBatch, setAllBatch] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const [updateStatus, setUpdateStatus] = useState({})
  const [data, setData] = useState({
      standard:{_id:""}
  }
  //   {
  //   session: {
  //     standard: "",
  //     course_type: "",
  //     batch: "",
  //     session: selectedSession,
  //   },
  // }
  );

  

  const [viewData, setViewData] = useState({
    standard: {name:""},
    course_type: {name:""}
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [allStandard, setAllStandard] = useState([]);
  const [allCourseType, setAllCourseType] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Update the state while clicking the View button
  const updateStateForViewData = (list) => {
    setViewData(list);
  };

  // Update the state while clicking the edit button
  const updateState = (list) => {
    setData(JSON.parse(JSON.stringify(list)));
  };


  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault(); 
     
    fetch(Config.SERVER_URL + "/branch/updateInquiredStudent", {
      method: "PUT",
      body: JSON.stringify(data),
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
            setData({})
            $("#closeUpdateModalButton").click();
            $("#closeUpdateStatusModalButton").click();
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

    fetch(Config.SERVER_URL + "/branch/deleteInquiredStudent", {
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
    fetch(Config.SERVER_URL + "/branch/addInquiry", {
      method: "POST",
      body: JSON.stringify(addingFormData),
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

  // Get All Batch
  useEffect(() => {
    setIsAllStudentLoaded(true);
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
          setIsAllStudentLoaded(false);
          if (result.success) {
            setAllBatch(result.data || []);
          } else {
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllStudentLoaded(false);
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

    // Get All Inquired Student
    fetch(
      Config.SERVER_URL + "/branch/searchInquiredStudent?session=" + selectedSession,
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
            setAllStudent(result.data || []);
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
  }, [isAdded, isUpdated, isDeleted]);

  // Return function
  return (
    <div className="page-wrapper">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">
              Student Inquiry
            </h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">Inquiry</li>
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
                  <h4 className="float-left">Inquired Student</h4>

                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    <span className={"fas fa-plus"}></span> Inquiry
                  </button>
                </div>
              </div>
            </div>

            {/* Data */}
            {!isAllStudentLoaded ? (
              <div className="card border-0 rounded-0 m-0 py-1">
                {allStudent.length ? (
                  <div className="card-body py-0">
                    <div className="table-responsive">
                      <table
                        id="myTable2"
                        className="table table-bordered table-striped my-0"
                      >
                        <thead>
                          <tr>
                            <th>#SN</th>
                            <th>Student Name</th>
                            <th>Mobile</th>
                            <th>Inquiry Date</th>
                            <th>Status</th>
                            <th>Next Call</th>
                            <th>Pri. Level</th>
                            <th>Open/Close</th>
                            <th className={"text-center"}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allStudent.map((result, index) => {
                            
                            return (
                              <tr key={result._id}>
                                <td> {++index} </td>
                                <td> {result.name} </td>
                                <td> {result.student_mobile} </td>
                                <td> {new Date(result.created_date).toDateString()} </td>
                                
                                <td> {result.student_status || "N/A"} </td>
                                
                                <td> {new Date(result.next_call).toDateString() || "N/A"} </td>
                                <td> {result.priority || "N/A"} </td>
                                <td>
                                  {result.inq_status ? (
                                    <span className={"badge badge-info"}>
                                      Open
                                    </span>
                                  ) : (
                                    <span className={"badge badge-danger"}>
                                      Closed
                                    </span>
                                  )}
                                </td>
                                
                                {/* Buttons */}
                                <td className={"text-center"}>
                                  <div
                                    className="btn-group btn-group-xs"
                                    role="group"
                                  >
                                    {/* View Button */}
                                    <button
                                      type="button"
                                      className="btn btn-success p-1"
                                      data-toggle="modal"
                                      data-target="#viewModal"
                                      onClick={() =>
                                        updateStateForViewData(result)
                                      }
                                    >
                                      <span
                                        className="fas fa-eye text-white"
                                        aria-hidden="true"
                                      ></span>
                                    </button>

                                    {/* Update Button */}
                                    <button
                                      type="button"
                                      className="btn btn-info ml-2 p-1"
                                      data-toggle="modal"
                                      data-target="#updateModal"
                                      onClick={() => updateState(result)}
                                    >
                                      <span
                                        className="fas fa-pencil-alt text-white"
                                        aria-hidden="true"
                                      ></span>
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                      type="button"
                                      className="ml-2 btn btn-danger p-1"
                                      data-toggle="modal"
                                      data-target="#deleteModal"
                                      onClick={(evt) => setDeleteId(result._id)}
                                    >
                                      <span
                                        className="fas fa-trash-alt"
                                        aria-hidden="true"
                                      ></span>
                                    </button>

                                    {/* Update Status Button */}
                                    <button
                                      type="button"
                                      className="ml-2 btn btn-primary p-1"
                                      data-toggle="modal"
                                      data-target="#updateStatusModal"
                                      onClick={() => updateState(result)}
                                    >
                                      <span
                                        className="mdi mdi-update"
                                        aria-hidden="true"
                                      ></span>
                                    </button>

                                    {/*Send SMS Button */}
                                    <button
                                      type="button"
                                      className="ml-2 btn btn-success p-1"
                                      data-toggle="modal"
                                      data-target="#sendSMSsModal"
                                      onClick={() => updateState(result)}
                                    >
                                      <span
                                        className="mdi mdi-message-text"
                                        aria-hidden="true"
                                      ></span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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
                    <h4 className={"text-theme"}>Student Inquiry</h4>
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
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                course_type: evt.target.value,
                              })
                            }
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

                      {/* Inquiry Source */}
                      <div className={"col-md-4"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Inquiry Source
                          </label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                source: evt.target.value,
                              })
                            }
                            value={addingFormData.soirce}
                            className="form-control"
                            placeholder={"Eg: Facebook,Google,Person.."}
                          />
                        </div>
                      </div>

                      {/* Remarks */}
                      <div className={"col-md-8"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>Remarks</label>
                          <input
                            type="text"
                            onChange={(evt) =>
                              setAddingFormData({
                                ...addingFormData,
                                remarks: evt.target.value,
                              })
                            }
                            value={addingFormData.remarks}
                            className="form-control"
                            placeholder={"Remarks"}
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
                      {/* <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>
                            Select Standard
                          </label>
                          <select
                            className="form-control"
                            onChange={(evt) => getCourseType(evt)}
                            value={data.standard}
                          >
                            {allStandard.map((value, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={value._id}
                                      selected={
                                        data.standard._id ===
                                        value._id
                                          ? "selected"
                                          : "none"
                                      }
                                    >
                                      {value.name}
                                    </option>
                                  );
                                })
                              }
                          </select>
                        </div>
                      </div> */}

                      {/* Select Course Type */}
                      {/* <div className={"col-md-4"}>
                        <div className={"form-group"}>
                          <label className={"text-dark h6"}>Course Type</label>
                          <select
                            className="form-control"
                            onChange={(evt) =>
                              setData({
                                ...data,
                                course_type: evt.target.value,
                              })
                            }
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
                      </div> */}

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
          
          {/* -- Update Status Modal -- */}
          <div
            className="modal fade"
            id="updateStatusModal"
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
                    {/*  */}
                    <div className={"row"}>
                      {/* Inquiry Status */}
                      <div className={"col-md-6"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Inquiry Status
                          </label>
                          <select className={"form-control"} onChange={(evt)=>setData({...data, inq_status: Number(evt.target.value)})}>
                              <option value={""}>Select Status</option>
                              <option value={1} selected={data.inq_status=="1"?"selected":""}>Open</option>
                              <option value={0} selected={data.inq_status=="0"?"selected":""}>Closed</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Remarks */}
                      {data.inq_status?<div className={"col-md-6"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Remarks
                          </label>
                          <input
                            type="text"
                            onChange={(evt) =>
                                setData({...data, remarks:evt.target.value})
                            }
                            value={data.remarks}
                            className="form-control"
                            placeholder={"Enter Remarks"}
                          />
                        </div>
                      </div>
                      :""}

                      {/* Priority Level */}
                      {data.inq_status?<div className={"col-md-6"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Priority Level
                          </label>
                          <select className={"form-control"} onChange={(evt)=>setData({...data, priority: evt.target.value})}>
                              <option value={""}>Select Priority</option>
                              <option value={"High"}>HIgh</option>
                              <option value={"Low"}>Low</option>
                              <option value={"Medium"}>Medium</option>
                          </select>
                        </div>
                      </div>:""}
                      
                        
                      {/* Student Status */}
                      {data.inq_status?<div className={"col-md-6"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Student Status
                          </label>
                          <select className={"form-control"} onChange={(evt)=>setData({...data, student_status: evt.target.value})}>
                              <option value={""}>Select Status</option>
                              <option value={"Interested"}>Interested</option>
                              <option value={"Call Back"}>Call Back</option>
                              <option value={"Not Interested"}>Not Interested</option>
                              <option value={"Registered"}>Registered</option>
                          </select>
                        </div>
                      </div>:""}
                        
                      {/* Next Call */}
                      {data.student_status == "Call Back"?<div className={"col-md-6"}>
                        <div className={"form-group mb-3"}>
                          <label className={"text-dark h6"}>
                            Call Reminder
                          </label>
                          <input
                            type="datetime-local"
                            onChange={(evt) =>
                                setData({...data, next_call:evt.target.value})
                            }
                            value={data.next_call}
                            className="form-control"
                            placeholder={"Enter Remarks"}
                          />
                        </div>
                      </div>:""}
                    
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
                        id={"closeUpdateStatusModalButton"}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Update Status Modal -- */}
          <div className="modal fade" id="updateStausModal">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <div className={"text-center"}>
                    <button type="button" className="close p-2 border" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className={"text-theme"}>Update Details</h4>
                    <div className={"devider m-auto"} />
                  </div>

                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    
                    {/* Buttons */}
                    <div className={"form-group col-md-12"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isUpdateLaoded ? (
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
                        type={"button"}
                        id={"closeUpdateModalButton2"}
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
                    <h4 className={"text-theme"}>Student Details</h4>
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
                      <h5 className={"text-left"}>{viewData.student_email}</h5>
                      <h5 className={"text-left"}>{viewData.student_mobile}</h5>
                    </div>
                  </div>

                  <div id="accordion">
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
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordion"
                      >
                        <table className={"table table-bordered"}>
                          <tbody>
                            <tr>
                              <th className={"border p-1"}>Standard</th>
                              <td className={"p-1"}>{viewData.standard.name}</td>
                              <th className={"border p-1"}>Course Type</th>
                              <td className={"p-1"}>{viewData.course_type.name}</td>
                            </tr>
                            <tr>
                              <th className={"border p-1"}>Inquiry Date</th>
                              <td className={"p-1"}>{new Date(viewData.created_date).toDateString()}</td>
                              <th className={"border p-1"}>Inquiry Status</th>
                              <td className={"p-1"}>{viewData.inq_status ? (
                                    <span className={"badge badge-info"}>
                                      Open
                                    </span>
                                  ) : (
                                    <span className={"badge badge-danger"}>
                                      Closed
                                    </span>
                                  )}</td>
                            </tr>
                            <tr>
                              <th className={"border p-1"}>Student Status</th>
                              <td className={"p-1"}>{viewData.student_status}</td>
                              <th className={"border p-1"}>Priority</th>
                              <td className={"p-1"}>{viewData.priority}</td>
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
                    
                  </div>;




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
                  <p className={"badge badge-warning"}>
                    All data that connected with this Standard will be
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
};

export default StudentInquiry;
