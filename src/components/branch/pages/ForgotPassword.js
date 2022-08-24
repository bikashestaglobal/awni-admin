import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { BranchContext } from "../Branch";
import Config from "../../config/Config";

function ForgotPassword() {
  // History Initialization
  const history = useHistory();

  // Create State
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  // Use Context
  const { state, dispatch } = useContext(BranchContext);
  // Submit Handler
  const submitHandler = (evt) => {
    evt.preventDefault();
    setIsLoaded(false);
    const branchData = {
      email,
    };
    fetch(Config.SERVER_URL + "/admin/findAccount", {
      method: "POST",
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
            M.toast({
              html: "OTP Send on Your Email !",
              classes: "bg-success",
            });

            localStorage.setItem(
              "resetPassword",
              JSON.stringify({
                email: result.body.email,
                otp: Number(result.body.otp) * 2,
              })
            );
            history.push("/awni-admin/enter-otp");
          } else {
            if (result.errors.email)
              M.toast({ html: result.errors.email, classes: "bg-danger" });
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
                <h2 className="mt-4 font-waight-bold">Forgot Password</h2>
              </div>
              <form onSubmit={submitHandler} className={"form-material"}>
                <div className={"form-group"}>
                  <div className={"form-group mb-4"}>
                    <input
                      type="text"
                      value={email}
                      onChange={(evt) => setEmail(evt.target.value)}
                      className="form-control"
                      placeholder={"Enter Email"}
                    />
                  </div>

                  <div className={"text-center"}>
                    <button
                      className={
                        "btn btn-info px-4 shadow-sm rounded-0 border-0"
                      }
                    >
                      {isLoaded ? (
                        <div>
                          <i className="fas fa-sign-in"></i> FIND YOUR ACCOUNT !
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
export default ForgotPassword;
