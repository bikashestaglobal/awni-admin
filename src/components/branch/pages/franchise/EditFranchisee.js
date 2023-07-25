import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";

const EditFranchisee = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [franchiseeLoading, setfranchiseeLoading] = useState(true);
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
      mobile: formData.mobile || undefined,
      address: formData.address || undefined,
      occupation: formData.occupation || undefined,
      interested_city: formData.interested_city || undefined,
      work_profile: formData.work_profile || undefined,
    };
    fetch(`${Config.SERVER_URL}/franchisee/${id}`, {
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
    setfranchiseeLoading(true);
    fetch(`${Config.SERVER_URL}/franchisee/${id}`, {
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
          setfranchiseeLoading(false);
        },
        (error) => {
          setfranchiseeLoading(false);
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
            <h3 className="text-themecolor">Edit Franchisee</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Edit Franchisee</li>
            </ol>
          </div>
        </div>

        {/* Edit Franchisee Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={updateSubmitHandler}
              className="form-horizontal form-material"
            >
              {/* Franchisee Details */}
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
                  <h3 className={"my-3 text-info"}>Franchisee Details</h3>
                </div>
                {franchiseeLoading ? (
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
                    {/* Full Name */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        Full Name!
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

                    {/* EMAIL ADDRESS */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        EMAIL ADDRESS!
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

                    {/* MOBILE */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        MOBILE NUMBER !
                      </label>
                      <input
                        type="text"
                        value={formData.mobile}
                        onChange={(evt) =>
                          setFormData({
                            ...formData,
                            mobile: evt.target.value,
                          })
                        }
                        className="form-control"
                        placeholder={"rahul@gmail.com "}
                      />
                    </div>

                    {/* ADDRESS */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        ADDRESS !
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(evt) =>
                          setFormData({
                            ...formData,
                            address: evt.target.value,
                          })
                        }
                        className="form-control"
                        placeholder={"Address"}
                      />
                    </div>

                    {/* OCCUPATION */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        OCCUPATION !
                      </label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(evt) =>
                          setFormData({
                            ...formData,
                            occupation: evt.target.value,
                          })
                        }
                        className="form-control"
                        placeholder={"Occupation"}
                      />
                    </div>

                    {/* INTERESTED CITY */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        INTERESTED CITY !
                      </label>
                      <input
                        type="text"
                        value={formData.interested_city}
                        onChange={(evt) =>
                          setFormData({
                            ...formData,
                            interested_city: evt.target.value,
                          })
                        }
                        className="form-control"
                        placeholder={"Interested City"}
                      />
                    </div>

                    {/* WORK PROIFILE */}
                    <div className={"form-group col-md-6"}>
                      <label htmlFor="" className="text-dark h6 active">
                        WORK PROIFILE !
                      </label>
                      <input
                        type="text"
                        value={formData.work_profile}
                        onChange={(evt) =>
                          setFormData({
                            ...formData,
                            work_profile: evt.target.value,
                          })
                        }
                        className="form-control"
                        placeholder={"Work Profile"}
                      />
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

export default EditFranchisee;
