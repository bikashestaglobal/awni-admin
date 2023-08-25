import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M, { toast } from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";
import Select from "react-select";
import Resizer from "react-image-file-resizer";
import { compressImage, convertByteToMb } from "../../helpers";
import { type } from "jquery";

function AddProduct() {
  const history = useHistory();
  const [isAddLoaded, setIsAddLoaded] = useState(true);
  const defaultImageRef = useRef(null);
  const imagesRef = useRef(null);
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

  const [natures, setNatures] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [series, setSeries] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [patterns, setPatterns] = useState([]);

  const [defaultRawImage, setDefaultRawImage] = useState("");
  const [rawImages, setRawImages] = useState([]);

  // For Image Compressing
  const [compressValue, setCompressValue] = useState(50);
  const [isCompress, setIsCompress] = useState(true);
  const [
    compressedDefaultImageForPreview,
    setCompressedDefaultImageForPreview,
  ] = useState({
    url: "",
    originalSize: "",
    compressedSize: "",
  });
  const [compressedImages, setCompressedImages] = useState("");

  const [compressedDefaultImageForUpload, setCompressedDefaultImageForUpload] =
    useState(null);

  const [compressedImagesForPreview, setCompressedImagesForPreview] = useState(
    []
  );
  const [compressedImagesForUpload, setCompressedImagesForUpload] = useState(
    []
  );

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

  // Image Change
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

  const handleImageChange = async (files, type) => {
    if (type == "default_image") {
      // const file = event.target.files[0];
      let file = files;
      if (!file) return;

      setDefaultRawImage(file);

      if (!isCompress) {
        handleUpload(file, "", type);
        return;
      }

      const maxWidth = 1126; // Set your desired maximum width
      const maxHeight = 1313; // Set your desired maximum height
      const quality = compressValue / 100; // Set the image quality (0 to 1)

      try {
        const compressedBlob = await compressImage(
          file,
          maxWidth,
          maxHeight,
          quality
        );
        const compressedFile = new File([compressedBlob], file.name, {
          type: compressedBlob.type,
        });

        const reader = new FileReader();
        reader.onload = function (e) {
          setCompressedDefaultImageForPreview({
            url: e.target.result,
            compressedSize: convertByteToMb(compressedFile.size),
            originalSize: convertByteToMb(file.size),
          });
          setCompressedDefaultImageForUpload(compressedFile);
        };
        reader.readAsDataURL(compressedFile);

        // handleUpload(compressedFile, "", "default_image");
        // setCompressedImage(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    } else {
      if (files && files.length) {
        setRawImages(files);
        if (!isCompress) {
          [...files].map((value, index) => {
            handleUpload(value, index);
          });
          return;
        }

        // const files = event.target.files;
        const maxWidth = 1126; // Set your desired maximum width
        const maxHeight = 1313; // Set your desired maximum height
        const quality = compressValue / 100; // Set the image quality (0 to 1)

        try {
          for (let file of files) {
            const compressedBlob = await compressImage(
              file,
              maxWidth,
              maxHeight,
              quality
            );
            const compressedFile = new File([compressedBlob], file.name, {
              type: compressedBlob.type,
            });

            const reader = new FileReader();
            reader.onload = function (e) {
              setCompressedImagesForPreview((oldImage) => {
                return [
                  ...oldImage,
                  {
                    url: e.target.result,
                    compressedSize: convertByteToMb(compressedFile.size),
                    originalSize: convertByteToMb(file.size),
                  },
                ];
              });
              setCompressedImagesForUpload((oldImage) => {
                return [...oldImage, compressedFile];
              });
            };
            reader.readAsDataURL(compressedFile);
          }

          // handleUpload(compressedFile, "", "default_image");
          // setCompressedImage(compressedFile);
        } catch (error) {
          console.error("Error compressing image:", error);
        }
      }
    }
  };

  const compressAgain = () => {
    handleImageChange(defaultRawImage, "default_image");
    handleImageChange(rawImages);
    setCompressedImagesForPreview([]);
    setCompressedImagesForUpload([]);
  };

  const handleUploadImageBtnClick = () => {
    if (compressedDefaultImageForUpload)
      handleUpload(compressedDefaultImageForUpload, "", "default_image");

    if (compressedImagesForUpload.length)
      compressedImagesForUpload.map((value, index) => {
        handleUpload(value, index);
      });

    setCompressedImagesForPreview([]);
    setCompressedImagesForUpload([]);
    setCompressedDefaultImageForUpload(null);
    setCompressedDefaultImageForPreview({
      url: "",
      originalSize: "",
      compressedSize: "",
    });
    setDefaultRawImage("");
    setRawImages([]);
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

  const handleDeletePreviewImage = (type, index) => {
    if (type === "default_image") {
      setCompressedDefaultImageForPreview({
        url: "",
        originalSize: "",
        compressedSize: "",
      });
      setCompressedDefaultImageForUpload(null);
      defaultImageRef.current.value = null;
      setDefaultRawImage("");
    } else {
      // Delete image from preview
      const allCompressedImagesForPreview = [...compressedImagesForPreview];
      const filteredImagesForPreview = allCompressedImagesForPreview.filter(
        (_, __) => {
          return index != __;
        }
      );
      setCompressedImagesForPreview(filteredImagesForPreview);

      // Delete image from upload
      if (compressedImagesForUpload) {
        const allCompressedImagesForUpload = [...compressedImagesForUpload];
        const filteredImagesForUpload = allCompressedImagesForUpload.filter(
          (_, __) => {
            return index != __;
          }
        );
        setCompressedImagesForUpload(filteredImagesForUpload);
      }

      // Delete image from row
      const allRawImages = [...rawImages];
      const filteredRawImages = allRawImages.filter((_, __) => {
        return index != __;
      });
      setRawImages(filteredRawImages);

      imagesRef.current.value = null;
    }
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

  // get Natures
  useEffect(() => {
    let url = `${Config.SERVER_URL}/natures?limit=5000`;

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
            setNatures(f);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Surfaces
  useEffect(() => {
    let url = `${Config.SERVER_URL}/surfaces?limit=5000`;

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
            setSurfaces(f);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Series
  useEffect(() => {
    let url = `${Config.SERVER_URL}/series?limit=5000`;

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
            setSeries(f);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Shapes
  useEffect(() => {
    let url = `${Config.SERVER_URL}/shapes?limit=5000`;

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
            setShapes(f);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Patterns
  useEffect(() => {
    let url = `${Config.SERVER_URL}/patterns?limit=5000`;

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
            setPatterns(f);
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
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
              id="productUpdateForm"
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
                {/* ENTER BRAND NAME */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER BRAND NAME
                  </label>
                  <input
                    type="text"
                    value={product.brand}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        brand: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"AWNI"}
                  />
                </div>
                {/* ENTER CONCEPT */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    ENTER CONCEPT
                  </label>
                  <input
                    type="text"
                    value={product.concept}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        concept: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"LM 105"}
                  />
                </div>
                {/* COUNTRY OF ORIGIN */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    COUNTRY OF ORIGIN
                  </label>
                  <input
                    type="text"
                    value={product.origin_country}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        origin_country: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"INDIA"}
                  />
                </div>
                {/* RELATED PRODUCT */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    RELATED PRODUCT
                  </label>
                  <input
                    type="text"
                    value={product.related_product}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        related_product: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"ENTER RELATED PRODUCT"}
                  />
                </div>
                {/* PC PER BOX */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PC PER BOX
                  </label>
                  <input
                    type="number"
                    value={product.pc_per_box}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        pc_per_box: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"5"}
                  />
                </div>
                {/* COVERED AREA */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    COVERED AREA (Sq. Mtr.)
                  </label>
                  <input
                    type="number"
                    value={product.covered_area}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        covered_area: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"0.81"}
                  />
                </div>

                {/* MOVEMENT */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    MOVEMENT
                  </label>
                  <input
                    type="number"
                    value={product.movement}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        movement: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"movement"}
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
                {/* SELECT NATURE */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT NATURE
                  </label>
                  <div className="p-2">
                    <Select
                      options={natures}
                      onChange={(evt) => {
                        setProduct({ ...product, nature_id: evt.value });
                      }}
                    />
                  </div>
                </div>
                {/* SELECT SURFACE */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT SURFACE
                  </label>
                  <div className="p-2">
                    <Select
                      options={surfaces}
                      onChange={(evt) => {
                        setProduct({ ...product, surface_id: evt.value });
                      }}
                    />
                  </div>
                </div>
                {/* SELECT SERIES */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT SERIES
                  </label>
                  <div className="p-2">
                    <Select
                      options={series}
                      onChange={(evt) => {
                        setProduct({ ...product, series_id: evt.value });
                      }}
                    />
                  </div>
                </div>
                {/* SELECT SHAPE */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT SHAPE
                  </label>
                  <div className="p-2">
                    <Select
                      options={shapes}
                      onChange={(evt) => {
                        setProduct({ ...product, shape_id: evt.value });
                      }}
                    />
                  </div>
                </div>
                {/* SELECT PATTERN */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT PATTERN
                  </label>
                  <div className="p-2">
                    <Select
                      options={patterns}
                      onChange={(evt) => {
                        setProduct({ ...product, pattern_id: evt.value });
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

                {/* SHORT DESCRIPTION */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SHORT DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={product.short_description}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        short_description: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"Short Description"}
                  />
                </div>

                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    LONG DESCRIPTION
                  </label>
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

                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    APPLICATION AREA
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setProduct({ ...product, application_area: data });
                    }}
                    data={product.application_area}
                  />
                </div>
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    FEATURES
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setProduct({ ...product, features: data });
                    }}
                    data={product.features}
                  />
                </div>
              </div>

              {/* Meta Details */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Meta Details</h3>
                </div>

                {/* META TITLE */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    META TITLE
                  </label>
                  <input
                    type="text"
                    value={product.meta_title}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        meta_title: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"Meta Title"}
                  />
                </div>

                {/* META DESCRIPTION */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    META DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={product.meta_description}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        meta_description: evt.target.value,
                      });
                    }}
                    className="form-control"
                    placeholder={"Meta Description"}
                  />
                </div>
              </div>

              {/* Product Images */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className={"my-3 text-info"}>
                        Image Compressor Setting
                      </h3>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-check p-0 m-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="compress-image"
                              value={isCompress}
                              checked={isCompress}
                              onChange={(evt) => {
                                setIsCompress(evt.target.checked);
                              }}
                            />
                            <label
                              className="form-check-label"
                              for="compress-image"
                            >
                              Compress Image
                            </label>
                          </div>
                        </div>
                        {isCompress && (
                          <div className="col-md-3">
                            <span className="text-danger text-sm">High</span>
                            <input
                              className="ml-2"
                              value={compressValue}
                              onChange={(evt) => {
                                setCompressValue(evt.target.value);
                              }}
                              type="range"
                            />
                            {/* <span className="text-danger text-sm pl-2">
                              {compressValue}%
                            </span> */}

                            <span className="text-danger text-sm pl-2">
                              Low
                            </span>
                          </div>
                        )}

                        {isCompress && (
                          <div className="col-md-2">
                            {defaultRawImage || rawImages.length ? (
                              <button
                                type="button"
                                className="btn btn-info"
                                onClick={compressAgain}
                              >
                                Compress Again
                              </button>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <h3 className={"my-3 text-info"}>Product Images</h3>
                    </div>
                  </div>
                </div>

                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT DEFAULT IMAGE
                  </label>
                  <input
                    type="file"
                    ref={defaultImageRef}
                    onChange={(evt) =>
                      handleImageChange(evt.target.files[0], "default_image")
                    }
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <div className="row">
                    {compressedDefaultImageForPreview.url && (
                      <div className="col-md-6">
                        <p className="m-0 p-0">Compressed Preview</p>
                        <img
                          style={{
                            maxWidth: "200px",
                            border: "1px solid #5a5a5a",
                          }}
                          src={compressedDefaultImageForPreview.url}
                        />
                        <p className="m-0 p-0">
                          Original Size :{" "}
                          {compressedDefaultImageForPreview.originalSize}
                        </p>
                        <p className="m-0 p-0">
                          Compressed Size :{" "}
                          {compressedDefaultImageForPreview.compressedSize}
                        </p>
                        <button
                          style={{
                            position: "absolute",
                            top: "40%",
                            right: "45%",
                          }}
                          type="button"
                          className="btn bg-light text-danger"
                          title={"Delete Image"}
                          onClick={(evt) => {
                            handleDeletePreviewImage("default_image");
                          }}
                        >
                          X
                        </button>
                      </div>
                    )}

                    {defaultImages ? (
                      <div className={"form-group col-md-6 pt-4"}>
                        <img
                          style={{
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
                            fileDeleteHandler(
                              defaultImages,
                              "",
                              "default_image"
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

                {/* <div className="col-md-12">
                  {compressedDefaultImageForPreview.url && !defaultImages ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleUpload(
                          compressedDefaultImageForUpload,
                          "",
                          "default_image"
                        );
                      }}
                      className="btn btn-info"
                    >
                      Upload
                    </button>
                  ) : null}
                </div> */}

                {/* Products Multiple Images */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT IMAGES
                  </label>
                  <input
                    type="file"
                    multiple
                    // onChange={imageChangeHandler}
                    ref={imagesRef}
                    onChange={(event) => {
                      handleImageChange(event.target.files);
                    }}
                    className="form-control"
                  />
                </div>

                {/* Multiple Compressed Image Preview  */}
                <div className="col-md-12">
                  <div className="row">
                    {compressedImagesForPreview.map((image, index) => {
                      return (
                        <div className={"form-group col-md-3"} key={index}>
                          <p className="h6 p-0 m-0">Compressed Preview</p>
                          <img
                            style={{
                              width: "100%",
                              border: "1px solid #5a5a5a",
                            }}
                            src={image.url}
                          />
                          <p className="m-0 p-0">
                            Original Size : {image.originalSize}
                          </p>
                          <p className="m-0 p-0">
                            Compressed Size : {image.compressedSize}
                          </p>
                          <button
                            style={{
                              position: "absolute",
                              top: "40%",
                              right: "45%",
                            }}
                            type="button"
                            className="btn bg-light text-danger"
                            title={"Delete Image"}
                            onClick={(evt) => {
                              handleDeletePreviewImage("images", index);
                            }}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
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
                  {(compressedImagesForPreview.length &&
                    !previewImages.length) ||
                  (compressedDefaultImageForPreview.url && !defaultImages) ? (
                    <button
                      type="button"
                      onClick={handleUploadImageBtnClick}
                      className="btn btn-info mr-2"
                    >
                      Upload Image
                    </button>
                  ) : null}

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
