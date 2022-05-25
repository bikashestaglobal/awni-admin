import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config"

function TermsCondition() {
    // History Initialization
    const history = useHistory();
    const myRef = useRef();
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
                            <span className="pl-3">Terms & Condition</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-md-12 px-1 mt-3"}>
                    <h4> <span style={{ fontWeight: "bold" }}> TERMS & CONDITIONS </span> </h4>
                    <div className="devider"></div>

                    <div className="">
                        <p style={{ fontSize: "15px" }}>
                            1. To apply for any of the course, fill up the registration form available at our website.
                        </p>
                        <p style={{ fontSize: "15px" }}>
                            2. The available seats are limited and will be filled in first come first serve basis.
                        </p>

                        <p style={{ fontSize: "15px" }}>
                            3. The fee can be paid either in cash or through Website or App.
                        </p>
                        <p style={{ fontSize: "15px" }}>
                            4. Incomplete from will rejected. It is compulsory to attach photocopy of mark sheets and two recent passport size photographs with the offline registration form.
                        </p>
                        <p style={{ fontSize: "15px" }}>
                            5. It is compulsory to provide correct details of Parents. The result of tests or any other information by the institute will be sent via SMS.
                        </p>
                        <p style={{ fontSize: "15px" }}>
                            6. If any student does not pay the fee on the due date as mentioned in the prospectus or is defaulter in the fee payment, he/she shall be stopped from attending the classes.
                        </p>
                        <p style={{ fontSize: "15px" }}>
                            7. In case any parent/guardian/student is found misbehaving with any staff member of the Institute, his/her ward can be rusticated and no claim to retain such student will be entertained. The decision of the Director will be final and binding on the student and parents/guardian.
                        </p>

                        <h4><span style={{ fontWeight: "bold" }}> REFUND POLICY FOR COURSES </span></h4>


                        <p style={{ fontSize: "15px" }}>
                            1. <span className={"text-dark h6"}>Registration Fee Refund: </span> Registration Fee will be refunded within 10 days of Registration. After 10 Days we would not refund fees.
                        </p>
                        <p style={{ fontSize: "15px" }}>
                            2. <span className={"text-dark h6"}>Process for Refund: </span>  If any student pays the fee for any course and wants to withdraw/ask for refund the fees will be refunded within 3-5 working days.

                        </p>

                        <h4><span style={{ fontWeight: "bold" }}> SHIPPING POLICY </span></h4>
                        <p style={{ fontSize: "15px" }}>
                            1. Student can purchase any of courses at any time this course will added to his/her account at the time of purchasing.

                        </p>

                    </div>
                </div>
            </div>
        </div>

    );
}
export default TermsCondition;
