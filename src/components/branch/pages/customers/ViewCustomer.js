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
  const [profileData, setProfileData] = useState({
    name: "",
  });
  const [wishlists, setWishlists] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  // get Records
  useEffect(() => {
    setIsCustomerLoaded(false);
    fetch(`${Config.SERVER_URL}/customers/${id}`, {
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
            setProfileData(result.body);
            if (result.body.email) {
              getEnquiry(result.body.email);
            }
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

  // get Wishlists
  useEffect(() => {
    setIsWishlistsLoaded(false);
    fetch(`${Config.SERVER_URL}/wishlists?customer_id=${id}&limit=50`, {
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

  // get Enquiry
  const getEnquiry = (email) => {
    fetch(`${Config.SERVER_URL}/enquiries?email=${email}&limit=30`, {
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
            setEnquiries(result.body);
            console.log("Enquiry", result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );
  };

  // Return function
  return (
    <div className="page-wrapper px-0 pt-0">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Customer Profile</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">Customer</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        <div
          className={"row page-titles px-1 my-0 shadow-none"}
          style={{ background: "none" }}
        >
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
                          <h4>{profileData.name || ""}</h4>
                          <h5>{profileData.email || ""}</h5>
                          <h5>{profileData.mobile || ""}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="col-md-5">
                  <div className={"card mb-0 mt-2 border-0 rounded"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <h4>PERSONAL INFORMATION</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <tr>
                            <th>#ID</th>
                            <td>{profileData.id || ""}</td>
                          </tr>
                          <tr>
                            <th>Billing Name</th>
                            <td>{profileData.billing_name || ""}</td>
                          </tr>
                          <tr>
                            <th>Billing Email</th>
                            <td>{profileData.billing_email || ""}</td>
                          </tr>
                          <tr>
                            <th>Billing Mobile</th>
                            <td>{profileData.billing_mobile || ""}</td>
                          </tr>
                          <tr>
                            <th>Address-1</th>
                            <td>{profileData.address_1 || ""}</td>
                          </tr>
                          <tr>
                            <th>Address-2</th>
                            <td>{profileData.address_2 || ""}</td>
                          </tr>
                          <tr>
                            <th>Country</th>
                            <td>{profileData.country || ""}</td>
                          </tr>
                          <tr>
                            <th>State</th>
                            <td>{profileData.state || ""}</td>
                          </tr>
                          <tr>
                            <th>City</th>
                            <td>{profileData.city || ""}</td>
                          </tr>
                          <tr>
                            <th>Pincode</th>
                            <td>{profileData.pincode || ""}</td>
                          </tr>
                          <tr>
                            <th>Verified</th>
                            <td>
                              {profileData.is_verified ? (
                                <span className="badge badge-success">
                                  Verified
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Not Verified
                                </span>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td>
                              {profileData.status ? (
                                <span className="badge badge-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge badge-danger">
                                  Blocked
                                </span>
                              )}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enquired Details */}
                <div className="col-md-7">
                  <div className={"card mb-0 mt-2 border-0 rounded"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <h4>ENQUIRY DETAILS</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <tr>
                            <th>#ID</th>
                            <th>MESSAGE</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                          </tr>
                          {enquiries.length ? (
                            enquiries.map((enqyiry, index) => {
                              return (
                                <tr key={index}>
                                  <th>{enqyiry.id}</th>
                                  <th>{enqyiry.message}</th>
                                  <th>
                                    {format(
                                      new Date(enqyiry.created_at),
                                      "DD-MM-YYYY"
                                    )}
                                  </th>
                                  <th>{enqyiry.status}</th>
                                  <td>
                                    <Link
                                      className="btn btn-info"
                                      to={`/awni-admin/enquiry/view/${enqyiry.id}`}
                                    >
                                      <i className="fa fa-eye"></i>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <p className="text-danger">No Record Found</p>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WISHLIST Details */}
                <div className="col-md-12">
                  <div className={"card mb-0 mt-2 border-0 rounded"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <h4>WISHLIST DETAILS</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <tr>
                            <th>#SN</th>
                            <th>DATE</th>
                            <th>IMAGE</th>
                            <th>PRODUCT</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                          </tr>

                          {wishlists.length ? (
                            wishlists.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <th> {++index} </th>
                                  <th>
                                    {format(
                                      new Date(item.created_at),
                                      "DD-MM-YYYY"
                                    )}
                                  </th>
                                  <th>
                                    <img
                                      style={{ height: "150px" }}
                                      src={item.default_image}
                                      alt=""
                                    />
                                  </th>
                                  <th>
                                    {" "}
                                    {item.product_name.length > 20
                                      ? item.product_name.slice(0, 20) + ".."
                                      : item.product_name || ""}{" "}
                                  </th>
                                  <th>
                                    <i className="fa fa-inr"></i>
                                    {item.selling_price || ""}
                                  </th>
                                  <th>
                                    <a
                                      target={"_blank"}
                                      href={`${Config.CLIENT_URL}/product/${item.slug}`}
                                      className="btn btn-info"
                                    >
                                      View
                                    </a>
                                  </th>
                                </tr>
                              );
                            })
                          ) : (
                            <p className="text-danger">
                              No Item Added in Wishlists
                            </p>
                          )}
                        </table>
                      </div>
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
