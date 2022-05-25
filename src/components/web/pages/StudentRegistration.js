import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config"


function StudentRegistration() {
  // History Initialization
  const history = useHistory();

  // Create State
  const [name, setName] = useState("");
  const [medium, setMedium] = useState("");
  const [standard, setStandard] = useState("");
  const [courseType, setCourseType] = useState("");
  const [batch, setBatch] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const [allStandard, setAllStandard] = useState([]);
  const [allCourseType, setAllCourseType] = useState([]);
  const [allBatch, setAllBatch] = useState([]);
  const [selectedSession, setSelectedSession] = useState("6056533d5ae0d30738c4ffed");
  const [selectedBranch, setSelectedBranch] = useState("605652fe5ae0d30738c4ffec");

  // Use Context
  //   const { state, dispatch } = useContext(StudentContext);
  // Submit Handler
  const submitHandler = (evt) => {
    evt.preventDefault();

    const validationMessage = {
      name: "",
      mobile: "",
      medium: "",
      standard: "",
      courseType: "",
      batch: "",
    }

    // Name Validation
    if (name.length <= 2) validationMessage.name = "Name must be Greater than 2 Character";
    if (!isNaN(name)) validationMessage.name = "Name must be Character";
    if (name == "") validationMessage.name = "Name is Required";

    // Medium Validation
    if (medium == "") validationMessage.medium = "Medium is Required";

    // Standard Validation
    if (standard == "") validationMessage.standard = "standard is Required";

    // CourseType Validation
    if (courseType == "") validationMessage.courseType = "courseType is Required";

    // batch Validation
    if (batch == "") validationMessage.batch = "batch is Required";

    // Mobile Number Validation
    const mob = /^[6-9]{1}[0-9]{9}$/;
    if (mob.test(mobile) == false) {
      validationMessage.batch = "Mobile Number is not Valid";
    }

    if (validationMessage.name != "" || validationMessage.mobile != "" || validationMessage.medium != "" || validationMessage.standard != "" || validationMessage.courseType != "" || validationMessage.batch != "") {
      if (validationMessage.name)
        M.toast({ html: validationMessage.name, classes: "bg-danger" });
      if (validationMessage.mobile)
        M.toast({ html: validationMessage.mobile, classes: "bg-danger" });
      if (validationMessage.medium)
        M.toast({ html: validationMessage.medium, classes: "bg-danger" });
      if (validationMessage.standard)
        M.toast({ html: validationMessage.standard, classes: "bg-danger" });
      if (validationMessage.courseType)
        M.toast({ html: validationMessage.courseType, classes: "bg-danger" });
      if (validationMessage.batch)
        M.toast({ html: validationMessage.batch, classes: "bg-danger" });
      return;
    }

    const studentData = {
      student_mobile: mobile,
      name
    };
    setIsLoaded(false);
    fetch(Config.SERVER_URL + "/student/sendRegistrationOTP", {
      method: "POST",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          if (result.success) {
            if (result.msg == "send") {
              M.toast({ html: result.message, classes: "bg-success" });
              const data = {
                name,
                student_mobile: mobile,
                otp: result.otp,
                session: {
                  session: selectedSession,
                  standard: standard,
                  course_type: courseType,
                  batch: batch,
                },
                branch: selectedBranch,
                type: "ONLINE"
              }
              localStorage.setItem("studentForRegistration", JSON.stringify(data));
              history.push("/studentEnterRegistrationOTP");
            } else {
              M.toast({ html: result.message, classes: "bg-danger" });
            }

          } else {
            if (result.student_mobile)
              M.toast({ html: result.student_mobile, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsLoaded(true)
          M.toast({ html: error, classes: "bg-danger" });
        }
      );

  };

  // Get course Type
  const getCourseType = (evt) => {
    // set standard
    setStandard(evt.target.value);

    // Get All CourseType
    fetch(
      Config.SERVER_URL +
      "/searchCourseTypeFromWeb?session=" +
      selectedSession +
      "&standard=" +
      evt.target.value + "&type=ONLINE&branch=" + selectedBranch,
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
  const getBatch = (evt) => {
    // set CourseType
    setCourseType(evt.target.value);

    // Get All Batches
    fetch(
      Config.SERVER_URL +
      "/searchBatchFromWeb?session=" +
      selectedSession +
      "&standard=" +
      standard + "&course_type=" + evt.target.value + "&branch=" + selectedBranch + "&medium=" + medium,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
            if (result.branch)
              M.toast({ html: result.branch, classes: "bg-danger" });
            if (result.standard)
              M.toast({ html: result.standard, classes: "bg-danger" });
            if (result.course_type)
              M.toast({ html: result.course_type, classes: "bg-danger" });
            if (result.medium)
              M.toast({ html: result.medium, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Go Back
  const goBack = (evt) => {
    evt.preventDefault();
    history.goBack();
  }

  // Use Effect
  useEffect(() => {
    // Get All Standard
    fetch(
      Config.SERVER_URL + "/searchStandardFromWeb?session=" + selectedSession + "&branch=" + selectedBranch,
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
  }, [])

  return (
    <div className={"container-fluid px-3 bg-light"} style={{ height: "100%" }}>
      <div className={"row"}>
        <div className={"col-md-12 bg-info py-2"}>
          <div className={"px-2"}>
            <button onClick={goBack} className={"mdi mdi-arrow-left text-white float-left btn shadow-none"}> Go Back</button>
          </div>
        </div>
      </div>
      <div className={"row"} style={{ paddingTop: "20px" }}>
        <div className={"col-md-5 m-auto"}>
          <div className={"card shadow-sm bg-white rounded-0 border-0"}>
            <div className={"card-header bg-white"}>
              <h4 className={"text-info"}>Student Registration</h4>
            </div>
            <div className={"card-img-top text-center pt-2"}>
              <img style={{ height: "150px" }} className={"img img-fluid"} src={"https://iimtstudies.edu.in/assets/images/process/1-online-registration.png"}></img>
            </div>

            <div className={"card-body"}>
              <form onSubmit={submitHandler} className={"form-material"}>
                <div className={"form-group"}>
                  <div className={"form-group mb-4"}>
                    <input
                      type="text"
                      value={name}
                      onChange={(evt) => setName(evt.target.value)}
                      className="form-control"
                      placeholder={"Enter Name"}
                    />
                  </div>
                  <div className={"form-group mb-4"}>
                    <input
                      type="number"
                      value={mobile}
                      onChange={(evt) => setMobile(evt.target.value)}
                      className="form-control"
                      placeholder={"Enter Mobile"}
                    />
                  </div>
                  <div className={"form-group mb-4"}>
                    <select className={"form-control"} onChange={(evt) => setMedium(evt.target.value)}>
                      <option hidden className={"px-0 mx-0"} value={""}>Select Medium</option>
                      <option className={"px-0 mx-0"} value={"HINDI"}>HINDI</option>
                      <option className={"px-0 mx-0"} value={"ENGLISH"}>ENGLISH</option>
                    </select>
                  </div>
                  <div className={"form-group mb-4"}>
                    <select className={"form-control"} onChange={(evt) => getCourseType(evt)}>
                      <option hidden className={"px-0 mx-0"} value={""}>Select Standard</option>
                      {allStandard.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className={"form-group mb-4"}>
                    <select className={"form-control"} onChange={(evt) => getBatch(evt)}>
                      <option hidden className={"px-0 mx-0"} value={""}>Select Course</option>
                      {allCourseType.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className={"form-group mb-4"}>
                    <select className={"form-control"} onChange={(evt) => setBatch(evt.target.value)}>
                      <option hidden className={"px-0 mx-0"} value={""}>Select Batch</option>
                      {allBatch.map((value, index) => {
                        return (
                          <option key={index} value={value._id}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className={"text-center"}>
                    <button className={"btn btn-info px-4 shadow-sm rounded-0 border-0"}>
                      {isLoaded ? (
                        <div>
                          <i className="mdi mdi-login"></i> Registration
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

                  <div className={"mt-3"}>
                    <Link to={"/studentLogin"}>
                      Already have an Account <span className={"text-info font-weight-bold"}>Login Now</span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentRegistration;
