import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config"


function StudentLogin() {
  // History Initialization
  const history = useHistory();

  // Create State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  // Use Context
//   const { state, dispatch } = useContext(StudentContext);
  // Submit Handler
  const submitHandler = (evt) => {
    evt.preventDefault();
    setIsLoaded(false)
    const studentData = {
      email,
      password,
    };
    fetch(Config.SERVER_URL+"/student/login", {
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
            M.toast({ html: result.message, classes: "bg-success" });
            // set value to redux
            // dispatch({ type: "STUDENT", payload: result.data });
            localStorage.setItem("student", JSON.stringify(result.data));
            localStorage.setItem("jwt_student_token", result.token);
            // set session to localstorage if only one session is availavle
            if(result.data.session.length == 1){
              localStorage.setItem("studentSelectedSession", JSON.stringify(result.data.session[0].session));
              window.location = "/student";
            }else{
              window.location = "/student/selectSession";
            }
          } else {
            if (result.email)
              M.toast({ html: result.email, classes: "bg-danger" });
            if (result.password)
              M.toast({ html: result.password, classes: "bg-danger" });
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
            <h4 className={"text-info"}>Student Login</h4>
          </div>
          <div className={"card-img-top text-center pt-2"}>
            <img style={{height:"150px"}} className={"img img-fluid"} src={"../assets/images/website/login.png"}></img>
          </div>
          
          <div className={"card-body"}>

            <form onSubmit={submitHandler} className={"form-material"}>
              <div className={"form-group"}>

              <div className={"form-group mb-4"}>
                    <input
                    type="text"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    className="form-control"
                    placeholder={"Enter Mobile"}
                    />
                </div>
                <div className={"form-group mb-4"}>
                    <input
                    type="password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                    className="form-control"
                    placeholder={"Enter Password"}
                    />
                </div>
                <div className={"text-center"}>
                    <button className={"btn btn-info px-4 shadow-sm rounded-0 border-0"}>
                    {isLoaded ? (
                        <div>
                        <i className="mdi mdi-login"></i> Login
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
                    <Link to={"/studentForgotPassword"}>
                    Forgot password?
                    </Link>
                </div>
                <div className={"mt-1"}>
                    <Link to={"/studentRegistration"}>
                      Not have an Account, <span className="text-info font-weight-bold">Register Now</span>
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
export default StudentLogin;
