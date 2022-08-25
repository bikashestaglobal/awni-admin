import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M from "materialize-css";
import Config from "../../../config/Config";
const date = require("date-and-time");
const Contact = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [editorValue, setEditorValue] = useState("");
  const [formData, setFormData] = useState({});
  const [doUpdate, setDoUpdate] = useState(false);

  // Submit Handler
  const submitHandler = (evt) => {
    setIsUpdateLoaded(false);
    evt.preventDefault();

    const updateData = {
      mobile_1: formData.mobile_1 || undefined,
      mobile_2: formData.mobile_2 || undefined,
      email: formData.email || undefined,
      customer_care_no: formData.customer_care_no || undefined,
      address: editorValue || undefined,
      whatsapp_no: formData.whatsapp_no || undefined,
      facebook: formData.facebook || undefined,
      instagram: formData.instagram || undefined,
      twitter: formData.twitter || undefined,
      linkedin: formData.linkedin || undefined,
    };

    let url = "";
    if (doUpdate) {
      url = `${Config.SERVER_URL}/contactUs/${formData.id}`;
    } else {
      url = `${Config.SERVER_URL}/contactUs`;
    }

    fetch(url, {
      method: doUpdate ? "PUT" : "POST",
      body: JSON.stringify(updateData),
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

  // get Records
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/contactUs`, {
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
            console.log(result.body);
            if (result.body) {
              setFormData(result.body);
              setEditorValue(result.body.address || "");
              setDoUpdate(true);
            } else {
              setFormData({
                mobile_1: "",
                mobile_2: "",
                email: "",
                customer_care_no: "",
                address: "",
                whatsapp_no: "",
                facebook: "",
                instagram: "",
                twitter: "",
                linkedin: "",
              });
            }
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
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
            <h3 className="text-themecolor">Contact</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Update Contact</li>
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
                  <h3 className={"my-3 text-info"}>Contact Us Details</h3>
                </div>

                {/* EMAIL */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    EMAIL HERE !
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(evt) =>
                      setFormData({ ...formData, email: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"admin@gmail.com"}
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

                {/* CUSTOMER CARE NO */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CUSTOMER CARE NO HERE !
                  </label>
                  <input
                    type="tel"
                    value={formData.customer_care_no}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        customer_care_no: evt.target.value,
                      })
                    }
                    className="form-control"
                    placeholder={"9117162463"}
                  />
                </div>

                {/* WHATSAPP NO */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    WHATSAPP NO HERE !
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp_no}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        whatsapp_no: evt.target.value,
                      })
                    }
                    className="form-control"
                    placeholder={"9117162463"}
                  />
                </div>

                {/*Address  */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER OFFICE ADDRESS !
                  </label>
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
              </div>

              {/* formData Description */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Social Media Handler</h3>
                </div>

                {/* FACEBOOK URL */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    FACEBOOK URL HERE !
                  </label>
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(evt) =>
                      setFormData({ ...formData, facebook: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"https://facebook.com/codescroller"}
                  />
                </div>

                {/* INSTAGRAM URL */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    INSTAGRAM URL HERE !
                  </label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(evt) =>
                      setFormData({ ...formData, instagram: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"https://instagram.com/codescroller"}
                  />
                </div>

                {/* TWITTER URL */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    TWITTER URL HERE !
                  </label>
                  <input
                    type="url"
                    value={formData.twitter}
                    onChange={(evt) =>
                      setFormData({ ...formData, twitter: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"https://twitter.com/codescroller"}
                  />
                </div>

                {/* LINKEDIN URL */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    LINKEDIN URL HERE !
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(evt) =>
                      setFormData({ ...formData, linkedin: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"https://linkedin.com/codescroller"}
                  />
                </div>

                <div className={"form-group col-md-12"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isUpdateLoaded ? (
                      <div>
                        <i className="fas fa-refresh"></i>{" "}
                        {doUpdate ? "Update Contact Us" : "Add Contact Us"}
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

export default Contact;
