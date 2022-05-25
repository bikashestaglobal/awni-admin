import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M from "materialize-css";
import axios from 'axios'

function CreateListing() {
  const history = useHistory()
  // State Variable
  const [title, setTitle] = useState("");
  const [business, setBusiness] = useState({
    title: "",
    category: "",
    slug: "",
    user:"",
    mobile: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    description: "",
    email: "",
    tags: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
  });
  const [logoDefault, setlogoDefault] = useState("https://bit.ly/3kPLfxF")
  const [logoImage, setLogoImage] = useState('');
  const [logoImageURL, setLogoImageURL] = useState('')
  const [category, setCategory] = useState([]);
  const [progress, setProgress] = useState('')

  // Change Handler
  const changeHandler = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setBusiness({ ...business, [name]: value });
  };

  const titleChangeHandler = (evt) => {
    const value = evt.target.value;
    setTitle(value);
    setBusiness({ ...business, slug: value.toLowerCase().replace(/ /gi, "-"), 'title': value });
  };

  // Cover Iamege Change
  const onLogoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setLogoImage(e.target.result);
        setlogoDefault(e.target.result)
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Add Business
  const addBusiness = (url)=>{
    console.log(business)
    fetch("/user/addBusiness", {
      method: "POST",
      body: JSON.stringify(business),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_user_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            M.toast({ html: result.message, classes: "bg-success" });
            history.push("/user/pendingListing")
          } else {
            if(result.title) M.toast({ html: result.title, classes: "bg-danger" });
            if(result.slug) M.toast({ html: result.slug, classes: "bg-danger" });
            if(result.category) M.toast({ html: result.category, classes: "bg-danger" });
            if(result.mobile) M.toast({ html: result.mobile, classes: "bg-danger" });
            if(result.website) M.toast({ html: result.website, classes: "bg-danger" });
            if(result.facebook) M.toast({ html: result.facebook, classes: "bg-danger" });
            if(result.twitter) M.toast({ html: result.twitter, classes: "bg-danger" });
            if(result.instagram) M.toast({ html: result.instagram, classes: "bg-danger" });
            if(result.linkedin) M.toast({ html: result.linkedin, classes: "bg-danger" });
            if(result.youtube) M.toast({ html: result.youtube, classes: "bg-danger" });
            if(result.description) M.toast({ html: result.description, classes: "bg-danger" });
            if(result.email) M.toast({ html: result.email, classes: "bg-danger" });
            if(result.tags) M.toast({ html: result.tags, classes: "bg-danger" });
            if(result.coverImage) M.toast({ html: result.coverImage, classes: "bg-danger" });
            if(result.logoImage) M.toast({ html: result.logoImage, classes: "bg-danger" });
            if(result.address) M.toast({ html: result.address, classes: "bg-danger" });
            if(result.state) M.toast({ html: result.state, classes: "bg-danger" });
            if(result.city) M.toast({ html: result.city, classes: "bg-danger" });
            if(result.pinCode) M.toast({ html: result.pinCode, classes: "bg-danger" });
            if(result.user) M.toast({ html: result.user, classes: "bg-danger" });
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  // Submit Handler
  const submitHandler = (evt) => {
    evt.preventDefault();
    setBusiness({ ...business, user: JSON.parse(localStorage.getItem('user'))._id });

    if (logoImage) {
      const formData = new FormData();
      formData.append("file", logoImage);
      formData.append("upload_preset", "instagram-clone");
      formData.append("cloud_name", "coder-insta-clone");
      axios({
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        url: "	https://api.cloudinary.com/v1_1/coder-insta-clone/image/upload",
        onUploadProgress: (ev) => {
          const { loaded, total } = ev;
          let precentage = Math.floor((loaded * 100) / total);
          setProgress(precentage.toString() + "%");
          console.log(precentage);
        },
      })
        .then((resp) => {
          setBusiness({...business, 'logo': resp.data.url})
          setLogoImageURL(resp.data.url)
        })
        .catch((err) => console.error(err));
    } else {
      addBusiness()
    }
  }

  // Use Effect
  useEffect(() => {
    fetch("/user/allCategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_user_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.success) {
            setCategory(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          console.log(error);
        }
      );

      if(logoImageURL){
        addBusiness()
      }
  }, [logoImageURL]);

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ============================================================== --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">Listing Business</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">createListing</li>
            </ol>
          </div>
        </div>

        {/* Listing Form */}
        <div className="row">
          <div className={"col-md-10 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Business Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Business Details</h3>
                </div>
                <div className={"form-group col-md-6"}>
                  <input
                    type="text"
                    value={title}
                    onChange={titleChangeHandler}
                    name={"title"}
                    className="form-control"
                    placeholder={"Business Title"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="text"
                    value={business.slug}
                    onChange={changeHandler}
                    name={"slug"}
                    className="form-control"
                    placeholder={"Slug Here"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <select
                    className={"form-control"}
                    name={"category"}
                    onChange={changeHandler}
                  >
                    <option value={""}>Select Your Business Category</option>
                    {category.map((value, index) => {
                      return (
                        <option key={index} value={value._id}>
                          
                          {value.title}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="text"
                    value={business.mobile}
                    onChange={changeHandler}
                    name={"mobile"}
                    className="form-control"
                    placeholder={"Mobile number"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="url"
                    value={business.website}
                    onChange={changeHandler}
                    name={"website"}
                    className="form-control"
                    placeholder={"Write your website address"}
                  />
                </div>
              </div>

              {/* Social Media Addresses */}
              <div className={"row shadow-sm bg-white mt-4 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Social Media Addresses</h3>
                </div>
                <div className={"form-group col-md-6"}>
                  <input
                    type="url"
                    value={business.facebook}
                    onChange={changeHandler}
                    name={"facebook"}
                    className="form-control"
                    placeholder={"Facebook URL"}
                  />
                </div>
                <div className={"form-group col-md-6"}>
                  <input
                    type="url"
                    value={business.twitter}
                    onChange={changeHandler}
                    name={"twitter"}
                    className="form-control"
                    placeholder={"Twitter URL"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="url"
                    value={business.instagram}
                    onChange={changeHandler}
                    name={"instagram"}
                    className="form-control"
                    placeholder={"Instagram URL"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="url"
                    value={business.linkedin}
                    onChange={changeHandler}
                    name={"linkedin"}
                    className="form-control"
                    placeholder={"Linkedin URL"}
                  />
                </div>
                <div className={"form-group col-md-6"}>
                  <input
                    type="url"
                    value={business.youtube}
                    onChange={changeHandler}
                    name={"youtube"}
                    className="form-control"
                    placeholder={"Youtube URL"}
                  />
                </div>
              </div>

              {/* Your Business Description */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>
                    Your Business Description
                  </h3>
                </div>
                <div className={"form-group col-md-12"}>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setBusiness({ ...business, description: data });
                    }}
                    data={business.description}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="email"
                    value={business.email}
                    onChange={changeHandler}
                    name={"email"}
                    className="form-control"
                    placeholder={"Contact Email"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="text"
                    value={business.tags}
                    onChange={changeHandler}
                    name={"tags"}
                    className="form-control"
                    placeholder={"Business Listing Keywords / Tags"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <label className={"mb-2"}>Select Brand Logo</label>
                  <input
                    type="file"
                    onChange={onLogoChange}
                    className="form-control"
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <img
                    style={{
                      height: "140px",
                      width: "140px",
                      borderRadius: "100%",
                      border: "1px solid #5a5a5a",
                    }}
                    src={logoDefault}
                  />
                </div>
              </div>

              {/* Business Addresses */}
              <div className={"row shadow-sm bg-white mt-4 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Business Address</h3>
                </div>
                <div className={"form-group col-md-6"}>
                  <input
                    type="text"
                    value={business.address}
                    onChange={changeHandler}
                    name={"address"}
                    className="form-control"
                    placeholder={"Business Address"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="text"
                    value={business.state}
                    onChange={changeHandler}
                    name={"state"}
                    className="form-control"
                    placeholder={"Business State"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="text"
                    value={business.city}
                    onChange={changeHandler}
                    name={"city"}
                    className="form-control"
                    placeholder={"Business City"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <input
                    type="number"
                    value={business.pinCode}
                    onChange={changeHandler}
                    name={"pinCode"}
                    className="form-control"
                    placeholder={"Business Pin Code"}
                  />
                </div>

                <div className={"form-group col-md-6"}>
                  <button className={"btn btn-info rounded-0 px-3 py-2"}>
                    Submit Listing
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

export default CreateListing;
