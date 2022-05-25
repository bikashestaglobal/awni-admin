import React, { useState, useEffect, useMemo } from "react";
import M from "materialize-css";
import $ from "jquery";
import { Link, useHistory, useParams } from "react-router-dom";
import Config from "../../config/Config";
import { format } from 'date-fns';

//  Component Function
const OnlineTestDetails = (props) => {
    const { testId } = useParams();
    const [selectedSession, setSelectedSession] = useState(localStorage.getItem("branchSession") || "");
    const [isAdded, setIsAdded] = useState(false);
    const [isOnlineTestLoaded, setOnlineTestLoaded] = useState(false);
    const [onlineTest, setOnlineTest] = useState({});


    // Get Data From Database
    useEffect(() => {
        fetch(Config.SERVER_URL + "/branch/searchOnlineTest?session=" + selectedSession + "&_id=" + testId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_branch_token")}`,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.success) {
                        const data = result.data[0];
                        setOnlineTest(data || {});
                    } else {
                        M.toast({ html: result.message, classes: "bg-danger" });
                    }
                    setOnlineTestLoaded(true);
                },
                (error) => {
                    M.toast({ html: error, classes: "bg-danger" });
                    setOnlineTestLoaded(true);
                }
            );
    }, []);


    // Return function
    return (
        <div className="page-wrapper px-0 pt-0">
            <div className={"container-fluid"}>
                {/* Bread crumb and right sidebar toggle */}
                <div className="row page-titles mb-0">
                    <div className="col-md-5 col-8 align-self-center">
                        <h3 className="text-themecolor m-b-0 m-t-0">Online Test Details</h3>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/branch">Branch</Link>
                            </li>
                            <li className="breadcrumb-item active">onlineTestDetails</li>
                        </ol>
                    </div>
                </div>

                {/* End Bread crumb and right sidebar toggle */}
                <div className={"row page-titles px-1 my-0 shadow-none"} style={{ background: "none" }}>
                    <div className={"col-md-12 px-0"}>
                        {/* Heading */}
                        <div className={"card mb-0 border-0 rounded-0"}>
                            <div className={"card-body pb-0 pt-2"}>
                                <div>

                                </div>
                            </div>
                        </div>

                        {/* Data */}
                        {isOnlineTestLoaded ? (
                            <div className="card border-0 rounded-0 m-0 py-1">
                                {JSON.stringify(onlineTest) != "{}" ? (
                                    <>
                                        <div className="card-body py-0">
                                            <div className="table-responsive">

                                                <table className="table p-0">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                Total Questions
                                                        </th>
                                                            <td>
                                                                {onlineTest.total_questions}
                                                            </td>
                                                            <th>
                                                                Total Marks
                                                        </th>
                                                            <td>
                                                                {onlineTest.total_marks}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                Question Type
                                                        </th>
                                                            <td>
                                                                {onlineTest.question_type}
                                                            </td>
                                                            <th>
                                                                Test Duration
                                                        </th>
                                                            <td>
                                                                {onlineTest.duration}Min
                                                        </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>

                                        {onlineTest.questions.length ? onlineTest.questions.map((value, index) => {
                                            return (
                                                <div className="card-body py-2 bg-light mb-2">
                                                    <h4> {index + 1}) {value.question} </h4>
                                                    <div className="row px-3">
                                                        {value.options ? value.options.map((otp, indx) => {
                                                            return (
                                                                <div className="col-md-6">
                                                                    <h5> {otp.value}) {otp.title} </h5>
                                                                </div>
                                                            )
                                                        }) : ""}
                                                        <h5 className={"text-info"}>Right Answer: ({value.answer}) </h5>
                                                    </div>
                                                </div>
                                            )
                                        }) : <div
                                            className={
                                                "alert alert-danger mx-3 rounded-0 border-0 py-2"
                                            }
                                        >
                                            No Questions Added!
                                    </div>}

                                    </>
                                ) : (
                                    <div
                                        className={
                                            "alert alert-danger mx-3 rounded-0 border-0 py-2"
                                        }
                                    >
                                        No Data Available!
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={"bg-white p-3 text-center"}>
                                <span
                                    className="spinner-border spinner-border-sm mr-1"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                Loading..
                            </div>
                        )}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default OnlineTestDetails;
