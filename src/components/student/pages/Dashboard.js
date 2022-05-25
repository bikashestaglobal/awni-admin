import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Config from '../../config/Config';
import M from 'materialize-css';

function Dashboard() {
    const history = useHistory();
    const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
    const [session, setSession] = useState({});
    const [allVideos, setAllVideos] = useState([]);
    const [isAllVideoLoaded, setIsAllVideoLoaded] = useState(false);
    const [data, setData] = useState({ name: "", video_link: "" });
    const [payment, setPayment] = useState([]);

    // Fetching the data
    useEffect(() => {
        // Find selected Session
        const availableSession = studentData.session;
        const found = availableSession.find(({ session }) => session._id == JSON.parse(localStorage.getItem("studentSelectedSession"))._id);
        setSession(found);
        const sessionId = found.session._id;
        const batchId = found.batch._id;

        fetch(Config.SERVER_URL + "/student/searchVideos?session=" + sessionId + "&batch=" + batchId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    // setIsallChaptersLoaded(false);
                    if (result.success) {
                        setAllVideos(result.data || []);
                        setIsAllVideoLoaded(true);
                    } else {
                        M.toast({ html: result.message, classes: "bg-danger" });
                    }
                },
                (error) => {
                    M.toast({ html: error, classes: "bg-danger" });
                    setIsAllVideoLoaded(true);
                }
            );

        // Fetch Payment
        fetch(Config.SERVER_URL + "/student/searchPaymentFromStudent?session=" + sessionId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    // setIsallChaptersLoaded(false);
                    if (result.success) {
                        setPayment(result.data || []);
                    } else {
                        M.toast({ html: result.message, classes: "bg-danger" });
                    }
                },
                (error) => {
                    M.toast({ html: error, classes: "bg-danger" });
                }
            );
    }, []);

    return (
        <div>
            <div className="page-wrapper px-0 pt-0">
                {/* <!-- ============================================================== --> */}
                {/* <!-- Container fluid  --> */}
                {/* <!-- ============================================================== --> */}
                <div className="container-fluid">
                    {/* Breadcrumb */}
                    <div className="row page-titles mb-0">
                        <div className="col-md-5 col-8 align-self-center">
                            <h3 className="text-themecolor">Dashboard</h3>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                    </div>

                    {/* Card Sections */}
                    <div className={"row page-titles px-1 my-0 shadow-none"} style={{ background: "none" }}>
                        <div className={"col-md-12 px-0"}>
                            <div className={"card"}>
                                <div className={"card-body"}>
                                    <h3 className="card-title">Stats Overview</h3>
                                    <div className={"row"}>

                                        {/* Live Classes */}
                                        <div className={"col-md-3"}>
                                            <div className={"card bg-info border-0"}>
                                                <Link to={"/student/liveClass"}>
                                                    <div className={"card-body py-1"}>
                                                        <div className={"float-left"} style={{ position: "relative" }}>
                                                            <i className={'mdi mdi-camera v-big-icon text-light'} />
                                                            <div className="notify" style={{ position: "relatice", top: "-39px", left: "-24px" }}>
                                                                <span className="heartbit"></span>
                                                                <span className="point"></span>
                                                            </div>
                                                        </div>
                                                        <div className={"float-right text-right m-2"}>
                                                            <h2 className={"text-light"}> { } </h2>
                                                            <span className={"text-light h6"}>Live Classes</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Theory Videos */}
                                        <div className={"col-md-3"}>
                                            <div className={"card bg-primary border-0"}>
                                                <Link to={"/student/videos/THEORY"}>
                                                    <div className={"card-body py-1"}>
                                                        <div className={"float-left"}>
                                                            <i className={'mdi mdi-video v-big-icon text-light'} />
                                                        </div>
                                                        <div className={"float-right text-right m-2"}>
                                                            <h2 className={"text-light"}>
                                                                {isAllVideoLoaded ? allVideos.filter(video => video.type == "THEORY").length : (
                                                                    <div className={"text-center"}>
                                                                        <span
                                                                            className="spinner-border spinner-border-sm mr-1"
                                                                            role="status"
                                                                            aria-hidden="true"
                                                                        ></span>

                                                                    </div>
                                                                )}
                                                            </h2>
                                                            <span className={"text-light h6"}>Theory Videos</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Numerical Videos */}
                                        <div className={"col-md-3"}>
                                            <div className={"card bg-info border-0"}>
                                                <Link to={"/student/videos/NUMERICAL"}>
                                                    <div className={"card-body py-1"}>
                                                        <div className={"float-left"}>
                                                            <i className={'mdi mdi-video v-big-icon text-light'} />
                                                        </div>
                                                        <div className={"float-right text-right m-2"}>
                                                            <h2 className={"text-light"}>
                                                                {isAllVideoLoaded ? allVideos.filter(video => video.type == "NUMERICAL").length : (
                                                                    <div className={"text-center"}>
                                                                        <span
                                                                            className="spinner-border spinner-border-sm mr-1"
                                                                            role="status"
                                                                            aria-hidden="true"
                                                                        ></span>

                                                                    </div>
                                                                )}
                                                            </h2>
                                                            <span className={"text-light h6"}>Numerical Videos</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Assignments */}
                                        <div className={"col-md-3"}>
                                            <Link to={"/student/assignments"}>
                                                <div className={"card bg-warning border-0"}>
                                                    <div className={"card-body py-1"}>
                                                        <div className={"float-left"}>
                                                            <i className={'mdi mdi-file v-big-icon text-light'} />
                                                        </div>
                                                        <div className={"float-right text-right m-2"}>
                                                            <h2 className={"text-light"}> { } </h2>
                                                            <span className={"text-light h6"}>Assignments</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Online Test */}
                                        <div className={"col-md-3"}>
                                            <Link to={"/student/onlineTest"}>
                                                <div className={"card bg-success border-0"}>
                                                    <div className={"card-body py-1"}>
                                                        <div className={"float-left"}>
                                                            <i className={'mdi mdi-comment-question-outline v-big-icon text-light'} />
                                                        </div>
                                                        <div className={"float-right text-right m-2"}>
                                                            <h2 className={"text-light"}> { } </h2>
                                                            <span className={"text-light h6"}>Online Test</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Payments */}
                                        <div className={"col-md-3"}>
                                            <Link to={"/student/payment"}>
                                                <div className={"card bg-danger border-0"}>
                                                    <div className={"card-body py-1"}>
                                                        <div className={"float-left"}>
                                                            <i className={'mdi mdi-currency-inr v-big-icon text-light'} />
                                                        </div>
                                                        <div className={"float-right text-right m-2"}>
                                                            <h2 className={"text-light"}> {payment.reduce((a, b) => +a + +b.amount, 0)} </h2>
                                                            <span className={"text-light h6"}>Payments</span>
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
                    © 2021 Vijay Physics
            </footer>
                {/* <!-- ============================================================== --> */}
                {/* <!-- End footer --> */}
                {/* <!-- ============================================================== --> */}

                {/* -- Model Designing -- */}



            </div>


        </div>
    )
}

export default Dashboard
