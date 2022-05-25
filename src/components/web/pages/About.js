import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config"

function About() {
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
                            <span className="pl-3">ABOUT US</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-md-12 px-1 mt-3"}>
                    <h4>About Vijay Sir</h4>
                    <div className="devider mb-2"></div>
                    <div className="">

                    </div>
                </div>

                <div className="col-md-6">
                    <img src={""} className={"img img-fluid"} />
                </div>
            </div>
        </div>

    );
}
export default About;
