import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";

function AddAdonProduct() {
  const history = useHistory();
  // State Variable

  const [isAddLoaded, setIsAddLoaded] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    sellingPrice: "",
    parentCategories: [],
    categories: [],
    image: "",
  });
  const [logoDefault, setlogoDefault] = useState("https://bit.ly/3kPLfxF");
  const [logoImage, setLogoImage] = useState("");
  const [category, setCategory] = useState([]);
  const [parentCategory, setParentCategory] = useState([]);
  const [progress, setProgress] = useState("");

  const [selectPCat, setSelectPCat] = useState([]);
  const [selectSCat, setSelectSCat] = useState([]);

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
              image: url,
            });
            // setCategory({ ...category, category_image: url })
          });
      }
    );
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    const filteredPCat = selectPCat.map((value) => {
      return { catId: value.catId };
    });
    const filteredSCat = selectSCat.map((value) => {
      return { catId: value.catId };
    });

    const addProduct = {
      ...product,
      parentCategories: filteredPCat,
      categories: filteredSCat,
    };

    fetch(Config.SERVER_URL + "/adon-product", {
      method: "POST",
      body: JSON.stringify(addProduct),
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
    fetch(`${Config.SERVER_URL}/parent-category?limit=10000`, {
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
    let url = `${Config.SERVER_URL}/category`;
    let body = "";
    let method = "GET";
    if (selectPCat.length) {
      const filter = selectPCat.map((value) => value.catId);
      url = `${url}/byParentCategory`;
      body = { catId: filter };
      method = "POST";
    } else {
      setSelectSCat([]);
    }

    fetch(url, {
      method: method,
      body: body != "" ? JSON.stringify(body) : null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            if (!result.body.length) setSelectSCat([]);
            setCategory(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, [selectPCat]);

  const addParentCategoryHandler = (evt) => {
    evt.preventDefault();
    const cat = JSON.parse(evt.target.value);
    console.log(cat);
    const isExist = selectPCat.find((value) => {
      if (value.catId == cat.catId) {
        return true;
      }
    });

    if (isExist) {
      M.toast({ html: "Already Exist", classes: "text-light" });
      return;
    }

    console.log(selectPCat);
    setSelectPCat([...selectPCat, cat]);
  };

  const deleteParentCategoryHandler = (evt, value) => {
    evt.preventDefault();
    const filtered = selectPCat.filter(
      (cat, index) => cat.catId != value.catId
    );

    setSelectPCat([...filtered]);
  };

  const addSubCategoryHandler = (evt) => {
    evt.preventDefault();
    const cat = JSON.parse(evt.target.value);

    const isExist = selectSCat.find((value) => {
      if (value.catId == cat.catId) {
        return true;
      }
    });

    if (isExist) {
      M.toast({ html: "Already Exist", classes: "text-light" });
      return;
    }

    console.log(selectSCat);
    setSelectSCat([...selectSCat, cat]);
  };

  const deleteSubCategoryHandler = (evt, value) => {
    evt.preventDefault();
    const filtered = selectSCat.filter(
      (cat, index) => cat.catId != value.catId
    );

    setSelectSCat([...filtered]);
  };

  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Adon Products</h3>
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
                    onChange={(evt) => {
                      setProduct({ ...product, name: evt.target.value });
                    }}
                    className="form-control"
                    placeholder={"Big Rectangle Cake"}
                  />
                </div>

                {/* sellingPrice */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELLING PRICE
                  </label>
                  <input
                    type="text"
                    value={product.sellingPrice}
                    onChange={(evt) =>
                      setProduct({ ...product, sellingPrice: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"499"}
                  />
                </div>

                {/* Parent Category */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PARENT CATEGORY HERE !
                  </label>
                  <div className="border p-2">
                    <select
                      className={"form-control custom-select"}
                      size={5}
                      name={"category"}
                      onChange={addParentCategoryHandler}
                    >
                      {parentCategory.map((value, index) => {
                        return (
                          <option
                            key={index}
                            value={JSON.stringify({
                              catId: value._id,
                              name: value.name,
                            })}
                          >
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Selected Parent Category */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECTED PARENT CATEGORY!
                  </label>
                  <div className="border p-2">
                    {selectPCat.map((value, index) => {
                      return (
                        <span
                          key={index}
                          className="badge badge-info p-2 btn mr-2"
                          onClick={(evt) =>
                            deleteParentCategoryHandler(evt, value)
                          }
                        >
                          {value.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Sub Category */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SUB CATEGORY HERE !
                  </label>
                  <div className="border p-2">
                    <select
                      className={"form-control custom-select"}
                      size={5}
                      name={"category"}
                      onChange={addSubCategoryHandler}
                    >
                      {category.map((value, index) => {
                        return (
                          <option
                            key={index}
                            value={JSON.stringify({
                              catId: value._id,
                              name: value.name,
                            })}
                          >
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Selected Sub Category */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECTED SUB CATEGORY HERE !
                  </label>
                  <div className="border p-2">
                    {selectSCat.map((value, index) => {
                      return (
                        <span
                          key={index}
                          className="badge badge-info p-2 btn mr-2"
                          onClick={(evt) =>
                            deleteSubCategoryHandler(evt, value)
                          }
                        >
                          {value.name}
                        </span>
                      );
                    })}
                  </div>
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

export default AddAdonProduct;
