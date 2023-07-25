import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import M from "materialize-css";
import Config from "../../../config/Config";
import { format } from "date-and-time";

const ViewFranchisee = () => {
  const history = useHistory();
  const { id } = useParams();
  const [isFranchiseeLoaded, setIsFranchiseeLoaded] = useState(false);
  const [franchiseeData, setFranchiseeData] = useState({
    name: "",
  });

  // get Records
  useEffect(() => {
    setIsFranchiseeLoaded(false);
    fetch(`${Config.SERVER_URL}/franchisee/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsFranchiseeLoaded(true);
          if (result.status === 200) {
            setFranchiseeData(result.body);
            // console.log(result.body);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          setIsFranchiseeLoaded(true);
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
            <h3 className="text-themecolor m-b-0 m-t-0">Franchisee Details</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/awni-admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active">view-franchisee</li>
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
            {isFranchiseeLoaded ? (
              <div className="row">
                {/* Profile */}
                <div className="col-md-6">
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
                          <h4 className="font-weight-bold">
                            {franchiseeData.name || ""}
                          </h4>
                          <h5>{franchiseeData.email || ""}</h5>
                          <h5>{franchiseeData.mobile || ""}</h5>
                          <h5 className="text-info">
                            {format(
                              new Date(franchiseeData.created_at),
                              "DD-MMM-YYYY"
                            ) || ""}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="col-md-6">
                  <div className={"card mb-0 mt-2 border-0 rounded py-3"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <div className="info px-4">
                        <table className="table table-bordered">
                          <tr>
                            <td style={{ widtd: "150px" }}>Address</td>
                            <td>{franchiseeData.address || ""}</td>
                          </tr>
                          <tr>
                            <td style={{ widtd: "150px" }}>Occupation</td>
                            <td> {franchiseeData.occupation || ""}</td>
                          </tr>
                          <tr>
                            <td style={{ widtd: "150px" }}>Interested City</td>
                            <td> {franchiseeData.interested_city || ""}</td>
                          </tr>
                          <tr>
                            <td style={{ widtd: "150px" }}>Work Profile</td>
                            <td> {franchiseeData.work_profile || ""}</td>
                          </tr>
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

export default ViewFranchisee;
