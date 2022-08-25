import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M, { toast } from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";
import Select from "react-select";

function AddProduct() {
  const history = useHistory();
  const [isAddLoaded, setIsAddLoaded] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    mrp: "",
    range_id: "",
    selling_price: "",
    size: "",
    code: "",
    weight: "",
    description: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [progressInfos, setProgressInfos] = useState([]);
  const [defaultImages, setDefaultImages] = useState("");
  const [defaultImgProgress, setDefaultImgProgress] = useState("");

  const [parentCategories, setParentCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const [selectPCat, setSelectPCat] = useState("");
  const [selectSCat, setSelectSCat] = useState("");
  const [selectCCat, setSelectCCat] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [colors, setColors] = useState([]);
  const [ranges, setRanges] = useState([]);

  const titleChangeHandler = (evt) => {
    const value = evt.target.value;
    setProduct({
      ...product,
      slug: value
        .toLowerCase()
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        .replace(/\s+/g, "-"),
      name: value,
    });
  };

  // Iamage Change
  const imageChangeHandler = (event, type) => {
    if (type == "default_image") {
      handleUpload(event.target.files[0], "", type);
    } else {
      if (event.target.files && event.target.files.length) {
        [...event.target.files].map((value, index) => {
          handleUpload(value, index);
        });
      }
    }
  };

  // Upload Image
  const handleUpload = (image, i, type) => {
    const uploadTask = storage.ref(`products/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (type == "default_image") {
          setDefaultImgProgress(progress);
        } else {
          let arrs = [...progressInfos];
          arrs[i] = progress;
          setProgressInfos((old) => {
            return [...arrs];
          });
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("products")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            if (type == "default_image") {
              setDefaultImages(url);
            } else {
              setPreviewImages((old) => [...old, url]);
            }
          });
      }
    );
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    const addProduct = {
      ...product,
      par_cat_id: selectPCat,
      cat_id: selectSCat,
      child_cat_id: selectCCat,
      default_image: defaultImages,
    };

    fetch(Config.SERVER_URL + "/products", {
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
          setIsAddLoaded(true);
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            imageSubmitHandler(result.body.id);
            colorSubmitHandler(result.body.id);
            history.goBack();
          } else {
            const errorKeys = Object.keys(result.errors);
            errorKeys.forEach((key) => {
              M.toast({ html: result.errors[key], classes: "bg-danger" });
            });
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAddLoaded(true);
        }
      );
  };

  // Image Submit Handler
  const imageSubmitHandler = (product_id) => {
    const addProductImages = {
      product_id: product_id,
      urls: previewImages,
    };

    fetch(Config.SERVER_URL + "/productImages", {
      method: "POST",
      body: JSON.stringify(addProductImages),
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

  // Color Submit Handler
  const colorSubmitHandler = (product_id) => {
    const addProductColors = {
      product_id: product_id,
      colors: selectedColors.map((item) => {
        return [item.color_id];
      }),
    };

    fetch(Config.SERVER_URL + "/productColors", {
      method: "POST",
      body: JSON.stringify(addProductColors),
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

  const fileDeleteHandler = (image, index, type) => {
    // Create a reference to the file to delete
    const fileRef = storage.refFromURL(image);
    // Delete the file
    fileRef
      .delete()
      .then(() => {
        // File deleted successfully
        if (type == "default_image") {
          setDefaultImages("");
          setDefaultImgProgress("");
        } else {
          let pImages = [...previewImages];
          pImages.splice(index, 1);

          let pInfos = [...progressInfos];
          pInfos.splice(index, 1);
          setProgressInfos(pInfos);
          setPreviewImages(pImages);
        }
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        M.toast({ html: error, classes: "bg-danger" });
      });
  };

  const addColorHandler = (evt) => {
    const color = { color_id: evt.value, name: evt.label };

    const isExist = selectedColors.find((value) => {
      if (value.color_id == color.color_id) {
        return true;
      }
    });

    if (isExist) {
      toast({ html: "Already Exist", classes: "text-danger" });
      return;
    }

    setSelectedColors([...selectedColors, color]);
  };

  const deleteColorHandler = (evt, value) => {
    evt.preventDefault();
    const filtered = selectedColors.filter(
      (color, index) => color.color_id != value.color_id
    );

    setSelectedColors([...filtered]);
  };

  // get Parent Category
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

  // get Range
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/ranges?skip=0&limit=5000`, {
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

            setRanges(f);
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
    let url = `${Config.SERVER_URL}/categories`;
    if (selectPCat) {
      url = `${Config.SERVER_URL}/categories?par_cat_id=${selectPCat}`;
    }

    fetch(url, {
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
            // if (!result.body.length) setSelectSCat([]);
            let f = result.body.map((v) => {
              return { label: v.name, value: v.id };
            });
            setCategories(f);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, [selectPCat]);

  // get child Category
  useEffect(() => {
    let url = `${Config.SERVER_URL}/childCategories?limit=5000`;
    if (selectSCat) {
      url = `${Config.SERVER_URL}/childCategories?cat_id=${selectSCat}&limit=5000`;
    }

    fetch(url, {
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
            // if (!result.body.length) setSelectSCat([]);
            let f = result.body.map((v) => {
              return { label: v.name, value: v.id };
            });
            setChildCategories(f);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, [selectSCat]);

  // get Colors
  useEffect(() => {
    let url = `${Config.SERVER_URL}/colors?limit=5000`;

    fetch(url, {
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
            // if (!result.body.length) setSelectSCat([]);
            let f = result.body.map((v) => {
              return { label: v.name, value: v.id };
            });
            setColors(f);
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
            <h3 className="text-themecolor m-b-0 m-t-0">Products</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
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
                  <h3 className={"my-3 text-info"}>Product Details</h3>
                </div>

                {/* Product Name */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER PRODUCT NAME !
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
                    ENTER PRODUCT SLUG !
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

                {/* Product MRP */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER PRODUCT MRP !
                  </label>
                  <input
                    type="number"
                    value={product.mrp}
                    onChange={(evt) => {
                      setProduct({ ...product, mrp: evt.target.value });
                    }}
                    className="form-control"
                    placeholder={"599"}
                  />
                </div>

                {/* Product Selling Price */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT SELLING PRICE !
                  </label>
                  <input
                    type="number"
                    value={product.selling_price}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        selling_price: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"550"}
                  />
                </div>

                {/* Product Size */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER PRODUCT SIZE !
                  </label>
                  <input
                    type="text"
                    value={product.size}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        size: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"370x525x280 mm"}
                  />
                </div>

                {/* Product Code */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER PRODUCT CODE !
                  </label>
                  <input
                    type="text"
                    value={product.code}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        code: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"LAS-WHT-91153"}
                  />
                </div>

                {/* Product Weight */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER PRODUCT WEIGHT !
                  </label>
                  <input
                    type="text"
                    value={product.weight}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        weight: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"5K"}
                  />
                </div>

                {/* PARENT CATEGORIES */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT PARENT CATEGORY !
                  </label>
                  <div className="p-2">
                    <Select
                      options={parentCategories}
                      onChange={(evt) => {
                        setSelectPCat(evt.value);
                      }}
                    />
                  </div>
                </div>

                {/* SUB CATEGORY */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT SUB CATEGORY !
                  </label>
                  <div className="p-2">
                    <Select
                      options={categories}
                      onChange={(evt) => {
                        setSelectSCat(evt.value);
                      }}
                    />
                  </div>
                </div>

                {/* CHILD CATEGORY */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT CHILD CATEGORY !
                  </label>
                  <div className="p-2">
                    <Select
                      options={childCategories}
                      onChange={(evt) => {
                        setSelectCCat(evt.value);
                      }}
                    />
                  </div>
                </div>

                {/* RANGE */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT RANGE !
                  </label>
                  <div className="p-2">
                    <Select
                      options={ranges}
                      onChange={(evt) => {
                        setProduct({ ...product, range_id: evt.value });
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Product Colors */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Product Colours</h3>
                </div>
                {/* COLOR */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT COLOUR !
                  </label>
                  <div className="p-2">
                    <Select
                      options={colors}
                      // onChange={(evt) => {
                      //   setProduct({ ...product, range_id: evt.value });
                      // }}
                      onChange={addColorHandler}
                    />
                  </div>
                </div>
                {/* Selected Colours */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECTED COLOURS!
                  </label>
                  <div className="border p-2">
                    {selectedColors.map((value, index) => {
                      return (
                        <span
                          key={index}
                          className="badge badge-info p-2 btn mr-2"
                          onClick={(evt) => deleteColorHandler(evt, value)}
                        >
                          {value.name}
                        </span>
                      );
                    })}
                  </div>
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
                    PRODUCT DEFAULT IMAGE
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(evt) => imageChangeHandler(evt, "default_image")}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  {defaultImages ? (
                    <div className={"form-group"}>
                      <img
                        style={{
                          maxHeight: "200px",
                          maxWidth: "200px",
                          border: "1px solid #5a5a5a",
                        }}
                        src={defaultImages}
                      />
                      <button
                        style={{
                          position: "absolute",
                          top: "40%",
                          right: "45%",
                        }}
                        type="button"
                        className="btn bg-light text-danger"
                        title={"Delete Image"}
                        onClick={(evt) =>
                          fileDeleteHandler(defaultImages, "", "default_image")
                        }
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    ""
                  )}

                  {defaultImgProgress ? (
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${defaultImgProgress}%` }}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {defaultImgProgress}%
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* Products Multiple Images */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT IMAGES
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={imageChangeHandler}
                    className="form-control"
                  />
                </div>

                {/*Multiple Image Preview */}
                <div className="col-md-12 mb-1">
                  <div className="row">
                    {previewImages.map((img, index) => {
                      return (
                        <div className={"form-group col-md-3"} key={index}>
                          <img
                            style={{
                              maxHeight: "100%",
                              maxWidth: "100%",
                              border: "1px solid #5a5a5a",
                            }}
                            src={img}
                          />
                          <button
                            style={{
                              position: "absolute",
                              top: "40%",
                              right: "45%",
                            }}
                            type="button"
                            className="btn bg-light text-danger"
                            title={"Delete Image"}
                            onClick={(evt) => fileDeleteHandler(img, index)}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Multiple image prpgress */}
                <div className="col-md-12 mb-2">
                  <div className="row">
                    {progressInfos.map((info, index) => {
                      return (
                        <div className="col-md-3" key={index}>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${info}%` }}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {info}%
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className={"form-group col-md-12"}>
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

export default AddProduct;
