import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";

const EditEnquiry = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [enquiryLoading, setEnquiryLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
  });

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    evt.preventDefault();
    setIsUpdateLoaded(false);
    const updateData = {
      name: formData.name,
      email: formData.email,
      message: formData.message || undefined,
      status: formData.status,
    };
    fetch(`${Config.SERVER_URL}/enquiries/${id}`, {
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
          setIsUpdateLoaded(true);
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            history.goBack();
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
          }
        },
        (error) => {
          setIsUpdateLoaded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // get Records
  useEffect(() => {
    setEnquiryLoading(true);
    fetch(`${Config.SERVER_URL}/enquiries/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            setFormData(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          setEnquiryLoading(false);
        },
        (error) => {
          setEnquiryLoading(false);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ============================================================== --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">Edit Enquiry</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Admin</a>
              </li>
              <li className="breadcrumb-item active">Edit Enquiry</li>
            </ol>
          </div>
        </div>

        {/* Edit ENQUIRY Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={updateSubmitHandler}
              className="form-horizontal form-material"
            >
              {/* ENQUIRY Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <button
                    className="btn btn-info"
                    type="button"
                    onClick={(evt) => {
                      history.goBack();
                    }}
                  >
                    <i className="fa fa-arrow-left"></i> Go Back
                  </button>
                </div>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>ENQUIRY Details</h3>
                </div>
                {enquiryLoading ? (
                  <div className={"bg-white p-3 col-md-12 text-center"}>
                    <span
                      className="spinner-border spinner-border-sm mr-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading..
                  </div>
                ) : (
                  <>
                    {/* CUSTOMER NAME */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        CUSTOMER NAME!
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(evt) =>
                          setFormData({ ...formData, name: evt.target.value })
                        }
                        className="form-control"
                        placeholder={"Rahul "}
                      />
                    </div>

                    {/* CUSTOMER EMAIL */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        CUSTOMER EMAIL!
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(evt) =>
                          setFormData({ ...formData, email: evt.target.value })
                        }
                        className="form-control"
                        placeholder={"rahul@gmail.com "}
                      />
                    </div>

                    {/* CUSTOMER QUERY */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        CUSTOMER QUERY!
                      </label>
                      <input
                        type="text"
                        value={formData.message}
                        onChange={(evt) =>
                          setFormData({
                            ...formData,
                            message: evt.target.value,
                          })
                        }
                        className="form-control"
                        placeholder={"rahul@gmail.com "}
                      />
                    </div>

                    {/* ENQUIRY STATUS */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        ENQUIRY STATUS!
                      </label>
                      <select
                        value={formData.status}
                        onChange={(evt) =>
                          setFormData({ ...formData, status: evt.target.value })
                        }
                        className="form-control"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="REPLIED">REPLIED</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </div>

                    <div className={"form-group col-md-12"}>
                      <button
                        className="btn btn-info rounded px-3 py-2"
                        type={"submit"}
                      >
                        {isUpdateLoaded ? (
                          <div>
                            <i className="fas fa-plus"></i> Update
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
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEnquiry;
