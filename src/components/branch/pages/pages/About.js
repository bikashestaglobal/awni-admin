import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";

const date = require("date-and-time");
const About = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [aboutDescription, setAboutDescription] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [visionDescription, setVisionDescription] = useState("");
  const [whyDescription, setWhyDescription] = useState("");
  const [formData, setFormData] = useState({});
  const [doUpdate, setDoUpdate] = useState(false);
  const [aboutBgImageUploading, setAboutBgImageUploading] = useState(false);
  const [aboutFeImageUploading, setAboutFeImageUploading] = useState(false);
  const [missionFeImageUploading, setMissionFeImageUploading] = useState(false);
  const [missionBgImageUploading, setMissionBgImageUploading] = useState(false);

  const [aboutBgProgress, setAboutBgProgress] = useState("");
  const [aboutfeProgress, setAboutFeProgress] = useState("");
  const [missionfeProgress, setMissionFeProgress] = useState("");
  const [missionBgProgress, setMissionBgProgress] = useState("");

  // For Image
  const fileChangeHandler = (e, type) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0], type);
    }
  };

  // Upload Image
  const handleUpload = (image, type) => {
    if (type == "about_bg_image") {
      setAboutBgImageUploading(true);
    } else if (type == "about_fe_image") {
      setAboutFeImageUploading(true);
    } else if (type == "mission_bg_image") {
      setMissionBgImageUploading(true);
    } else if (type == "mission_fe_image") {
      setMissionFeImageUploading(true);
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (type == "about_fe_image") {
          setAboutFeProgress(progress);
        } else if (type == "about_bg_image") {
          setAboutBgProgress(progress);
        } else if (type == "mission_bg_image") {
          setMissionBgProgress(progress);
        } else if (type == "mission_fe_image") {
          setMissionFeProgress(progress);
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
            if (type == "about_bg_image") {
              setAboutBgImageUploading(false);
            } else if (type == "about_fe_image") {
              setAboutFeImageUploading(false);
            } else if (type == "mission_bg_image") {
              setMissionBgImageUploading(false);
            } else if (type == "mission_fe_image") {
              setMissionFeImageUploading(false);
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
        if (type == "about_bg_image") {
          setAboutBgProgress("");
          const aboutBgImageBox = document.getElementById("aboutBgImageBox");
          aboutBgImageBox.value = null;
        } else if (type == "about_fe_image") {
          setAboutFeProgress("");
          const aboutFeImageBox = document.getElementById("aboutFeImageBox");
          aboutFeImageBox.value = null;
        } else if (type == "mission_fe_image") {
          setMissionFeProgress("");
          const missionFeImageBox =
            document.getElementById("missionFeImageBox");
          missionFeImageBox.value = null;
        } else if (type == "mission_bg_image") {
          setMissionBgProgress("");
          const missionBgImageBox =
            document.getElementById("missionBgImageBox");
          missionBgImageBox.value = null;
        }
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        M.toast({ html: error, classes: "bg-danger" });
      });
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsUpdateLoaded(false);
    evt.preventDefault();

    const updateData = {
      about_title: formData.about_title || undefined,
      about_description: aboutDescription || undefined,
      about_bg_image: formData.about_bg_image,
      about_fe_image: formData.about_fe_image,
      about_image_title: formData.about_image_title || undefined,

      mission_title: formData.mission_title || undefined,
      mission_description: missionDescription || undefined,
      vision_title: formData.vision_title || undefined,
      vision_description: visionDescription || undefined,
      mission_bg_image: formData.mission_bg_image,
      mission_fe_image: formData.mission_fe_image,
      why_title: formData.why_title || undefined,
      why_description: whyDescription || undefined,
      youtube_video: formData.youtube_video || undefined,
    };

    let url = "";
    if (doUpdate) {
      url = `${Config.SERVER_URL}/aboutUs/${formData.id}`;
    } else {
      url = `${Config.SERVER_URL}/aboutUs`;
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
            setDoUpdate(true);
            setFormData(result.body);
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
    fetch(`${Config.SERVER_URL}/aboutUs`, {
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
            if (result.body) {
              console.log(result.body);
              setFormData(result.body);
              setAboutDescription(result.body.about_description || "");
              setMissionDescription(result.body.mission_description || "");
              setVisionDescription(result.body.vision_description || "");
              setWhyDescription(result.body.why_description || "");
              setDoUpdate(true);
            } else {
              setFormData({
                about_title: "",
                about_description: "",
                about_bg_image: "null",
                about_fe_image: "null",
                about_image_title: "",
                mission_title: "",
                mission_description: "",
                vision_title: "",
                vision_description: "",
                mission_bg_image: "null",
                mission_fe_image: "null",
                why_title: "",
                why_description: "",
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

  const youtubeUrlHander = (evt) => {
    let url = evt.target.value.split("=")[1];
    setFormData({ ...formData, youtube_video: url });
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ============================================================== --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">About</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Home</Link>
              </li>
              <li className="breadcrumb-item active">Update About</li>
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
              {/* About Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>About Us Details</h3>
                </div>

                {/* ABOUT TITLE  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ABOUT US TITLE HERE !
                  </label>
                  <input
                    type="text"
                    value={formData.about_title}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        about_title: evt.target.value,
                      })
                    }
                    className="form-control"
                    placeholder={"About Awni"}
                  />
                </div>

                {/* ABOUT IMAGE TITLE  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ABOUT US IMAGE TITLE !
                  </label>
                  <input
                    type="text"
                    value={formData.about_image_title}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        about_image_title: evt.target.value,
                      })
                    }
                    className="form-control"
                    placeholder={"About Awni"}
                  />
                </div>

                {/* About Description */}
                <div className={"form-group col-md-12"}>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setAboutDescription(data);
                    }}
                    data={aboutDescription}
                  />
                </div>

                {/* About Background Images */}
                <div className={"form-group mb-12 col-md-6"}>
                  <label className={"text-dark h6 mb-2"}>
                    ABOUT BACK INAGE !
                  </label>
                  <input
                    type="file"
                    name=""
                    id={"aboutBgImageBox"}
                    className="form-control"
                    onChange={(e) => fileChangeHandler(e, "about_bg_image")}
                  />
                </div>

                <div className={"form-group mb-12 col-md-6"}>
                  {aboutBgImageUploading ? (
                    <div className="bg-white p-3 text-center ">
                      <span
                        class="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Image Uploading ({aboutBgProgress}%)
                    </div>
                  ) : (
                    <div className="img-frame">
                      {String(formData.about_bg_image) != "null" ? (
                        <div className="">
                          <img
                            style={{
                              height: "150px",
                              width: "150px",
                              borderRadius: "75px",
                            }}
                            src={formData.about_bg_image}
                          />
                          <button
                            type="button"
                            className="btn bg-danger"
                            onClick={(evt) =>
                              fileDeleteHandler(
                                formData.about_bg_image,
                                "about_bg_image"
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

                {/* About Front Images */}
                <div className={"form-group mb-12 col-md-6"}>
                  <label className={"text-dark h6 mb-2"}>
                    ABOUT FRONT INAGE !
                  </label>
                  <input
                    type="file"
                    name=""
                    id={"aboutFeImageBox"}
                    className="form-control"
                    onChange={(e) => fileChangeHandler(e, "about_fe_image")}
                  />
                </div>

                <div className={"form-group mb-12 col-md-6"}>
                  {aboutFeImageUploading ? (
                    <div className="bg-white p-3 text-center ">
                      <span
                        class="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Image Uploading ({aboutfeProgress}%)
                    </div>
                  ) : (
                    <div className="img-frame">
                      {String(formData.about_fe_image) != "null" ? (
                        <div className="">
                          <img
                            style={{
                              height: "150px",
                              width: "150px",
                              borderRadius: "75px",
                            }}
                            src={formData.about_fe_image}
                          />
                          <button
                            type="button"
                            className="btn bg-danger"
                            onClick={(evt) =>
                              fileDeleteHandler(
                                formData.about_fe_image,
                                "about_fe_image"
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

              {/* Mission Details */}
              <div className={"row shadow-sm bg-white py-3 mt-2"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Mission Details</h3>
                </div>

                {/* MISSION TITLE  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    MISSION TITLE HERE !
                  </label>
                  <input
                    type="text"
                    value={formData.mission_title}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        mission_title: evt.target.value,
                      })
                    }
                    className="form-control"
                    placeholder={"About Awni"}
                  />
                </div>

                {/* Mission Description */}
                <div className={"form-group col-md-12"}>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setMissionDescription(data);
                    }}
                    data={missionDescription}
                  />
                </div>

                {/* MISSION Background Images */}
                <div className={"form-group mb-12 col-md-6"}>
                  <label className={"text-dark h6 mb-2"}>
                    MISSION BACK INAGE !
                  </label>
                  <input
                    type="file"
                    name=""
                    id={"missionBgImageBox"}
                    className="form-control"
                    onChange={(e) => fileChangeHandler(e, "mission_bg_image")}
                  />
                </div>

                <div className={"form-group mb-12 col-md-6"}>
                  {missionBgImageUploading ? (
                    <div className="bg-white p-3 text-center ">
                      <span
                        class="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Image Uploading ({missionBgProgress}%)
                    </div>
                  ) : (
                    <div className="img-frame">
                      {String(formData.mission_bg_image) != "null" ? (
                        <div className="">
                          <img
                            style={{
                              height: "150px",
                              width: "150px",
                              borderRadius: "75px",
                            }}
                            src={formData.mission_bg_image}
                          />
                          <button
                            type="button"
                            className="btn bg-danger"
                            onClick={(evt) =>
                              fileDeleteHandler(
                                formData.mission_bg_image,
                                "mission_bg_image"
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

                {/* MISSION Front Images */}
                <div className={"form-group mb-12 col-md-6"}>
                  <label className={"text-dark h6 mb-2"}>
                    MISSION FRONT INAGE !
                  </label>
                  <input
                    type="file"
                    name=""
                    id={"missionFeImageBox"}
                    className="form-control"
                    onChange={(e) => fileChangeHandler(e, "mission_fe_image")}
                  />
                </div>

                <div className={"form-group mb-12 col-md-6"}>
                  {missionFeImageUploading ? (
                    <div className="bg-white p-3 text-center ">
                      <span
                        class="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Image Uploading ({missionfeProgress}%)
                    </div>
                  ) : (
                    <div className="img-frame">
                      {String(formData.mission_fe_image) != "null" ? (
                        <div className="">
                          <img
                            style={{
                              height: "150px",
                              width: "150px",
                              borderRadius: "75px",
                            }}
                            src={formData.mission_fe_image}
                          />
                          <button
                            type="button"
                            className="btn bg-danger"
                            onClick={(evt) =>
                              fileDeleteHandler(
                                formData.mission_fe_image,
                                "mission_fe_image"
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

              {/* Vision Details */}
              <div className={"row shadow-sm bg-white py-3 mt-2"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Vision Details</h3>
                </div>

                {/* VISION TITLE  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    VISION TITLE HERE !
                  </label>
                  <input
                    type="text"
                    value={formData.vision_title}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        vision_title: evt.target.value,
                      })
                    }
                    className="form-control"
                    placeholder={"About Awni"}
                  />
                </div>

                {/* Vision Description */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active MB-2">
                    VISION DESCRIPTION !
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setVisionDescription(data);
                    }}
                    data={visionDescription}
                  />
                </div>
              </div>

              {/* Homepage Youtube */}
              <div className={"row shadow-sm bg-white py-3 mt-2"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Homepage Youtube Video</h3>
                </div>

                {/* ENTER VIDEO URL  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER VIDEO URL !
                  </label>
                  <input
                    type="text"
                    value={formData.youtube_video}
                    onChange={youtubeUrlHander}
                    className="form-control"
                    placeholder={"url"}
                  />
                </div>
              </div>

              {/* Why Awni */}
              <div className={"row shadow-sm bg-white py-3 mt-2"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Why Awni</h3>
                </div>

                {/* WHY AWNI  */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    WHY AWNI TITLE !
                  </label>
                  <input
                    type="text"
                    value={formData.why_title}
                    onChange={(evt) =>
                      setFormData({
                        ...formData,
                        why_title: evt.target.value,
                      })
                    }
                    className="form-control"
                    placeholder={"Why Awni"}
                  />
                </div>

                {/* WHY AWNI Description */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active MB-2">
                    WHY AWNI DESCRIPTION !
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setWhyDescription(data);
                    }}
                    data={whyDescription}
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
                        {doUpdate ? "Update About Us" : "Add About Us"}
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

export default About;
