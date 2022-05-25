import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { Link, useParams } from "react-router-dom";
import Config from '../../config/Config';
import { format } from 'date-fns';
import date from 'date-and-time';
import $ from 'jquery';



function StartOnlineTest() {
    const { testId } = useParams();
    const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
    const [session, setSession] = useState({});
    const [onlineTest, setOnlineTest] = useState({ questions: [] });
    const [testTimer, setTestTimer] = useState("");
    const [onlineTestLoaded, setOnlineTestLoaded] = useState(false);
    const [testSubmitLoaded, setTestSubmitLoaded] = useState(true);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [testTimerEnd, setTestTimerEnd] = useState(false);
    const [index, setIndex] = useState(0);
    const [selectedAnswer, setSelectAnswer] = useState("");
    const [testAnswer, setTestAnswer] = useState([]);
    const [score, setScore] = useState(0);
    const [alreadySubmited, setAlreadySubmited] = useState(false);


    // Submit Handler
    const submitHandler = (evt) => {
        evt.preventDefault();
        setTestSubmitLoaded(false);

        fetch(Config.SERVER_URL + "/student/addResult", {
            method: "POST",
            body: JSON.stringify({ score, session: session._id, answers: testAnswer, onlineTest: testId }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setTestSubmitLoaded(true);
                    if (result.success) {
                        setTestEnd(true);
                        M.toast({ html: result.message, classes: "bg-success" });

                    } else {

                        if (result.session)
                            M.toast({ html: result.session, classes: "bg-danger" });
                        if (result.score)
                            M.toast({ html: result.score, classes: "bg-danger" });
                        if (result.onlineTest)
                            M.toast({ html: result.onlineTest, classes: "bg-danger" });

                        if (result.message)
                            M.toast({ html: result.message, classes: "bg-danger" });
                    }
                },
                (error) => {
                    setTestSubmitLoaded(true);
                    M.toast({ html: error, classes: "bg-danger" });
                }
            );
    };


    const saveAnswer = ({ marks, options, questionId, question, answer, question_image }) => {
        let result = [...testAnswer];
        result = result.filter(val => val.questionId != questionId);
        result.push({ answer, marks, options, question, questionId, question_image, selected_answer: selectedAnswer })
        setTestAnswer(result);

        // Get Score
        if (answer == selectedAnswer) {
            setScore(score + marks);
        }

        // Set Answer to Blank
        setSelectAnswer("")

        // Show next question
        next();
    }



    // Counter Down
    const testEndCounter = (value) => {
        let countDownDate = new Date(value).getTime();
        // Update the count down every 1 second
        let x = setInterval(function () {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            setTestTimer(hours + "h "
                + minutes + "m " + seconds + "s ");

            // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            // + minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                setTestTimer("EXPIRED");
                setTestTimerEnd(true);
                setOnlineTestLoaded(true);
                return ("EXPIRED");
                // document.getElementById("demo").innerHTML = "EXPIRED";
            }
            setOnlineTestLoaded(true);
            return (days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ");
        }, 1000);
    }

    // Counter Down
    const testStartCounter = (value) => {
        if (value == "") {
            setOnlineTestLoaded(true);
            return;
        }

        let countDownDate = new Date(value).getTime();
        // Update the count down every 1 second
        let x = setInterval(function () {

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            setTestTimer(hours + "h "
                + minutes + "m " + seconds + "s ");

            // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            // + minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                setTestTimer("");
                setTestStart(true);
                return "EXPIRED";
                // document.getElementById("demo").innerHTML = "EXPIRED";
            }

            setOnlineTestLoaded(true);
            return (days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ");
        }, 1000);
    }

    const next = () => {
        const length = onlineTest.questions.length ? onlineTest.questions.length : 0;
        if (index < length - 1) {
            setIndex(index + 1);
        }
    }


    if (testStart) {
        testEndCounter(onlineTest.end_date)
    }

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

                    if (result.success) {
                        setOnlineTest(result.data[0] || {});
                        testStartCounter(result.data[0] ? result.data[0].start_date : "");
                    } else {
                        M.toast({ html: result.message, classes: "bg-danger" });
                    }
                },
                (error) => {
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

                    if (result.success) {
                        if (result.data != null) {
                            setAlreadySubmited(true);
                        }
                    } else {
                        M.toast({ html: result.message, classes: "bg-danger" });
                    }
                },
                (error) => {
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

                    {onlineTestLoaded ?
                        <div className="">
                            {JSON.stringify(onlineTest) != "{}" ?
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
                                            </div>

                                            {/* Start Timer */}
                                            {testStart ?
                                                // End Timer
                                                <div>
                                                    <h4 className="float-left mt-2 mr-2"> Test Ending:  </h4>
                                                    <h4 className="float-right mt-2 mr-2"> <span className="badge h2 badge-danger">{testTimer}</span> </h4>
                                                </div> :

                                                // Start Timer
                                                <div className={"text-center pt-5"} style={{ clear: "both" }}>
                                                    <h3 className="text-info mt-2 mr-2"> Test Start In  </h3>
                                                    <img src={"https://lh3.googleusercontent.com/proxy/5U-G_KnuXeu7VRjeeOlVOQAHDA5vFjB09gOjydY5gMC_coZfcYGvh6wqhesSyF6NaFVHuje7DYd0PDmovG3UmeFVgTPvTutKK_C7ArHAEm-m"} className={"img img-fluid"} style={{ height: "150px" }}></img>
                                                    <h1 className="mt-2 mr-2"> <div className="badge badge-info">{testTimer}</div> </h1>
                                                </div>}
                                        </div>
                                    </div>

                                    {/* Questions */}
                                    {testStart ?
                                        <div className="">
                                            {!alreadySubmited ?
                                                !testTimerEnd ?
                                                    <div className="">
                                                        <div className="card mb-0 mt-2 border-0 rounded-0">
                                                            <div className="card-body">
                                                                <h3 className={"text-info"}> {index + 1}) Question</h3>
                                                                <h4> {onlineTest.questions.length ? onlineTest.questions[index].question : ""} </h4>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            {onlineTest.questions.length ? onlineTest.questions[index].options.map((value, i) => {
                                                                return (
                                                                    <div className="col-md-6" key={i}>
                                                                        <div className="card mb-0 mt-2 border-0 rounded-0">
                                                                            <button id={`btn${index}`} onClick={(evt) => setSelectAnswer(value.value)} className={"text-left p-0 btn btn-block shadow-none btn-option"}
                                                                            >
                                                                                <div className="card-body">
                                                                                    <h5>{value.value}) {value.title}
                                                                                    </h5>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }) : ""}
                                                        </div>

                                                        <div className="row mt-3">

                                                            <div className="col-12 text-center">
                                                                {/* Save And Next Button*/}
                                                                <button onClick={() => saveAnswer(onlineTest.questions[index])} type={"button"} className={"btn btn-info rounded-0 px-4"}>Save & Next</button>

                                                                {/* Test Sumbit Button */}
                                                                {index == testAnswer.length - 1 ? <button onClick={submitHandler} type={"button"} className={"btn btn-danger rounded-0 ml-3"}>Submit Test</button> : ""}

                                                                {/*  */}
                                                            </div>

                                                        </div>

                                                    </div> : "" :
                                                <div className="bg-white text-center mt-4 py-3">
                                                    <img style={{ height: "100px" }} src="https://i.dlpng.com/static/png/6705921_preview.png" alt="" className="img img-fluid" />
                                                    <h4>Test Submited Successfuly Check Result in Result Section</h4>
                                                </div>
                                            }
                                        </div> : ""}


                                </div> : <div
                                    className={
                                        "alert alert-danger mx-3 rounded-0 border-0 py-2 col-md-12"
                                    }
                                >
                                    No Data Available!
                                </div>}
                        </div>

                        : (
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

export default StartOnlineTest;
