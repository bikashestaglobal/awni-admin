import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { Link } from "react-router-dom";
const date = require("date-and-time");

const AddShippingMethod = () => {
  const history = useHistory();
  const [isUpdateLoaded, setIsUpdateLoaded] = useState(true);

  const [shippingMethod, setShippingMethod] = useState({
    name: "",
    amount: "",
    shippingTimes: [],
  });

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Add Time Handler
  const addTimeHandler = (evt) => {
    evt.preventDefault();
    if (startTime == "" || endTime == "") {
      M.toast({ html: "Please Fill Time", classes: "text-light" });
      return;
    }

    const isExist = shippingMethod.shippingTimes.find((value) => {
      if (value.startTime == startTime && value.endTime == endTime) {
        return true;
      }
    });

    if (isExist) {
      M.toast({ html: "Time is already Exist", classes: "text-light" });
      return;
    }
    setShippingMethod({
      ...shippingMethod,
      shippingTimes: [...shippingMethod.shippingTimes, { startTime, endTime }],
    });
    setStartTime("");
    setEndTime("");
  };

  const deleteTimeHandler = (i) => {
    const filtered = shippingMethod.shippingTimes.filter(
      (value, index) => index != i
    );

    setShippingMethod({ ...shippingMethod, shippingTimes: [...filtered] });
  };

  // Submit Handler
  const submitHandler = (evt) => {
    setIsUpdateLoaded(false);
    evt.preventDefault();

    const updateData = {
      name: shippingMethod.name,
      amount: shippingMethod.amount,
      shippingTimes: shippingMethod.shippingTimes,
    };

    fetch(`${Config.SERVER_URL}/shipping-method/`, {
      method: "POST",
      body: JSON.stringify(updateData),
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

  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Shipping Method</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Add Method</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        {/* Add shipping method Form */}
        <div className="row mt-2">
          <div className={"col-md-11 mx-auto"}>
            <form
              onSubmit={submitHandler}
              className="form-horizontal form-material"
            >
              {/* Shipping Method Details */}
              <div className={"row shadow-sm bg-white py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Shipping Method Details</h3>
                </div>

                {/* Shipping Method name */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    Method Name!
                  </label>
                  <input
                    type="text"
                    value={shippingMethod.name}
                    onChange={(evt) =>
                      setShippingMethod({
                        ...shippingMethod,
                        name: evt.target.value,
                      })
                    }
                    className="form-control"
                    placeholder={"Standard Delivery"}
                  />
                </div>

                {/* Amount */}
                <div className={"form-group col-md-6"}>
                  <label htmlFor="" className="text-dark h6 active">
                    Delivery Charge!
                  </label>
                  <input
                    type="number"
                    value={shippingMethod.amount}
                    onChange={(evt) =>
                      setShippingMethod({
                        ...shippingMethod,
                        amount: evt.target.value,
                      })
                    }
                    name={"amount"}
                    className="form-control"
                    placeholder={"500"}
                  />
                </div>
              </div>

              {/* Shipping Method Time */}
              <div className={"row shadow-sm bg-white mt-3 py-3"}>
                <div className="col-md-12">
                  <h3 className={"my-3 text-info"}>Shipping Time</h3>
                </div>
                {/* Shipping Method StartTime */}
                <div className={"form-group col-md-5"}>
                  <label htmlFor="" className="text-dark h6 active">
                    Start Time
                  </label>
                  <input
                    type="time"
                    onChange={(evt) => setStartTime(evt.target.value)}
                    name="startTime"
                    value={startTime}
                    className="form-control"
                    placeholder={"Standard Delivery"}
                  />
                </div>

                {/* End Time */}
                <div className={"form-group col-md-5"}>
                  <label htmlFor="" className="text-dark h6 active">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(evt) => setEndTime(evt.target.value)}
                    name={"endTime"}
                    className="form-control"
                    placeholder={"500"}
                  />
                </div>
                <div className={"form-group col-md-2"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"button"}
                    onClick={addTimeHandler}
                  >
                    {isUpdateLoaded ? (
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
                </div>
                <div className="col-md-11">
                  {shippingMethod.shippingTimes.map((value, index) => {
                    return (
                      <div className="card m-0 mb-1">
                        <div className="card-body px-2 py-2 d-flex justify-content-between">
                          <h6>Start Time: {value.startTime} </h6>
                          <h6>End Time: {value.endTime} </h6>
                          <button
                            type="button"
                            className="btn btn-danger px-2 py-0 m-0"
                            onClick={() => deleteTimeHandler(index)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={"form-group col-md-12"}>
                  <button
                    className="btn btn-info rounded px-3 py-2"
                    type={"submit"}
                  >
                    {isUpdateLoaded ? (
                      <div>
                        <i className="fas fa-plus"></i> Add shipping Method
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

export default AddShippingMethod;
