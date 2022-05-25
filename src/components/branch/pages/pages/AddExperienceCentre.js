import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M from "materialize-css";
import Config from "../../../config/Config";

const AddExperienceCentre = () => {
  const history = useHistory();

  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [editorValue, setEditorValue] = useState("");
  const [formData, setFormData] = useState({});

  // Submit Handler
  const submitHandler = (evt) => {
    setIsUpdateLoaded(false);
    evt.preventDefault();

    const updateData = {
      mobile_1: formData.mobile_1 || undefined,
      mobile_2: formData.mobile_2 || undefined,
      name: formData.name || undefined,
      google_map: formData.google_map || undefined,
      address: editorValue || undefined,
    };

    let url = `${Config.SERVER_URL}/experienceCentres`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
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
          setIsUpdateLoaded(true);
        },
        (error) => {
          setIsUpdateLoaded(true);
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
            <h3 className="text-themecolor">Experience Centre</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Add Centre</li>
            </ol>
          </div>
        </div>

        {/* Add formData Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Contact Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Centre Details</h3>
                </div>

                {/* EMAIL */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CENTRE NAME !
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(evt) =>
                      setFormData({ ...formData, name: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"AMITH MART INTERNATIONAL PVT LTD"}
                  />
                </div>

                {/* MOBILE NO */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    MOBILE NO HERE !
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile_1}
                    onChange={(evt) =>
                      setFormData({ ...formData, mobile_1: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"9117162463"}
                  />
                </div>

                {/* MOBILE NO */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    MOBILE NO-2 HERE !
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile_2}
                    onChange={(evt) =>
                      setFormData({ ...formData, mobile_2: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"9117162463"}
                  />
                </div>

                {/* GOOGLE MAP URL */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    GOOGLE MAP URL HERE !
                  </label>
                  <input
                    type="tel"
                    value={formData.google_map}
                    onChange={(evt) =>
                      setFormData({ ...formData, google_map: evt.target.value })
                    }
                    className="form-control"
                    placeholder={
                      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14371.072968993436!2d87.460903!3d25.7782175!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x5907b1af215434b2!2sAuxous%20Technology!5e0!3m2!1sen!2sin!4v1651659437154!5m2!1sen!2sin"
                    }
                  />
                </div>

                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ADDRESS !
                  </label>
                  <br />
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setEditorValue(data);
                    }}
                    data={editorValue}
                  />
                </div>
                <div className={"form-group col-md-12"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isUpdateLoaded ? (
                      <div>
                        <i className="fas fa-plus"></i> Add Cantre
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

export default AddExperienceCentre;
