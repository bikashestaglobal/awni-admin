import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            <footer className="text-lg-start bg-dark text-white mt-3 ">
                <div className="container">
                    <div className="row py-3">
                        <div className="col-lg-4 col-md-4 mb-4 mb-md-0">
                            <div className="">
                                <img className={"img img-fluid"} src={"../assets/images/logo.png"} />
                            </div>
                            <div className=" mt-4 text-center">
                                {/* Facebook */}
                                <a href={"https://www.facebook.com/thevijayphysics/"} className={"p-1 px-2 mr-2 h4 bg-danger"} style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <span className={"mdi mdi-facebook-box"}></span>
                                </a>

                                {/* Instagram */}
                                <a href={""} className={"p-1 px-2 mr-2 h4 bg-danger"} style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <span className={"mdi mdi-instagram"}></span>
                                </a>

                                {/* Youtube */}
                                <a href={"https://www.youtube.com/channel/UCVGmlnDqYPjkKVaFY0hlinw"} className={"p-1 px-2 mr-2 h4 bg-danger"} style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <span className={"mdi mdi-youtube-play"}></span>
                                </a>

                                {/* Twitter */}
                                <a href={""} className={"p-1 px-2 mr-2 h4 bg-danger"} style={{ height: "30px", width: "30px", borderRadius: "100%" }}>
                                    <span className={"mdi mdi-twitter"}></span>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h4 className="text-uppercase text-white">COMPANY</h4>

                            <ul className="list-unstyled mb-0">
                                {/* <li className={"py-1"}>
                                    <Link to={"/about-us"} className="text-white">About Us </Link>
                                </li> */}
                                <li className={"py-1"}>
                                    <Link to={"/contact-us"} className="text-white">Contact Us </Link>
                                </li>
                                <li className={"py-1"}>
                                    <Link to={"/privacy-policy"} className="text-white">Privacy Policy </Link>
                                </li>
                                <li className={"py-1"}>
                                    <Link to={"/terms-condition"} className="text-white">Terms & Conditions </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                            <h4 className="text-uppercase text-white">GET IN TOUCH</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <p className={"text-white"} style={{ fontSize: "16px" }}>
                                        <span className="mdi mdi-map-marker-radius h4"></span>
                                        Near Rangbhumi Chowk Purnia, 854301
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p className={"text-white m-0"} style={{ fontSize: "16px" }}>
                                        <span className="mdi mdi-gmail h5"></span>
                                        <span className="pl-1">vijayprsad@gmail.com</span>
                                    </p>
                                    <a href={"tel:9122899015"} className={"text-white"} style={{ fontSize: "16px" }}>
                                        <span className="mdi mdi-phone h5"></span>
                                        <span className="pl-1">+91-9122899015</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Copyright --> */}
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    <div className="row">
                        <div className="col-md-6">
                            © 2021 Copyright: Vijay Physics
                        </div>
                        <div className="col-md-6">
                            A unit of VSC Pvt Ltd.
                        </div>
                    </div>
                </div>
                {/* <!-- Copyright --> */}
            </footer>
        </div>
    )
}

export default Footer
