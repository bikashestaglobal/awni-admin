import React, { useState, useEffect } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../config/Config"

//  Component Function
const Subject = (props) => {
  const [addingFormData, setAddingFormData] = useState({
    name: "",
    comment: "",
    session: localStorage.getItem("branchSession") || ""
  });

  const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "")
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllSubjectLoaded, setIsAllSubjectLoaded] = useState(true);
  const [allSubject, setAllSubject] = useState([]);
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
    fetch(Config.SERVER_URL+"/branch/updateSubject", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
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
            if (result.comment)
              M.toast({ html: result.comment, classes: "bg-danger" });
            if (result.status)
              M.toast({ html: result.status, classes: "bg-danger" });
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
    const deleteData = {
      _id: deleteId,
    };

    fetch(Config.SERVER_URL+"/branch/deleteSubject", {
      method: "DELETE",
      body: JSON.stringify(deleteData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
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

    fetch(Config.SERVER_URL+"/branch/addSubject", {
      method: "POST",
      body: JSON.stringify(addingFormData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
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
              comment: "",
            });
          } else {
            if (result.name)
              M.toast({ html: result.name, classes: "bg-danger" });
            if (result.session)
              M.toast({ html: result.session, classes: "bg-danger" });
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

  // Get Data From Database
  useEffect(() => {
    setIsAllSubjectLoaded(true);
    fetch(Config.SERVER_URL+"/branch/searchSubject?session=" + selectedSession, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllSubjectLoaded(false);
          if (result.success) {
            setAllSubject(result.data || []);
            console.log(allSubject);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllSubjectLoaded(false);
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
            <h3 className="text-themecolor m-b-0 m-t-0">Subject</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/branch">Subject</Link>
              </li>
              <li className="breadcrumb-item active">Subject</li>
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
                  <h4 className="float-left">Subject Data</h4>

                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-info float-right rounded-0"
                    data-toggle="modal"
                    data-target="#addModal"
                  >
                    <span className={"fas fa-plus"}></span> Subject
                  </button>
                </div>
              </div>
            </div>

            {/* Data */}
            {!isAllSubjectLoaded?
            <div className="card border-0 rounded-0 m-0 py-1">
            {allSubject.length?<div className="card-body py-0">
              <div className="">
                <table
                  id="myTable2"
                  className="table table-bordered table-striped my-0"
                >
                  <thead>
                    <tr>
                      <th>#SN</th>
                      <th>Subject Name</th>
                      <th>Comment</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSubject.map((result, index) => {
                      return (
                        <tr key={result._id}>
                          <td> {++index} </td>
                          <td> {result.name} </td>
                          
                          <td> {result.comment} </td>

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
                                data-target="#updateModal"
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
          <div className={"alert alert-danger mx-3 rounded-0 border-0 py-2"}>No Data Available</div>
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
                  <h4 className={"text-theme"}>Add Subject</h4>
                  <div className={"devider"}/>
                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >
                   
                    {/* Subject Name */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Subject Name</label>
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
                        placeholder={"Physics/Chemistry"}
                      />
                    </div>

                    {/* Comments */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Comment</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setAddingFormData({
                            ...addingFormData,
                            comment: evt.target.value,
                          })
                        }
                        value={addingFormData.comment}
                        className="form-control"
                        placeholder={"Comment Here"}
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
            id="updateModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-0">
                <div className="modal-body">
                  <h4 className={"text-theme"}>Update Subject</h4>
                  <div className={"devider"}/>
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Subject Name */}
                    <div className={"form-group my-3"}>
                      <label className={"text-dark h6"}>Subject Name</label>
                      <input
                        type="text"
                        onChange={(evt)=>setData({...data, name: evt.target.value})}
                        className="form-control border"
                        value={data.name}
                        placeholder={"Physics/Chemistry..."}
                      />
                    </div>
                    

                    {/* Comment */}
                    <div className={"form-group"}>
                      <label className={"text-dark h6"}>Comments</label>
                      <input
                        type="text"
                        value={data.comment}
                        onChange={(evt)=>setData({...data, comment: evt.target.value})}
                        className="form-control"
                        placeholder={"Comments Here!!"}
                      />
                    </div>

                    {/* Status */}
                    <div className={"form-group"}>
                      <label className={"text-dark h6"}>Select Status!</label>
                      <select
                        className="form-control"
                        onChange={(evt)=>setData({...data, status: evt.target.value})}
                      >
                        
                        <option value={""} disabled selected hidden> Select Status </option>
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
            aria-labelledby="updateModalLabel"
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
                    All data that connected with this Subject will be automatically deleted.
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

export default Subject;
