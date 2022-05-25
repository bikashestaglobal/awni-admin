import React, { useState, useEffect } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../config/Config"

//  Component Function
const Branch = (props) => {
  const [addingFormData, setAddingFormData] = useState({
    name: "",
    branch_name: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
  });
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllBranchLoaded, setIsAllBranchLoaded] = useState(true);
  const [allBranch, setAllBranch] = useState([]);
  const [data, setData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Update the state while clicking the edit button
  const updateState = (list) => {
    setData(list);
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false)
    evt.preventDefault();
    data.password = undefined
    fetch(Config.SERVER_URL+"/admin/updateBranch", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsUpdateLaoded(true)
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsUpdated(true);
            $("#closeUpdateModalButton").click();
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.branch_name)
              M.toast({ html: result.branch_name, classes: "bg-danger" });
            if (result.email)
              M.toast({ html: result.email, classes: "bg-danger" });
            if (result.mobile)
              M.toast({ html: result.mobile, classes: "bg-danger" });
            if (result.status)
              M.toast({ html: result.status, classes: "bg-danger" });
            if (result.address)
              M.toast({ html: result.address, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsUpdateLaoded(true)
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Delete Submit Handler
  const deleteSubmitHandler = () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false)
    const branchData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL+"/admin/deleteBranch", {
      method: "DELETE",
      body: JSON.stringify(branchData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsDeleteLaoded(true)
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsDeleted(true);
            $("#closeDeleteModalButton").click();
            setDeleteId("");
          } else {
            if (result.Id) M.toast({ html: result._id, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsDeleteLaoded(true)
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAdded(false);
    setIsAddLaoded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL+"/admin/addBranch", {
      method: "POST",
      body: JSON.stringify(addingFormData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAddLaoded(true);
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            $("#closeAddModalButton").click();
            setIsAdded(true);
            setAddingFormData({
              name: "",
              branch_name: "",
              email: "",
              mobile: "",
              password: "",
              address: "",
            });
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.branch_name)
              M.toast({ html: result.branch_name, classes: "bg-danger" });
            if (result.email)
              M.toast({ html: result.email, classes: "bg-danger" });
            if (result.mobile)
              M.toast({ html: result.mobile, classes: "bg-danger" });
            if (result.password)
              M.toast({ html: result.password, classes: "bg-danger" });
            if (result.address)
              M.toast({ html: result.address, classes: "bg-danger" });
            if (result.message)
              M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsAddLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Change Handler While Udating the Data
  const changeHandler = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setData({ ...data, [name]: value });
  };

  // Get Data From Database
  useEffect(() => {
    setIsAllBranchLoaded(true);
    fetch(Config.SERVER_URL+"/admin/searchBranch", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllBranchLoaded(false);
          if (result.success) {
            setAllBranch(result.data || []);
            console.log(allBranch);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsAllBranchLoaded(false);
        }
      );
  }, [isAdded, isUpdated, isDeleted]);

  // Return function
  return (
    <div className="page-wrapper">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Branch</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Branch</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        <div className={"row"}>
          <div className={"col-md-12"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left">Branch Data</h4>

                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    <span className={"fas fa-plus"}></span> Branch
                  </button>
                </div>
              </div>
            </div>

            {/* Data */}
            {!isAllBranchLoaded?
            <div className="card border-0 rounded-0 m-0 py-1">
            {allBranch.length?<div className="card-body py-0">
              <div className="">
                <table
                  id="myTable2"
                  className="table table-bordered table-striped my-0"
                >
                  <thead>
                    <tr>
                      <th>#SN</th>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Branch Name</th>
                      <th>Email</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBranch.map((result, index) => {
                      return (
                        <tr key={result._id}>
                          <td> {++index} </td>
                          <td> {result.name} </td>
                          <td> {result.mobile} </td>
                          <td> {result.branch_name} </td>
                          <td> {result.email} </td>

                          <td> {result.created_date} </td>
                          <td>{result.status ? <span className={"badge badge-info"}>Active</span> : <span className={"badge badge-danger"}>Disable</span>}</td>
                          <td>
                            <div
                              className="btn-group btn-group-xs"
                              role="group"
                            >
                              <button
                                type="button"
                                className="btn btn-info footable-edit rounded-0"
                                data-toggle="modal"
                                data-target="#updateModel"
                                onClick={() => updateState(result)}
                              >
                                <span
                                  className="fas fa-pencil-alt"
                                  aria-hidden="true"
                                ></span>
                              </button>
                              <button
                                type="button"
                                className="ml-2 btn btn-danger footable-delete rounded-0"
                                data-toggle="modal"
                                data-target="#deleteModal"
                                onClick={(evt) => setDeleteId(result._id)}
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
          :
          <div className={"alert alert-danger mx-3 rounded-0 border-0 py-2"}>No Branch Available</div>
          }
          </div>
            :
            <div className={"bg-white p-3 text-center"}>
            <span
              className="spinner-border spinner-border-sm mr-1"
              role="status"
              aria-hidden="true"
            ></span>
            Loading..
          </div>
            }
            
          </div>
        </div>

        {/* -- Modal Designing -- */}
        <div>
          {/* -- Add Modal -- */}
          <div className="modal fade" id="addModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Add Branch</h4>
                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Name Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            name: evt.target.value,
                          })
                        }
                        value={addingFormData.name}
                        className="form-control"
                        placeholder={"Enter Name!"}
                      />
                    </div>

                    {/* Branch Name Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            branch_name: evt.target.value,
                          })
                        }
                        value={addingFormData.branch_name}
                        className="form-control"
                        placeholder={"Enter Branch Name!"}
                      />
                    </div>

                    {/* Branch Address Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            address: evt.target.value,
                          })
                        }
                        value={addingFormData.address}
                        className="form-control"
                        placeholder={"Enter Branch Address!"}
                      />
                    </div>

                    {/* Branch Mobile Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            mobile: evt.target.value,
                          })
                        }
                        value={addingFormData.mobile}
                        className="form-control"
                        placeholder={"Enter Mobile!"}
                      />
                    </div>

                    {/* Email Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            email: evt.target.value,
                          })
                        }
                        value={addingFormData.email}
                        className="form-control"
                        placeholder={"Enter Email!"}
                      />
                    </div>

                    {/* Password Here */}
                    <div className={"form-group mb-3"}>
                      <input
                        type="password"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            password: evt.target.value,
                          })
                        }
                        value={addingFormData.password}
                        className="form-control"
                        placeholder={"Enter Password!"}
                      />
                    </div>

                    <div className={"form-group"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isAddLaoded ? (
                          <div>
                            <i className="fas fa-plus"></i> Add
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

                      <button
                        className="btn btn-secondary rounded-0 ml-2"
                        data-dismiss="modal"
                        id={"closeAddModalButton"}
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
            id="updateModel"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModelLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4>Update Branch</h4>
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Name */}
                    <div className={"form-group my-3"}>
                      <label className={"text-success"}>Name here!</label>
                      <input
                        type="text"
                        onChange={(evt)=>setData({...data, name: evt.target.value})}
                        className="form-control border"
                        value={data.name}
                        placeholder={"Name Here!"}
                      />
                    </div>
                    
                    {/* Branch name */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Branch Name here!</label>
                      <input
                        type="text"
                        value={data.branch_name}
                        onChange={(evt)=>setData({...data, branch_name: evt.target.value})}
                        className="form-control"
                        placeholder={"Branch Name Here!!"}
                      />
                    </div>

                    {/* Email */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Email here!</label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(evt)=>setData({...data, email: evt.target.value})}
                        className="form-control"
                        placeholder={"Email Here!!"}
                      />
                    </div>

                    {/* Mobile */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Mobile here!</label>
                      <input
                        type="number"
                        value={data.mobile}
                        onChange={(evt)=>setData({...data, mobile: evt.target.value})}
                        className="form-control"
                        placeholder={"Mobile Here!!"}
                      />
                    </div>

                    {/* Address */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Address here!</label>
                      <input
                        type="text"
                        value={data.address}
                        onChange={(evt)=>setData({...data, address: evt.target.value})}
                        className="form-control"
                        placeholder={"Address Here!!"}
                      />
                    </div>

                    {/* Status */}
                    <div className={"form-group"}>
                      <label className={"text-success"}>Select Status!</label>
                      <select
                        className="form-control"
                        onChange={(evt)=>setData({...data, status: evt.target.value})}
                      >
                        
                        <option value={""}> Select Status </option>
                        <option value={true} selected={data.status?"selected":""} > Active </option>
                        <option value={false} selected={data.status?"":"selected"}> Disable </option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className={"form-group"}>
                      <button
                        className="btn btn-info rounded-0"
                        type={"submit"}
                      >
                        {isUpdateLaoded ? (
                          <div>
                            <i className="fas fa-refresh"></i> Update
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
                      <button
                        className="btn btn-secondary rounded-0 ml-2"
                        data-dismiss="modal"
                        id={"closeUpdateModalButton"}
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
            id="deleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModelLabel"
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
                  <p className={"badge badge-warning"}>
                    All data that connected with this Branch will be automatically deleted.
                  </p>
                  <div className={"form-group"}>
                    <button
                      className="btn btn-info rounded-0 px-3"
                      type={"submit"}
                      onClick={deleteSubmitHandler}
                    >
                      {isDeleteLaoded ? (
                          <div>
                            <i className="fas fa-trash"></i> Yes
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
                    <button
                      className="btn btn-secondary rounded-0 ml-2 px-3"
                      data-dismiss="modal"
                      id={"closeDeleteModalButton"}
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

export default Branch;
