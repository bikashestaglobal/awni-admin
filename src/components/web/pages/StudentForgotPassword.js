import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config"

function StudentForgotPassword() {
  // History Initialization
  const history = useHistory();

  // Create State
  const [mobile, setMobile] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  // Submit Handler
  const submitHandler = (evt) => {
    evt.preventDefault();
    setIsLoaded(false)
    const studentData = {
      student_mobile: mobile
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
          setIsLoaded(true)
          if (result.success) {
            if(result.msg == "send"){
              M.toast({ html: result.message, classes: "bg-success" });
              localStorage.setItem("studentOTP", JSON.stringify({...result.data, verify: false}));
              history.push("/studentEnterOTP");
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
                <h4 className={"text-info"}>Forgot Password</h4>
              </div>
              <div className={"card-img-top text-center"}>
                <img style={{height:"200px"}} className={"img img-fluid"} src={"../assets/images/forgot-password.png"}></img>
              </div>
              
              <div className={"card-body"}>

                <form onSubmit={submitHandler} className={"form-material"}>
                  <div className={"form-group"}>
 
                    <div className={"form-group mb-4"}>
                      <input
                        type="text"
                        value={mobile}
                        onChange={(evt) => setMobile(evt.target.value)}
                        className="form-control"
                        placeholder={"Enter Registered Mobile Number"}
                      />
                    </div>
                    <div className={""}>
                      <button className={"btn btn-info px-4 shadow-sm rounded-0 border-0"}>
                        {isLoaded ? (
                          <div>
                            <i className="fas fa-paper-plane"></i> Send OTP
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
export default StudentForgotPassword;