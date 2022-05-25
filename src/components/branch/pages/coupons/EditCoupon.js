import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M from "materialize-css";
import Config from "../../../config/Config";
const date = require("date-and-time");
const EditCoupon = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [editorValue, setEditorValue] = useState("");
  const [coupon, setCoupon] = useState({
    code: "",
    applyFor: "",
    discountType: "",
    discount: "",
    description: "",
    usesTimes: "",
    minimumAmount: "",
    startDate: "",
    validity: "",
  });

  // Submit Handler
  const submitHandler = (evt) => {
    setIsUpdateLoaded(false);
    evt.preventDefault();

    const updateData = {
      code: coupon.code,
      applyFor: coupon.applyFor,
      discountType: coupon.discountType,
      discount: coupon.discount,
      usesTimes: coupon.usesTimes,
      description: editorValue,
      minimumAmount: coupon.minimumAmount,
      startDate: coupon.startDate,
      validity: coupon.validity,
    };

    fetch(`${Config.SERVER_URL}/coupon/${coupon.id}`, {
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
    fetch(`${Config.SERVER_URL}/coupon/${id}`, {
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
            setCoupon(result.body);
            setEditorValue(result.body.description);
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
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Bread crumb and right sidebar toggle --> */}
        {/* <!-- ============================================================== --> */}
        <div className="row page-titles">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor">Coupons</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Update Coupon</li>
            </ol>
          </div>
        </div>

        {/* Add Coupon Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Coupon Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Coupon Details</h3>
                </div>

                {/* Coupon Code */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    COUPON CODE HERE !
                  </label>
                  <input
                    type="text"
                    value={coupon.code}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, code: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Coupon Code"}
                  />
                </div>

                {/* Apply For */}
                <div className={"col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT USER TYPE!
                  </label>
                  <div className="d-flex mt-2">
                    <div className="custom-control custom-radio pl-0">
                      <input
                        type="radio"
                        id="userType1"
                        name="userType"
                        checked={coupon.applyFor == "NEW_USER" ? true : false}
                        value={"NEW_USER"}
                        onChange={(evt) =>
                          setCoupon({ ...coupon, applyFor: evt.target.value })
                        }
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="userType1"
                      >
                        New User
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="userType2"
                        name="userType"
                        checked={
                          coupon.applyFor == "EXISTING_USER" ? true : false
                        }
                        onChange={(evt) =>
                          setCoupon({ ...coupon, applyFor: evt.target.value })
                        }
                        value={"EXISTING_USER"}
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="userType2"
                      >
                        Existing User
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="userType3"
                        name="userType"
                        checked={coupon.applyFor === "ALL_USER" ? true : false}
                        onChange={(evt) =>
                          setCoupon({ ...coupon, applyFor: evt.target.value })
                        }
                        value={"ALL_USER"}
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="userType3"
                      >
                        All User
                      </label>
                    </div>
                  </div>
                </div>

                {/* Discount type*/}
                <div className={"col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    SELECT DISCOUNT TYPE!
                  </label>
                  <div className="d-flex">
                    <div className="custom-control custom-radio pl-0 ml-0">
                      <input
                        type="radio"
                        id="discountType1"
                        name="discountType"
                        value={"AMOUNT"}
                        checked={coupon.discountType == "AMOUNT" ? true : false}
                        onChange={(evt) =>
                          setCoupon({
                            ...coupon,
                            discountType: evt.target.value,
                          })
                        }
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="discountType1"
                      >
                        AMOUNT
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="discountType2"
                        name="discountType"
                        value={"PERCENTAGE"}
                        checked={
                          coupon.discountType == "PERCENTAGE" ? true : false
                        }
                        onChange={(evt) =>
                          setCoupon({
                            ...coupon,
                            discountType: evt.target.value,
                          })
                        }
                        className="custom-control-input"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="discountType2"
                      >
                        PRECENTAGE
                      </label>
                    </div>
                  </div>
                </div>

                {/* Discount */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    DISCOUNT!
                  </label>
                  <input
                    type="number"
                    value={coupon.discount}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, discount: evt.target.value })
                    }
                    name={"discount"}
                    className="form-control"
                    placeholder={"Discount"}
                  />
                </div>

                {/* minimum Amount */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    MINIMUM AMOUNT FOR APPLYING COUPON
                  </label>
                  <input
                    type="number"
                    value={coupon.minimumAmount}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, minimumAmount: evt.target.value })
                    }
                    name={"minimumAmount"}
                    className="form-control"
                    placeholder={"Minimum Amount For Coupon"}
                  />
                </div>

                {/* start Date */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    COUPON ACTIVATION DATE
                  </label>
                  <input
                    type="date"
                    value={date.format(
                      new Date(coupon.startDate),
                      "YYYY-MM-DD"
                    )}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, startDate: evt.target.value })
                    }
                    name={"startDate"}
                    className="form-control"
                    placeholder={"Startting date"}
                  />
                </div>

                {/* Valid Upto */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    COUPON VALIDE DATE
                  </label>
                  <input
                    type="date"
                    value={date.format(new Date(coupon.validity), "YYYY-MM-DD")}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, validity: evt.target.value })
                    }
                    name={"startDate"}
                    className="form-control"
                    placeholder={"Valid Upto"}
                  />
                </div>

                {/* Uses Times for USES */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    USES TIMES FOR USER
                  </label>
                  <input
                    type="NUMBER"
                    value={coupon.usesTimes}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, usesTimes: evt.target.value })
                    }
                    className="form-control"
                    placeholder={"Valid Upto"}
                  />
                </div>
              </div>

              {/* Coupon Description */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Coupon Description</h3>
                </div>
                <div className={"form-group col-md-12"}>
                  <CKEditor
                    editor={ClassicEditor}
                    style={{ height: "100px" }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setEditorValue(data);
                    }}
                    data={editorValue}
                  />
                </div>
                <div className={"form-group col-md-12"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isUpdateLoaded ? (
                      <div>
                        <i className="fas fa-refresh"></i> Update Coupon
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

export default EditCoupon;
