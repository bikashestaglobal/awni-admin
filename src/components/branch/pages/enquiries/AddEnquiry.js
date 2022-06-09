import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";
const AddEnquiry = () => {
  const history = useHistory();
  const [isAddLoaded, setIsAddLoaded] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/enquiries", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            history.goBack();
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          setIsAddLoaded(true);
        },
        (error) => {
          setIsAddLoaded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ============================================================== --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">Enquiry</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/awni-admin">Admin</a>
              </li>
              <li className="breadcrumb-item active">Enquiry</li>
            </ol>
          </div>
        </div>

        {/* Add Enquiry Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Add CUSTOMER */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Add Enquiry</h3>
                </div>

                {/*  CUSTOMER NAME  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CUSTOMER NAME !
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(evt) =>
                      setFormData({ ...formData, name: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Laguna"}
                  />
                </div>

                {/*  CUSTOMER EMAIL  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CUSTOMER EMAIL !
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(evt) =>
                      setFormData({ ...formData, email: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"tannuja@gmail.com"}
                  />
                </div>
                {/*  CUSTOMER MOBILE  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CUSTOMER MOBILE !
                  </label>
                  <input
                    type="number"
                    value={formData.mobile}
                    onChange={(evt) =>
                      setFormData({ ...formData, mobile: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"9117162463"}
                  />
                </div>

                {/*  CUSTOMER QUERY  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CUSTOMER QUERY !
                  </label>
                  <input
                    type="text"
                    value={formData.message}
                    onChange={(evt) =>
                      setFormData({ ...formData, message: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Query"}
                  />
                </div>

                <div className={"form-group col-md-12"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isAddLoaded ? (
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEnquiry;
