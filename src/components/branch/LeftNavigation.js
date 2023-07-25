import React, { useContext, useState, useEffect } from "react";
import { Link, BrowserRouter, useHistory } from "react-router-dom";
import M from "materialize-css";
import { BranchContext } from "./Branch";
import $ from "jquery";

function LeftNavigation() {
  const history = useHistory();
  const { state, dispatch } = useContext(BranchContext);
  const [activeMenu, setActiveMenu] = useState("");

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

  const activeMenuHandler = (name) => {
    setActiveMenu(name);
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
                    onClick={(evt) => {
                      removeLeftNavigation();
                      // activeMenuHandler();
                    }}
                  >
                    <i className="ti-user"></i> My Profile
                  </Link>

                  <div className="dropdown-divider"></div>

                  <Link
                    to="/awni-admin/profile"
                    className="dropdown-item"
                    onClick={(evt) => {
                      removeLeftNavigation();
                      // activeMenuHandler();
                    }}
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
                {/* <li className="nav-small-cap">PERSONAL</li> */}
                {/* Dashboard */}
                <li className={activeMenu == "" ? "active" : ""}>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-settings"></i>
                    <span className="hide-menu">DASHBOARD</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        className={activeMenu == "" ? "activeLink" : ""}
                        to="/awni-admin"
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("");
                        }}
                      >
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Range */}
                <li className={activeMenu == "range" ? "active" : ""}>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-arrange-bring-forward"></i>
                    <span className="hide-menu">RANGE</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/ranges"
                        className={activeMenu == "range" ? "activeLink" : ""}
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("range");
                        }}
                      >
                        Range List
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Colors */}
                <li className={activeMenu == "color" ? "active" : ""}>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-format-color-fill"></i>
                    <span className="hide-menu">COLORS</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/colors"
                        className={activeMenu == "color" ? "activeLink" : ""}
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("color");
                        }}
                      >
                        Color List
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Pages Section */}
                <li
                  className={
                    activeMenu == "contact" ||
                    activeMenu == "about" ||
                    activeMenu == "experience-centre" ||
                    activeMenu == "why-awni"
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-book-open-page-variant"></i>
                    <span className="hide-menu">PAGES</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/contact"
                        className={activeMenu == "contact" ? "activeLink" : ""}
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("contact");
                        }}
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/about"
                        className={activeMenu == "about" ? "activeLink" : ""}
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("about");
                        }}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/whyAwni"
                        className={activeMenu == "why-awni" ? "activeLink" : ""}
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("why-awni");
                        }}
                      >
                        About: Why Awni
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/experienceCentre"
                        className={
                          activeMenu == "experience-centre" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("experience-centre");
                        }}
                      >
                        Experience Centre
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Customer Section */}
                <li className={activeMenu == "customer-list" ? "active" : ""}>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-account-check"></i>
                    <span className="hide-menu">CUSTOMER</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/customers"
                        className={
                          activeMenu == "customer-list" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("customer-list");
                        }}
                      >
                        Customers List
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Enquiry Section */}
                <li className={activeMenu == "enquiry-list" ? "active" : ""}>
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
                        className={
                          activeMenu == "enquiry-list" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("enquiry-list");
                        }}
                      >
                        Customers Enquiries
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Franchisee Section */}
                <li className={activeMenu == "franchisee-list" ? "active" : ""}>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-account-plus"></i>
                    <span className="hide-menu">FRANCHISEE</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/franchisee"
                        className={
                          activeMenu == "franchisee-list" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("franchisee-list");
                        }}
                      >
                        Franchisee Inquiry
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Banner Section */}
                <li
                  className={
                    activeMenu == "main-banner" ||
                    activeMenu == "homepage-banner"
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-image-area"></i>
                    <span className="hide-menu">BANNERS</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/sliders"
                        className={
                          activeMenu == "main-banner" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("main-banner");
                        }}
                      >
                        Main Slider
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/banners"
                        className={
                          activeMenu == "homepage-banner" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("homepage-banner");
                        }}
                      >
                        HomePage Banner
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Category */}
                <li
                  className={
                    activeMenu == "parent-category" ||
                    activeMenu == "sub-category" ||
                    activeMenu == "child-category"
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-content-duplicate"></i>
                    <span className="hide-menu">CATEGORY</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/parentCategory"
                        className={
                          activeMenu == "parent-category" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("parent-category");
                        }}
                      >
                        Parent Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/subCategory"
                        className={
                          activeMenu == "sub-category" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("sub-category");
                        }}
                      >
                        Sub Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/childCategory"
                        className={
                          activeMenu == "child-category" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("child-category");
                        }}
                      >
                        Child Category
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Product Section */}
                <li className={activeMenu == "product-list" ? "active" : ""}>
                  <Link
                    className="has-arrow waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="mdi mdi-folder-multiple"></i>
                    <span className="hide-menu">PRODUCTS</span>
                  </Link>

                  <ul aria-expanded="false" className="collapse">
                    <li>
                      <Link
                        to="/awni-admin/products"
                        className={
                          activeMenu == "product-list" ? "activeLink" : ""
                        }
                        onClick={(evt) => {
                          removeLeftNavigation();
                          activeMenuHandler("product-list");
                        }}
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
                        onClick={(evt)=>{
                          removeLeftNavigation();
                          activeMenuHandler()
                        }}
                      >
                        New Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/awni-admin/orders"
                        onClick={(evt)=>{
                          removeLeftNavigation();
                          activeMenuHandler()
                        }}
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
              onClick={(evt) => {
                removeLeftNavigation();
                activeMenuHandler();
              }}
            >
              <i className="ti-settings"></i>
            </Link>
            {/* <!-- item--> */}
            <Link
              to="#"
              className="link"
              data-toggle="tooltip"
              title="Email"
              onClick={(evt) => {
                removeLeftNavigation();
                activeMenuHandler();
              }}
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
