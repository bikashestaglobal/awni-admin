import React, { useState, useEffect, useContext } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import {StudentContext} from "../Student";

function Profile() {
  // State Variable

  const { state, dispatch } = useContext(StudentContext)

  const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
  const [session, setSession] = useState({});
  // Change time 24 hour to 12 hour
  const timeChangeHandler = (time)=> {
    // var inputEle = document.getElementById(inputElementID);
    // var timeSplit = inputEle.value.split(':'),
    var timeSplit = time.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    return(`${hours}:${minutes} ${meridian}`)
  } 
  // Fetching the data
  useEffect(() => {
    // Find selected Session
    const availableSession = studentData.session;
    const found = availableSession.find(({session}) => session._id == JSON.parse(localStorage.getItem("studentSelectedSession"))._id);
    setSession(found);
  }, []);

  return (
    <div className="page-wrapper pt-0 ">
      <div className="container-fluid">
        {/* Bread crumb and right sidebar toggle */}
        <div className="row page-titles mb-0">
          <div className="col-md-5 col-8 align-self-center">
            <h3 className="text-themecolor m-b-0 m-t-0">Profile</h3>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/student">Home</Link>
              </li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </div>
        </div>
        {/* End Bread crumb and right sidebar toggle */}

        {/* Start Page Content */}
        {/* Row */}
        <div className={"row page-titles mb-0 px-1 shadow-none"} style={{background:"none"}}>
          {/* Profile */}
          <div className="col-lg-4 col-xlg-3 col-md-5 px-1">
            <div className="card">
              <div className="card-body">
                <center className="m-t-30">
                  
                  {/* <img
                    src={state?state.profile_picture || "../assets/images/users/5.jpg": "Not Available"}
                    className="img-circle"
                    width="150"
                  /> */}
                  {state && state.profile_picture?<img src={state.profile_picture } alt="user" className={"img-circle"} />: <span className={"fas fa-user-circle text-success mt-2"} style={{fontSize:"80px"}}/>}
                  <h4 className="card-title m-t-10">{state?state.name:"Not Available"}</h4>
                  <h6 className="card-subtitle">
                    Future : Not Available
                  </h6>
                </center>
              </div>
              <div>
                <hr />
              </div>
              <div className="card-body">
                
                <small className="text-muted">Email address </small>
                <h6>{state?state.student_email:"Not Available"}</h6>
                <small className="text-muted p-t-30 db">Phone</small>
                <h6>{state?state.student_mobile:"Not Available"}</h6>
                <small className="text-muted p-t-30 db">Address</small>
                <h6> {state?`${state.address}, ${state.city}, ${state.state}`:"Not Available"} </h6>
              </div>
            </div>
          </div>
          {/* End Profile */}

          {/* Other Details */}
          <div className="col-lg-8 col-xlg-9 col-md-7 px-1">
            {/* Personal Details */}
            <div className="card">
              <div class="card-header bg-theme text-white">
                Personal Details
              </div>
              <div className={"card-body px-0 py-0"}>
                <div className={"table-responsive"}>
                  <table className={"table table-hover table-striped"}>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{state?state.name:"Not Available"}</td>
                        <th>Father Name</th>
                        <td>{state?state.father_name:"Not Available"}</td>
                      </tr>
                      <tr>
                        <th>Mother Name</th>
                        <td>{state?state.mother_name:"Not Available"}</td>
                        <th>Gender</th>
                        <td>{state?state.gender:"Not Available"}</td>
                      </tr>
                      <tr>
                        <th>DOB</th>
                        <td>{state?state.dob:"Not Available"}</td>
                        <th>Student Mobile</th>
                        <td>{state?state.student_mobile:"Not Available"}</td>
                      </tr>
                      <tr>
                        <th>Father Mobile</th>
                        <td>{state && state.father_mobile?state.father_mobile:"Not Available"}</td>
                        <th>Mother Mobile</th>
                        <td>{state?state.mother_mobile:"Not Available"}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{state?state.address:"Not Available"}</td>
                        <th>City</th>
                        <td>{state?state.city:"Not Available"}</td>
                      </tr>
                      <tr>
                        <th>State</th>
                        <td>{state?state.state:"Not Available"}</td>
                        <th>Registration Date</th>
                        <td>{state?new Date(state.created_date).toDateString():"Not Available"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Educational Details */}
            <div className="card">
              <div class="card-header bg-theme text-white">
                Educational Details
              </div>
              <div className={"card-body px-0 py-0"}>
                <div className={"table-responsive"}>
                  <table className={"table table-hover table-striped"}>
                    <tbody>
                      <tr>
                        <th>Standard</th>
                        <td>{session.standard?session.standard.name:"Not Available"}</td>
                        <th>Batch Name</th>
                        <td>{session.batch?session.batch.name:"Not Available"}</td>
                      </tr>
                      <tr>
                        <th>Batch Time</th>
                        <td>{session.batch?`${timeChangeHandler(session.batch.start_time)}-${timeChangeHandler(session.batch.end_time)}`:"Not Available"}</td>
                        <th>Course Type</th>
                        <td>{session.course_type?session.course_type.name:"Not Available"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* School/College Details */}
            <div className="card">
              <div class="card-header bg-theme text-white">
                School/College Details
              </div>
              <div className={"card-body px-0 py-0"}>
                <div className={"table-responsive"}>
                  <table className={"table table-hover table-striped"}>
                    <tbody>
                      <tr>
                        <th>School/College</th>
                        <td>{state && state.school?state.school:"Not Available"}</td>
                        <th>Board</th>
                        <td>{state && state.board?state.board:"Not Available"}</td>
                      </tr>
                      <tr>
                        <th>University</th>
                        <td colSpan={3}>{state && state.university?state.university:"Not Available"}</td>
                        
                      </tr>
                      
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* End Other Details */}
        </div>
        {/* Row */}
        {/* End PAge Content */}
      </div>
    </div>
  );
}

export default Profile;
