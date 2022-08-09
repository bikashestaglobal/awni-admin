import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";

const EditHomepageBanner = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [bannerDataLoading, setBannerDataLoading] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    image: "",
    title: "",
    place: "",
    webpage_url: "",
  });
  const [progress, setProgress] = useState("");

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

        fetch(`${Config.SERVER_URL}/homepageBanners/${id}`, {
          method: "PUT",
          body: JSON.stringify({ image: "null" }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
          },
        })
          .then((res) => res.json())
          .then(
            (result) => {
              if (result.status === 200) {
                setFormData({ ...formData, image: "null" });
                // setIsUpdated(!isUpdated);
              } else {
                M.toast({ html: result.message, classes: "bg-danger" });
              }
            },
            (error) => {
              M.toast({ html: error, classes: "bg-danger" });
            }
          );
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        M.toast({ html: error, classes: "bg-danger" });
      });
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    evt.preventDefault();
    setIsUpdateLoaded(false);
    const updateData = {
      position: formData.position || undefined,
      image: formData.image || undefined,
      webpage_url: formData.webpage_url || undefined,
      title: formData.title || undefined,
      place: formData.place || undefined,
    };
    fetch(`${Config.SERVER_URL}/homepageBanners/${id}`, {
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
    setBannerDataLoading(true);
    fetch(`${Config.SERVER_URL}/homepageBanners/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setBannerDataLoading(false);
          if (result.status === 200) {
            setFormData(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setBannerDataLoading(false);
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
            <h3 className="text-themecolor">Edit Banner</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Update Banner</li>
            </ol>
          </div>
        </div>

        {/* Edit Banner Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            {!bannerDataLoading ? (
              <form
                onSubmit={updateSubmitHandler}
                className="form-horizontal form-material"
              >
                {/* Banner Details */}
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
                    <h3 className={"my-3 text-info"}>Banner Details</h3>
                  </div>

                  {/* BANNER PLACE  */}
                  <div className={"form-group col-md-6"}>
                    <label htmlFor="" className="text-dark h6 active">
                      SELECT BANNER PLACE !
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={formData.place}
                      onChange={(evt) =>
                        setFormData({ ...formData, place: evt.target.value })
                      }
                    >
                      <option value="BETWEEN_PRODUCT">BETWEEN_PRODUCT</option>
                      <option value="AFTER_SLIDER">AFTER_SLIDER</option>
                    </select>
                  </div>

                  {/* BANNER TITLE  */}
                  <div className={"form-group col-md-6"}>
                    <label htmlFor="" className="text-dark h6 active">
                      BANNER TITLE !
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

                  {/* WEBPAGE URL  */}
                  <div className={"form-group col-md-6"}>
                    <label htmlFor="" className="text-dark h6 active">
                      WEBPAGE URL !
                    </label>
                    <input
                      type="text"
                      value={formData.webpage_url}
                      onChange={(evt) =>
                        setFormData({
                          ...formData,
                          webpage_url: evt.target.value,
                        })
                      }
                      className="form-control"
                      placeholder={"/about"}
                    />
                  </div>

                  {/* BANNER POSITION */}
                  <div className={"form-group col-md-6"}>
                    <label htmlFor="" className="text-dark h6 active">
                      BANNER POSITION !
                    </label>
                    <input
                      type="number"
                      value={formData.position}
                      onChange={(evt) =>
                        setFormData({ ...formData, position: evt.target.value })
                      }
                      name={"discount"}
                      className="form-control"
                      placeholder={"1"}
                    />
                  </div>
                  {/* Images */}
                  {formData.image == "null" ? (
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
                  ) : (
                    <div className={"form-group mb-12 col-md-6"}>
                      <label className={"text-dark h6 mb-2"}>IMAGE</label>
                    </div>
                  )}
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
                                height: "80px",
                                width: "80px",
                                borderRadius: "40px",
                              }}
                              src={formData.image}
                            />
                            <button
                              type="button"
                              className="btn bg-danger"
                              onClick={(evt) =>
                                imgDeleteHandler(formData.image)
                              }
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
                </div>
              </form>
            ) : (
              <div className={"bg-white p-3 text-center"}>
                <span
                  className="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading..
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHomepageBanner;
