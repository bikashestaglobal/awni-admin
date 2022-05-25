import React, { useContext, useState, useEffect } from 'react'
import { StaffContext } from '../../staff/StaffRoutes';
import M from 'materialize-css'
import { Link } from 'react-router-dom';
import Config from '../../config/Config';
import Chart from 'chart.js/auto';


function Dashboard() {
  const { state, dispatch } = useContext(StaffContext)
  const [selectedSession, setSelectedSession] = useState(
    localStorage.getItem("branchSession") || ""
  );



  return (
    <div>
      <div className="page-wrapper px-0 pt-0">
        {/* <!-- ============================================================== --> */}
        {/* <!-- Container fluid  --> */}
        {/* <!-- ============================================================== --> */}
        <div className="container-fluid">
          {/* <!-- ============================================================== --> */}
          {/* <!-- Bread crumb and right siLine toggle --> */}
          {/* <!-- ============================================================== --> */}
          <div className="row page-titles mb-0">
            <div className="col-md-5 col-8 align-self-center">
              <h3 className="text-themecolor">Dashboard</h3>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
          {/* <!-- End Bread crumb and right sidebar toggle --> */}

          {/* <!-- Card Section --> */}


        </div>
        {/* <!-- ============================================================== --> */}
        {/* <!-- End Container fluid  --> */}
        {/* <!-- footer --> */}
        {/* <!-- ============================================================== --> */}
        <footer className="footer">
          © 2021 Vijay Physics
        </footer>
        {/* <!-- ============================================================== --> */}
        {/* <!-- End footer --> */}
        {/* <!-- ============================================================== --> */}
      </div>

    </div >
  )
}

export default Dashboard
