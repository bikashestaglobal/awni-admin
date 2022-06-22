import React, { useContext, useState, useEffect } from "react";
import { Link, BrowserRouter, useHistory } from "react-router-dom";
import M from "materialize-css";
import { BranchContext } from "./Branch";
import $ from "jquery";

function LeftNavigation() {
  const history = useHistory();
  const { state, dispatch } = useContext(BranchContext);

  // Fetching the data
  useEffect(() => {}, []);

  // Login Function
  const logout = (evt) => {
    evt.preventDefault();
    localStorage.removeItem("branch");
    localStorage.removeItem("jwt_branch_token");
    dispatch({ type: "CLEAR" });
    history.push("/awni-admin/login");
  };

  // Remove Left Navigation When Click On The Link
  const removeLeftNavigation = (evt) => {
    $("body").removeClass("show-sidebar");
  };

  // Return Function
  return (
    <div>
      {state && (
        <aside className="left-sidebar">
          {/* <!-- Sidebar scroll--> */}
          <div className="scroll-sidebar">
            {/* <!-- User profile --> */}
            <div
              className="user-profile"
              style={{
                background:
                  "url(../assets/images/background/user-info.jpg) no-repeat",
              }}
            >
              {/* <!-- User profile image --> */}
              <div className="profile-img text-center">
                {state.profile_picture ? (
                  <img src={state.profile_picture} alt="user" />
                ) : (
                  <span
                    className={"fas fa-user-circle text-white"}
                    style={{ fontSize: "51px" }}
                  />
                )}
              </div>
              {/* <!-- User profile text--> */}
              <div className="profile-text">
                <Link
                  to="/"
                  className="dropdown-toggle u-dropdown"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {state.name}
                </Link>

                <div className="dropdown-menu animated flipInY">
                  <Link
                    to="/awni-admin/profile"
                    className="dropdown-item"
                    onClick={removeLeftNavigation}
                  >
                    <i className="ti-user"></i> My Profile
                  </Link>

                  <div className="dropdown-divider"></div>

                  <Link
                    to="/awni-admin/profile"
                    className="dropdown-item"
                    onClick={removeLeftNavigation}
                  >
                    <i className="ti-settings"></i> Account Setting
                  </Link>

                  <div className="dropdown-divider"></div>

                  <Link className="dropdown-item" to={"#"} onClick={logout}>
                    <i className="fa fa-power-off"></i> Logout
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- End User profile text--> */}

            {/* <!-- Sidebar navigation--> */}
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li className="nav-small-cap">PERSONAL</li>
                {/* Dashboard */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/awni-admin"
                    onClick={removeLeftNavigation}
                  >
                    <i className="mdi mdi-gauge"></i>
                    <span className="hide-menu">Dashboard </span>
                  </Link>
                </li>
                {/* Range */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/awni-admin/ranges"
                    onClick={removeLeftNavigation}
                  >
                    <i className="mdi mdi-gauge"></i>
                    <span className="hide-menu">Range </span>
                  </Link>
                </li>

                {/* Range */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/awni-admin/colors"
                    onClick={removeLeftNavigation}
                  >
                    <i className="mdi mdi-gauge"></i>
                    <span className="hide-menu">Color </span>
                  </Link>
                </li>

                {/* Setup Section */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-settings"></i>
                    <span className="hide-menu">PAGES</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/contact"
                        onClick={removeLeftNavigation}
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/about"
                        onClick={removeLeftNavigation}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/whyAwni"
                        onClick={removeLeftNavigation}
                      >
                        About: Why Awni
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/experienceCentre"
                        onClick={removeLeftNavigation}
                      >
                        Experience Centre
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Customer Section */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-account-plus"></i>
                    <span className="hide-menu">CUSTOMER</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/customers"
                        onClick={removeLeftNavigation}
                      >
                        Customers List
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Enquiry Section */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-account-plus"></i>
                    <span className="hide-menu">ENQUIRY</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/enquiries"
                        onClick={removeLeftNavigation}
                      >
                        Customers Enquiries
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Banner Section */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-account-plus"></i>
                    <span className="hide-menu">Banners</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/sliders"
                        onClick={removeLeftNavigation}
                      >
                        Main Slider
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/banners"
                        onClick={removeLeftNavigation}
                      >
                        HomePage Banner
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Category */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-book-open-variant"></i>
                    <span className="hide-menu">Category</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/parentCategory"
                        onClick={removeLeftNavigation}
                      >
                        Parent Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/subCategory"
                        onClick={removeLeftNavigation}
                      >
                        Sub Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/childCategory"
                        onClick={removeLeftNavigation}
                      >
                        Child Category
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Product Section */}
                <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-note-multiple-outline"></i>
                    <span className="hide-menu">PRODUCTS</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/products"
                        onClick={removeLeftNavigation}
                      >
                        Product List
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Order Section */}
                {/* <li>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-note-multiple-outline"></i>
                    <span className="hide-menu">ORDERS</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/newOrders"
                        onClick={removeLeftNavigation}
                      >
                        New Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/orders"
                        onClick={removeLeftNavigation}
                      >
                        Order List
                      </Link>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </nav>
            {/* <!-- End Sidebar navigation --> */}
          </div>
          {/* <!-- End Sidebar scroll--> */}
          {/* <!-- Bottom points--> */}
          <div className="sidebar-footer">
            {/* <!-- item--> */}
            <Link
              to="/awni-admin/profile"
              className="link"
              data-toggle="tooltip"
              title="Settings"
              onClick={removeLeftNavigation}
            >
              <i className="ti-settings"></i>
            </Link>
            {/* <!-- item--> */}
            <Link
              to="#"
              className="link"
              data-toggle="tooltip"
              title="Email"
              onClick={removeLeftNavigation}
            >
              <i className="mdi mdi-gmail"></i>
            </Link>
            {/* <!-- item--> */}

            <Link
              to="#"
              onClick={(evt) => logout(evt)}
              className="link"
              data-toggle="tooltip"
              title="Logout"
            >
              <i className="mdi mdi-power"></i>
            </Link>
          </div>
          {/* <!-- End Bottom points--> */}
        </aside>
      )}
    </div>
  );
}

export default LeftNavigation;
