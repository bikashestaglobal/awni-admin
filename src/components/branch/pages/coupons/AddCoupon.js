import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M from "materialize-css";
import Config from "../../../config/Config";

const AddCoupon = () => {
  const history = useHistory();
  const [isAddLoaded, setIsAddLoaded] = useState(true);
  const [coupon, setCoupon] = useState({
    code: "",
    applyFor: "",
    discountType: "",
    discount: "",
    description: "",
    usesTimes: 1,
    minimumAmount: "",
    startDate: "",
    validity: "",
  });

  // Submit Handler
  const submitHandler = (evt) => {
    setIsAddLoaded(false);
    evt.preventDefault();

    fetch(Config.SERVER_URL + "/coupon", {
      method: "POST",
      body: JSON.stringify(coupon),
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
              <li className="breadcrumb-item active">Add Coupon</li>
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
                        value={"NEW_USER"}
                        onChange={(evt) =>
                          setCoupon({ ...coupon, applyFor: evt.target.value })
                        }
                        className="custom-control-input"
                      />
                      <label className="custom-control-label" for="userType1">
                        New User
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="userType2"
                        name="userType"
                        onChange={(evt) =>
                          setCoupon({ ...coupon, applyFor: evt.target.value })
                        }
                        value={"EXISTING_USER"}
                        className="custom-control-input"
                      />
                      <label className="custom-control-label" for="userType2">
                        Existing User
                      </label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input
                        type="radio"
                        id="userType3"
                        name="userType"
                        onChange={(evt) =>
                          setCoupon({ ...coupon, applyFor: evt.target.value })
                        }
                        value={"ALL_USER"}
                        className="custom-control-input"
                      />
                      <label className="custom-control-label" for="userType3">
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
                        for="discountType1"
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
                        for="discountType2"
                      >
                        PRECENTAGE
                      </label>
                    </div>
                  </div>
                </div>

                {/* Discount aomunt */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    DISCOUNT AMOUNT!
                  </label>
                  <input
                    type="number"
                    value={coupon.discount}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, discount: evt.target.value })
                    }
                    name={"discount"}
                    className="form-control"
                    placeholder={"Discount Amount"}
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
                    value={coupon.startDate}
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
                    value={coupon.validity}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, validity: evt.target.value })
                    }
                    name={"startDate"}
                    className="form-control"
                    placeholder={"Valid Upto"}
                  />
                </div>

                {/* Uses Times */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    USES TIMES FOR USER
                  </label>
                  <input
                    type="number"
                    value={coupon.usesTimes}
                    onChange={(evt) =>
                      setCoupon({ ...coupon, usesTimes: evt.target.value })
                    }
                    name={"startDate"}
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
                      setCoupon({ ...coupon, description: data });
                    }}
                    data={coupon.description}
                  />
                </div>
                <div className={"form-group col-md-12"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isAddLoaded ? (
                      <div>
                        <i className="fas fa-plus"></i> Add Coupon
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

export default AddCoupon;
