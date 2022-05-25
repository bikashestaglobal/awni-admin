import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { StudentContext } from "../Student";
import Config from "../../config/Config"

function EnterOTP() {
  // History Initialization
  const history = useHistory();

  // Create State
  const [otp, setOTP] = useState("");
  const [isVerifyLoaded, setIsVerifyLoaded] = useState(true);
  const [isResendLoaded, setIsResendLoaded] = useState(true);
  const [studentOTP, setStudentOTP] = useState(JSON.parse(localStorage.getItem("studentOTP")) || {student_mobile:"", otp:""});

  // Use Context
  const { state, dispatch } = useContext(StudentContext);
  
  const verifySubmitHandler = (evt)=>{
    evt.preventDefault();
    setIsVerifyLoaded(false)
    const sendOTP = Number(studentOTP.otp)-2021;
    const enteredOTP = otp;
    // If lOcalstorage is Empty
    if(studentOTP.otp == ""){
        M.toast({ html: "First Forgot Your Password!", classes: "bg-danger" });
        history.push("/student/forgotPassword");
        return;
    }

    // If otp is empty
    if(otp == ""){
        M.toast({ html: "Please Enter OTP!", classes: "bg-danger" });
        setIsVerifyLoaded(true)
        return;
    }

    if(sendOTP == enteredOTP){
        M.toast({ html: "OTP Verified Successfully!", classes: "bg-success" });
        localStorage.setItem("studentOTP",JSON.stringify({...studentOTP, verify: true}));
        history.push("/student/createNewPassword");
        setIsVerifyLoaded(true)
    }else{
        M.toast({ html: "Incorrect OTP!", classes: "bg-danger" });
        setIsVerifyLoaded(true)
    }
  }

  // Resend Submit Handler
  const resendSubmitHandler = (evt) => {
    evt.preventDefault();
    // If lOcalstorage is Empty
    if(studentOTP.student_mobile == ""){
        M.toast({ html: "First Forgot Your Password!", classes: "bg-danger" });
        history.push("/student/forgotPassword");
        return;
    }
    setIsResendLoaded(false)
    const studentData = {
      student_mobile: studentOTP.student_mobile
    };
    fetch(Config.SERVER_URL+"/student/sendOTP", {
      method: "POST",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsResendLoaded(true)
          if (result.success) {
            if(result.msg == "send"){
              M.toast({ html: result.message, classes: "bg-success" });
              localStorage.setItem("studentOTP", JSON.stringify({...result.data, verify: false}));
              history.push("/student/enterOTP");
            }else{
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
          setIsResendLoaded(true)
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Go Back  
  const goBack = (evt)=>{
    evt.preventDefault();
    history.push("/student/forgotPassword");
  }

  // Effects
  useEffect(()=>{
    
  }, [])

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
                <h4 className={"text-info"}>Enter OTP</h4>
              </div>
              <div className={"card-img-top text-center"}>
                <img style={{height:"200px"}} className={"img img-fluid"} src={"../assets/images/enter-otp.png"}></img>
              </div>
              
              <div className={"card-body"}>

                <form onSubmit={verifySubmitHandler} className={"form-material"}>
                  <div className={"form-group"}>
 
                    <div className={"form-group mb-4"}>
                      <input
                        type="text"
                        value={otp}
                        onChange={(evt) => setOTP(evt.target.value)}
                        className="form-control"
                        placeholder={"OTP Here!!"}
                      />
                    </div>
                    <div className={""}>
                      <button className={"btn btn-info px-4 shadow-sm rounded-0 border-0"} type={"submit"}>
                        {isVerifyLoaded ? (
                          <div>
                            <i className="mdi mdi-compare"></i> Verify OTP
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

                      <button onClick={resendSubmitHandler} className={"btn btn-danger px-4 ml-2 shadow-sm rounded-0 border-0"} type={"button"}>
                        {isResendLoaded ? (
                          <div>
                            <i className="fas fa-paper-plane"></i> Resend OTP
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
export default EnterOTP;
