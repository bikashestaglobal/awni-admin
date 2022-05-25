import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { StudentContext } from "../student/Student";
import M from 'materialize-css';
import Config from "../config/Config";

function TopNavigation() {
  const { state, dispatch } = useContext(StudentContext)
  const history = useHistory()

  // Logout Function
  const logout = (evt) => {
    evt.preventDefault();
    fetch(Config.SERVER_URL + "/student/updateLoginStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            localStorage.removeItem("student");
            localStorage.removeItem("jwt_student_token");
            dispatch({ type: "CLEAR" });
            window.location = "/studentLogin";
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );


    // history.push("/student/login");

  }

  return (

    <header className="topbar">
      {state &&
        <nav className="navbar top-navbar navbar-expand-md navbar-light">
          {/* <!-- Logo --> */}

          <div className="navbar-header">
            <Link className="navbar-brand" to="/student">
              {/* <!-- Logo icon --> */}
              <b>
                {/* <!-- Dark Logo icon --> */}
                <img src="../assets/images/logo-icon.png" className="dark-logo" />
                {/* <!-- Light Logo icon --> */}
                <img
                  src="../assets/images/logo-light-icon.png"
                  className="light-logo"
                />
              </b>
              {/* <!--End Logo icon --> */}
              {/* <!-- Logo text --> */}
              <span>
                {/* <!-- dark Logo text --> */}
                <img src="../assets/images/logo-text.png" className="dark-logo" />
                {/* <!-- Light Logo text -->     */}
                <img
                  src="../assets/images/logo-light-text.png"
                  className="light-logo"
                />
              </span>
            </Link>

          </div>
          {/* <!-- End Logo --> */}
          <div className="navbar-collapse">
            {/* <!-- toggle and nav items --> */}
            <ul className="navbar-nav mr-auto mt-md-0">
              {/* <!-- This is  --> */}
              <li className="nav-item">
                <button
                  className="btn shadow-none nav-link nav-toggler hidden-md-up text-muted waves-dark"
                  style={{ border: 'none', outline: 'none', background: 'none' }}
                  type={"button"}
                >
                  <i className="mdi mdi-menu"></i>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn shadow-none nav-link sidebartoggler hidden-sm-down text-muted waves-dark"
                  style={{ border: 'none', outline: 'none', background: 'none' }}
                >
                  <i className="ti-menu"></i>
                </button>
              </li>

              {/* <!-- Search --> */}
              <li className="nav-item hidden-sm-down search-box">

                <Link
                  className="nav-link hidden-sm-down text-muted waves-dark"
                  to=""
                >
                  <i className="ti-search"></i>
                </Link>
                <form className="app-search">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search & enter"
                  />


                  <Link className="srh-btn" to={''}>
                    <i className="ti-close"></i>
                  </Link>

                </form>
              </li>
            </ul>

            {/* <!-- User profile and search --> */}
            <ul className="navbar-nav my-lg-0">
              {/*<!-- Comment -->*/}

              {/*
            <li className="nav-item dropdown">
              
                
                <Link
                  className="nav-link dropdown-toggle text-muted text-muted waves-dark"
                  to=""
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-message"></i>
                  <div className="notify">
                    <span className="heartbit"></span>
                    <span className="point"></span>
                  </div>
                </Link>
              
              <div className="dropdown-menu dropdown-menu-right mailbox scale-up">
                <ul>
                  <li>
                    <div className="drop-title">Notifications</div>
                  </li>
                  <li>
                    <div className="message-center">
                        <Link to={'#'}>
                          <div className="btn btn-primary btn-circle">
                            <i className="ti-user"></i>
                          </div>
                          <div className="mail-contnet">
                            <h5>Vijay Sir</h5>
                            <span className="mail-desc">
                              Welcome To Vijay Physics
                            </span>
                            <span className="time"></span>
                          </div>
                        </Link>
                      
                    </div>
                  </li>
                  <li>
                    
                      
                      <Link className="nav-link text-center" to="#">
                        <strong>Check all notifications</strong>
                        <i className="fa fa-angle-right"></i>
                      </Link>
                    
                  </li>
                </ul>
              </div>
            </li>
            */}

              {/* <!-- End Comment --> */}

              {/* <!-- Profile --> */}
              <li className="nav-item dropdown">


                <Link
                  className="nav-link dropdown-toggle text-muted waves-dark"
                  to=""
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/* <img
                    src="../assets/images/users/1.jpg"
                    alt="user"
                    className="profile-pic"
                  /> */}
                  {state.profile_picture ? <img src={state.profile_picture} alt="user" className={"profile-pic"} /> : <span className={"fas fa-user-circle text-danger mt-2"} style={{ fontSize: "30px" }} />}
                </Link>

                <div className="dropdown-menu dropdown-menu-right scale-up">
                  <ul className="dropdown-user">
                    <li>
                      <div className="dw-user-box">
                        <div className="u-img">
                          {/* <img src="../assets/images/users/1.jpg" alt="user" /> */}
                          {state.profile_picture ? <img src={state.profile_picture} alt="user" /> : <span className={"fas fa-user-circle text-danger"} style={{ fontSize: "80px" }} />}
                        </div>
                        <div className="u-text">
                          <h4> {state ? state.name : "N/A"} </h4>
                          <Link
                            to="/student/profile"
                            className="btn btn-rounded btn-danger btn-sm"
                          >
                            View Profile
                          </Link>

                        </div>
                      </div>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li>


                      <Link to="/student/profile">
                        <i className="ti-user"></i> My Profile
                      </Link>

                    </li>

                    <li role="separator" className="divider"></li>
                    <li>


                      <Link to="/student/change-password">
                        <i className="ti-settings"></i> Change Password
                      </Link>

                    </li>
                    <li role="separator" className="divider"></li>
                    <li>


                      <Link to="/student/logout" onClick={logout}>
                        <i className="fa fa-power-off"></i> Logout
                      </Link>

                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      }
    </header>
  );
}

export default TopNavigation;
