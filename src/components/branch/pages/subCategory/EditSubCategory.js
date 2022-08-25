import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";
import Select from "react-select";
const EditSubCategory = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [catalogueUploading, setCatalogueUploading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    par_cat_id: "",
    catalogue: "",
  });
  const [progress, setProgress] = useState("");
  const [catalogueProgress, setCatalogueProgress] = useState("");

  // For File
  const fileChangeHandler = (e, type) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0], type);
    }
  };

  // Upload File
  const handleUpload = (image, type) => {
    if (type == "image") {
      setImageUploading(true);
    } else {
      setCatalogueUploading(true);
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (type == "image") {
          setProgress(progress);
        } else {
          setCatalogueProgress(progress);
        }
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
              [type]: url,
            });
            if (type == "image") {
              setImageUploading(false);
            } else {
              setCatalogueUploading(false);
            }
          });
      }
    );
  };

  const fileDeleteHandler = (image, type) => {
    // Create a reference to the file to delete
    const fileRef = storage.refFromURL(image);
    // Delete the file
    fileRef
      .delete()
      .then(() => {
        // File deleted successfully

        fetch(`${Config.SERVER_URL}/categories/${id}`, {
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
                setFormData({ ...formData, [type]: "null" });
                if (type == "image") {
                  setProgress("");
                  const imageIputBox = document.getElementById("imageIputBox");
                  imageIputBox.value = null;
                } else {
                  setCatalogueProgress("");
                  const catalogueIputBox =
                    document.getElementById("catalogueIputBox");
                  catalogueIputBox.value = null;
                }
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
      name: formData.name,
      slug: formData.slug,
      image: formData.image,
      par_cat_id: formData.par_cat_id,
      catalogue: formData.catalogue,
    };
    fetch(`${Config.SERVER_URL}/categories/${id}`, {
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
    fetch(`${Config.SERVER_URL}/categories/${id}`, {
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
          setAllDataLoaded(true);
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Parent Categories
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/parentCategories?skip=0`, {
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
            let f = result.body.map((v) => {
              return { label: v.name, value: v.id };
            });
            setParentCategories(f);
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
            <h3 className="text-themecolor">Parent Category</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Update Category</li>
            </ol>
          </div>
        </div>

        {/* Edit Category Form */}
        <div className="row">
          {allDataLoaded ? (
            <div className={"col-md-11 mx-auto"}>
              <form
                onSubmit={updateSubmitHandler}
                className="form-horizontal form-material"
              >
                {/* Category Details */}
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
                    <h3 className={"my-3 text-info"}>Category Details</h3>
                  </div>

                  {/* CATEGORY NAME */}
                  <div className={"form-group col-md-6"}>
                    <label htmlFor="" className="text-dark h6 active">
                      CATEGORY NAME HERE !
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(evt) =>
                        setFormData({ ...formData, name: evt.target.value })
                      }
                      className="form-control"
                      placeholder={"Sanetery Ware"}
                    />
                  </div>

                  {/* CATEGORY SLUG */}
                  <div className={"form-group col-md-6"}>
                    <label htmlFor="" className="text-dark h6 active">
                      CATEGORY SLUG!
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(evt) =>
                        setFormData({ ...formData, slug: evt.target.value })
                      }
                      name={"discount"}
                      className="form-control"
                      placeholder={"sanetery-ware"}
                    />
                  </div>

                  {/* Category Image */}
                  {/* <div className="col-md-12">
                    <div className="row">
                      
                      {formData.image == "null" ? (
                        <div className={"form-group mb-12 col-md-6"}>
                          <label className={"text-dark h6 mb-2"}>
                            CATEGORY IMAGE
                          </label>
                          <input
                            type="file"
                            name=""
                            id={"imageIputBox"}
                            className="form-control"
                            onChange={(e) => fileChangeHandler(e, "image")}
                          />
                        </div>
                      ) : (
                        <div className={"form-group mb-12 col-md-6"}>
                          <label className={"text-dark h6 mb-2"}>
                            CATEGORY IMAGE !
                          </label>
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
                                    fileDeleteHandler(formData.image, "image")
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
                    </div>
                  </div> */}

                  {/* Category Catalogue */}
                  <div className="col-md-12">
                    <div className="row">
                      {/* Catalogue */}
                      {formData.catalogue == "null" ? (
                        <div className={"form-group mb-12 col-md-6"}>
                          <label className={"text-dark h6 mb-2"}>
                            CATEGORY CATALOUGE !
                          </label>
                          <input
                            type="file"
                            name=""
                            id={"catalogueIputBox"}
                            className="form-control"
                            onChange={(e) => fileChangeHandler(e, "catalogue")}
                          />
                        </div>
                      ) : (
                        <div className={"form-group mb-12 col-md-6"}>
                          <label className={"text-dark h6 mb-2"}>
                            CATEGORY CATALOUGE !
                          </label>
                        </div>
                      )}
                      <div className={"form-group mb-12 col-md-6"}>
                        {catalogueUploading ? (
                          <div className="bg-white p-3 text-center ">
                            <span
                              class="spinner-border spinner-border-sm mr-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Catalogue Uploading ({catalogueProgress}%)
                          </div>
                        ) : (
                          <div className="img-frame">
                            {formData.catalogue != "null" ? (
                              <div className="">
                                <embed
                                  style={{
                                    height: "150px",
                                    width: "100%",
                                    borderRadius: "10px",
                                  }}
                                  src={formData.catalogue}
                                />
                                <button
                                  type="button"
                                  className="btn bg-danger"
                                  onClick={(evt) =>
                                    fileDeleteHandler(
                                      formData.catalogue,
                                      "catalogue"
                                    )
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
                    </div>
                  </div>

                  {/* parentCategories */}
                  <div className={"form-group col-md-4"}>
                    <label htmlFor="" className="text-dark h6 active">
                      PARENT CATEGORY !
                    </label>
                    <Select
                      options={parentCategories}
                      defaultValue={{
                        label: formData.par_cat_name,
                        value: formData.par_cat_id,
                      }}
                      onChange={(evt) => {
                        setFormData({ ...formData, par_cat_id: evt.value });
                      }}
                    />
                  </div>

                  {/* Update Button */}
                  <div className={"form-group col-md-12"}>
                    <button
                      className="btn btn-info rounded px-3 py-2"
                      type={"submit"}
                    >
                      {isUpdateLoaded ? (
                        <div>
                          <i className="fas fa-plus"></i> Update Category
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
          ) : (
            <div className={"bg-white p-3 text-center col-md-12"}>
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
  );
};

export default EditSubCategory;
