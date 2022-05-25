import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config"

function Contact() {
    // History Initialization
    const history = useHistory();
    const myRef = useRef(null);
    // Go Back  
    const goBack = (evt) => {
        evt.preventDefault();
        history.goBack();
    }

    // Effects
    useEffect(() => {
        myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [])

    return (
        <div ref={myRef} className={"container-fluid px-3 bg-light"} style={{ height: "100vh" }}>
            <div className={"row"}>
                <div className={"col-md-12 bg-info py-2"}>
                    <div className={"px-0"}>
                        <button onClick={goBack} className={"mdi mdi-arrow-left text-white float-left btn shadow-none"}>
                            <span className="pl-3">CONTACT US</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-md-12 px-1 mt-3"}>
                    <h4>For More Contact Us</h4>
                    <div className="devider mb-2"></div>
                    <div className="">
                        <p className={""} style={{ fontSize: "16px" }}>
                            <span className="mdi mdi-map-marker-radius h4"></span>
                            Near Rangbhumi Chowk Purnia, 854301
                        </p>
                        <p className={" m-0"} style={{ fontSize: "16px" }}>
                            <span className="mdi mdi-gmail h5"></span>
                            <span className="pl-1">vijayprsad@gmail.com</span>
                        </p>
                        <a href={"tel:9122899015"} className={""} style={{ fontSize: "16px" }}>
                            <span className="mdi mdi-phone h5"></span>
                            <span className="pl-1">+91-9122899015</span>
                        </a>
                    </div>

                    <div className="map mt-3">
                        {/*  */}
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7185.428768029864!2d87.4703325!3d25.7799959!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eff99cdf22171f%3A0x14ea45816f2940b4!2sThe%20Vijay%20Physics!5e0!3m2!1sen!2sin!4v1619860410262!5m2!1sen!2sin" width="100%" height="350" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Contact;
