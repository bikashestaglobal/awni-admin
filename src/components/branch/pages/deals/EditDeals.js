import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M from "materialize-css";
import axios from "axios";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";

function EditDeals() {
  const history = useHistory();
  const { id } = useParams();
  // State Variable
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [mrp, setMRP] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [isAddLoaded, setIsAddLoaded] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    parentCategories: [],
    categories: [],
    skus: [],
    flavour: "",
    type: "",
    shape: "",
    size: "",
    images: [],
    isEggCake: false,
    isPhotoCake: false,
    description: "",
  });
  const [logoDefault, setlogoDefault] = useState("https://bit.ly/3kPLfxF");
  const [logoImage, setLogoImage] = useState("");
  const [logoImageURL, setLogoImageURL] = useState("");
  const [category, setCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [flavour, setFlavour] = useState([]);
  const [color, setColor] = useState([]);
  const [progress, setProgress] = useState("");

  const titleChangeHandler = (evt) => {
    const value = evt.target.value;
    setProduct({
      ...product,
      slug: value.toLowerCase().replace(/ /gi, "-"),
      name: value,
    });
  };

  // Iamege Change
  const imageChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      handleUpload(event.target.files[0]);
      reader.onload = (e) => {
        setLogoImage(e.target.result);
        setlogoDefault(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Upload Image
  const handleUpload = (image) => {
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
            setProduct({
              ...product,
              images: [...product.images, { url }],
            });
            // setCategory({ ...category, category_image: url })
          });
      }
    );
  };

  // Add Business
  const addBusiness = (url) => {
    fetch("/user/addBusiness", {
      method: "POST",
      body: JSON.stringify(product),
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
            history.push("/user/pendingListing");
          } else {
            if (result.title)
              M.toast({ html: result.title, classes: "bg-danger" });
            if (result.slug)
              M.toast({ html: result.slug, classes: "bg-danger" });
            if (result.category)
              M.toast({ html: result.category, classes: "bg-danger" });
            if (result.mobile)
              M.toast({ html: result.mobile, classes: "bg-danger" });
            if (result.website)
              M.toast({ html: result.website, classes: "bg-danger" });
            if (result.facebook)
              M.toast({ html: result.facebook, classes: "bg-danger" });
            if (result.twitter)
              M.toast({ html: result.twitter, classes: "bg-danger" });
            if (result.instagram)
              M.toast({ html: result.instagram, classes: "bg-danger" });
            if (result.linkedin)
              M.toast({ html: result.linkedin, classes: "bg-danger" });
            if (result.youtube)
              M.toast({ html: result.youtube, classes: "bg-danger" });
            if (result.description)
              M.toast({ html: result.description, classes: "bg-danger" });
            if (result.email)
              M.toast({ html: result.email, classes: "bg-danger" });
            if (result.tags)
              M.toast({ html: result.tags, classes: "bg-danger" });
            if (result.coverImage)
              M.toast({ html: result.coverImage, classes: "bg-danger" });
            if (result.logoImage)
              M.toast({ html: result.logoImage, classes: "bg-danger" });
            if (result.address)
              M.toast({ html: result.address, classes: "bg-danger" });
            if (result.state)
              M.toast({ html: result.state, classes: "bg-danger" });
            if (result.city)
              M.toast({ html: result.city, classes: "bg-danger" });
            if (result.pinCode)
              M.toast({ html: result.pinCode, classes: "bg-danger" });
            if (result.user)
              M.toast({ html: result.user, classes: "bg-danger" });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/product", {
      method: "POST",
      body: JSON.stringify(product),
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

  // get Parent Category
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/parent-category`, {
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
            setParentCategory(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Category
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/category`, {
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
            setCategory(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Flavour
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/flavour`, {
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
            setFlavour(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Color
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/color`, {
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
            setColor(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // Add Time Handler
  const addSkusHandler = (evt) => {
    evt.preventDefault();
    if (weight == "" || mrp == "" || sellingPrice == "") {
      M.toast({ html: "Please Fill SKU Details", classes: "text-light" });
      return;
    }

    const isExist = product.skus.find((value) => {
      if (
        value.mrp == mrp &&
        value.weight == weight &&
        value.sellingPrice == sellingPrice
      ) {
        return true;
      }
    });

    if (isExist) {
      M.toast({ html: "SKU is already Exist", classes: "text-light" });
      return;
    }
    setProduct({
      ...product,
      skus: [...product.skus, { mrp, weight, sellingPrice }],
    });
    setMRP("");
    setWeight("");
    setSellingPrice("");
  };

  const deleteSkuHandler = (i) => {
    const filtered = product.skus.filter((value, index) => index != i);

    setProduct({ ...product, skus: [...filtered] });
  };

  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Products</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Add Product</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        {/* Listing Form */}
        <div className="row mt-2">
          <div className={"col-md-10 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Product Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Product Details</h3>
                </div>

                {/* Product Name */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT NAME HERE !
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={titleChangeHandler}
                    className="form-control"
                    placeholder={"Big Rectangle Cake"}
                  />
                </div>

                {/* Product Slug */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT SLUG HERE !
                  </label>
                  <input
                    type="text"
                    value={product.slug}
                    onChange={(evt) =>
                      setProduct({ ...product, slug: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"big-rectangle-cake"}
                  />
                </div>

                {/* Product Size */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT SIZE HERE !
                  </label>
                  <input
                    type="text"
                    value={product.size}
                    onChange={(evt) =>
                      setProduct({ ...product, size: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Chocolaty"}
                  />
                </div>

                {/* Parent Category */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PARENT CATEGORY HERE !
                  </label>
                  <select
                    className={"form-control"}
                    name={"category"}
                    onChange={(evt) =>
                      setProduct({
                        ...product,
                        parentCategories: [
                          ...product.parentCategories,
                          { catId: evt.target.value },
                        ],
                      })
                    }
                  >
                    <option value={""}>Select Parent Category</option>
                    {parentCategory.map((value, index) => {
                      return (
                        <option key={index} value={value._id}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Sub Category */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SUB CATEGORY HERE !
                  </label>
                  <select
                    className={"form-control"}
                    name={"category"}
                    onChange={(evt) =>
                      setProduct({
                        ...product,
                        categories: [
                          ...product.categories,
                          { catId: evt.target.value },
                        ],
                      })
                    }
                  >
                    <option value={""}>Select Sub Category</option>
                    {category.map((value, index) => {
                      return (
                        <option key={index} value={value._id}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Flavour */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    FLAVOUR HERE !
                  </label>
                  <select
                    className={"form-control"}
                    name={"flavour"}
                    onChange={(evt) =>
                      setProduct({ ...product, flavour: evt.target.value })
                    }
                  >
                    <option value={""}>Select Cake Flavour</option>
                    {flavour.map((value, index) => {
                      return (
                        <option key={index} value={value._id}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Color Name */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    COLOR HERE !
                  </label>
                  <select
                    className={"form-control"}
                    name={"color"}
                    onChange={(evt) =>
                      setProduct({ ...product, color: evt.target.value })
                    }
                  >
                    <option value={""}>Select Cake Color</option>
                    {color.map((value, index) => {
                      return (
                        <option key={index} value={value._id}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Is Egg Cake*/}
                <div className={"col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    IS EGG CAKE
                  </label>
                  <div className="d-flex my-3">
                    <div className="custom-control custom-radio pl-0 ml-0">
                      <input
                        type="radio"
                        id="cakeType1"
                        name="eggCake"
                        value={"true"}
                        onChange={(evt) =>
                          setProduct({
                            ...product,
                            isEggCake: Boolean(evt.target.value),
                          })
                        }
                        className="custom-control-input"
                      />
                      <label className="custom-control-label" for="cakeType1">
                        YES
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="cakeType2"
                        name="eggCake"
                        checked={!product.isEggCake ? true : false}
                        value={"false"}
                        onChange={(evt) =>
                          setProduct({
                            ...product,
                            isEggCake: Boolean(evt.target.value),
                          })
                        }
                        className="custom-control-input"
                      />
                      <label className="custom-control-label" for="cakeType2">
                        NO
                      </label>
                    </div>
                  </div>
                </div>

                {/* Is Photo Cake*/}
                <div className={"col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    IS PHOTO CAKE
                  </label>
                  <div className="d-flex my-3">
                    <div className="custom-control custom-radio pl-0 ml-0">
                      <input
                        type="radio"
                        id="cakeType3"
                        name="photoCake"
                        value={"true"}
                        onChange={(evt) =>
                          setProduct({
                            ...product,
                            isPhotoCake: Boolean(evt.target.value),
                          })
                        }
                        className="custom-control-input"
                      />
                      <label className="custom-control-label" for="cakeType3">
                        YES
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="cakeType4"
                        name="photoCake"
                        checked={!product.isPhotoCake ? true : false}
                        value={"false"}
                        onChange={(evt) =>
                          setProduct({
                            ...product,
                            isPhotoCake: Boolean(evt.target.value),
                          })
                        }
                        className="custom-control-input"
                      />
                      <label className="custom-control-label" for="cakeType4">
                        NO
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cake Type */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CAKE TYPE
                  </label>
                  <input
                    type="text"
                    value={product.type}
                    onChange={(evt) =>
                      setProduct({ ...product, type: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Party Cakes"}
                  />
                </div>

                {/* Cake Shape */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CAKE SHAPE
                  </label>
                  <input
                    type="text"
                    value={product.shape}
                    onChange={(evt) =>
                      setProduct({ ...product, shape: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Heart"}
                  />
                </div>
              </div>

              {/* SKUs */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Product Skus</h3>
                </div>
                {/* Weight */}
                <div className={"form-group col-md-4"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CAKE WEIGHT
                  </label>
                  <input
                    type="text"
                    onChange={(evt) => setWeight(evt.target.value)}
                    name="weight"
                    value={weight}
                    className="form-control"
                    placeholder={"1/2 kg"}
                  />
                </div>

                {/* MRP */}
                <div className={"form-group col-md-3"}>
                  <label htmlFor="" className="text-dark h6 active">
                    CAKE MRP
                  </label>
                  <input
                    type="text"
                    onChange={(evt) => setMRP(evt.target.value)}
                    name="mrp"
                    value={mrp}
                    className="form-control"
                    placeholder={"700"}
                  />
                </div>

                {/* Selling Price */}
                <div className={"form-group col-md-3"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELLING PRICE
                  </label>
                  <input
                    type="text"
                    onChange={(evt) => setSellingPrice(evt.target.value)}
                    name="sellingPrice"
                    value={sellingPrice}
                    className="form-control"
                    placeholder={"599"}
                  />
                </div>
                <div className={"form-group col-md-2"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"button"}
                    onClick={addSkusHandler}
                  >
                    <div>
                      <i className="fas fa-plus"></i> Add
                    </div>
                  </button>
                </div>

                <div className="col-md-11">
                  {product.skus.map((value, index) => {
                    return (
                      <div className="card m-0 mb-1">
                        <div className="card-body px-2 py-2 d-flex justify-content-between">
                          <h6>Cake Weight: {value.weight} </h6>
                          <h6>Cake MRP: {value.mrp} </h6>
                          <h6>Cake Selling Price: {value.sellingPrice} </h6>
                          <button
                            type="button"
                            className="btn btn-danger px-2 py-0 m-0"
                            onClick={() => deleteSkuHandler(index)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Product Description */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Product Description</h3>
                </div>
                <div className={"form-group col-md-12"}>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setProduct({ ...product, description: data });
                    }}
                    data={product.description}
                  />
                </div>
              </div>

              {/* Product Images */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Product Images</h3>
                </div>

                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT IMAGES
                  </label>
                  <input
                    type="file"
                    onChange={imageChangeHandler}
                    className="form-control"
                  />
                </div>

                <div className={"form-group col-md-2"}>
                  <img
                    style={{
                      maxHeight: "100px",
                      maxWidth: "100px",
                      borderRadius: "100%",
                      border: "1px solid #5a5a5a",
                    }}
                    src={logoDefault}
                  />
                  {progress ? (
                    <div className="progress mt-2">
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

                {/* Submit Button */}
                <div className={"form-group col-md-6"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isAddLoaded ? (
                      <div>
                        <i className="fas fa-plus"></i> Add Product
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

export default EditDeals;
