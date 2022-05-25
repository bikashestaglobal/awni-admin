import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import M from "materialize-css";
import Config from "../../../config/Config";
const date = require("date-and-time");

const ViewOrder = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);
  const [showCancelInput, setShowCancelInput] = useState(false);
  const [order, setOrder] = useState({
    products: [],
    billingAddress: {},
    shippingAddress: {},
    adonProducts: [],
    shippingMethod: {},
    coupon: {},
  });

  // Submit Handler
  const submitHandler = (evt) => {
    setIsUpdateLoaded(false);
    evt.preventDefault();

    const updateData = {
      orderStatus: order.orderStatus,
    };

    if (order.orderStatus == "CANCELLED") {
      updateData.cancelledBy = "ADMIN";
    }
    if (order.cancelMessage != "")
      updateData.cancelMessage = order.cancelMessage;

    fetch(`${Config.SERVER_URL}/order/${order.id}`, {
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
    fetch(`${Config.SERVER_URL}/order/${id}`, {
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
            setOrder({ ...result.body, coupon: result.body.coupon || {} });
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
            <h3 className="text-themecolor">Order</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">View Order</li>
            </ol>
          </div>
        </div>

        {/* Add order Form */}
        <div className="row">
          <div className={"col-md-11 mx-auto"}>
            {/* order Details */}
            <div className={"row shadow-sm bg-white py-3 px-3"}>
              <div className="col-md-12 d-flex justify-content-between my-3">
                <div className="">
                  <button
                    className="btn btn-info rounded py-2"
                    onClick={(evt) => history.goBack()}
                  >
                    <span className={"fas fa-arrow-left"}></span> Go Back
                  </button>
                </div>
                {/* <!-- Button trigger modal --> */}

                <div className="form-inline">
                  <select
                    className="form-control shadow-sm rounded"
                    onChange={(evt) => {
                      setOrder({ ...order, orderStatus: evt.target.value });
                    }}
                    onClick={(evt) => {
                      evt.preventDefault();
                      if (order.orderStatus == "CANCELLED") {
                        setShowCancelInput(true);
                      } else {
                        setShowCancelInput(false);
                      }
                    }}
                    value={order.orderStatus}
                  >
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                  {showCancelInput ? (
                    <div className="ml-2">
                      <input
                        type="text"
                        value={order.cancelMessage}
                        onChange={(evt) =>
                          setOrder({
                            ...order,
                            cancelMessage: evt.target.value,
                          })
                        }
                        className="form-control shadow-sm ml-4"
                        placeholder="Reason For Cancel"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <button className="btn btn-info ml-2" onClick={submitHandler}>
                    Update
                  </button>
                </div>
              </div>

              {/* order Code */}
              <div className={"col-md-12"}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>PRODUCT</th>
                      <th>Flv & Color</th>
                      <th>Msg</th>
                      <th>Weight</th>
                      <th>QTY</th>
                      <th>PRICE</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => {
                      return (
                        <tr>
                          <td> {++index} </td>
                          <td>
                            <h6> {product.name} </h6>
                            <img
                              className="m-auto"
                              style={{
                                height: "100px",
                                width: "100px",
                                borderRadius: "50px",
                              }}
                              src={`${product.image}`}
                              alt=""
                            />
                          </td>

                          <td>
                            Flv: {product.flavour} <br /> Color: {product.color}
                            <br /> Shape: {product.shape}
                          </td>
                          <td>
                            <h6>{product.messageOnCake}</h6>
                            {product.imageOnCake ? (
                              <a href={product.imageOnCake} target={"_target"}>
                                <img
                                  style={{
                                    height: "100px",
                                    width: "100px",
                                    borderRadius: "50px",
                                  }}
                                  src={product.imageOnCake}
                                />
                              </a>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>{product.weight}</td>
                          <td> {product.quantity} </td>
                          <td> {product.price} </td>
                          <td> {product.quantity * product.price} </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Adon Details */}
            <div className={"row shadow-sm bg-white py-3 px-3 mt-3"}>
              {order.adonProducts.length ? (
                <div className="col-md-12 d-flex justify-content-between">
                  <h3 className={"text-info"}>Adon Products Details</h3>
                </div>
              ) : (
                ""
              )}

              {/* order Code */}
              <div className={"col-md-12"}>
                <table className="table" style={{ width: "100%" }}>
                  {order.adonProducts.length ? (
                    <>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th style={{ width: "80%" }}>PRODUCT</th>
                          <th>QTY</th>
                          <th>PRICE</th>
                          <th>TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.adonProducts.map((product, index) => {
                          return (
                            <tr>
                              <td> {++index} </td>
                              <td>
                                <h6> {product.name} </h6>
                                <img
                                  className="m-auto"
                                  style={{
                                    height: "100px",
                                    width: "100px",
                                    borderRadius: "50px",
                                  }}
                                  src={`${product.image}`}
                                  alt=""
                                />
                              </td>

                              <td> {product.quantity} </td>
                              <td> {product.price} </td>
                              <td> {product.quantity * product.price} </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </>
                  ) : (
                    ""
                  )}
                  <tfoot>
                    <tr>
                      <td colSpan={4}>Sub Total</td>
                      <td> {order.adonTotalAmount + order.subtotal}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        Discount With Coupon
                        {
                          <span className="badge badge-success">
                            {order.coupon.code || ""}
                          </span>
                        }
                      </td>
                      <td> {order.discountWithCoupon || "0.00"}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>Delivery Charge</td>
                      <td> {order.shippingMethod.amount || "FREE"}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>Total Amount</td>
                      <td> {order.totalAmount || "FREE"}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* order Description */}
            <div className={"row mt-3 py-3"}>
              <div className="col-md-3 px-1">
                <div className="card">
                  <div className="card-body">
                    <h3 className={"my-3 text-info"}> Order Status </h3>
                    <div className="">
                      <h5>
                        {order.orderStatus === "PROCESSING" ? (
                          <span className="badge badge-info">
                            {order.orderStatus}
                          </span>
                        ) : order.orderStatus === "ACCEPTED" ? (
                          <span className="badge badge-warning">
                            {order.orderStatus}
                          </span>
                        ) : order.orderStatus === "DELIVERED" ? (
                          <span className="badge badge-success">
                            {order.orderStatus}
                          </span>
                        ) : order.orderStatus === "CANCELLED" ? (
                          <span className="badge badge-danger">
                            {order.orderStatus}
                          </span>
                        ) : (
                          ""
                        )}
                      </h5>
                      {order.cancelMessage ? (
                        <h5> Msg: {order.cancelMessage} </h5>
                      ) : (
                        ""
                      )}
                      {order.orderStatus == "CANCELLED" ? (
                        <h5> Cancelled By: {order.cancelledBy} </h5>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 px-1">
                <div className="card">
                  <div className="card-body">
                    <h3 className={"my-3 text-info"}> Billing Details </h3>
                    <div className="">
                      <h5> {order.billingAddress.name} </h5>
                      <h6> {order.billingAddress.email} </h6>
                      <h6> {order.billingAddress.mobile} </h6>
                      <h6>
                        {order.billingAddress.address},
                        {order.billingAddress.city}
                      </h6>
                      <h6> {order.companyName} </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 px-1">
                <div className="card">
                  <div className="card-body">
                    <h3 className={"my-3 text-info"}> Shipping Details </h3>
                    <div className="">
                      <h5> {order.shippingAddress.name} </h5>
                      <h6> {order.shippingAddress.email} </h6>
                      <h6> {order.shippingAddress.mobile} </h6>
                      <h6>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city}
                      </h6>
                      <h6> {order.companyName} </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 px-1">
                <div className="card">
                  <div className="card-body">
                    <h3 className={"my-3 text-info"}> Shipping Methods </h3>
                    <div className="">
                      <h5> {order.shippingMethod.method} </h5>
                      <h6> {order.shippingMethod.date} </h6>
                      <h6>
                        {order.shippingMethod.startTime} -
                        {order.shippingMethod.endTime}
                      </h6>
                    </div>
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

export default ViewOrder;
