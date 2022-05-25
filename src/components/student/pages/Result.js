import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { Link, useParams } from "react-router-dom";
import Config from '../../config/Config';
import { format } from 'date-fns';
import date from 'date-and-time';
import $ from 'jquery';



function Result() {
    const { testId } = useParams();
    const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
    const [session, setSession] = useState({});
    const [onlineTest, setOnlineTest] = useState({ questions: [] });
    const [testTimer, setTestTimer] = useState("");
    const [onlineTestLoaded, setOnlineTestLoaded] = useState(false);
    const [resultLoaded, setResultLoaded] = useState(false);
    const [testSubmitLoaded, setTestSubmitLoaded] = useState(true);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [testTimerEnd, setTestTimerEnd] = useState(false);
    const [index, setIndex] = useState(0);


    const [result, setResult] = useState({ answers: [] });


    // Fetching the data
    useEffect(() => {
        // Find selected Session
        const availableSession = studentData.session;
        const found = availableSession.find(({ session }) => session._id == JSON.parse(localStorage.getItem("studentSelectedSession"))._id);
        setSession(found);
        const sessionId = found.session._id;
        const batchId = found.batch._id;

        // Search Test Data
        fetch(Config.SERVER_URL + "/student/searchOnlineTest?session=" + sessionId + "&batch=" + batchId + "&testId=" + testId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setOnlineTestLoaded(true)
                    if (result.success) {
                        setOnlineTest(result.data[0] || {});
                    } else {
                        M.toast({ html: result.message, classes: "bg-danger" });
                    }
                },
                (error) => {
                    setOnlineTestLoaded(true)
                    M.toast({ html: error, classes: "bg-danger" });
                }
            );


        // Check If test is submited
        fetch(Config.SERVER_URL + "/student/searchResult?onlineTest=" + testId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setResultLoaded(true)
                    if (result.success) {
                        setResult(result.data || { answers: [] });
                        console.log(result.data);
                    } else {
                        M.toast({ html: result.message, classes: "bg-danger" });
                    }
                },
                (error) => {
                    setResultLoaded(true);
                    M.toast({ html: error, classes: "bg-danger" });
                }
            );
    }, [testEnd]);


    return (
        <div className="page-wrapper pt-0" style={{ height: "100%" }}>
            <div className="container-fluid">
                {/* Start Page Content */}
                {/* Row */}
                <div className={"row page-titles mb-0 px-0 shadow-none"} style={{ background: "none" }}>

                    {/* Test Details */}
                    {onlineTestLoaded ?
                        <div className="col-md-12">
                            <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                                <div className={"card-body pb-0 pt-2"}>
                                    <div className="mb-3">
                                        <h3>Test Details</h3>

                                        <div className="devider"></div>
                                    </div>
                                    <div>
                                        <h4 className="float-left mt-2 mr-2"> Questions: {" "} {onlineTest.total_questions} </h4>
                                        <h4 className="float-right mt-2 mr-2"> Marks: {" "} {onlineTest.total_marks} </h4>
                                    </div>
                                    <div style={{ clear: "both" }}>
                                        <h4 className="mt-2 mr-2"> Type: {" "} {onlineTest.question_type} </h4>
                                        <h4 className="mt-2 mr-2">Duration: {" "} {onlineTest.duration}Min </h4>
                                        <h4 className="mt-2 mr-2">Result: {" "} <div className="badge badge-info">
                                            {result.score || 0}/{onlineTest.total_questions}</div> </h4>
                                    </div>

                                </div>
                            </div>


                        </div> : (
                            <div className={"bg-white p-3 text-center col-md-12"}>
                                <span
                                    className="spinner-border spinner-border-sm mr-1"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                        Loading..
                            </div>
                        )}

                    {/* Result Details */}
                    {resultLoaded ? <div className="col-md-12">
                        <div className="row mt-2">
                            <div className="col-md-12">
                                {result.answers.length ? result.answers.map((value, i) => {
                                    let optionLength = value.options.length || 0;
                                    return (
                                        <div className={"card my-1"} key={i}>
                                            <div className={"card-body my-1"}>
                                                <h4> {`Q ${i + 1}) ${value.question}`} </h4>

                                                <div className={"row"}>
                                                    {optionLength ? value.options.map((opt, indx) => {
                                                        return (
                                                            <div className={"col-md-6"} key={indx}>
                                                                <h6 style={{ color: value.answer == opt.value ? "blue" : "" }} >{`${opt.value}) ${opt.title}`}</h6>
                                                            </div>
                                                        )
                                                    }) : ""}

                                                    <div className="col-md-12">
                                                        <h5 className={"text-success"}>You Selected: ({value.selected_answer})
                                                            <span className={"float-right text-warning"}> Score: {value.answer == value.selected_answer ? value.marks : 0} </span>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : ""}
                            </div>
                        </div>

                    </div> : (
                        <div className={"bg-white p-3 text-center col-md-12"}>
                            <span
                                className="spinner-border spinner-border-sm mr-1"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        Loading..
                        </div>
                    )}

                </div>
                {/* Row */}
                {/* End PAge Content */}
            </div>


        </div>
    );
}

export default Result;
