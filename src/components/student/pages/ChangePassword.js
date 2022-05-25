import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config";

function ChangePassword() {
  // Use State
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  // Update password handler
  const updatePasswordHandler = (evt) => {
    evt.preventDefault();
    setIsLoaded(false);
    // check newpassword and confirm password is matched or not
    if (password.newPassword === password.confirmPassword) {
      fetch(`${Config.SERVER_URL}/student/changeMyPassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
        },
        body: JSON.stringify(password),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              setIsLoaded(true);
              if (result.message)
                M.toast({ html: result.message, classes: "bg-success" });
              setPassword({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
            } else {
              if (result.oldPassword)
                M.toast({ html: result.oldPassword, classes: "bg-danger" });
              if (result.newPassword)
                M.toast({ html: result.newPassword, classes: "bg-danger" });
              if (result.confirmPassword)
                M.toast({ html: result.confirmPassword, classes: "bg-danger" });
              if (result.message)
                M.toast({ html: result.message, classes: "bg-danger" });
              setIsLoaded(true);
            }
          },
          (error) => {
            setIsLoaded(true);
            M.toast({ html: error, classes: "bg-danger" });
          }
        );
    } else {
      M.toast({
        html: "Confirm Password is not matched",
        classes: "bg-danger",
      });
    }
  };

  // Fetching the data
  useEffect(() => {}, []);

  return (
    <div>
      <div className="page-wrapper px-0 pt-0">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Container fluid  --> */}
        {/* <!-- ============================================================== --> */}
        <div className="container-fluid">
          {/* Breadcrumb */}
          <div className="row page-titles mb-0">
            <div className="col-md-5 col-8 align-self-center">
              <h3 className="text-themecolor">Student</h3>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/student"}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Change Password</li>
              </ol>
            </div>
          </div>

          {/* Card Sections */}
          <div
            className={"row page-titles px-1 my-0 shadow-none"}
            style={{ background: "none" }}
          >
            <div className={"col-md-6 px-0 mx-auto"}>
              <div className={"card border-0 shadow-none"}>
                <div className={"card-body"}>
                  <h5 className="card-title">Change Password</h5>
                  <div className={"devider"} />
                  <div>
                    <form
                      className={"form form-material"}
                      onSubmit={updatePasswordHandler}
                    >
                      <div className={"form-group"}>
                        <input
                          type={"text"}
                          className={"form-control"}
                          placeholder={"Old Password"}
                          onChange={(evt) =>
                            setPassword({
                              ...password,
                              oldPassword: evt.target.value,
                            })
                          }
                          value={password.oldPassword}
                        />
                      </div>
                      <div className={"form-group"}>
                        <input
                          type={"text"}
                          className={"form-control"}
                          placeholder={"New Password"}
                          onChange={(evt) =>
                            setPassword({
                              ...password,
                              newPassword: evt.target.value,
                            })
                          }
                          value={password.newPassword}
                        />
                      </div>
                      <div className={"form-group"}>
                        <input
                          type={"text"}
                          className={"form-control"}
                          placeholder={"Confirm Password"}
                          onChange={(evt) =>
                            setPassword({
                              ...password,
                              confirmPassword: evt.target.value,
                            })
                          }
                          value={password.confirmPassword}
                        />
                      </div>
                      <div>
                        <button type={"submit"} className={"btn btn-success"}>
                          {isLoaded ? (
                            <div>Update Password</div>
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Row --> */}

          {/* <!-- End PAge Content --> */}
          {/* <!-- ============================================================== --> */}
          {/* <!-- ============================================================== --> */}
        </div>
        {/* <!-- ============================================================== --> */}
        {/* <!-- End Container fluid  --> */}
        {/* <!-- ============================================================== --> */}
        {/* <!-- ============================================================== --> */}
        {/* <!-- footer --> */}
        {/* <!-- ============================================================== --> */}
        <footer className="footer">© 2021 The Perfect App</footer>
        {/* <!-- ============================================================== --> */}
        {/* <!-- End footer --> */}
        {/* <!-- ============================================================== --> */}

      </div>
    </div>
  );
}

export default ChangePassword;
