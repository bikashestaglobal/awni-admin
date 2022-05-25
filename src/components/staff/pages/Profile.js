import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { StaffContext } from "../StaffRoutes";
import Config from '../../../components/config/Config'
import M from 'materialize-css';
import { storage } from "../../../firebase/FirebaseConfig";
import uniqid from 'uniqid';

function Profile() {
  const { state, dispatch } = useContext(StaffContext);
  // State Variable
  const [profile, setProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [profileImgDef, setProfileImgDef] = useState("");
  const [progress, setProgress] = useState(0);

  const [data, setData] = useState({});
  const [isUpdated, setisUpdated] = useState(false);

  // For Image
  const imgChangeHandler = e => {
    if (e.target.files[0]) {
      handleUpload(renameFile(e.target.files[0]));
      let reader = new FileReader();
      reader.onload = (evt) => {
        setProfileImgDef(evt.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function renameFile(originalFile) {
    const newName = uniqid() + originalFile.name;
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  // Upload Image
  const handleUpload = (image) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // Update Database
            fetch(Config.SERVER_URL + "/staff/updateProfile", {
              method: "PUT",
              body: JSON.stringify({ ...data, photo: url }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
              },
            })
              .then((res) => res.json())
              .then(
                (result) => {
                  if (result.success) {
                    setProfile({ ...profile, photo: result.data.photo });
                    M.toast({ html: result.message, classes: "bg-success" });
                    localStorage.setItem("staff", JSON.stringify(result.data))
                    dispatch({ type: "STAFF", payload: result.data })
                    setisUpdated(true);

                  } else {
                    if (result.message)
                      M.toast({ html: result.message, classes: "bg-danger" });
                  }
                },
                (error) => {
                  M.toast({ html: error, classes: "bg-danger" });
                }
              );
          });
      }
    );
  };

  const deleteImageHandler = (image) => {
    const storageRef = storage.refFromURL(image);
    storageRef.delete().then(() => {
      M.toast({ html: "Image Deleted Successfully", classes: "bg-success" });
    }).catch((error) => {
      M.toast({ html: "Image not Deleted", classes: "bg-danger" });
    });

    // Update State
    setProfile({ ...profile, photo: "" });
    // // Update Database
    fetch(Config.SERVER_URL + "/staff/updateProfile", {
      method: "PUT",
      body: JSON.stringify({ ...data, photo: "" }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            localStorage.setItem("branch", JSON.stringify(result.data))
            dispatch({ type: "BRANCH", payload: result.data })
            setisUpdated(true);
          } else {
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }

  // Update change handler
  const updateChangeHandler = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setData({ ...data, [name]: value });
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setisUpdated(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/staff/updateProfile", {
      method: "PUT",
      body: JSON.stringify({ ...data, _id: profile._id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            localStorage.setItem("staff", JSON.stringify(result.data))
            dispatch({ type: "STAFF", payload: result.data })
            setisUpdated(true);
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.email)
              M.toast({ html: result.email, classes: "bg-danger" });
            if (result.mobile)
              M.toast({ html: result.mobile, classes: "bg-danger" });
            if (result.address)
              M.toast({ html: result.address, classes: "bg-danger" });

            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" })
          console.log(error);
        }
      );
  };

  // Fetching the data
  useEffect(() => {
    fetch(Config.SERVER_URL + "/staff/myProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_staff_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setIsLoaded(true);
            setProfile(result.data || {});
            setData(result.data);
            dispatch({ type: "STAFF", payload: result.data });
          } else {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsLoaded(true);
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsLoaded(true);
        }
      );
  }, [isUpdated]);

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
                  <div style={{ height: "0px", overflow: "hidden" }}>
                    <input
                      type="file"
                      id="fileInput"
                      name="fileInput"
                      onChange={imgChangeHandler}
                    />
                  </div>

                  {/* If photo have or not */}
                  {profile.photo ? (<span
                    className={"mdi mdi-close-circle h1 text-danger edit-profile-btn"}
                    onClick={() => deleteImageHandler(profile.photo)}
                  ></span>)
                    : (<span
                      className={"mdi mdi-pencil h1 text-info edit-profile-btn"}
                      onClick={() => $("#fileInput").click()}
                    ></span>)}

                  <img
                    src={profile.photo || profileImgDef}
                    className="user-profile-img shadow-sm"
                    width="150"
                  />

                  {/* Progress Bar */}
                  <span>
                    {
                      progress ? <div className="progress mt-2">
                        <div className="progress-bar bg-success" style={{ width: `${progress}%`, height: "15px" }} role="progressbar"> {progress}% </div>
                      </div> : ""
                    }
                  </span>


                  <h4 className="card-title m-t-10">{profile.name}</h4>
                  <h6 className="card-subtitle"> Bio: {profile.bio || 'Not Available'} </h6>
                  <div className="row text-center justify-content-md-center">

                  </div>
                </center>
              </div>
              <div>


                <hr />
              </div>
              <div className="card-body">
                <small className="text-muted">Email address </small>
                <h6>
                  {profile.email || "Not Available"}
                </h6>
                <small className="text-muted p-t-30 db">Phone</small>
                <h6>{profile.mobile || "Not Available"}</h6>
                <small className="text-muted p-t-30 db">Address</small>
                <h6> {profile.address || "Not Available"} </h6>

                <small className="text-muted p-t-30 db">Social Profile</small>
                <br />
                {profile.twitter && (
                  <a
                    target={"_blank"}
                    href={profile.twitter}
                    className="btn btn-circle btn-secondary"
                  >
                    <i className="mdi mdi-twitter"></i>
                  </a>
                )}

                {profile.facebook && (
                  <a
                    target={"_blank"}
                    href={profile.facebook}
                    className="btn btn-circle btn-secondary"
                  >
                    <i className="mdi mdi-facebook"></i>
                  </a>
                )}
                {profile.instagram && (
                  <a
                    target={"_blank"}
                    href={profile.instagram}
                    className="btn btn-circle btn-secondary"
                  >
                    <i className="mdi mdi-instagram"></i>
                  </a>
                )}

                {profile.youtube && (
                  <a
                    target={"_blank"}
                    href={profile.youtube}
                    className="btn btn-circle btn-secondary"
                  >
                    <i className="mdi mdi-youtube-play"></i>
                  </a>
                )}
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
                      <div className="col-md-3 col-xs-6 b-r">
                        <strong>Name </strong>
                        <br />
                        <p className="text-muted"> {profile.name}</p>
                      </div>
                      <div className="col-md-3 col-xs-6 b-r">
                        <strong>Mobile</strong>
                        <br />
                        <p className="text-muted">
                          {profile.mobile || "Not Available"}
                        </p>
                      </div>
                      <div className="col-md-3 col-xs-6 b-r">
                        <strong>Email</strong>
                        <br />
                        <p className="text-muted">
                          <a
                            href={`mailto:${profile.email}`}
                            className="__cf_email__"
                            data-cfemail="355f5a5d5b54415d545b755451585c5b1b565a58"
                          >
                            {profile.email || "Not Available"}
                          </a>
                        </p>
                      </div>
                      <div className="col-md-3 col-xs-6">
                        <strong>Address</strong>
                        <br />
                        <p className="text-muted">
                          {profile.address || "Not Available"}
                        </p>
                      </div>
                      <div className="col-md-12 col-xs-6">
                        <hr />
                        <strong>Bio</strong>
                        <p className="text-muted">
                          {" "}
                          {profile.bio || "Not Available"}{" "}
                        </p>
                      </div>
                    </div>
                    <hr />

                    <h4 className="font-medium m-t-30">Social Profile</h4>
                    {profile.twitter && (
                      <a
                        target={"_blank"}
                        href={profile.twitter}
                        className="btn btn-circle btn-secondary"
                      >
                        <i className="mdi mdi-twitter"></i>
                      </a>
                    )}

                    {profile.facebook && (
                      <a
                        target={"_blank"}
                        href={profile.facebook}
                        className="btn btn-circle btn-secondary"
                      >
                        <i className="mdi mdi-facebook"></i>
                      </a>
                    )}
                    {profile.instagram && (
                      <a
                        target={"_blank"}
                        href={profile.instagram}
                        className="btn btn-circle btn-secondary"
                      >
                        <i className="mdi mdi-instagram"></i>
                      </a>
                    )}

                    {profile.youtube && (
                      <a
                        target={"_blank"}
                        href={profile.youtube}
                        className="btn btn-circle btn-secondary"
                      >
                        <i className="mdi mdi-youtube-play"></i>
                      </a>
                    )}
                    <hr />
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
                          value={data.name || ""}
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
                          placeholder="coderakash@coder.com"
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
                      <div className="form-group px-3">
                        <label className="">Address</label>
                        <input
                          type="text"
                          name={"address"}
                          value={data.address || ""}
                          onChange={updateChangeHandler}
                          placeholder="Address Here!"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Facebook</label>
                        <input
                          type="url"
                          name={"facebook"}
                          value={data.facebook || ""}
                          onChange={updateChangeHandler}
                          placeholder="Ex: https://facebook.com/user-name"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Twitter</label>
                        <input
                          type="url"
                          name={"twitter"}
                          value={data.twitter || ""}
                          onChange={updateChangeHandler}
                          placeholder="Ex: https://twitter.com/user-name"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Instagram</label>
                        <input
                          type="url"
                          name={"instagram"}
                          value={data.instagram || ""}
                          onChange={updateChangeHandler}
                          placeholder="Ex: https://instagram.com/user-name"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Youtube</label>
                        <input
                          type="url"
                          name={"youtube"}
                          value={data.youtube || ""}
                          onChange={updateChangeHandler}
                          placeholder="Ex: https://youtube.com/user-name"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Bio</label>
                        <textarea
                          rows="5"
                          name={"bio"}
                          value={data.bio || ""}
                          onChange={updateChangeHandler}
                          className="form-control form-control-line"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <div className="col-sm-12">
                          {state && state.profile.updateProfile ? <button className="btn btn-success">
                            Update Profile
                          </button> : <button type={"button"} disabled title={"Permission Required"} className="btn btn-success">
                            Update Profile
                          </button>}
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
