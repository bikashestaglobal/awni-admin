import React, { useContext, useState, useEffect } from "react";
import { Link, BrowserRouter, useHistory } from "react-router-dom";
import { StudentContext } from "../student/Student";
import M from 'materialize-css'
import $ from "jquery";
import Config from "../config/Config";


function LeftNavigation() {
  const { state, dispatch } = useContext(StudentContext);

  // Fetching the data
  useEffect(() => {


  }, []);
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
    // window.location = "/studentLogin";
  }

  return (
    <div>
      {state &&
        <aside className="left-sidebar">
          {/* <!-- Sidebar scroll--> */}
          <div className="scroll-sidebar">
            {/* <!-- User profile --> */}
            <div
              className="user-profile"
              style={{
                background:
                  "url(../assets/images/background/user-info.jpg) no-repeat",
              }}
            >
              {/* <!-- User profile image --> */}
              <div className="profile-img text-center">
                {state.profile_picture ? <img src={state.profile_picture} alt="user" /> : <span className={"fas fa-user-circle text-white"} style={{ fontSize: "51px" }} />}
              </div>
              {/* <!-- User profile text--> */}
              <div className="profile-text">
                <Link
                  to="/"
                  className="dropdown-toggle u-dropdown"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {state.name}
                </Link>

                <div className="dropdown-menu animated flipInY">
                  <Link to="/student/profile" className="dropdown-item" onClick={() => $("body").removeClass("show-sidebar")}>
                    <i className="ti-user"></i> My Profile
                  </Link>

                  <div className="dropdown-divider"></div>
                  <Link to="/student/change-password" className="dropdown-item" onClick={() => $("body").removeClass("show-sidebar")}>
                    <i className="ti-settings"></i> Change Password
                  </Link>

                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={logout}>
                    <i className="fa fa-power-off"></i> Logout
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- End User profile text--> */}

            {/* <!-- Sidebar navigation--> */}
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li className="nav-small-cap">PERSONAL</li>
                {/* Dashboard */}
                <li>
                  <Link
                    onClick={() => $("body").removeClass("show-sidebar")}
                    className="has-arrow waves-dark"
                    to="/student"
                  >
                    <i className="mdi mdi-gauge"></i>
                    <span className="hide-menu">Dashboard </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/student/videos/THEORY"
                    onClick={() => $("body").removeClass("show-sidebar")}
                  >
                    <i className="mdi mdi-video"></i>
                    <span className="hide-menu">Videos </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/student/onlineTest"
                    onClick={() => $("body").removeClass("show-sidebar")}
                  >
                    <i className="mdi mdi-library"></i>
                    <span className="hide-menu">Online Test </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/student/liveClass"
                    onClick={() => $("body").removeClass("show-sidebar")}
                  >
                    <i className="mdi mdi-camera"></i>
                    <span className="hide-menu">Live Class </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/student/assignments"
                    onClick={() => $("body").removeClass("show-sidebar")}
                  >
                    <i className="mdi mdi-file"></i>
                    <span className="hide-menu">Assignments </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/student/chapterLayouts"
                    onClick={() => $("body").removeClass("show-sidebar")}
                  >
                    <i className="mdi mdi-file"></i>
                    <span className="hide-menu">Chapter Layouts </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/student/formulaCharts"
                    onClick={() => $("body").removeClass("show-sidebar")}
                  >
                    <i className="mdi mdi-math-compass"></i>
                    <span className="hide-menu">Formula Chart </span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/student/payment"
                    onClick={() => $("body").removeClass("show-sidebar")}
                  >
                    <i className="mdi mdi-currency-inr"></i>
                    <span className="hide-menu">Payment </span>
                  </Link>
                </li>

                <li className="nav-devider"></li>

                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-help"></i>
                    <span className="hide-menu">Help</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link onClick={() => $("body").removeClass("show-sidebar")} to="/student/helpVideos">Help Videos  </Link>
                    </li>
                    <li>
                      <Link onClick={() => $("body").removeClass("show-sidebar")} to="/student/technicalSupport">Technical Support </Link>
                    </li>
                  </ul>
                </li>

              </ul>
            </nav>
            {/* <!-- End Sidebar navigation --> */}
          </div>
          {/* <!-- End Sidebar scroll--> */}
          {/* <!-- Bottom points--> */}
          <div className="sidebar-footer">
            {/* <!-- item--> */}
            <Link
              to="/student/setting"
              className="link"
              data-toggle="tooltip"
              title="Settings"
              onClick={() => $("body").removeClass("show-sidebar")}
            >
              <i className="ti-settings"></i>
            </Link>
            {/* <!-- item--> */}
            <Link to="/" className="link" data-toggle="tooltip" title="Email"
              onClick={() => $("body").removeClass("show-sidebar")}
            >
              <i className="mdi mdi-gmail"></i>
            </Link>
            {/* <!-- item--> */}

            <Link
              to=''
              onClick={logout}
              className="link"
              data-toggle="tooltip"
              title="Logout"
            >
              <i className="mdi mdi-power"></i>
            </Link>
          </div>
          {/* <!-- End Bottom points--> */}
        </aside>
      }
    </div>
  );
}

export default LeftNavigation;
