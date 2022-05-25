import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {AdminContext} from '../Admin'
import M from 'materialize-css'

function Dashboard() {
    const {state, dispatch} = useContext(AdminContext)
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdated, setisUpdated] = useState(false);
    const [pendingListing, setPendingListing] = useState([]);
    const [publishedListing, setPublishedListing] = useState([]);
    const [data, setData] = useState({});
    const [pendingComment, setPendingCommment] = useState([]);
    const [activeComment, setActiveCommment] = useState([]);

   // Fetching the data
   useEffect(() => {
    //  Get Pending Lesting
    fetch("/admin/pendingBusiness", {
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
            setIsLoaded(true);
            setPendingListing(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
            setIsLoaded(true);
          }
        },
        (error) => {
          setIsLoaded(true);
        }
      );

      // Get Published Listing
      fetch("/admin/publishedBusiness", {
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
              setIsLoaded(true);
              setPublishedListing(result.data || []);
            } else {
              M.toast({ html: result.message, classes: "bg-danger" });
              setIsLoaded(true);
            }
          },
          (error) => {
            setIsLoaded(true);
          }
        )
        
      // Pending Comment
      fetch("/admin/pendingComments", {
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
              setPendingCommment(result.data || []);
            } else {
              M.toast({ html: result.message, classes: "bg-danger" });
            }
          },
          (error) => {
            console.log(error)
          }
        )
          
      // Get Received Comment
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
              setActiveCommment(result.data || []);
            } else {
              M.toast({ html: result.message, classes: "bg-danger" });
            }
          },
          (error) => {
            console.log(error)
          }
        )
  }, [isUpdated]);
    return (
        <div>
            <div className="page-wrapper">
            {/* <!-- ============================================================== --> */}
            {/* <!-- Container fluid  --> */}
            {/* <!-- ============================================================== --> */}
            <div className="container-fluid">
                
                <div className="row page-titles">
                    <div className="col-md-5 col-8 align-self-center">
                        <h3 className="text-themecolor">Dashboard</h3>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <div className={"card"}>
                            <div className={"card-body"}>
                                <h3 className="card-title">Stats Overview</h3>
                                <div className={"row"}>
                                    {/* Pending Listings */}
                                    <div className={"col-md-3"}>
                                        <div className={"card bg-info border-0"}>
                                            <Link to={"/admin/pendingListing"}>
                                                <div className={"card-body py-1"}>
                                                    <div className={"float-left"}>
                                                        <i className={'mdi mdi-layers v-big-icon text-light'}/>
                                                    </div>
                                                    <div className={"float-right text-right m-2"}>
                                                        <h2 className={"text-light"}> {} </h2>
                                                        <span className={"text-light"}>Pending Listing</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {/* Published Listings */}
                                    <div className={"col-md-3"}>
                                        <div className={"card bg-primary border-0"}>
                                            <Link to={"/admin/publishedListing"}>
                                                <div className={"card-body py-1"}>
                                                    <div className={"float-left"}>
                                                        <i className={'mdi mdi-verified v-big-icon text-light'}/>
                                                    </div>
                                                    <div className={"float-right text-right m-2"}>
                                                        <h2 className={"text-light"}> {} </h2>
                                                        <span className={"text-light"}>Publish Listing</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* pending Comments */}
                                    <div className={"col-md-3"}>
                                        <Link to={"/admin/pendingComments"}>
                                            <div className={"card bg-warning border-0"}>
                                                <div className={"card-body py-1"}>
                                                    <div className={"float-left"}>
                                                        <i className={'mdi mdi-comment v-big-icon text-light'}/>
                                                    </div>
                                                    <div className={"float-right text-right m-2"}>
                                                        <h2 className={"text-light"}> {} </h2>
                                                        <span className={"text-light"}>Pending Comments</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Active Comments */}
                                    <div className={"col-md-3"}>
                                        <Link to={"/admin/activeComment"}>
                                            <div className={"card bg-danger border-0"}>
                                                <div className={"card-body py-1"}>
                                                    <div className={"float-left"}>
                                                        <i className={'mdi mdi-comment-multiple-outline v-big-icon text-light'}/>
                                                    </div>
                                                    <div className={"float-right text-right m-2"}>
                                                        <h2 className={"text-light"}> {} </h2>
                                                        <span className={"text-light"}>Acive Comments</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Column --> */}
                    
                    {/* <!-- Column --> */}
                    {/* <!-- Column --> */}
                   
                    {/* <!-- Column --> */}
                    {/* <!-- Column --> */}
                   
                    {/* <!-- Column --> */}
                </div>
                {/* <!-- Row --> */}
                {/* <!-- Row --> */}
              
                {/* <!-- End PAge Content --> */}
                {/* <!-- ============================================================== --> */}
                {/* <!-- ============================================================== --> */}
                {/* <!-- Right sidebar --> */}
                {/* <!-- ============================================================== --> */}
                {/* <!-- .right-sidebar --> */}
                <div className="right-sidebar">
                    <div className="slimscrollright">
                        <div className="rpanel-title"> Service Panel <span><i className="ti-close right-side-toggle"></i></span> </div>
                        <div className="r-panel-body">
                            <ul id="themecolors" className="m-t-20">
                                <li><b>With Light sidebar</b></li>
                                <li><a href="#" data-theme="default" className="default-theme">1</a></li>
                                <li><a href="#" data-theme="green" className="green-theme">2</a></li>
                                <li><a href="#" data-theme="red" className="red-theme">3</a></li>
                                <li><a href="#" data-theme="blue" className="blue-theme working">4</a></li>
                                <li><a href="#" data-theme="purple" className="purple-theme">5</a></li>
                                <li><a href="#" data-theme="megna" className="megna-theme">6</a></li>
                                <li className="d-block m-t-30"><b>With Dark sidebar</b></li>
                                <li><a href="#" data-theme="default-dark" className="default-dark-theme">7</a></li>
                                <li><a href="#" data-theme="green-dark" className="green-dark-theme">8</a></li>
                                <li><a href="#" data-theme="red-dark" className="red-dark-theme">9</a></li>
                                <li><a href="#" data-theme="blue-dark" className="blue-dark-theme">10</a></li>
                                <li><a href="#" data-theme="purple-dark" className="purple-dark-theme">11</a></li>
                                <li><a href="#" data-theme="megna-dark" className="megna-dark-theme ">12</a></li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
                {/* <!-- ============================================================== --> */}
                {/* <!-- End Right sidebar --> */}
                {/* <!-- ============================================================== --> */}
            </div>
            {/* <!-- ============================================================== --> */}
            {/* <!-- End Container fluid  --> */}
            {/* <!-- ============================================================== --> */}
            {/* <!-- ============================================================== --> */}
            {/* <!-- footer --> */}
            {/* <!-- ============================================================== --> */}
            <footer className="footer">
                © 2020 Biz Corner
            </footer>
            {/* <!-- ============================================================== --> */}
            {/* <!-- End footer --> */}
            {/* <!-- ============================================================== --> */}
        </div>
        
        </div>
    )
}

export default Dashboard
