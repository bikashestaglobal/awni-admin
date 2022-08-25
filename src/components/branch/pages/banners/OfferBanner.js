import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";

function OfferBanner() {
  const [isAddLoaded, setIsAddLoaded] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [progress, setProgress] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    webpageUrl: "",
    position: 1,
  });

  const [addedData, setAddedData] = useState([]);

  const addForUpload = (evt) => {
    evt.preventDefault();
    if (
      formData.title == "" ||
      formData.image == "" ||
      formData.position == ""
    ) {
      M.toast({ html: "Please Fill the Form !!", classes: "bg-danger" });
      return;
    }

    const data = [...addedData];

    if (updateIndex != null) {
      data[updateIndex] = formData;
      setAddedData([...data]);
    } else {
      setAddedData([...addedData, { ...formData }]);
    }

    setFormData({
      title: "",
      image: "",
      webpageUrl: "",
      position: 1,
    });
    setProgress("");
    setPreviewImage("");
  };

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
        if (height == 450 && width == 768) {
          handleUpload(file[0]);
        } else {
          M.toast({
            html: "Please Upload Image Size 768 X 450",
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
        setFormData({ ...formData, image: "" });
        setPreviewImage("");

        // fetch(`${Config.SERVER_URL}/setting`, {
        //   method: "PUT",
        //   body: JSON.stringify({ nextToSlider: { ...formData, image: "" } }),
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
        //   },
        // })
        //   .then((res) => res.json())
        //   .then(
        //     (result) => {
        //       if (result.status === 200) {
        //         setPreviewImage("");
        //         setFormData({ ...formData, image: "" });
        //         setProgress("");
        //       } else {
        //       }
        //     },
        //     (error) => {
        //       M.toast({ html: error, classes: "bg-danger" });
        //     }
        //   );
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
    const data = [...addedData];
    data.sort(function (a, b) {
      return parseInt(a.position) - parseInt(b.position);
    });

    fetch(Config.SERVER_URL + "/setting", {
      method: "PUT",
      body: JSON.stringify({ offerBanner: [...data] }),
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
            setIsUpdated(!isUpdated);
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

  // Submit Handler
  const deleteHandler = (index) => {
    let data = [...addedData];

    // delete image
    imgDeleteHandler(data[index].image);
    data = data.filter((d, i) => i != index);

    data.sort(function (a, b) {
      return parseInt(a.position) - parseInt(b.position);
    });

    fetch(Config.SERVER_URL + "/setting", {
      method: "PUT",
      body: JSON.stringify({ offerBanner: [...data] }),
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
            setIsUpdated(!isUpdated);
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

  const editHandler = (index) => {
    setIsUpdating(true);
    setFormData({ ...formData, ...addedData[index] });
    setPreviewImage(addedData[index].image || "");
    setUpdateIndex(index);
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
            setAddedData(result.body.offerBanner || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, [isUpdated]);

  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Offer Banner</h3>
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
              onSubmit={addForUpload}
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
                    placeholder={"Pure Coffe <br/> Big Discount"}
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

                {/* Position */}
                <div className={"form-group col-md-2"}>
                  <label htmlFor="" className="text-dark h6 active">
                    POSITION !
                  </label>
                  <input
                    type="number"
                    value={formData.position}
                    onChange={(evt) => {
                      setFormData({ ...formData, position: evt.target.value });
                    }}
                    className="form-control"
                    placeholder={"Save up to 50% off on your first order"}
                  />
                </div>

                {/* Image */}
                <div className={"form-group col-md-4"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SLIDER IMAGES !
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={imageChangeHandler}
                    className="form-control"
                  />
                </div>
                <div className={"col-md-2 mx-auto"}>
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
                  {formData.image ? (
                    <span
                      className="fa fa-trash btn text-danger"
                      onClick={() => imgDeleteHandler(formData.image)}
                    ></span>
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
                  {isUpdating ? (
                    <button
                      onClick={addForUpload}
                      className="btn btn-info rounded px-3 py-2"
                      type={"button"}
                    >
                      <div>
                        <i className="fas fa-plus"></i> Update
                      </div>
                    </button>
                  ) : (
                    <button
                      className="btn btn-info rounded px-3 py-2"
                      type={"submit"}
                    >
                      <div>
                        <i className="fas fa-plus"></i> Add
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Image Slider Form */}
        <div className="row mt-2">
          <div className={"col-md-10 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Title on Image */}
              {addedData.length ? (
                <div className={"row shadow-sm bg-white py-3"}>
                  <div className="col-md-12">
                    <h3 className={"my-3 text-info"}>Added Image</h3>
                  </div>

                  <table className="table table-border">
                    <tr>
                      <th>POSITION</th>
                      <th>TITLE</th>

                      <th>PAGE URL</th>
                      <th>IMAGE</th>
                    </tr>
                    {addedData.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.position}</td>
                          <td>{item.title}</td>

                          <td>{item.webpageUrl}</td>
                          <td>
                            <img
                              src={item.image}
                              style={{ height: "100px", width: "100px" }}
                              alt=""
                            />
                          </td>
                          <td className="d-flex justify-content-between">
                            <i
                              className="fa fa-edit text-info btn"
                              onClick={(evt) => editHandler(index)}
                            />
                            <i
                              onClick={(evt) => deleteHandler(index)}
                              className="fa fa-trash text-danger btn"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </table>

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
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferBanner;
