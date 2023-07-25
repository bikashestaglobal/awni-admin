import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";
import Select from "react-select";
import { getImageDimensions, checkImageFile } from "../../helpers";

const AddSubCategory = () => {
  const history = useHistory();
  const [isAddLoaded, setIsAddLoaded] = useState(true);
  const [imageUploading, setBannerUploading] = useState(false);
  const [catalogueUploading, setCatalogueUploading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "null",
    breadcrumb_banner: "null",
    catalogue: "null",
    par_cat_id: "",
  });
  const [progress, setBannerProgress] = useState("");
  const [catalogueProgress, setCatalogueProgress] = useState("");

  const titleChangeHandler = (evt) => {
    const value = evt.target.value;
    setFormData({
      ...formData,
      slug: value
        .toLowerCase()
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        .replace(/\s+/g, "-"),
      name: value,
    });
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/categories", {
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
  const fileChangeHandler = async (e, type) => {
    let file = e.target.files[0];

    if (file && checkImageFile(file)) {
      if (type == "breadcrumb_banner") {
        const { width, height } = await getImageDimensions(file);
        if (width != 1920 || height != 451) {
          M.toast({
            html: "Banner size must be (1920X451 px)",
            classes: "bg-danger",
          });
          return;
        }
      }
      handleUpload(file, type);
    } else {
      M.toast({
        html: "File must be image",
        classes: "bg-danger",
      });
      return;
    }
  };

  // Upload Image
  const handleUpload = (image, type) => {
    if (type == "breadcrumb_banner") {
      setBannerUploading(true);
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
        if (type == "breadcrumb_banner") {
          setBannerProgress(progress);
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
            if (type == "breadcrumb_banner") {
              setBannerUploading(false);
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
        setFormData({ ...formData, [type]: "null" });
        if (type == "breadcrumb_banner") {
          setBannerProgress("");
          const bannerIputBox = document.getElementById("bannerIputBox");
          bannerIputBox.value = null;
        } else {
          setCatalogueProgress("");
          const catalogueIputBox = document.getElementById("catalogueIputBox");
          catalogueIputBox.value = null;
        }
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        M.toast({ html: error, classes: "bg-danger" });
      });
  };

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
        {/* <!-- ========================= --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ========================= --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">Sub Category</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Add Category</li>
            </ol>
          </div>
        </div>

        {/* Add Category Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={submitHandler}
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
                    onChange={(evt) => titleChangeHandler(evt)}
                    className="form-control"
                    placeholder={"Sanetery Ware"}
                  />
                </div>

                {/* CATEGORY SLUG */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CATEGORY SLUG !
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

                {/* BREADCRUMB BANNER */}
                <div className={"form-group mb-12 col-md-6"}>
                  <label className={"text-dark h6 mb-2"}>
                    CATEGORY BREADCRUMB BANNER(1920X451 px) !
                  </label>
                  <input
                    type="file"
                    name=""
                    id={"bannerIputBox"}
                    className="form-control"
                    onChange={(e) => fileChangeHandler(e, "breadcrumb_banner")}
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
                      Banner Uploading ({progress}%)
                    </div>
                  ) : (
                    <div className="img-frame">
                      {formData.breadcrumb_banner != "null" ? (
                        <div className="">
                          <img
                            style={{
                              height: "150px",
                              width: "150px",
                              borderRadius: "75px",
                            }}
                            src={formData.breadcrumb_banner}
                          />
                          <button
                            type="button"
                            className="btn bg-danger"
                            onClick={(evt) =>
                              fileDeleteHandler(
                                formData.breadcrumb_banner,
                                "breadcrumb_banner"
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

                {/* Catalogue */}
                <div className={"form-group mb-12 col-md-6"}>
                  <label className={"text-dark h6 mb-2"}>
                    CATALOUGE FILE !
                  </label>
                  <input
                    type="file"
                    name=""
                    id={"catalogueIputBox"}
                    className="form-control"
                    onChange={(e) => fileChangeHandler(e, "catalogue")}
                  />
                </div>

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
                            width={"100%"}
                            style={{
                              height: "150px",
                              borderRadius: "5px",
                            }}
                            src={formData.catalogue}
                          />
                          <button
                            type="button"
                            className="btn bg-danger"
                            onClick={(evt) =>
                              fileDeleteHandler(formData.catalogue, "catalogue")
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

                {/* parentCategories */}
                <div className={"form-group col-md-4"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PARENT CATEGORY !
                  </label>
                  <div className="">
                    <Select
                      options={parentCategories}
                      onChange={(evt) => {
                        setFormData({ ...formData, par_cat_id: evt.value });
                      }}
                    />
                  </div>
                </div>

                <div className={"form-group col-md-12"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isAddLoaded ? (
                      <div>
                        <i className="fas fa-plus"></i> Add Category
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

export default AddSubCategory;
