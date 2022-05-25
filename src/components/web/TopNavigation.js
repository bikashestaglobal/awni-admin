import React from 'react'
import { Link } from "react-router-dom";

function TopNavigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" style={{ position: "sticky", top: "0", zIndex: "999" }}>
            <a className="navbar-brand" href="#">
                <img src={"../assets/images/logo.png"} className={"img img-fluid"} style={{ height: "44px" }} />
            </a>
            <button className="navbar-toggler border-0 outline-0" style={{ fontSize: "30px" }} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="fa fa-user-circle"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav ml-auto list-inline text-center" >
                    <li className="nav-item active py-1 px-1">
                        <Link className="btn btn-outline-info" to={"/studentLogin"}> Login </Link>

                    </li>
                    <li className="nav-item py-1 px-1">
                        <Link className="btn btn-info ml-2" to={"/studentRegistration"}> Registration </Link>
                    </li>

                </div>

            </div>
        </nav>

    )
}

export default TopNavigation
