import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { BranchContext } from "../Branch";
import Config from "../../../components/config/Config";
import M from "materialize-css";
import { storage } from "../../../firebase/FirebaseConfig";
import uniqid from "uniqid";

function Profile() {
  const { state, dispatch } = useContext(BranchContext);
  // State Variable
  const [profile, setProfile] = useState({});
  const [profileImgDef, setProfileImgDef] = useState(
    "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
  );
  const [progress, setProgress] = useState(0);

  const [data, setData] = useState(JSON.parse(localStorage.getItem("branch")));
  const [updateLoading, setUpdateLoading] = useState(false);
  const [password, setPassword] = useState(undefined);

  // Update change handler
  const updateChangeHandler = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setData({ ...data, [name]: value });
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setUpdateLoading(true);
    evt.preventDefault();

    const updateData = {
      name: data.name,
      email: data.email,
      password: password,
      mobile: data.mobile,
    };

    fetch(Config.SERVER_URL + "/admin/updateProfile", {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setUpdateLoading(false);
          if (result.status == 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            localStorage.setItem("branch", JSON.stringify(result.body));
            dispatch({ type: "BRANCH", payload: result.body });
            setPassword("");
          } else {
            if (result.errors.name)
              M.toast({ html: result.errors.name, classes: "bg-danger" });
            if (result.errors.email)
              M.toast({ html: result.errors.email, classes: "bg-danger" });
            if (result.errors.mobile)
              M.toast({ html: result.errors.mobile, classes: "bg-danger" });
            if (result.errors.password)
              M.toast({ html: result.errors.password, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setUpdateLoading(false);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Profile</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        {/* Start Page Content */}
        {/* Row */}
        <div className="row">
          {/* Profile */}
          <div className="col-lg-4 col-xlg-3 col-md-5">
            <div className="card">
              <div className="card-body">
                <center className="m-t-30">
                  {/* <div style={{ height: "0px", overflow: "hidden" }}>
                    <input
                      type="file"
                      id="fileInput"
                      name="fileInput"
                      onChange={imgChangeHandler}
                    />
                  </div> */}

                  {/* If photo have or not */}
                  {/* {profile.photo ? (
                    <span
                      className={
                        "mdi mdi-close-circle h1 text-danger edit-profile-btn"
                      }
                      onClick={() => deleteImageHandler(profile.photo)}
                    ></span>
                  ) : (
                    <span
                      className={"mdi mdi-pencil h1 text-info edit-profile-btn"}
                      onClick={() => $("#fileInput").click()}
                    ></span>
                  )} */}

                  <img
                    src={profile.photo || profileImgDef}
                    className="user-profile-img shadow-sm"
                    width="150"
                  />

                  {/* Progress Bar */}
                  <span>
                    {progress ? (
                      <div className="progress mt-2">
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${progress}%`, height: "15px" }}
                          role="progressbar"
                        >
                          {progress}%
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </span>

                  <h4 className="card-title m-t-10">{profile.name}</h4>
                  <h6 className="card-subtitle">
                    {(state && state.name) || "Not Available"}
                  </h6>
                  <div className="row text-center justify-content-md-center"></div>
                </center>
              </div>
              <div>
                <hr />
              </div>
              <div className="card-body">
                <small className="text-muted">Email address </small>
                <h6>{(state && state.email) || "Not Available"}</h6>
                <small className="text-muted p-t-30 db">Phone</small>
                <h6>{(state && state.mobile) || "Not Available"}</h6>

                {/* {profile.youtube && (
                  <a
                    target={"_blank"}
                    href={profile.youtube}
                    className="btn btn-circle btn-secondary"
                  >
                    <i className="mdi mdi-youtube-play"></i>
                  </a>
                )} */}
              </div>
            </div>
          </div>
          {/* End Profile */}

          {/* Column */}
          <div className="col-lg-8 col-xlg-9 col-md-7">
            <div className="card">
              {/* Nav tabs */}
              <ul className="nav nav-tabs profile-tab" role="tablist">
                <li className="nav-item">
                  <button
                    className="nav-link active outline-0 rounded-0"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                  >
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link outline-0 rounded-0"
                    data-toggle="tab"
                    href="#settings"
                    role="tab"
                  >
                    Settings
                  </button>
                </li>
              </ul>
              {/* Tab panes */}
              <div className="tab-content">
                {/* First Tab */}

                {/* profile second tab */}
                <div className="tab-pane active" id="profile" role="tabpanel">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 col-xs-6 b-r">
                        <strong>Name </strong>
                        <br />
                        <p className="text-muted"> {state && state.name}</p>
                      </div>
                      <div className="col-md-4 col-xs-6 b-r">
                        <strong>Mobile</strong>
                        <br />
                        <p className="text-muted">{state && state.mobile}</p>
                      </div>
                      <div className="col-md-4 col-xs-6 b-r">
                        <strong>Email</strong>
                        <br />
                        <p className="text-muted">
                          <p className="text-muted">{state && state.email}</p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Setting (Third) Tab */}
                <div className="tab-pane" id="settings" role="tabpanel">
                  <div className="card-body">
                    <form
                      className="form-horizontal form-material"
                      onSubmit={updateSubmitHandler}
                    >
                      <div className={"form-group px-3"}>
                        <label className="">Full Name</label>
                        <input
                          type="text"
                          name={"name"}
                          value={data.name}
                          onChange={updateChangeHandler}
                          placeholder="Name Here!"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className={"form-group px-3"}>
                        <label className="">Email</label>
                        <input
                          type="email"
                          name={"email"}
                          value={data.email || ""}
                          onChange={updateChangeHandler}
                          placeholder="codescroller@gmail.com"
                          className="form-control form-control-line"
                        />
                      </div>

                      <div className="form-group px-3">
                        <label className="">Mobile</label>
                        <input
                          type="number"
                          name={"mobile"}
                          value={data.mobile || ""}
                          onChange={updateChangeHandler}
                          placeholder="9955556325"
                          className="form-control form-control-line"
                        />
                      </div>
                      {/* <div className="form-group px-3">
                        <label className="">Address</label>
                        <input
                          type="text"
                          name={"address"}
                          value={data.address || ""}
                          onChange={updateChangeHandler}
                          placeholder="Address Here!"
                          className="form-control form-control-line"
                        />
                      </div> */}
                      {/* <div className="form-group px-3">
                        <label className="">Facebook</label>
                        <input
                          type="url"
                          name={"facebook"}
                          value={data.facebook || ""}
                          onChange={updateChangeHandler}
                          placeholder="Ex: https://facebook.com/user-name"
                          className="form-control form-control-line"
                        />
                      </div> */}
                      {/* <div className="form-group px-3">
                        <label className="">Twitter</label>
                        <input
                          type="url"
                          name={"twitter"}
                          value={data.twitter || ""}
                          onChange={updateChangeHandler}
                          placeholder="Ex: https://twitter.com/user-name"
                          className="form-control form-control-line"
                        />
                      </div> */}
                      {/* <div className="form-group px-3">
                        <label className="">Instagram</label>
                        <input
                          type="url"
                          name={"instagram"}
                          value={data.instagram || ""}
                          onChange={updateChangeHandler}
                          placeholder="Ex: https://instagram.com/user-name"
                          className="form-control form-control-line"
                        />
                      </div> */}
                      <div className="form-group px-3">
                        <label className="">Enter Password</label>
                        <input
                          type="text"
                          name={"password"}
                          onChange={(evt) => setPassword(evt.target.value)}
                          value={password}
                          placeholder="password"
                          className="form-control form-control-line"
                        />
                      </div>

                      <div className="form-group">
                        <div className="col-sm-12">
                          <button className="btn btn-success">
                            {updateLoading ? (
                              <div>
                                <span
                                  className="spinner-border spinner-border-sm mr-1"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Loading..
                              </div>
                            ) : (
                              "Update Profile"
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
          {/* Column */}
        </div>
        {/* Row */}
        {/* End PAge Content */}
      </div>
    </div>
  );
}

export default Profile;
