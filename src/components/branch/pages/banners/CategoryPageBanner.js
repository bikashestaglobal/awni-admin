import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";

function CategoryPageBanner() {
  const [isAddLoaded, setIsAddLoaded] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    webpageUrl: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [progress, setProgress] = useState("");

  // imageChangeHandler
  const imageChangeHandler = (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      if (!file[0].name.match(/.(jpg|jpeg|png)$/i)) {
        M.toast({
          html: "Please Upload jpg, jpeg, png Format Image !!",
          classes: "bg-danger",
        });
        return;
      }

      const image = new Image();
      let fr = new FileReader();

      fr.onload = function () {
        if (fr !== null && typeof fr.result == "string") {
          image.src = fr.result;
        }
      };
      fr.readAsDataURL(file[0]);

      image.onload = async function () {
        const width = image.width;
        const height = image.height;
        if (height == 1076 && width == 1024) {
          handleUpload(file[0]);
        } else {
          M.toast({
            html: "Please Upload Image Size 1024 X 1076",
            classes: "bg-danger",
          });
          return;
        }
      };
    }
  };

  // Upload Image
  const handleUpload = (image) => {
    const uploadTask = storage.ref(`banner/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // console.log(i, progress);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("banner")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setPreviewImage(url);
            setFormData({ ...formData, image: url });
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

        fetch(`${Config.SERVER_URL}/setting`, {
          method: "PUT",
          body: JSON.stringify({
            categoryPageBanner: { ...formData, image: "" },
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
          },
        })
          .then((res) => res.json())
          .then(
            (result) => {
              if (result.status === 200) {
                setPreviewImage("");
                setFormData({ ...formData, image: "" });
                setProgress("");
              } else {
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

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/setting", {
      method: "PUT",
      body: JSON.stringify({ categoryPageBanner: { ...formData } }),
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
            setProgress("");
          } else {
            const errorKeys = Object.keys(result.error);
            errorKeys.forEach((key) => {
              M.toast({ html: result.error[key], classes: "bg-danger" });
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

  // Get Settings
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/setting`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status == 200) {
            if (result.body.categoryPageBanner) {
              const { title, image, webpageUrl } =
                result.body.categoryPageBanner;
              setFormData({
                ...formData,
                title: title,
                image: image,
                webpageUrl: webpageUrl,
              });
              setPreviewImage(image);
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
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">
              Category Page Banner
            </h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Add Banner</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        {/* Image Slider Form */}
        <div className="row mt-2">
          <div className={"col-md-10 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Title on Image */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}></h3>
                </div>

                {/* Title Over Image */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    TITLE OVER IMAGE !
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(evt) => {
                      setFormData({ ...formData, title: evt.target.value });
                    }}
                    className="form-control"
                    placeholder={"Save up to 50% off on your first order"}
                  />
                </div>

                {/* Link */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    WEB PAGE URL !
                  </label>
                  <input
                    type="text"
                    value={formData.webpageUrl}
                    onChange={(evt) => {
                      setFormData({
                        ...formData,
                        webpageUrl: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"/photo-cake"}
                  />
                </div>

                {/* Image */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    BANNER IMAGE !
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={imageChangeHandler}
                    className="form-control"
                  />
                </div>
                <div className={"col-md-6 mx-auto"}>
                  {previewImage ? (
                    <img
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100px",
                        borderRadius: "10%",
                        border: "1px solid #5a5a5a",
                      }}
                      src={previewImage}
                    />
                  ) : (
                    ""
                  )}
                  {previewImage != "" ? (
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={(e) => imgDeleteHandler(previewImage)}
                    >
                      <span className="fas fa-trash"></span>
                    </button>
                  ) : (
                    ""
                  )}

                  {progress ? (
                    <div className="progress mt-6">
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${progress}%`, height: "15px" }}
                        role="progressbar"
                      >
                        {progress}%
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Button */}
                <div className={"form-group col-md-6"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isAddLoaded ? (
                      <div>
                        <i className="fas fa-edit"></i> Submit
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
}

export default CategoryPageBanner;
