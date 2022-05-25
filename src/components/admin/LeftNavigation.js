import React, {useContext, useState, useEffect} from "react";
import { Link, BrowserRouter, useHistory} from "react-router-dom";
import { AdminContext } from "../admin/Admin";
import M from 'materialize-css'


function LeftNavigation() {
  const { state, dispatch } = useContext(AdminContext)
  const [isLoaded, setIsLoaded] = useState(false);
  const [pendingListing, setPendingListing] = useState([]);
  const [publishedListing, setPublishedListing] = useState([])
  const [pendingComments, setPendingComments] = useState([])
  const [activeComments, setActiveComments] = useState([])
   
  // Fetching the data
   useEffect(() => {

  
      // Acive Comments
      fetch("/admin/activeComments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {

              setActiveComments(result.data || []);
            } else {
              M.toast({ html: result.message, classes: "bg-danger" });

            }
          },
          (error) => {

            console.log(error)
          }
        )
  

      }, []);
  const history = useHistory()

  // Logout Function
  const logout = (evt)=>{
    evt.preventDefault()
    localStorage.clear()
    dispatch({type: "CLEAR"})
    history.push("/admin/login")
  }

  return (
    <div>
      {state &&
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
            <div className="profile-img">
              <img src="../assets/images/users/profile.png" alt="user" />
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
                <Link to="/admin/profile" className="dropdown-item">
                  <i className="ti-user"></i> My Profile
                </Link>

                <div className="dropdown-divider"></div>

                <Link to="/admin/profile" className="dropdown-item">
                  <i className="ti-settings"></i> Account Setting
                </Link>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item" onClick={logout}>
                  <i className="fa fa-power-off"></i> Logout
                </button>
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
                  to="/admin"
                >
                  <i className="mdi mdi-gauge"></i>
                  <span className="hide-menu">Dashboard </span>
                </Link>
              </li>
              
              {/* Branch */}
              <li>
                <Link
                  className="has-arrow waves-dark"
                  to="/admin/branch"
                >
                  <i className="mdi mdi-microsoft"></i>
                  <span className="hide-menu">Branch </span>
                </Link>
              </li>



             

              {/* <li>
                <Link
                  className="has-arrow waves-dark"
                  to="/"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-bullseye"></i>
                  <span className="hide-menu">Orders</span>
                </Link>

                <ul aria-expanded="false" className="collapse">
                <li>
                    <Link to="/admin/pending-order">Pending Order <span className="badge badge-danger"> {pendingListing.length} </span> </Link>
                  </li>
                  <li>
                    <Link to="/admin/publishedListing">Published Listings <span className="badge badge-danger"> {publishedListing.length} </span> </Link>
                  </li>
                  
                </ul>
              </li> */}

              <li className="nav-devider"></li>
              
              <li>
                <Link
                  className="has-arrow waves-dark"
                  to="/"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-star-outline"></i>
                  <span className="hide-menu">Comments</span>
                </Link>

                <ul aria-expanded="false" className="collapse">
                  <li>
                    <Link to="/admin/pendingComments">Pending Comments  <span className="badge badge-danger"> {pendingComments.length} </span> </Link>
                  </li>
                  <li>
                    <Link to="/admin/activeComments">Active Comments <span className="badge badge-danger"> {activeComments.length} </span> </Link>
                  </li>
                </ul>
              </li>
             
            </ul>
          </nav>
          {/* <!-- End Sidebar navigation --> */}
        </div>
        {/* <!-- End Sidebar scroll--> */}
        {/* <!-- Bottom points--> */}
        <div className="sidebar-footer">
          {/* <!-- item--> */}
          <Link
            to="/admin/setting"
            className="link"
            data-toggle="tooltip"
            title="Settings"
          >
            <i className="ti-settings"></i>
          </Link>
          {/* <!-- item--> */}
          <Link to="/" className="link" data-toggle="tooltip" title="Email">
            <i className="mdi mdi-gmail"></i>
          </Link>
          {/* <!-- item--> */}
            
          <Link
            to=''
            onClick={logout}
            className="link"
            data-toggle="tooltip"
            title="Logout"
          >
            <i className="mdi mdi-power"></i>
          </Link>
        </div>
        {/* <!-- End Bottom points--> */}
      </aside>
    }
    </div>
  );
}

export default LeftNavigation;
