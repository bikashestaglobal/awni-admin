import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AdminContext } from "../admin/Admin";

function TopNavigation() {
  const {state, dispatch} = useContext(AdminContext)
  const history = useHistory()

  // Logout Function
  const logout = (evt)=>{
    evt.preventDefault()
    localStorage.clear()
    dispatch({type: "CLEAR"})
    history.push("/admin/login")
  }

  return (
    
    <header className="topbar">
      {state &&
      <nav className="navbar top-navbar navbar-expand-md navbar-light">
        {/* <!-- Logo --> */}

        <div className="navbar-header">
          
            
            <Link className="navbar-brand" to="/admin">
              {/* <!-- Logo icon --> */}
              <b>
                {/* <!-- Dark Logo icon --> */}
                <img src="../assets/images/logo-icon.png" className="dark-logo" />
                {/* <!-- Light Logo icon --> */}
                <img
                  src="../assets/images/logo-light-icon.png"
                  className="light-logo"
                />
              </b>
              {/* <!--End Logo icon --> */}
              {/* <!-- Logo text --> */}
              <span>
                {/* <!-- dark Logo text --> */}
                <img src="../assets/images/logo-text.png" className="dark-logo" />
                {/* <!-- Light Logo text -->     */}
                <img
                  src="../assets/images/logo-light-text.png"
                  className="light-logo"
                />
              </span>
            </Link>
          
        </div>
        {/* <!-- End Logo --> */}
        <div className="navbar-collapse">
          {/* <!-- toggle and nav items --> */}
          <ul className="navbar-nav mr-auto mt-md-0">
            {/* <!-- This is  --> */}
            <li className="nav-item">
                <button
                  className="nav-link nav-toggler hidden-md-up text-muted waves-dark"
                >
                  <i className="mdi mdi-menu"></i>
                </button>
            </li>
            <li className="nav-item">
                
                <button
                  className="nav-link sidebartoggler hidden-sm-down text-muted waves-dark"
                  style={{border:'none', outline:'none', background: 'none'}}
                >
                  <i className="ti-menu"></i>
                </button>
            </li>

            {/* <!-- Search --> */}
            <li className="nav-item hidden-sm-down search-box">
                
                <Link
                  className="nav-link hidden-sm-down text-muted waves-dark"
                  to=""
                >
                  <i className="ti-search"></i>
                </Link>
              <form className="app-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search & enter"
                />
                
                  
                  <Link className="srh-btn" to={''}>
                    <i className="ti-close"></i>
                  </Link>
                
              </form>
            </li>
          </ul>

          {/* <!-- User profile and search --> */}
          <ul className="navbar-nav my-lg-0">
            {/*<!-- Comment -->*/}
            <li className="nav-item dropdown">
              
                
                <Link
                  className="nav-link dropdown-toggle text-muted text-muted waves-dark"
                  to=""
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-message"></i>
                  <div className="notify">
                    <span className="heartbit"></span>
                    <span className="point"></span>
                  </div>
                </Link>
              
              <div className="dropdown-menu dropdown-menu-right mailbox scale-up">
                <ul>
                  <li>
                    <div className="drop-title">Notifications</div>
                  </li>
                  <li>
                    <div className="message-center">
                      {/* <!-- Message --> */}
                      
                        
                        <Link to={'/'}>
                          <div className="btn btn-primary btn-circle">
                            <i className="ti-user"></i>
                          </div>
                          <div className="mail-contnet">
                            <h5>Pavan kumar</h5>
                            <span className="mail-desc">
                              Just see the my admin!
                            </span>
                            <span className="time">9:02 AM</span>
                          </div>
                        </Link>
                      
                    </div>
                  </li>
                  <li>
                    
                      
                      <Link className="nav-link text-center" to=";">
                        <strong>Check all notifications</strong>
                        <i className="fa fa-angle-right"></i>
                      </Link>
                    
                  </li>
                </ul>
              </div>
            </li>

            {/* <!-- End Comment --> */}

            {/* <!-- Profile --> */}
            <li className="nav-item dropdown">
              
                
                <Link
                  className="nav-link dropdown-toggle text-muted waves-dark"
                  to=""
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="../assets/images/users/1.jpg"
                    alt="user"
                    className="profile-pic"
                  />
                </Link>
              
              <div className="dropdown-menu dropdown-menu-right scale-up">
                <ul className="dropdown-user">
                  <li>
                    <div className="dw-user-box">
                      <div className="u-img">
                        <img src="../assets/images/users/1.jpg" alt="user" />
                      </div>
                      <div className="u-text">
                        <h4>Steave Jobs</h4>
                        
                          
                          <Link
                            to="/admin/profile"
                            className="btn btn-rounded btn-danger btn-sm"
                          >
                            View Profile
                          </Link>
                        
                      </div>
                    </div>
                  </li>
                  <li role="separator" className="divider"></li>
                  <li>
                    
                      
                      <Link to="/admin/profile">
                        <i className="ti-user"></i> My Profile
                      </Link>
                    
                  </li>

                  <li role="separator" className="divider"></li>
                  <li>
                    
                      
                      <Link to="/admin/account">
                        <i className="ti-settings"></i> Account Setting
                      </Link>
                    
                  </li>
                  <li role="separator" className="divider"></li>
                  <li>
                    
                      
                      <Link to="/admin/logout" onClick={logout}>
                        <i className="fa fa-power-off"></i> Logout
                      </Link>
                    
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    }
    </header>
  );
}

export default TopNavigation;
