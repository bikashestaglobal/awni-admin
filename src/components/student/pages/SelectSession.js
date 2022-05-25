import React, { useState } from "react";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";

//  Component Function
const SelectSession = (props) => {
  const [studentData, setstudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
  const history = useHistory();

  // check student session is selected or not

  // Submit Handler
  const onChangeHandler = (evt, sessionId) => {
    evt.preventDefault();
    const availableSession = studentData.session;
    const found = availableSession.find(({session}) => session._id == sessionId);
    
    // set selected session to localstoreage
    localStorage.setItem("studentSelectedSession", JSON.stringify(found.session));
    M.toast({html:"Session Activated!", classes:"bg-theme"});
    history.push("/student");
  };


  // Return function
  return (
    <div className="page-wrapper">
      <div className={"container-fluid"}>
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-2">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Select Session</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/student">Student</Link>
              </li>
              <li className="breadcrumb-item active">Session</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}
        <div className={"row page-titles px-1"}>
          <div className={"col-md-5 px-0 mx-auto"}>
            {/* Heading */}
            <div className={"card mb-0 mt-2 border-0 rounded-0 shadow-none"}>
              
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <form className={"form-material"}>
                    <div className={"form-group"}>
                      <select className={"form-control"}
                        onChange={(evt)=>onChangeHandler(evt, evt.target.value)}
                      >
                        <option hidden>Available Session</option>
                        {studentData.session.map((value, index)=>{
                          return(
                            <option value={value.session._id} key={index}> {`${value.session.name}, (${value.session.start_year}-${value.session.end_year})`} </option>
                          )
                        })}
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SelectSession;
