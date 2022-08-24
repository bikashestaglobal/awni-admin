import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { BranchContext } from "../Branch";
import Config from "../../config/Config";

function CreateNewPassword() {
  // History Initialization
  const history = useHistory();

  // Create State
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  // Use Context
  const { state, dispatch } = useContext(BranchContext);

  // Submit Handler
  const createPasswordHandler = (evt) => {
    evt.preventDefault();

    const { email } = JSON.parse(localStorage.getItem("resetPassword")) || {};

    if (!email) {
      M.toast({ html: "Please Enter Email !", classes: "bg-success" });
      history.push("/awni-admin/forget-password");
      return;
    }

    if (!password || !cPassword) {
      M.toast({ html: "Enter the Password", classes: "bg-danger" });
      return;
    }

    if (password !== cPassword) {
      M.toast({ html: "Confirm Password is not Same", classes: "bg-danger" });
      return;
    }
    setIsLoaded(false);
    const branchData = {
      email,
      password,
    };
    fetch(Config.SERVER_URL + "/admin/createPassword", {
      method: "PUT",
      body: JSON.stringify(branchData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            localStorage.removeItem("resetPassword");
            history.push("/awni-admin/login");
          } else {
            if (result.errors.email)
              M.toast({ html: result.errors.email, classes: "bg-danger" });
            if (result.errors.password)
              M.toast({ html: result.errors.password, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsLoaded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  return (
    <div className={"container-fluid pt-5"} style={{ height: "100vh" }}>
      <div className={"row"} style={{ paddingTop: "10%" }}>
        <div className={"col-md-4 m-auto"}>
          <div className={"card shadow-sm bg-white rounded-0 border-0"}>
            <div className={"card-body"}>
              <div className={"mb-3"}>
                <h2 className="mt-4 font-waight-bold">CREATE NEW PASSWORD !</h2>
              </div>
              <form
                onSubmit={createPasswordHandler}
                className={"form-material"}
              >
                <div className={"form-group"}>
                  <div className={"form-group mb-4"}>
                    <input
                      type="password"
                      value={password}
                      onChange={(evt) => setPassword(evt.target.value)}
                      className="form-control"
                      placeholder={"Enter Password"}
                    />
                  </div>

                  <div className={"form-group mb-4"}>
                    <input
                      type="password"
                      value={cPassword}
                      onChange={(evt) => setCPassword(evt.target.value)}
                      className="form-control"
                      placeholder={"Confirm Password"}
                    />
                  </div>

                  <div className={""}>
                    <button className={"btn btn-info px-4 shadow-sm rounded-0"}>
                      {isLoaded ? (
                        <div>
                          <i className="fas fa-sign-in"></i> Create Password
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
                    <Link to={"/awni-admin/login"}>Back to Login?</Link>
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
export default CreateNewPassword;
