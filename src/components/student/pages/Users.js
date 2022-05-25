import React, { useEffect, useState } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";

const Users = (props) => {
  // Creating the state variable
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});

  // Title CHange Handler
  const titleChangeHandler = (evt) => {
    const value = evt.target.value;
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setisUpdated(false);
    evt.preventDefault();
    const userData = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      status: data.status,
      _id: data._id,
    };

    fetch("/admin/updateUser", {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            setisUpdated(true);
            $("#closeUpdateButton").click();
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.email)
              M.toast({ html: result.email, classes: "bg-danger" });
            if (result.mobile)
              M.toast({ html: result.mobile, classes: "bg-danger" });
            if (result.status)
              M.toast({ html: result.status, classes: "bg-danger" });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // Change Handler
  const changeHandler = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setData({ ...data, [name]: value });
  };

  // Update the state while clicking the edit button
  const updateState = (list) => {
    setData(list);
  };

  // Fetching the data
  useEffect(() => {
    fetch("/admin/allUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setIsLoaded(true);
            setUsers(result.data || []);
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
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Users</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
              <Link to="/admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">User</li>
            </ol>
          </div>
          {/* <div className="col-md-7 col-4 align-self-center">
              <div className="d-flex m-t-10 justify-content-end">
                  <div className="d-flex m-r-20 m-l-10 hidden-md-down">
                      <div className="chart-text m-r-10">
                          <h6 className="m-b-0"><small>THIS MONTH</small></h6>
                          <h4 className="m-t-0 text-info">$58,356</h4></div>
                      <div className="spark-chart">
                          <div id="monthchart"></div>
                      </div>
                  </div>
                  <div className="d-flex m-r-20 m-l-10 hidden-md-down">
                      <div className="chart-text m-r-10">
                          <h6 className="m-b-0"><small>LAST MONTH</small></h6>
                          <h4 className="m-t-0 text-primary">$48,356</h4></div>
                      <div className="spark-chart">
                          <div id="lastmonthchart"></div>
                      </div>
                  </div>
                  <div className="">
                      <button className="right-side-toggle waves-effect waves-light btn-success btn btn-circle btn-sm pull-right m-l-10"><i className="ti-settings text-white"></i></button>
                  </div>
              </div>
          </div> */}
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        <div className={"row"}>
          <div className={"col-md-8"}>
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
 
            </div>
            <div className="card border-0 rounded-0 m-0 py-1">
              <div className="card-body py-0">
                <div className="">
                  <table
                    id="myTable1"
                    className="table table-bordered table-striped my-0"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Photo</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoaded && (
                        <tr>
                          <td colSpan={5}>Loading....</td>
                        </tr>
                      )}

                      {users.map((list, index) => {
                        return (
                          <tr key={index}>
                            <td> {list.name} </td>
                            <td> <img src={list.photo || "https://nichemodels.co/wp-content/uploads/2019/03/user-dummy-pic.png"} className={"comment-profile-img"} /> </td>
                            <td> {list.email} </td>
                            <td> {list.mobile} </td>
                            <td>
                              {" "}
                              {list.status ? (
                                <span>Active</span>
                              ) : (
                                <span>Disabled</span>
                              )}{" "}
                            </td>
                            <td>
                              <div
                                className="btn-group btn-group-xs"
                                role="group"
                              >
                                <button
                                  type="button"
                                  className="btn btn-info footable-edit rounded-0"
                                  data-toggle="modal"
                                  onClick={() => {
                                    updateState(list);
                                  }}
                                  data-target="#updateUserModel"
                                >
                                  <span
                                    className="fas fa-pencil-alt"
                                    aria-hidden="true"
                                  ></span>
                                </button>{" "}
                                <button
                                  type="button"
                                  className="ml-2 btn btn-danger footable-delete rounded-0"
                                  data-toggle="modal"
                                  data-target="#deleteUserModel"
                                >
                                  <span
                                    className="fas fa-trash-alt"
                                    aria-hidden="true"
                                  ></span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -- Model Designing -- */}
        <div>
          {/* -- Add Modal -- */}
          <div className="modal fade" id="addUserModel">
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Add Category</h4>
                  <form className="form-horizontal form-material">
                    <div className={"form-group mb-3"}>
                      <input
                        type="email"
                        onChange={titleChangeHandler}
                        className="form-control"
                        placeholder={"Title Here!"}
                      />
                    </div>
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        id={"slug"}
                        className="form-control"
                        placeholder={"Slug Here!!"}
                      />
                    </div>

                    <div className={"form-group mb-3"}>
                      <select className="form-control">
                        <option value={"Active"}> Active </option>
                        <option value={"Disable"}> Disable </option>
                      </select>
                    </div>

                    <div className={"form-group"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-secondary rounded-0 ml-2"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Update Modal -- */}
          <div
            className="modal fade"
            id="updateUserModel"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addUserModelLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Update User</h4>
                  <form onSubmit={updateSubmitHandler} className="form-horizontal form-material">
                    <div className={"form-group my-3"}>
                      <input
                        type="text"
                        name={"name"}
                        onChange={changeHandler}
                        className="form-control"
                        value={data.name}
                        placeholder={"Name Here!"}
                      />
                    </div>

                    <div className={"form-group"}>
                      <input
                        type="email"
                        name={"email"}
                        value={data.email}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder={"Email Here!!"}
                      />
                    </div>

                    <div className={"form-group"}>
                      <input
                        type="number"
                        name={"mobile"}
                        value={data.mobile}
                        onChange={changeHandler}
                        className="form-control"
                        placeholder={"Number Here!!"}
                      />
                    </div>

                    <div className={"form-group"}>
                      <select
                        className="form-control"
                        name={"status"}
                        onChange={changeHandler}
                      >
                        <option value={true}> Active </option>
                        <option value={false}> Disable </option>
                      </select>
                    </div>

                    <div className={"form-group"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-secondary rounded-0 ml-2"
                        data-dismiss="modal"
                        id={"closeUpdateButton"}
                        onClick={(e) => e.preventDefault()}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Delete Modal -- */}
          <div
            className="modal fade"
            id="deleteUserModel"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addUserModelLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body text-center">
                  <img
                    style={{ width: "150px" }}
                    className={"img img-fluid"}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5R1g82DqzH4itsxpVCofNGWbAzKN_PJDBew&usqp=CAU"
                    }
                  />
                  <h4 className={"text-center mt-2"}>Do You Want to Delete?</h4>
                  <p>
                    When you delete the User all the Business is also deleted
                    connected with this User
                  </p>
                  <div className={"form-group"}>
                    <button
                      className="btn btn-info rounded-0 px-3"
                      type={"submit"}
                    >
                      Yes
                    </button>
                    <button
                      className="btn btn-secondary rounded-0 ml-2 px-3"
                      data-dismiss="modal"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
