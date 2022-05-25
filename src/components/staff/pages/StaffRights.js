import React, { useState, useEffect, useContext } from "react";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import Config from "../../config/Config";
import { StaffContext } from '../StaffRoutes'

//  Component Function
const StaffRights = (props) => {
  const { state, dispatch } = useContext(StaffContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    // Personal Details
    profile: {
      changePassword: false,
      updateProfile: false
    },

    setup: {
      // Session
      addSession: false,
      deleteSession: false,
      updateSession: false,

      // Standard
      addStandard: false,
      deleteStandard: false,
      updateStandard: false,

      // CourseType
      addCourseType: false,
      deleteCourseType: false,
      updateCourseType: false,
      addInstallment: false,

      // Class/Batch
      addBatch: false,
      deleteBatch: false,
      updateBatch: false,

      // LiveClass
      addLiveClass: false,
      deleteLiveClass: false,
      updateLiveClass: false,
      addBatchToLiveClass: false,

      // Chapter
      addChapter: false,
      deleteChapter: false,
      updateChapter: false,
    },

    student: {
      // Inquiry
      addInquiry: false,
      deleteInquiry: false,
      updateInquiry: false,
      showPersonalInquiryDetails: false,
      updateInquiryStatus: false,
      sendInquiryMessage: false,

      // Registration
      addRegistration: false,
      deleteRegistration: false,
      updateRegistration: false,

      // Payments
      addPayment: false,
      deletePayment: false,
      updatePayment: false,
    },

    staff: {
      // Staff
      addStaff: false,
      deleteStaff: false,
      updateStaff: false,

      // Staff Rights
      staffRights: ""

    },

    onlineTest: {
      // Question
      addQuestion: false,
      deleteQuestion: false,
      updateQuestion: false,

      // Test
      addTest: false,
      deleteTest: false,
      updateTest: false,

      // TestResult
      publishResult: false,
      deleteResult: false,
      updateResult: false,
    },

    video: {
      // Video
      addVideo: false,
      deleteVideo: false,
      updateVideo: false,
    },

    classRoomAsset: {
      // ChapterLayout
      addChapterLayout: false,
      deleteChapterLayout: false,
      updateChapterLayout: false,

      // FormulaChats
      addFormulaChart: false,
      deleteFormulaChart: false,
      updateFormulaChart: false,

      // Assignments
      addAssignment: false,
      deleteAssignment: false,
      updateAssignment: false,

    }
  });

  const [selectedSession, setSelectedSession] = useState(
    localStorage.getItem("branchSession") || ""
  );

  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);

  const [isAllStaffLoaded, setIsAllStaffLoaded] = useState(true);
  const [isUpdated, setIsUpdated] = useState(true);
  const [allStaff, setAllStaff] = useState([]);



  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdateLaoded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/branch/updateStaff", {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsUpdateLaoded(true);
          setIsUpdated(!isUpdated);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });

          } else {
            if (result._id)
              M.toast({ html: result._id, classes: "bg-danger" });
            if (result.staffId)
              M.toast({ html: result.staffId, classes: "bg-danger" });

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



  // ClickHandler
  const clickHandler = (evt, parent) => {
    const data = { ...formData };
    data[parent][evt.target.name] = !data[parent][evt.target.name];
    setFormData({ ...formData, ...data });
  }

  // Staff change handler
  const staffChangeHandler = (evt) => {
    setFormData({ ...formData, ...JSON.parse(evt.target.value) });
  }

  // Get All Batch
  useEffect(() => {
    setIsAllStaffLoaded(true);
    // Get All Staff Data
    fetch(
      Config.SERVER_URL + "/branch/searchStaff?status=1",
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
            setAllStaff(result.data || []);
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
  }, [isUpdated]);

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

  // Return function
  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">
              Manage Staff Rights
            </h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Branch</Link>
              </li>
              <li className="breadcrumb-item active">Staff Rights</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        <div className={"row p-0"}>
          <div className={"col-md-4 p-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>

                <form className={"form-material"}>
                  <div className={"form-group"}>
                    <select className={"form-control shadow-sm"} onChange={staffChangeHandler}>
                      <option>Select Staff</option>
                      {allStaff.map((value, index) => (
                        <option value={JSON.stringify(value)} key={index}> {value.name} </option>
                      ))}
                    </select>
                  </div>
                </form>

              </div>
            </div>
          </div>
          <div className="col-md-4 ml-auto text-right">
            <button
              className="btn btn-info rounded-0"
              type={"button"}
              onClick={updateSubmitHandler}
            >
              {isUpdateLaoded ? (
                <div>
                  <i className="fas fa-add"></i> Update Rights
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
          </div>
        </div>

        {/* Rights */}
        <div className={"row p-0"}>
          <div className={"col-md-12 p-0"}>
            <form className={"form-material"}>
              <div className={"row"}>

                {/* Profile Section */}
                <div className={"col-md-3"}>
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div class="card-header bg-theme text-white text-uppercase">
                      <h4 className={"text-white"}>Profile</h4>
                    </div>
                    <div className={"card-body pb-0 pt-2 px-0"} style={{ height: "285px", overflowY: "scroll" }}>
                      {/* Change Password */}
                      <div className="px-2">
                        <input checked={formData.profile.changePassword ? "checked" : null} type="checkbox" className="" id="changePwd" name={"changePassword"}
                          onClick={(evt) => clickHandler(evt, "profile")}
                        />
                        <label className="" for="changePwd">Change Password</label>
                      </div>

                      {/* Update Profile */}
                      <div className="px-2">
                        <input checked={formData.profile.updateProfile ? "checked" : null} type="checkbox" className="" id="updateProfile" name={"updateProfile"}
                          onClick={(evt) => clickHandler(evt, "profile")}
                        />
                        <label className="" for="updateProfile">Change Password</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Setup Section */}
                <div className={"col-md-3"}>
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div class="card-header bg-theme text-white">
                      <h4 className={"text-white"}>Setup</h4>
                    </div>
                    <div className={"card-body pb-0 pt-2 px-0"} style={{ height: "285px", overflowY: "scroll" }}>
                      {/* Session */}
                      <div className="card mx-2">
                        <h4 className={"px-2"}>Session Setup</h4>
                        <div className="devider"></div>
                        <div className="px-2">
                          <input checked={formData.setup.addSession ? "checked" : null} type="checkbox" className="" id="addSession" name={"addSession"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="addSession">Add Session/Year</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.deleteSession ? "checked" : null} type="checkbox" className="" id="deleteSession" name={"deleteSession"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="deleteSession">Delete Year/Session</label>
                        </div>

                        <div className="px-2">
                          <input checked={formData.setup.updateSession ? "checked" : null} type="checkbox" className="" id="updateSession" name={"updateSession"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="updateSession">Update Year/Session</label>
                        </div>
                      </div>

                      {/* Standard */}
                      <div className="card mx-2">
                        <h4 className={"px-2"}>Standard Setup</h4>
                        <div className="devider"></div>
                        <div className="px-2">
                          <input checked={formData.setup.addStandard ? "checked" : null} type="checkbox" className="" id="addStandard" name={"addStandard"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="addStandard">Add Standard</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.deleteStandard ? "checked" : null} type="checkbox" className="" id="deleteStandard" name={"deleteStandard"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="deleteStandard">Delete Standard</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.updateStandard ? "checked" : null} type="checkbox" className="" id="updateStandard" name={"updateStandard"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="updateStandard">Delete Standard</label>
                        </div>

                      </div>

                      {/* CourseType */}
                      <div className="card mx-2">
                        <h4 className={"px-2"}>CourseType Setup</h4>
                        <div className="devider"></div>
                        <div className="px-2">
                          <input checked={formData.setup.addCourseType ? "checked" : null} type="checkbox" className="" id="addCourseType" name={"addCourseType"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="addCourseType">Add CourseType</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.deleteCourseType ? "checked" : null} type="checkbox" className="" id="deleteCourseType" name={"deleteCourseType"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="deleteCourseType">Delete CourseType</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.updateCourseType ? "checked" : null} type="checkbox" className="" id="updateCourseType" name={"updateCourseType"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="updateCourseType">Update CourseType</label>
                        </div>
                        {/* Add Installment */}
                        <div className="px-2">
                          <input checked={formData.setup.addInstallment ? "checked" : null} type="checkbox" className="" id="addInstallment" name={"addInstallment"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="addInstallment">Add Installment</label>
                        </div>
                      </div>

                      {/* Class/Batch */}
                      <div className="card mx-2">
                        <h4 className={"px-2"}>Class/Batch Setup</h4>
                        <div className="devider"></div>
                        <div className="px-2">
                          <input checked={formData.setup.addBatch ? "checked" : null} type="checkbox" className="" id="addBatch" name={"addBatch"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="addBatch">Add Class/Batch</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.deleteBatch ? "checked" : null} type="checkbox" className="" id="deleteBatch" name={"deleteBatch"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="deleteBatch">Delete Class/Batch</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.updateBatch ? "checked" : null} type="checkbox" className="" id="updateBatch" name={"updateBatch"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="updateBatch">Update CourseType</label>
                        </div>
                      </div>

                      {/* Live Class */}
                      <div className="card mx-2">
                        <h4 className={"px-2"}>LiveClass Setup</h4>
                        <div className="devider"></div>
                        <div className="px-2">
                          <input checked={formData.setup.addLiveClass ? "checked" : null} type="checkbox" className="" id="addLiveClass" name={"addLiveClass"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="addLiveClass">Add Live Class</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.deleteLiveClass ? "checked" : null} type="checkbox" className="" id="deleteLiveClass" name={"deleteLiveClass"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="deleteLiveClass">Delete Live Class</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.updateLiveClass ? "checked" : null} type="checkbox" className="" id="updateLiveClass" name={"updateLiveClass"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="updateLiveClass">Update Live Class</label>
                        </div>

                        <div className="px-2">
                          <input checked={formData.setup.addBatchToLiveClass ? "checked" : null} type="checkbox" className="" id="addBatchToLiveClass" name={"addBatchToLiveClass"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="addBatchToLiveClass">Add Batch to Live Class</label>
                        </div>
                      </div>

                      {/* Chapters */}
                      <div className="card mx-2">
                        <h4 className={"px-2"}>Chapter Setup</h4>
                        <div className="devider"></div>
                        <div className="px-2">
                          <input checked={formData.setup.addChapter ? "checked" : null} type="checkbox" className="" id="addChapter" name={"addChapter"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="addChapter">Add Chapter</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.deleteChapter ? "checked" : null} type="checkbox" className="" id="deleteChapter" name={"deleteChapter"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="deleteChapter">Delete Chapter</label>
                        </div>
                        <div className="px-2">
                          <input checked={formData.setup.updateChapter ? "checked" : null} type="checkbox" className="" id="updateChapter" name={"updateChapter"}
                            onClick={(evt) => clickHandler(evt, "setup")}
                          />
                          <label className="" for="updateChapter">Update Chapter</label>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Staff Section */}
                <div className={"col-md-3"}>
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div class="card-header bg-theme text-white">
                      <h4 className={"text-white"}>Staff</h4>
                    </div>
                    <div className={"card-body pb-0 pt-2 px-0"} style={{ height: "285px", overflowY: "scroll" }}>
                      <div className="px-2">
                        <input checked={formData.staff.addStaff ? "checked" : null} type="checkbox" className="" id="addStaff" name={"addStaff"}
                          onClick={(evt) => clickHandler(evt, "staff")}
                        />
                        <label className="" for="addStaff">Add Staff</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.staff.deleteStaff ? "checked" : null} type="checkbox" className="" id="deleteStaff" name={"deleteStaff"}
                          onClick={(evt) => clickHandler(evt, "staff")}
                        />
                        <label className="" for="deleteStaff">Delete Staff</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.staff.updateStaff ? "checked" : null} type="checkbox" className="" id="updateStaff" name={"updateStaff"}
                          onClick={(evt) => clickHandler(evt, "staff")}
                        />
                        <label className="" for="updateStaff">Update Staff</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.staff.staffRights ? "checked" : null} type="checkbox" className="" id="staffRights" name={"staffRights"}
                          onClick={(evt) => clickHandler(evt, "staff")}
                        />
                        <label className="" for="staffRights">Staff Rights</label>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Student */}
                <div className={"col-md-3"}>
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div class="card-header bg-theme text-white">
                      <h4 className={"text-white"}>Students</h4>
                    </div>
                    <div className={"card-body pb-0 pt-2 px-0"} style={{ height: "285px", overflowY: "scroll" }}>
                      <div className="px-2">
                        <input checked={formData.student.addInquiry ? "checked" : null} type="checkbox" className="" id="addInquiry" name={"addInquiry"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="addInquiry">Add Inquiry</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.student.deleteInquiry ? "checked" : null} type="checkbox" className="" id="deleteInquiry" name={"deleteInquiry"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="deleteInquiry">Delete Inquiry</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.student.updateInquiry ? "checked" : null} type="checkbox" className="" id="updateInquiry" name={"updateInquiry"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="updateInquiry">Update Inquiry</label>
                      </div>

                      {/* showPersonalInquiryDetails */}
                      <div className="px-2">
                        <input checked={formData.student.showPersonalInquiryDetails ? "checked" : null} type="checkbox" className="" id="showPersonalInquiryDetails" name={"showPersonalInquiryDetails"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="showPersonalInquiryDetails">Show Personal Inquiry Details</label>
                      </div>

                      {/* updateInquiryStatus */}
                      <div className="px-2">
                        <input checked={formData.student.updateInquiryStatus ? "checked" : null} type="checkbox" className="" id="updateInquiryStatus" name={"updateInquiryStatus"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="updateInquiryStatus">Update Inquiry Status</label>
                      </div>

                      {/* sendInquiryMessage */}
                      <div className="px-2">
                        <input checked={formData.student.sendInquiryMessage ? "checked" : null} type="checkbox" className="" id="sendInquiryMessage" name={"sendInquiryMessage"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="sendInquiryMessage">Send Inquiry Message </label>
                      </div>

                      {/* Registration */}
                      <div className="px-2">
                        <input checked={formData.student.addRegistration ? "checked" : null} type="checkbox" className="" id="addRegistration" name={"addRegistration"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="addRegistration">Add Registartion</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.student.deleteRegistration ? "checked" : null} type="checkbox" className="" id="deleteRegistration" name={"deleteRegistration"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="deleteRegistration">Delete Registration</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.student.updateRegistration ? "checked" : null} type="checkbox" className="" id="updateRegistration" name={"updateRegistration"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="updateRegistration">Update Registration</label>
                      </div>


                      {/* Payment Section */}


                      <div className="px-2">
                        <input checked={formData.student.addPayment ? "checked" : null} type="checkbox" className="" id="addPayment" name={"addPayment"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="addPayment">Add Payment</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.student.deletePayment ? "checked" : null} type="checkbox" className="" id="deletePayment" name={"deletePayment"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="deletePayment">Delete Payment</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.student.updatePayment ? "checked" : null} type="checkbox" className="" id="updatePayment" name={"updatePayment"}
                          onClick={(evt) => clickHandler(evt, "student")}
                        />
                        <label className="" for="updatePayment">Update Payment</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Online Test Section */}
                <div className={"col-md-3"}>
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div class="card-header bg-theme text-white">
                      <h4 className={"text-white"}>Online Test</h4>
                    </div>
                    <div className={"card-body pb-0 pt-2 px-0"} style={{ height: "285px", overflowY: "scroll" }}>

                      {/* Question */}
                      <div className="px-2">
                        <input checked={formData.onlineTest.addQuestion ? "checked" : null} type="checkbox" className="" id="addQuestion" name={"addQuestion"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="addQuestion">Add Question</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.onlineTest.deleteQuestion ? "checked" : null} type="checkbox" className="" id="deleteQuestion" name={"deleteQuestion"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="deleteQuestion">Question Question</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.onlineTest.updateQuestion ? "checked" : null} type="checkbox" className="" id="updateQuestion" name={"updateQuestion"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="updateQuestion">Update Question</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.onlineTest.addTest ? "checked" : null} type="checkbox" className="" id="addTest" name={"addTest"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="addTest">Add Online Test</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.onlineTest.deleteTest ? "checked" : null} type="checkbox" className="" id="deleteTest" name={"deleteTest"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="deleteTest">Delete Online Test</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.onlineTest.updateTest ? "checked" : null} type="checkbox" className="" id="updateTest" name={"updateTest"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="updateTest">Update Online Test</label>
                      </div>


                      {/* Result Section */}
                      <div className="px-2">
                        <input checked={formData.onlineTest.publishResult ? "checked" : null} type="checkbox" className="" id="publishResult" name={"publishResult"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="publishResult">Publish Result</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.onlineTest.deleteResult ? "checked" : null} type="checkbox" className="" id="deleteResult" name={"deleteResult"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="deleteResult">Delete Result</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.onlineTest.updateResult ? "checked" : null} type="checkbox" className="" id="updateResult" name={"updateResult"}
                          onClick={(evt) => clickHandler(evt, "onlineTest")}
                        />
                        <label className="" for="updateResult">Update Result</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Videos Section */}
                <div className={"col-md-3"}>
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div class="card-header bg-theme text-white">
                      <h4 className={"text-white"}>Video</h4>
                    </div>
                    <div className={"card-body pb-0 pt-2 px-0"} style={{ height: "285px", overflowY: "scroll" }}>
                      <div className="px-2">
                        <input checked={formData.video.addVideo ? "checked" : null} type="checkbox" className="" id="addVideo" name={"addVideo"}
                          onClick={(evt) => clickHandler(evt, "video")}
                        />
                        <label className="" for="addVideo">Add Video</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.video.deleteVideo ? "checked" : null} type="checkbox" className="" id="deleteVideo" name={"deleteVideo"}
                          onClick={(evt) => clickHandler(evt, "video")}
                        />
                        <label className="" for="deleteVideo">Delete Video</label>
                      </div>

                      <div className="px-2">
                        <input checked={formData.video.updateVideo ? "checked" : null} type="checkbox" className="" id="updateVideo" name={"updateVideo"}
                          onClick={(evt) => clickHandler(evt, "video")}
                        />
                        <label className="" for="updateVideo">Update Video</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ClassRoom Assets Section */}
                <div className={"col-md-3"}>
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div class="card-header bg-theme text-white">
                      <h4 className={"text-white"}>ClassRoom Assets</h4>
                    </div>
                    <div className={"card-body pb-0 pt-2 px-0"} style={{ height: "285px", overflowY: "scroll" }}>

                      {/* Chapter Layout */}
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.addChapterLayout ? "checked" : null} type="checkbox" className="" id="addChapterLayout" name={"addChapterLayout"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="addChapterLayout">Add Chapter Layout</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.deleteChapterLayout ? "checked" : null} type="checkbox" className="" id="deleteChapterLayout" name={"deleteChapterLayout"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="deleteChapterLayout">Delete Chapter Layout</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.updateChapterLayout ? "checked" : null} type="checkbox" className="" id="updateChapterLayout" name={"updateChapterLayout"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="updateChapterLayout">Update Chapter Layout</label>
                      </div>

                      {/* Formula Chart */}
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.addFormulaChart ? "checked" : null} type="checkbox" className="" id="addFormulaChart" name={"addFormulaChart"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="addFormulaChart">Add Formula Chart</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.deleteFormulaChart ? "checked" : null} type="checkbox" className="" id="deleteFormulaChart" name={"deleteFormulaChart"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="deleteFormulaChart">Delete Formula Chart</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.updateFormulaChart ? "checked" : null} type="checkbox" className="" id="updateFormulaChart" name={"updateFormulaChart"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="updateFormulaChart">Update Formula Chart</label>
                      </div>

                      {/* Assignments */}
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.addAssignment ? "checked" : null} type="checkbox" className="" id="addAssignment" name={"addAssignment"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="addAssignment">Add Assignment</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.deleteAssignment ? "checked" : null} type="checkbox" className="" id="deleteAssignment" name={"deleteAssignment"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="deleteAssignment">Delete Assignment</label>
                      </div>
                      <div className="px-2">
                        <input checked={formData.classRoomAsset.updateAssignment ? "checked" : null} type="checkbox" className="" id="updateAssignment" name={"updateAssignment"}
                          onClick={(evt) => clickHandler(evt, "classRoomAsset")}
                        />
                        <label className="" for="updateAssignment">Update Assignment</label>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StaffRights;
