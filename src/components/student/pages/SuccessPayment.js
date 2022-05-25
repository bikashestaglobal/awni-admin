import React, { useState, useEffect, useContext } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { StudentContext } from "../Student";
import Config from "../../config/Config"
import $ from 'jquery';
import { format } from 'date-fns';
import { useParams, useHistory } from 'react-router-dom';


function SuccessPayment() {
    let { razorpay_payment_id, amount, paymentId } = useParams();
    let history = useHistory()
    const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
    const [session, setSession] = useState({});
    const [courseType, setCourseType] = useState({ installment: [] });


    useEffect(async () => {
        // Find selected Session
        const availableSession = studentData.session;
        const found = availableSession.find(({ session }) => session._id == JSON.parse(localStorage.getItem("studentSelectedSession"))._id);
        setSession(found);
        const sessionId = found.session._id;

        const data = {
            razorpayPaymentId: razorpay_payment_id,
            subscriptionId: "",
            razorpaySignature: "",
            razorpayOrderId: "",
            amount,
            paymentId,
            session: sessionId
        };

        const result = await fetch(Config.SERVER_URL + "/student/paymentUpdate", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
            },
        }).then((t) =>
            t.json()
        ).catch(error => {
            M.toast({ html: error, classes: "bg-danger" })
        })

        // console.log('2nd step', result);
        M.toast({ html: result.message, classes: "bg-success" })
        window.location = "/student/payment";
    }, []);


    return (
        <div className="page-wrapper pt-0" style={{ height: "100%" }}>
            <div className="container-fluid">
                {/* Bread crumb and right sidebar toggle */}
                <div className="row page-titles mb-0">
                    <div className="col-md-5 col-8 align-self-center">
                        <h3 className="text-themecolor m-b-0 m-t-0">Payment</h3>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/student">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">payment</li>
                        </ol>
                    </div>
                </div>
                {/* End Bread crumb and right sidebar toggle */}

                {/* Start Page Content */}
                {/* Row */}
                <div className={"row page-titles mb-0 px-1 shadow-none"} style={{ background: "none" }}>
                    {/* MAke Payment */}
                    <div className="col-lg-6 col-xlg-6 col-md-6 px-1">
                        <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                            <div className={"card-body pb-0 pt-2"}>
                                <div>
                                    <h4 className="text-info mt-2 mr-2 pb-2">Make Payment </h4>
                                    <h5 className="mt-2 mr-2 pb-2">Total Course Fee: <i className="fa fa-rupee-sign"></i> {courseType.fee} </h5>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>
                {/* Row */}
                {/* End PAge Content */}

            </div>
        </div>
    );
}

export default SuccessPayment;
