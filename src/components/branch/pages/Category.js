import React, { useState, useEffect, useMemo } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link } from "react-router-dom";
import Config from "../../config/Config";
import { storage } from "../../../firebase/FirebaseConfig";

//  Component Function
const Category = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "null",
    parentCategories: [],
    description: "",
  });

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
    totalRecord: 0,
    totalPage: 0,
    currentPage: 1,
  });
  const [progress, setProgress] = useState(0);
  const [isAddLaoded, setIsAddLaoded] = useState(true);
  const [isUpdateLaoded, setIsUpdateLaoded] = useState(true);
  const [isDeleteLaoded, setIsDeleteLaoded] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllCategoryLoaded, setIsAllCategoryLoaded] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allParentCategory, setAllParentCategory] = useState([]);
  const [data, setData] = useState({
    parentCategories: [],
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const nameChangeHandler = (evt) => {
    const value = evt.target.value;
    setFormData({
      ...formData,
      slug: value.toLowerCase().replace(/\s+/g, "-"),
      name: value,
    });
  };

  // Update Submit Handler
  const updateSubmitHandler = (evt) => {
    setIsUpdated(false);
    setIsUpdateLaoded(false);
    evt.preventDefault();

    const updateData = {
      name: data.name,
      description: data.description,
      status: data.status,
      parentCategories: data.parentCategories,
      image: data.image,
      slug: data.slug,
    };

    fetch(`${Config.SERVER_URL}/category/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsUpdateLaoded(true);
          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsUpdated(true);
            $("#closeUpdateModalButton").click();
          } else {
            const errorKeys = Object.keys(result.error);
            errorKeys.forEach((key) => {
              M.toast({ html: result.error[key], classes: "bg-danger" });
            });
          }
        },
        (error) => {
          setIsUpdateLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Delete Submit Handler
  const deleteSubmitHandler = () => {
    setIsDeleted(false);
    setIsDeleteLaoded(false);
    console.log(deleteId);

    fetch(`${Config.SERVER_URL}/category/${deleteId}`, {
      method: "DELETE",
      // body: JSON.stringify({deleteId}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsDeleteLaoded(true);
          if (result.status == 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            setIsDeleted(true);
            setDeleteId("");
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
          $("#closeDeleteModalButton").click();
        },
        (error) => {
          setIsDeleteLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLaoded(false);
    evt.preventDefault();

    if (progress > 0 && progress < 100) {
      M.toast({ html: "Wait for Image uploading", classes: "bg-warning" });
      return;
    }

    fetch(Config.SERVER_URL + "/category", {
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
          setIsAddLaoded(true);

          if (result.status === 200) {
            M.toast({ html: result.message, classes: "bg-success" });
            $("#closeAddModalButton").click();
            setIsAdded(!isAdded);
            setProgress(0);
            setFormData({
              name: "",
              slug: "",
              description: "",
              image: "",
              parentCategories: "",
            });
          } else {
            const errorKeys = Object.keys(result.error);
            errorKeys.forEach((key) => {
              M.toast({ html: result.error[key], classes: "bg-danger" });
            });
          }
        },
        (error) => {
          setIsAddLaoded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  const limitHandler = (e) => {
    const limit = e.target.value;
    const totalPage = Math.ceil(pagination.totalRecord / limit);
    setPagination({
      ...pagination,
      limit,
      totalPage,
    });
  };

  const imgDeleteHandler = (image) => {
    // Create a reference to the file to delete
    const fileRef = storage.refFromURL(image);
    // Delete the file
    fileRef
      .delete()
      .then(() => {
        // File deleted successfully

        fetch(`${Config.SERVER_URL}/category/${data.id}`, {
          method: "PUT",
          body: JSON.stringify({ image: "null" }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
          },
        })
          .then((res) => res.json())
          .then(
            (result) => {
              if (result.status === 200) {
                setData({ ...data, image: "null" });
                setIsUpdated(!isUpdated);
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

  const pageHandler = (e, page) => {
    e.preventDefault();
    setPagination({
      ...pagination,
      skip: page == 1 ? 0 : (page - 1) * pagination.limit,
      currentPage: page,
    });
  };

  const previousPageHandler = (e) => {
    e.preventDefault();
    console.log(pagination);
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage == 1 ? 1 : pagination.currentPage - 1,
      skip:
        pagination.currentPage == 1
          ? 0
          : (pagination.currentPage - 2) * pagination.limit,
    });
  };

  const nextPageHandler = (e) => {
    e.preventDefault();
    console.log(pagination);
    setPagination({
      ...pagination,
      currentPage:
        pagination.currentPage == pagination.totalPage
          ? pagination.totalPage
          : pagination.currentPage + 1,
      skip:
        pagination.currentPage == 1
          ? pagination.limit
          : (pagination.currentPage + 1) * pagination.limit,
    });
  };

  // For Image
  const imgChangeHandler = (e, type) => {
    if (e.target.files[0]) {
      handleUpload(e.target.files[0], type);
    }
  };

  // Upload Image
  const handleUpload = (image, type) => {
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
            if (type == "ADD") {
              setFormData({
                ...formData,
                image: url,
              });
            } else {
              setData({
                ...data,
                image: url,
              });
            }

            // setCategory({ ...category, category_image: url })
          });
      }
    );
  };

  // Get Data From Database
  useEffect(() => {
    fetch(
      `${Config.SERVER_URL}/category?skip=${pagination.skip}&limit=${pagination.limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsAllCategoryLoaded(true);
          console.log(result);
          if (result.status === 200) {
            setAllCategory(result.body || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllCategoryLoaded(true);
        }
      );
  }, [isAdded, isUpdated, isDeleted, pagination]);

  // Count Records
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
          setPagination({
            ...pagination,
            totalRecord: result.body.length,
            totalPage: Math.ceil(result.body.length / pagination.limit),
          });
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsAllCategoryLoaded(true);
        }
      );
  }, [isAdded, isUpdated, isDeleted]);

  // All Parent Category
  useEffect(() => {
    fetch(`${Config.SERVER_URL}/parent-category?skip=0&limit=5000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status == 200) {
            setAllParentCategory(result.body || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // Return function
  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Caregory</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Category</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        <div
          className={"row page-titles px-1 my-0 shadow-none"}
          style={{ background: "none" }}
        >
          <div className={"col-md-12 px-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h4 className="float-left mt-2 mr-2">Search: </h4>

                  {/* <!-- Button trigger modal --> */}
                  <button
                    type="button"
                    className="btn btn-info float-right rounded"
                    data-toggle="modal"
                    data-target="#addModal"
                    onClick={() => {
                      $("#a_type").val($("#a_type option:first").val());
                      $("#a_standard").val($("#a_standard option:first").val());
                    }}
                  >
                    <span className={"fas fa-plus"}></span> category
                  </button>
                </div>
              </div>
            </div>

            {/* Data */}
            {isAllCategoryLoaded ? (
              <div className="card border-0 rounded m-0 py-1">
                {allCategory.length ? (
                  <div className="card-body py-0">
                    <div className="table-responsive">
                      <table
                        className={"table table-bordered table-striped my-0"}
                      >
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>NAME</th>
                            <th>IMAGE</th>
                            <th>STATUS</th>
                            <th className="text-center">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allCategory.map((category, index) => {
                            return (
                              <tr key={index}>
                                <td>{index++}</td>
                                <td>{category.name}</td>
                                <td>
                                  {category.image != "null" ? (
                                    <img
                                      src={category.image}
                                      className="img img-fluid"
                                      alt="Category Image"
                                      style={{
                                        height: "80px",
                                        width: "80px",
                                        borderRadius: "40px",
                                      }}
                                    />
                                  ) : (
                                    "N/A"
                                  )}
                                </td>
                                <td>
                                  {category.status ? "active" : "disabled"}
                                </td>
                                <td className="text-center">
                                  {/* Update Button */}
                                  <button
                                    type="button"
                                    className="ml-2 btn btn-info footable-edit rounded"
                                    data-toggle="modal"
                                    data-target="#updateModal"
                                    onClick={(e) => {
                                      setData(category);
                                    }}
                                  >
                                    <span
                                      className="fas fa-pencil-alt"
                                      aria-hidden="true"
                                    ></span>
                                  </button>

                                  {/* Delete Button */}
                                  <button
                                    type="button"
                                    className="ml-2 btn btn-danger footable-delete rounded"
                                    data-toggle="modal"
                                    data-target="#deleteModal"
                                    onClick={(e) => {
                                      setDeleteId(category._id);
                                    }}
                                  >
                                    <span
                                      className="fas fa-trash-alt"
                                      aria-hidden="true"
                                    ></span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {/* Pagination */}
                      <div className="mt-2 d-flex justify-content-between">
                        <div className="limit form-group shadow-sm px-3 border">
                          <select
                            name=""
                            id=""
                            className="form-control"
                            onChange={limitHandler}
                          >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                          </select>
                        </div>
                        <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                pagination.currentPage == 1 ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                tabindex="-1"
                                onClick={previousPageHandler}
                              >
                                Previous
                              </a>
                            </li>
                            {[...Array(pagination.totalPage)].map((_, i) => {
                              return (
                                <li className="page-item">
                                  <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => pageHandler(e, i + 1)}
                                  >
                                    {i + 1}
                                  </a>
                                </li>
                              );
                            })}

                            <li
                              className={`page-item ${
                                pagination.currentPage == pagination.totalPage
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={nextPageHandler}
                              >
                                Next
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={"alert alert-danger mx-3 rounded border-0 py-2"}
                  >
                    No Data Available
                  </div>
                )}
              </div>
            ) : (
              <div className={"bg-white p-3 text-center"}>
                <span
                  className="spinner-border spinner-border-sm mr-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading..
              </div>
            )}
          </div>
        </div>

        {/* -- Modal Designing -- */}
        <div>
          {/* -- Add Modal -- */}
          <div className="modal fade" id="addModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded">
                <div className="modal-body">
                  <h4 className={"text-theme"}>Add Category</h4>
                  <div className={"devider"} />
                  <form
                    onSubmit={submitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Category Name */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Category Name</label>
                      <input
                        type="text"
                        onChange={nameChangeHandler}
                        value={formData.name}
                        className="form-control"
                        placeholder={"Cakes...."}
                      />
                    </div>

                    {/* Category Slug */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Category Slug</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setFormData({
                            ...formData,
                            slug: evt.target.value,
                          })
                        }
                        value={formData.slug}
                        className="form-control"
                        placeholder={"cake"}
                      />
                    </div>

                    {/* Parent Category */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Parent Category</label>
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentCategories: [e.target.value],
                          })
                        }
                      >
                        <option value="">Parent Category</option>
                        {allParentCategory.map((category, index) => {
                          return (
                            <option key={index} value={category._id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* Description */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Description</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setFormData({
                            ...formData,
                            description: evt.target.value,
                          })
                        }
                        value={formData.description}
                        className="form-control"
                        placeholder={"Description Here"}
                      />
                    </div>

                    {/* Images */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Image</label>
                      <input
                        type="file"
                        name=""
                        className="form-control"
                        onChange={(e) => imgChangeHandler(e, "ADD")}
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

                    <div className={"form-group"}>
                      <button className="btn btn-info rounded" type={"submit"}>
                        {isAddLaoded ? (
                          <div>
                            <i className="fas fa-plus"></i> Add
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

                      <button
                        className="btn btn-secondary rounded ml-2"
                        data-dismiss="modal"
                        id={"closeAddModalButton"}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Update Modal -- */}
          <div
            className="modal fade"
            id="updateModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded">
                <div className="modal-body">
                  <h4 className={"text-theme"}>Update Category</h4>
                  <div className={"devider"} />
                  <form
                    onSubmit={updateSubmitHandler}
                    className="form-horizontal form-material"
                  >
                    {/* Category Name */}
                    <div className={"form-group my-3"}>
                      <label className={"text-dark h6"}>Category Type</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({ ...data, name: evt.target.value })
                        }
                        className="form-control border"
                        value={data.name}
                        placeholder={"Cakes ..."}
                      />
                    </div>

                    {/* Category Slug */}
                    <div className={"form-group my-3"}>
                      <label className={"text-dark h6"}>Category Slug</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({ ...data, slug: evt.target.value })
                        }
                        className="form-control border"
                        value={data.slug}
                        placeholder={"heart-cake"}
                      />
                    </div>

                    {/*Description */}
                    <div className={"form-group"}>
                      <label className={"text-dark h6"}>Description</label>
                      <input
                        type="text"
                        onChange={(evt) =>
                          setData({ ...data, description: evt.target.value })
                        }
                        className="form-control border"
                        value={data.description}
                        placeholder={"heart-cake"}
                      />
                    </div>

                    {/* Parent Category */}
                    <div className={"form-group mb-3"}>
                      <label className={"text-dark h6"}>Parent Category</label>
                      <select
                        name=""
                        id=""
                        className="form-control"
                        onChange={(e) =>
                          setData({
                            ...data,
                            parentCategories: [e.target.value],
                          })
                        }
                      >
                        <option value="">Parent Category</option>
                        {allParentCategory.map((category, index) => {
                          return (
                            <option key={index} value={category._id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </select>

                      <span className="badge badge-info">
                        {data.parentCategories.length
                          ? data.parentCategories.map((category) => {
                              return category.name;
                            })
                          : ""}
                      </span>
                    </div>

                    {/*Image */}
                    <div className={"form-group"}>
                      <label className={"text-dark h6"}>Image</label>
                      <div className="d-flex">
                        <input
                          type="file"
                          onChange={(e) => imgChangeHandler(e, "UPDATE")}
                          className="form-control border"
                        />

                        <div className="cat-img-container">
                          {data.image != "null" ? (
                            <img
                              src={data.image}
                              alt="Category Image"
                              style={{
                                height: "80px",
                                width: "80px",
                                borderRadius: "40px",
                              }}
                            />
                          ) : (
                            ""
                          )}
                          {data.image != "null" ? (
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={(e) => imgDeleteHandler(data.image)}
                            >
                              <span className="fas fa-trash"></span>
                            </button>
                          ) : (
                            ""
                          )}
                          {progress ? (
                            <div className="progress mt-2">
                              <div
                                className="progress-bar bg-success"
                                style={{
                                  width: `${progress}%`,
                                  height: "15px",
                                }}
                                role="progressbar"
                              >
                                {progress}%
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className={"form-group"}>
                      <label className={"text-dark h6"}>Select Status!</label>
                      <select
                        className="form-control"
                        onChange={(evt) =>
                          setData({ ...data, status: evt.target.value })
                        }
                        value={data.status}
                      >
                        <option value={""}> Select Status </option>
                        <option value={true}>Active</option>
                        <option value={false}>Disabled</option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className={"form-group"}>
                      <button className="btn btn-info rounded" type={"submit"}>
                        {isUpdateLaoded ? (
                          <div>
                            <i className="fas fa-refresh"></i> Update
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
                      <button
                        className="btn btn-secondary rounded ml-2"
                        data-dismiss="modal"
                        type={"button"}
                        id={"closeUpdateModalButton"}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* -- Delete Modal -- */}
          <div
            className="modal fade rounded"
            id="deleteModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded">
                <div className="modal-body text-center">
                  <img
                    style={{ width: "150px" }}
                    className={"img img-fluid"}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5R1g82DqzH4itsxpVCofNGWbAzKN_PJDBew&usqp=CAU"
                    }
                  />
                  <h4 className={"text-center mt-2"}>Do You Want to Delete?</h4>

                  <div className={"form-group"}>
                    <button
                      className="btn btn-danger rounded px-3"
                      type={"submit"}
                      onClick={deleteSubmitHandler}
                    >
                      {isDeleteLaoded ? (
                        <div>
                          <i className="fas fa-trash"></i> Yes
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
                    <button
                      className="btn btn-secondary rounded ml-2 px-3"
                      data-dismiss="modal"
                      id={"closeDeleteModalButton"}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
