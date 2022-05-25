import React from "react";
import { Link } from "react-router-dom";

//  Component Function
const PageNoteFound = (props) => {
  
 

  // Return function
  return (
    <div className="page-wrapper pt-0" style={{height:"100%"}} >
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Page Not Found</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/student">Home</Link>
              </li>
              <li className="breadcrumb-item active">pageNotFound</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        <div className={"row p-0"}>
          <div className={"col-md-12 p-0"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div className={"p-4 text-center"}>
                  <h1 className="text-danger" style={{fontSize:"60px"}}>404</h1>
                  <h2 className={"py-2"}>OOPS! PAGE NOT FOUND</h2>
                  <h6 className={"py-2"}>
                    Sorry, The page you are looking for doesn't exist. If you think somthing is broken , report a problem
                  </h6>
                  <Link to={"/student"} className={"btn btn-success btn-rounded m-2"}> Dashboard </Link>
                  <Link to={"#"} className={"btn btn-outline-success btn-rounded m-2"}> Report </Link>

                </div>
              </div>
            </div>

           
          </div>
        </div>

      </div>
    </div>
  );
};

export default PageNoteFound;
