import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";
const WhyAwni = () => {
  const history = useHistory();
  const [isAddLoaded, setIsAddLoaded] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "null",
  });
  const [progress, setProgress] = useState("");

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/whyAwni", {
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
          setIsAddLoaded(true);
        },
        (error) => {
          setIsAddLoaded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // For Image
  const imgChangeHandler = (e, type) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0], type);
    }
  };

  // Upload Image
  const handleUpload = (image) => {
    setImageUploading(true);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setFormData({
              ...formData,
              image: url,
            });
            setImageUploading(false);
          });
      }
    );
  };

  const imgDeleteHandler = (image) => {
    // Create a reference to the file to delete
    const fileRef = storage.refFromURL(image);
    // Delete the file
    fileRef
      .delete()
      .then(() => {
        // File deleted successfully
        setFormData({ ...formData, image: "null" });
        setProgress("");
        const imageIputBox = document.getElementById("imageIputBox");
        imageIputBox.value = null;
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        M.toast({ html: error, classes: "bg-danger" });
      });
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ============================================================== --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">Why Awni</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Add Images</li>
            </ol>
          </div>
        </div>

        {/* Add Why Awni Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Why Awni Details */}
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
                  <h3 className={"my-3 text-info"}>Why Awni Details</h3>
                </div>

                {/* IMAGE TITLE  */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    IMAGE TITLE !
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(evt) =>
                      setFormData({ ...formData, title: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Counter Basin"}
                  />
                </div>
                {/* Images */}
                <div className={"form-group mb-12 col-md-6"}>
                  <label className={"text-dark h6 mb-2"}>IMAGE !</label>
                  <input
                    type="file"
                    name=""
                    id={"imageIputBox"}
                    className="form-control"
                    onChange={(e) => imgChangeHandler(e)}
                  />
                </div>
                <div className={"form-group mb-12 col-md-6"}>
                  {imageUploading ? (
                    <div className="bg-white p-3 text-center ">
                      <span
                        class="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Image Uploading ({progress}%)
                    </div>
                  ) : (
                    <div className="img-frame">
                      {formData.image != "null" ? (
                        <div className="">
                          <img
                            style={{
                              height: "150px",
                              width: "150px",
                              borderRadius: "75px",
                            }}
                            src={formData.image}
                          />
                          <button
                            type="button"
                            className="btn bg-danger"
                            onClick={(evt) => imgDeleteHandler(formData.image)}
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
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

export default WhyAwni;
