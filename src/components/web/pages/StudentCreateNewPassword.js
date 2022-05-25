import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config"

function StudentCreateNewPassword() {
  // History Initialization
  const history = useHistory();

  // Create State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const [studentOTP, setStudentOTP] = useState(JSON.parse(localStorage.getItem("studentOTP")) || {student_mobile:"", otp:""});

  // Use Context
  // Submit Handler
  const submitHandler = (evt) => {
    evt.preventDefault();
    setIsLoaded(false)

    // If MObile number is Empty
    if(studentOTP.student_mobile == ""){
        M.toast({ html: "First Forgot Your Password!", classes: "bg-danger" });
        history.push("/studentForgotPassword");
        return;
    }

    // If OTP not Verified
    if(!studentOTP.verify){
        M.toast({ html: "First Verify Your OTP!", classes: "bg-warning" });
        history.push("/studentEnterOTP");
        return;
    }

    // If Both password not matched
    if(newPassword != confirmPassword){
        M.toast({ html: "Confirm Password not matched", classes: "bg-danger" });
        setIsLoaded(true);
        return;
    }

    const studentData = {
      student_mobile: studentOTP.student_mobile,
      newPassword,
      confirmPassword,
      _id: studentOTP._id
    };
    fetch(Config.SERVER_URL+"/student/createNewPassword", {
      method: "PUT",
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
            M.toast({ html: result.message, classes: "bg-success" });
            localStorage.removeItem("studentOTP");
            history.push("/studentLogin");
          } else {
            if (result.student_mobile)
              M.toast({ html: result.student_mobile, classes: "bg-danger" });
            if (result.newPassword)
              M.toast({ html: result.newPassword, classes: "bg-danger" });
            if (result.confirmPassword)
              M.toast({ html: result.confirmPassword, classes: "bg-danger" });
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

  // Go Back  
  const goBack = (evt)=>{
    evt.preventDefault();
    history.goBack();
  }

  return (
      <div className={"container-fluid px-3 bg-light"} style={{height:"100vh"}}>
        <div className={"row"}>
          <div className={"col-md-12 bg-info py-2"}>
            <div className={"px-2"}>
                <button onClick={goBack} className={"mdi mdi-arrow-left text-white float-left btn shadow-none"}> Go Back</button>
            </div>
          </div>
        </div>
        <div className={"row"} style={{ paddingTop: "50px" }}>
          <div className={"col-md-5 m-auto"}>
            <div className={"card shadow-sm bg-white rounded-0 border-0"}>
              <div className={"card-header bg-white"}>
                <h4 className={"text-info"}>Create New Password</h4>
              </div>
              <div className={"card-img-top text-center pt-2"}>
                <img style={{height:"150px"}} className={"img img-fluid"} src={"../assets/images/create-new-password.png"}></img>
              </div>
              
              <div className={"card-body"}>

                <form onSubmit={submitHandler} className={"form-material"}>
                  <div className={"form-group"}>
 
                    <div className={"form-group mb-4"}>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(evt) => setNewPassword(evt.target.value)}
                        className="form-control"
                        placeholder={"Enter New Password!"}
                      />
                    </div>
                    <div className={"form-group mb-4"}>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                        className="form-control"
                        placeholder={"Confirm Password!"}
                      />
                    </div>
                    <div className={""}>
                      <button className={"btn btn-info px-4 shadow-sm rounded-0 border-0"}>
                        {isLoaded ? (
                          <div>
                            <i className="fas fa-lock"></i> Create Password
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}
export default StudentCreateNewPassword;
