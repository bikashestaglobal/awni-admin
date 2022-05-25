import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { StudentContext } from "../Student";
import Config from "../../config/Config"
import TopNavigation from "../../web/TopNavigation";

function Login() {
  // History Initialization
  const history = useHistory();

  // Create State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  // Use Context
  const { state, dispatch } = useContext(StudentContext);
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
            dispatch({ type: "STUDENT", payload: result.data });
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

  return (
      <>
      <TopNavigation/>
      <div className={"container"} style={{height:"100vh"}}>
        <div className={"row"} style={{ paddingTop: "5%" }}>
          <div className={"col-md-4 m-auto"}>
            <div className={"card shadow-sm bg-white rounded-0 border-0"}>
              <div className={"card-body"}>
                <div className={"text-center mb-3"}>
                  {/* <img
                    className={"img img-fluid"}
                    src={"../../assets/images/logo.png"}
                    style={{ height: "100px" }}
                  /> */}
                  <h2>Student Login</h2>
                </div>
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
                            <i className="fas fa-sign-in"></i> Login
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
                      <Link to={"/student/forgotPassword"}>
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}
export default Login;
