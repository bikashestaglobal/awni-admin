import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { format } from "date-and-time";

const ViewCustomer = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isCustomerLoaded, setIsCustomerLoaded] = useState(false);
  const [isWishlistsLoaded, setIsWishlistsLoaded] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    name: "",
  });
  const [wishlists, setWishlists] = useState([]);

  // get Records
  useEffect(() => {
    setIsCustomerLoaded(false);
    fetch(`${Config.SERVER_URL}/enquiries/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsCustomerLoaded(true);
          if (result.status === 200) {
            setEnquiryData(result.body);
            // console.log(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsCustomerLoaded(true);
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  }, []);

  // get Records
  useEffect(() => {
    setIsWishlistsLoaded(false);
    fetch(`${Config.SERVER_URL}/wishlists?customer_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsWishlistsLoaded(true);
          if (result.status === 200) {
            setWishlists(result.body);
            console.log("W-list", result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsWishlistsLoaded(true);
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
            <h3 className="text-themecolor m-b-0 m-t-0">Customer Enquiry</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">enquiry</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        <div
          className={"row page-titles px-1 my-0 shadow-none"}
          style={{ background: "none" }}
        >
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
          <div className={"col-md-12"}>
            {/* Data */}
            {isCustomerLoaded ? (
              <div className="row">
                {/* Profile */}
                <div className="col-md-12">
                  <div className={"card mb-0 mt-2 border-0 rounded"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <div className="d-flex">
                        <div className="profile">
                          <img
                            style={{ height: "100px", borderRadius: "50px" }}
                            src="https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
                            alt=""
                          />
                        </div>
                        <div className="info py-3 px-4">
                          <h4>{enquiryData.name || ""}</h4>
                          <h5>{enquiryData.email || ""}</h5>
                          <h5>{enquiryData.mobile || ""}</h5>
                          <h5>{enquiryData.city || ""}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MESSAGE Information */}
                <div className="col-md-9">
                  <div className={"card mb-0 mt-2 border-0 rounded py-3"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <h4>MESSAGE</h4>
                      {enquiryData.message || ""}

                      <h4>
                        Product :{" "}
                        <a
                          target="_blank"
                          href={`${Config.CLIENT_URL}/product/${enquiryData.product_slug}`}
                          className="btn btn-info"
                        >
                          View
                        </a>
                      </h4>
                    </div>
                  </div>
                </div>

                {/* STATUS Information */}
                <div className="col-md-3">
                  <div className={"card mb-0 mt-2 border-0 rounded py-3"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <h4>STATUS</h4>
                      <span className="badge badge-info">
                        {enquiryData.status || ""}
                      </span>
                    </div>
                  </div>
                </div>
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
      </div>
    </div>
  );
};

export default ViewCustomer;
