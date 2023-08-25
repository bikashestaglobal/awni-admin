import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M, { toast } from "materialize-css";
import Config from "../../../config/Config";
import { storage } from "../../../../firebase/FirebaseConfig";
import Select from "react-select";
import { compressImage, convertByteToMb } from "../../helpers";

function EditProduct() {
  const history = useHistory();
  const { id } = useParams();
  const [isAddLoaded, setIsAddLoaded] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    mrp: "",
    selling_price: "",
    size: "",
    code: "",
    weight: "",
    status: "",
    description: "",
    par_cat_id: "",
    cat_id: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [progressInfos, setProgressInfos] = useState([]);
  const [defaultImages, setDefaultImages] = useState("");
  const [defaultImgProgress, setDefaultImgProgress] = useState("");
  const [description, setDescription] = useState("");
  const [applicationArea, setApplicationArea] = useState("");
  const [features, setFeatures] = useState("");

  const [parentCategories, setParentCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const [selectPCat, setSelectPCat] = useState({});
  const [selectSCat, setSelectSCat] = useState({});
  const [selectCCat, setSelectCCat] = useState({});
  const [selectColor, setSelectColor] = useState({});
  const [selectRange, setSelectRange] = useState({});
  const [productImgDelete, setProductImgDelete] = useState(false);
  const [productLoaded, setProductLoaded] = useState(false);
  const [ranges, setRanges] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [colors, setColors] = useState([]);

  const [natures, setNatures] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [series, setSeries] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [patterns, setPatterns] = useState([]);

  const [selectNature, setSelectNature] = useState([]);
  const [selectSurface, setSelectSurface] = useState([]);
  const [selectSeries, setSelectSeries] = useState([]);
  const [selectShape, setSelectShape] = useState([]);
  const [selectPattern, setSelectPattern] = useState([]);

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

  // Iamege Change
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
            if (type == "default_image") {
              setDefaultImages(url);
            } else {
              imageSubmitHandler(id, url);
              // setPreviewImages((old) => [...old, url]);
            }
          });
      }
    );
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

  const compressAgain = () => {
    handleImageChange(defaultRawImage, "default_image");
    handleImageChange(rawImages);
    setCompressedImagesForPreview([]);
    setCompressedImagesForUpload([]);
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    const updateProduct = {
      name: product.name,
      slug: product.slug,
      mrp: product.mrp,
      selling_price: product.selling_price,
      size: product.size,
      status: product.status,
      range_id: selectRange.value,

      nature_id: selectNature.value || undefined,
      surface_id: selectSurface.value || undefined,
      series_id: selectSeries.value || undefined,
      shape_id: selectShape.value || undefined,
      pattern_id: selectPattern.value || undefined,

      brand: product.brand || undefined,
      concept: product.concept || undefined,
      origin_country: product.origin_country || undefined,
      related_product: product.related_product || undefined,
      pc_per_box: product.pc_per_box || undefined,
      covered_area: product.covered_area || undefined,
      short_description: product.short_description || undefined,
      movement: product.movement || undefined,
      meta_title: product.meta_title || undefined,
      meta_description: product.meta_description || undefined,

      weight: product.weight,
      code: product.code,
      description: description,
      application_area: applicationArea,
      features: features,
      par_cat_id: selectPCat.value,
      cat_id: selectSCat.value,
      child_cat_id: selectCCat.value,
      color_id: selectColor.value,
      default_image: defaultImages == "null" ? "" : defaultImages,
    };

    fetch(`${Config.SERVER_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateProduct),
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
          setIsAddLoaded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Image Submit Handler
  const imageSubmitHandler = (product_id, url) => {
    const addProductImages = {
      product_id: product_id,
      urls: [url],
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
          // console.log(result);
          if (result.status === 200) {
            setPreviewImages([...previewImages, result.body]);
            M.toast({ html: result.message, classes: "bg-success" });
            // history.goBack();
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

  // Product Image Delete Handler
  const productImageDeleteHandler = (imageId) => {
    fetch(`${Config.SERVER_URL}/productImages/${imageId}`, {
      method: "DELETE",

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
            setProductImgDelete(!productImgDelete);
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

  const fileDeleteHandler = (image, index, type, imageId) => {
    // Create a reference to the file to delete
    // const fileRef = storage.refFromURL(image);
    // // Delete the file
    // fileRef
    //   .delete()
    //   .then(() => {
    // File deleted successfully
    if (type == "default_image") {
      setDefaultImages("null");
      setDefaultImgProgress("");
      // fetch(`${Config.SERVER_URL}/products/${id}`, {
      //   method: "PUT",
      //   body: JSON.stringify({ default_image: "null" }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then(
      //     (result) => {
      //       if (result.status === 200) {
      //         M.toast({ html: result.message, classes: "bg-success" });
      //       } else {
      //         const errorKeys = Object.keys(result.errors);
      //         errorKeys.forEach((key) => {
      //           M.toast({ html: result.errors[key], classes: "bg-danger" });
      //         });
      //         M.toast({ html: result.message, classes: "bg-danger" });
      //       }
      //     },
      //     (error) => {
      //       M.toast({ html: error, classes: "bg-danger" });
      //     }
      //   );
    } else {
      let pImages = [...previewImages];
      pImages.splice(index, 1);

      let pInfos = [...progressInfos];
      pInfos.splice(index, 1);
      setProgressInfos(pInfos);
      setPreviewImages(pImages);
      productImageDeleteHandler(imageId);
      setProgressInfos([]);
    }
    // })
    // .catch((error) => {
    //   M.toast({ html: error, classes: "bg-danger" });
    // });
  };

  // Color Submit Handler
  const colorSubmitHandler = (product_id, color) => {
    const addProductColors = {
      product_id: product_id,
      colors: [color.color_id],
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
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Color Delete Submit Handler
  const colorDeleteSubmitHandler = (id) => {
    fetch(`${Config.SERVER_URL}/productColors/${id}`, {
      method: "DELETE",
      // body: JSON.stringify({addProductColors}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result);
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
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
        }
      );
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
    colorSubmitHandler(id, color);
  };

  const deleteColorHandler = (evt, value) => {
    console.log("-------", value);
    evt.preventDefault();
    const filtered = selectedColors.filter(
      (color, index) => color.id != value.id
    );

    setSelectedColors([...filtered]);
    colorDeleteSubmitHandler(value.id);
  };

  // get Product
  useEffect(() => {
    setProductLoaded(false);
    fetch(`${Config.SERVER_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setProductLoaded(true);
          if (result.status === 200) {
            setProduct(result.body);
            setDefaultImages(result.body.default_image || "");
            setDescription(result.body?.description || "");
            setApplicationArea(result.body?.application_area || "");
            setFeatures(result.body?.features || "");
            // setSelectPCat(result.body.par_cat_id || "");
            // setSelectSCat(result.body.cat_id || "");
            setSelectPCat({
              value: result.body.par_cat_id,
              label: result.body.par_cat_name,
            });
            setSelectSCat({
              value: result.body.cat_id,
              label: result.body.cat_name,
            });
            setSelectCCat({
              value: result.body.child_cat_id || "",
              label: result.body.child_cat_name || "",
            });
            setSelectRange({
              value: result.body.range_id,
              label: result.body.range_name,
            });

            setSelectNature({
              value: result.body?.nature_id,
              label: result.body?.nature_name,
            });
            setSelectSurface({
              value: result.body?.surface_id,
              label: result.body?.surface_name,
            });
            setSelectSeries({
              value: result.body?.series_id,
              label: result.body?.series_name,
            });
            setSelectShape({
              value: result.body?.shape_id,
              label: result.body?.shape_name,
            });
            setSelectPattern({
              value: result.body?.pattern_id,
              label: result.body?.pattern_name,
            });
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setProductLoaded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Product Image
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/productImages?product_id=${id}`, {
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
              // const urls = result.body.map((item) => item.url);
              setPreviewImages(result.body);
            }
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, [productImgDelete]);

  // get Parent Category
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/parentCategories?skip=0&limit=5000`, {
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

  // get Category
  useEffect(() => {
    let url = `${Config.SERVER_URL}/categories?limit=5000`;
    if (selectPCat.value) {
      url = `${Config.SERVER_URL}/categories?par_cat_id=${selectPCat.value}&limit=5000`;
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
    if (selectSCat.value) {
      url = `${Config.SERVER_URL}/childCategories?cat_id=${selectSCat.value}&limit=5000`;
    }

    console.log("URl", url);

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
  }, [selectSCat]);

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

  useEffect(() => {
    const pCat = [...parentCategories];
    const sCat = [...categories];
    setParentCategories(pCat);
    setCategories(sCat);
  }, [productLoaded]);

  // // get All Colors
  // useEffect(() => {
  //   let url = `${Config.SERVER_URL}/colors?limit=5000`;

  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         if (result.status === 200) {
  //           // if (!result.body.length) setSelectSCat([]);
  //           let f = result.body.map((v) => {
  //             return { label: v.name, value: v.id };
  //           });
  //           setColors(f);
  //         } else {
  //           M.toast({ html: result.message, classes: "bg-danger" });
  //         }
  //       },
  //       (error) => {
  //         M.toast({ html: error, classes: "bg-danger" });
  //       }
  //     );
  // }, []);

  // get Product Colors
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/productColors?product_id=${id}`, {
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
              const clrs = result.body.map((item) => {
                return {
                  name: item.name,
                  color_id: item.color_id,
                  id: item.id,
                };
              });
              console.log("clrs", clrs);
              setSelectedColors(clrs);
            }
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, [productImgDelete]);

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

        {/* Form */}
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
                    onChange={(evt) =>
                      setProduct({ ...product, name: evt.target.value })
                    }
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
                    PRODUCT MRP !
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

                {/* Product Status */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT STATUS !
                  </label>
                  <select
                    name=""
                    value={product.status}
                    onChange={(evt) => {
                      setProduct({
                        ...product,
                        status: evt.target.value,
                      });
                    }}
                    className="form-control"
                    id=""
                  >
                    <option value="true">ACTIVE</option>
                    <option value="false">DISABLE</option>
                  </select>
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

                {/* SELECT RANGE */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT RANGE !
                  </label>
                  <div className="">
                    <Select
                      options={ranges}
                      value={selectRange}
                      onChange={(evt) => {
                        setSelectRange({ value: evt.value, label: evt.label });
                      }}
                    />
                  </div>
                </div>

                {/* PARENT CATEGORIES */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT PARENT CATEGORY !
                  </label>
                  <div className="">
                    <Select
                      options={parentCategories}
                      value={selectPCat}
                      onChange={(evt) => {
                        setSelectPCat({ value: evt.value, label: evt.label });
                      }}
                    />
                  </div>
                </div>

                {/* SUB CATEGORY */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT SUB CATEGORY !
                  </label>
                  <div className="">
                    <div>
                      <Select
                        value={selectSCat}
                        options={categories}
                        onChange={(evt) => {
                          setSelectSCat({ value: evt.value, label: evt.label });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* CHILD CATEGORY */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT CHILD CATEGORY !
                  </label>
                  <div className="">
                    <div>
                      <Select
                        value={selectCCat}
                        options={childCategories}
                        onChange={(evt) => {
                          setSelectCCat({ value: evt.value, label: evt.label });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* SELECT NATURE */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT NATURE
                  </label>
                  <div className="p-2">
                    <Select
                      value={selectNature}
                      options={natures}
                      onChange={(evt) => {
                        setSelectNature({ value: evt.value, label: evt.label });
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
                      value={selectSurface}
                      options={surfaces}
                      onChange={(evt) => {
                        setSelectSurface({
                          value: evt.value,
                          label: evt.label,
                        });
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
                      value={selectSeries}
                      options={series}
                      onChange={(evt) => {
                        setSelectSeries({
                          value: evt.value,
                          label: evt.label,
                        });
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
                      value={selectShape}
                      options={shapes}
                      onChange={(evt) => {
                        setSelectShape({
                          value: evt.value,
                          label: evt.label,
                        });
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
                      value={selectPattern}
                      options={patterns}
                      onChange={(evt) => {
                        setSelectPattern({
                          value: evt.value,
                          label: evt.label,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* SELECT COLORS */}
                {/* <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT COLOUR !
                  </label>
                  <div className="">
                    <div>
                      <Select
                        value={selectColor}
                        options={colors}
                        onChange={(evt) => {
                          setSelectColor({
                            value: evt.value,
                            label: evt.label,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div> */}
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
                {/* LONG DESCRIPTION */}
                <div className={"form-group col-md-12"}>
                  <label htmlFor="" className="text-dark h6 active">
                    LONG DESCRIPTION
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                    }}
                    data={description}
                  />
                </div>
                {/* APPLICATION AREA */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    APPLICATION AREA
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setApplicationArea(data);
                    }}
                    data={applicationArea}
                  />
                </div>

                {/* FEATURES */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    FEATURES
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFeatures(data);
                    }}
                    data={features}
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
                  <h3 className={"my-3 text-info"}>Product Images</h3>
                </div>

                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    PRODUCT DEFAULT IMAGE
                  </label>
                  {String(defaultImages) == "null" ? (
                    <input
                      type="file"
                      multiple
                      onChange={(evt) =>
                        // imageChangeHandler(evt, "default_image")
                        handleImageChange(evt.target.files[0], "default_image")
                      }
                      className="form-control"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 text-center">
                  {String(defaultImages) != "null" ? (
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
              </div>
            </form>

            <form action="" className="form-horizontal form-material">
              {/* Product Details */}
              <div className={"row shadow-sm bg-white py-3 mt-3"}>
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
                            src={img.url}
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
                                img.url,
                                index,
                                "multiple_image",
                                img.id
                              )
                            }
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

                <div className="col-md-12">
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
                </div>
              </div>
            </form>

            <form action="">
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
                    SELECTED COLOURS !
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
            </form>

            <div className="row shadow-sm bg-white">
              {/* Submit Button */}
              <div className={"form-group col-md-12"}>
                <button
                  form="productUpdateForm"
                  className="btn btn-info rounded px-3 py-2"
                  type={"submit"}
                >
                  {isAddLoaded ? (
                    <div>
                      <i className="fas fa-send"></i> Update Product
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
