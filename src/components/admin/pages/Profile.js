import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";

function Profile() {
  // State Variable
  const [profile, setProfile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const [data, setData] = useState({});
  const [isUpdated, setisUpdated] = useState(false)

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
    
    fetch("/admin/updateAdmin", {
      method: "PUT",
      body: JSON.stringify({...data, _id:profile._id}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
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
            if (result.bio)
              M.toast({ html: result.bio, classes: "bg-danger" });
            if (result.facebook)
              M.toast({ html: result.facebook, classes: "bg-danger" });
            if (result.twitter)
              M.toast({ html: result.twitter, classes: "bg-danger" });
            if (result.instagram)
              M.toast({ html: result.instagram, classes: "bg-danger" });
            if (result.youtube)
              M.toast({ html: result.youtube, classes: "bg-danger" });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // Fetching the data
  useEffect(() => {
    fetch("/admin/adminProfile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setIsLoaded(true);
            setProfile(result.data || {});
            setData(result.data)
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            setIsLoaded(true);
          }
        },
        (error) => {
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
          {/* <div className="col-md-7 col-4 align-self-center">
            <div className="d-flex m-t-10 justify-content-end">
              <div className="d-flex m-r-20 m-l-10 hidden-md-down">
                <div className="chart-text m-r-10">
                  <h6 className="m-b-0">
                    <small>THIS MONTH</small>
                  </h6>
                  <h4 className="m-t-0 text-info">$58,356</h4>
                </div>
                <div className="spark-chart">
                  <div id="monthchart"></div>
                </div>
              </div>
              <div className="d-flex m-r-20 m-l-10 hidden-md-down">
                <div className="chart-text m-r-10">
                  <h6 className="m-b-0">
                    <small>LAST MONTH</small>
                  </h6>
                  <h4 className="m-t-0 text-primary">$48,356</h4>
                </div>
                <div className="spark-chart">
                  <div id="lastmonthchart"></div>
                </div>
              </div>
              <div className="">
                <button className="right-side-toggle waves-effect waves-light btn-success btn btn-circle btn-sm pull-right m-l-10">
                  <i className="ti-settings text-white"></i>
                </button>
              </div>
            </div>
          </div> */}
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
                  {" "}
                  <img
                    src="../assets/images/users/5.jpg"
                    className="img-circle"
                    width="150"
                  />
                  <h4 className="card-title m-t-10">{profile.name}</h4>
                  <h6 className="card-subtitle">Accoubts Manager Amix corp</h6>
                  <div className="row text-center justify-content-md-center">
                    <div className="col-4">
                      <Link to="/" className="link">
                        <i className="icon-people"></i>{" "}
                        <font className="font-medium">254</font>
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link to="/" className="link">
                        <i className="icon-picture"></i>{" "}
                        <font className="font-medium">54</font>
                      </Link>
                    </div>
                  </div>
                </center>
              </div>
              <div>
                <hr />
              </div>
              <div className="card-body">
                {" "}
                <small className="text-muted">Email address </small>
                <h6>
                  <Link
                    to="https://www.wrappixel.com/cdn-cgi/l/email-protection"
                    className="__cf_email__"
                    data-cfemail="ddb5bcb3b3bcbab2abb8af9dbab0bcb4b1f3beb2b0"
                  >
                    {profile.email || "Not Available"}
                  </Link>
                </h6>
                <small className="text-muted p-t-30 db">Phone</small>
                <h6>{profile.mobile || "Not Available"}</h6>{" "}
                <small className="text-muted p-t-30 db">Address</small>
                <h6> {profile.address || "Not Available"} </h6>
                <div className="map-box">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508"
                    width="100%"
                    height="150"
                    frameborder="0"
                    style={{ border: "0" }}
                    allowfullscreen
                  ></iframe>
                </div>{" "}
                <small className="text-muted p-t-30 db">Social Profile</small>
                <br />
                <button className="btn btn-circle btn-secondary">
                  <i className="fa fa-facebook"></i>
                </button>
                <button className="btn btn-circle btn-secondary">
                  <i className="fa fa-twitter"></i>
                </button>
                <button className="btn btn-circle btn-secondary">
                  <i className="fa fa-youtube"></i>
                </button>
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
                  {" "}
                  <button
                    className="nav-link active outline-0 rounded-0"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                  >
                    Timeline
                  </button>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <button
                    className="nav-link outline-0 rounded-0"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                  >
                    Profile
                  </button>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <button
                    className="nav-link outline-0 rounded-0"
                    data-toggle="tab"
                    href="#settings"
                    role="tab"
                  >
                    Settings
                  </button>{" "}
                </li>
              </ul>
              {/* Tab panes */}
              <div className="tab-content">
                {/* First Tab */}
                <div className="tab-pane active" id="home" role="tabpanel">
                  <div className="card-body">
                    <div className="profiletimeline">
                      <div className="sl-item">
                        <div className="sl-left">
                          {" "}
                          <img
                            src="../assets/images/users/1.jpg"
                            alt="user"
                            className="img-circle"
                          />{" "}
                        </div>
                        <div className="sl-right">
                          <div>
                            <Link to="#" className="link">
                              John Doe
                            </Link>{" "}
                            <span className="sl-date">5 minutes ago</span>
                            <p>
                              assign a new task{" "}
                              <Link to="#"> Design weblayout</Link>
                            </p>
                            <div className="row">
                              <div className="col-lg-3 col-md-6 m-b-20">
                                <img
                                  src="../assets/images/big/img4.jpg"
                                  className="img-responsive radius"
                                />
                              </div>
                            </div>
                            <div className="like-comm">
                              {" "}
                              <Link to="/" className="link m-r-10">
                                2 comment
                              </Link>{" "}
                              <Link to="/" className="link m-r-10">
                                <i className="fa fa-heart text-danger"></i> 5
                                Love
                              </Link>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="sl-item">
                        <div className="sl-left">
                          {" "}
                          <img
                            src="../assets/images/users/2.jpg"
                            alt="user"
                            className="img-circle"
                          />{" "}
                        </div>
                        <div className="sl-right">
                          <div>
                            {" "}
                            <Link to="#" className="link">
                              John Doe
                            </Link>{" "}
                            <span className="sl-date">5 minutes ago</span>
                            <div className="m-t-20 row">
                              <div className="col-md-3 col-xs-12">
                                <img
                                  src="../assets/images/big/img1.jpg"
                                  alt="user"
                                  className="img-responsive radius"
                                />
                              </div>
                              <div className="col-md-9 col-xs-12">
                                <p>
                                  {" "}
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Integer nec odio. Praesent
                                  libero. Sed cursus ante dapibus diam.{" "}
                                </p>{" "}
                                <Link to="#" className="btn btn-success">
                                  {" "}
                                  Design weblayout
                                </Link>
                              </div>
                            </div>
                            <div className="like-comm m-t-20">
                              {" "}
                              <Link to="/" className="link m-r-10">
                                2 comment
                              </Link>{" "}
                              <Link to="/" className="link m-r-10">
                                <i className="fa fa-heart text-danger"></i> 5
                                Love
                              </Link>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="sl-item">
                        <div className="sl-left">
                          {" "}
                          <img
                            src="../assets/images/users/3.jpg"
                            alt="user"
                            className="img-circle"
                          />{" "}
                        </div>
                        <div className="sl-right">
                          <div>
                            <Link to="#" className="link">
                              John Doe
                            </Link>{" "}
                            <span className="sl-date">5 minutes ago</span>
                            <p className="m-t-10">
                              {" "}
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Integer nec odio. Praesent libero. Sed
                              cursus ante dapibus diam. Sed nisi. Nulla quis sem
                              at nibh elementum imperdiet. Duis sagittis ipsum.
                              Praesent mauris. Fusce nec tellus sed augue semper{" "}
                            </p>
                          </div>
                          <div className="like-comm m-t-20">
                            {" "}
                            <Link to="/" className="link m-r-10">
                              2 comment
                            </Link>{" "}
                            <Link to="/" className="link m-r-10">
                              <i className="fa fa-heart text-danger"></i> 5 Love
                            </Link>{" "}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="sl-item">
                        <div className="sl-left">
                          {" "}
                          <img
                            src="../assets/images/users/4.jpg"
                            alt="user"
                            className="img-circle"
                          />{" "}
                        </div>
                        <div className="sl-right">
                          <div>
                            <Link to="#" className="link">
                              John Doe
                            </Link>{" "}
                            <span className="sl-date">5 minutes ago</span>
                            <blockquote className="m-t-10">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                            </blockquote>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* second tab */}
                <div className="tab-pane" id="profile" role="tabpanel">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3 col-xs-6 b-r">
                        {" "}
                        <strong> {profile.name} </strong>
                        <br />
                        <p className="text-muted">Johnathan Deo</p>
                      </div>
                      <div className="col-md-3 col-xs-6 b-r">
                        {" "}
                        <strong>Mobile</strong>
                        <br />
                        <p className="text-muted">
                          {" "}
                          {profile.mobile || "Not Available"}{" "}
                        </p>
                      </div>
                      <div className="col-md-3 col-xs-6 b-r">
                        {" "}
                        <strong>Email</strong>
                        <br />
                        <p className="text-muted">
                          <Link
                            to="https://www.wrappixel.com/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="355f5a5d5b54415d545b755451585c5b1b565a58"
                          >
                            {" "}
                            {profile.email || "Not Available"}{" "}
                          </Link>
                        </p>
                      </div>
                      <div className="col-md-3 col-xs-6">
                        {" "}
                        <strong>Location</strong>
                        <br />
                        <p className="text-muted">London</p>
                      </div>
                    </div>
                    <hr />
                    <p className="m-t-30"> {profile.bio || "Not Available"} </p>

                    <h4 className="font-medium m-t-30">Social Profile</h4>
                    <hr />
                  </div>
                </div>

                {/* Setting (Third) Tab */}
                <div className="tab-pane" id="settings" role="tabpanel">
                  <div className="card-body">
                    <form className="form-horizontal form-material" onSubmit={updateSubmitHandler}>
                      <div className="form-group px-3">
                        <label className="">Full Name</label>
                        <input
                          type="text"
                          name={"name"}
                          value={data.name}
                          onChange={updateChangeHandler}
                          placeholder="Johnathan Doe"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Email</label>
                        <input
                          type="email"
                          name={"email"}
                          value={data.email}
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
                          value={data.mobile}
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
                          value={data.address}
                          onChange={updateChangeHandler}
                          placeholder="Addredd"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Facebook</label>
                        <input
                          type="url"
                          name={"facebook"}
                          value={data.facebook}
                          onChange={updateChangeHandler}
                          placeholder="Johnathan Doe"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Twiter</label>
                        <input
                          type="url"
                          name={"twitter"}
                          value={data.twitter}
                          onChange={updateChangeHandler}
                          placeholder="Johnathan Doe"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Instagram</label>
                        <input
                          type="url"
                          name={"instagram"}
                          value={data.instagram}
                          onChange={updateChangeHandler}
                          placeholder="Johnathan Doe"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Youtube</label>
                        <input
                          type="url"
                          name={"youtube"}
                          value={data.youtube}
                          onChange={updateChangeHandler}
                          placeholder="Johnathan Doe"
                          className="form-control form-control-line"
                        />
                      </div>
                      <div className="form-group px-3">
                        <label className="">Bio</label>
                        <textarea
                          rows="5"
                          name={"bio"}
                          value={data.bio}
                          onChange={updateChangeHandler}
                          className="form-control form-control-line"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <div className="col-sm-12">
                          <button className="btn btn-success">
                            Update Profile
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
