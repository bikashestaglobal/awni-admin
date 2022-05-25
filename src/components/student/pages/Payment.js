import React, { useState, useEffect, useContext } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { StudentContext } from "../Student";
import Config from "../../config/Config"
import $ from 'jquery';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

// Load Script tag
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const style = {
  img: {
    height: "100px",
    width: "100px",
    position: "absolute",
    top: "40%",
    left: "40%"
  }
}

function Payment() {
  let { razorpay_payment_id, amount, paymentId } = useParams();
  // State Variable
  const { state, dispatch } = useContext(StudentContext)

  const [studentData, setStudentData] = useState(JSON.parse(localStorage.getItem("student")) || {});
  const [session, setSession] = useState({});
  const [courseType, setCourseType] = useState({ installment: [] });
  const [isCourseTypeLoaded, setIsCourseTypeLoaded] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState({ status: false, paymentId: "" });
  const [allPayments, setAllPayments] = useState([]);
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    // Find selected Session
    const availableSession = studentData.session;
    const found = availableSession.find(({ session }) => session._id == JSON.parse(localStorage.getItem("studentSelectedSession"))._id);
    setSession(found);
    const sessionId = found.session._id;
    const batchId = found.batch._id;
    const course_typeId = found.course_type._id;

    fetch(Config.SERVER_URL + "/student/searchCourseTypeFromStudent?_id=" + course_typeId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsCourseTypeLoaded(true);
          if (result.success) {
            setCourseType(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
          setIsCourseTypeLoaded(true);
        }
      );

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
            setAllPayments(result.data || []);
          } else {
            M.toast({ html: result.message, classes: "bg-danger" });
          }
        },
        (error) => {
          M.toast({ html: error, classes: "bg-danger" });
        }
      );

    // 


  }, [isPaid]);


  async function displayRazorpay(paymentId, amount) {
    // const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    // if (!res) {
    //   M.toast({ html: 'Razorpay SDK failed to load. Are you online?', classes: "bg-danger" });
    //   return
    // }

    // 
    setIsPaid(false)


    // Set Loader true
    setPaymentLoader({ status: true, paymentId });
    setInterval(() => {
      setPaymentLoader({ status: false, paymentId });
    }, 7000)

    const data = await fetch(Config.SERVER_URL + "/student/paymentOrder", {
      method: "POST",
      body: JSON.stringify({ amount, paymentId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_student_token")}`,
      },
    }).then((t) =>
      t.json()
    ).catch(error => {
      M.toast({ html: error, classes: "bg-danger" })
    })


    const options = {
      key: 'rzp_live_n7hf0S558xGWso',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Vijay Physics ',
      description: 'Course Payment',
      image: '../assets/images/logo-icon.png',
      handler: async function (response) {
        console.log('response from razorpay', response);
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          subscriptionId: response.razorpay_subscription_id,
          razorpaySignature: response.razorpay_signature,
          razorpayOrderId: response.razorpay_order_id,
          amount,
          paymentId,
          session: session.session._id
        };

        const result = await fetch(Config.SERVER_URL + "/student/paymentSuccess", {
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
        setIsPaid(true);

        // alert(result.data.msg);
      },
      prefill: {
        name: studentData.name || "Coder Akash",
        email: studentData.student_email || "coderakash@gmail.com",
        contact: studentData.student_mobile,
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  // // Fetching the data
  // useEffect(() => {

  //   // Find selected Session
  //   const availableSession = studentData.session;
  //   const found = availableSession.find(({ session }) => session._id == JSON.parse(localStorage.getItem("studentSelectedSession"))._id);
  //   setSession(found);
  // }, []);

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
        {isCourseTypeLoaded ?
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
              {/* One Time Payment */}
              {courseType.onetime_fee ?

                <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                  <div className={"card-body pb-0 pt-2"}>
                    <div>
                      <h4 className="text-info mt-2 mr-2 pb-2">For One Time Payment </h4>
                      <div className="row">
                        <div className="col-6">
                          <h5 className="mt-2 mr-2 pb-2">Only <span><i className="fa fa-rupee-sign"></i> {courseType.onetime_fee}</span>
                          </h5>
                        </div>
                        <div className="col-6">

                          {/* {allPayments.some(payment => payment.payment_id == "oneTimePayment") ?
                          <span className="fa fa-check-circle badge badge-success float-right"> Paid </span> :
                          <button type={"button"} onClick={(evt) => displayRazorpay("oneTimePayment", courseType.onetime_fee)} className="btn btn-info float-right">

                            
                            {paymentLoader.status && paymentLoader.paymentId == "oneTimePayment" ? <span
                              className="spinner-border spinner-border-sm mr-1"
                              role="status"
                              aria-hidden="true"
                            ></span> : "Pay"}
                          </button>
                        } */}

                          {allPayments.some(payment => payment.payment_id == "oneTimePayment") ?
                            <span className="fa fa-check-circle badge badge-success float-right"> Paid </span> :

                            <form action="https://vijayphysics.com/StudentPayment/payment" method={"post"}>
                              <input type={"hidden"} value={studentData.name || "Coder Akash"} name={"name"}></input>
                              <input type={"hidden"} value={studentData.student_mobile || 9117162463} name={"student_mobile"}></input>
                              <input type={"hidden"} value={studentData.student_email || "coderakash@gmail.com"} name={"student_email"}></input>
                              <input type={"hidden"} value={courseType.onetime_fee} name={"amount"}></input>
                              <input type={"hidden"} value={"oneTimePayment"} name={"paymentId"}></input>

                              <button type={"submit"} className="btn btn-info float-right">
                                Make Payment
                            </button>
                            </form>

                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                : ""}

              {courseType.installment.length ?
                <>
                  {/* Or Section */}
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <div>
                        <h2 className="mt-2 mr-2 pb-2 text-center">OR </h2>
                      </div>
                    </div>
                  </div>

                  {/* Installment */}
                  <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                    <div className={"card-body pb-0 pt-2"}>
                      <div>
                        <h4 className="text-info mt-2 mr-2 pb-2">For Installment </h4>
                        {courseType ? courseType.installment.map((value, index) => {
                          return (
                            <div className={"row"}>
                              <div className="col-6 mb-2">
                                <h5 className={""}>{++index}) {" "} {value.name} {" : "} <i className="fa fa-rupee-sign"></i> {value.amount}
                                </h5>
                              </div>
                              <div className="col-6 mb-2 text-right">
                                {allPayments.some(payment => payment.payment_id == value._id) ?
                                  <span className="fa fa-check-circle badge badge-success"> Paid </span>
                                  :
                                  // <button onClick={(evt) => displayRazorpay(value._id, value.amount)} type={"button"} className="btn btn-info m-auto">
                                  //   <span>
                                  //     {paymentLoader.status && paymentLoader.paymentId == value._id ? <span
                                  //       className="spinner-border spinner-border-sm mr-1"
                                  //       role="status"
                                  //       aria-hidden="true"
                                  //     ></span> : "Pay"}
                                  //   </span>

                                  // </button>
                                  <form action="https://vijayphysics.com/StudentPayment/payment" method={"post"}>
                                    <input type={"hidden"} value={studentData.name || "Coder Akash"} name={"name"}></input>
                                    <input type={"hidden"} value={studentData.student_mobile || 9117162463} name={"student_mobile"}></input>
                                    <input type={"hidden"} value={studentData.student_email || "coderakash@gmail.com"} name={"student_email"}></input>
                                    <input type={"hidden"} value={value.amount} name={"amount"}></input>
                                    <input type={"hidden"} value={value._id} name={"paymentId"}></input>

                                    <button type={"submit"} className="btn btn-info float-right">
                                      Make Payment
                                  </button>
                                  </form>
                                }

                              </div>

                            </div>
                          )
                        }) : ""}
                      </div>
                    </div>
                  </div>
                </>
                : ""}

            </div>

            {/* Payments Details */}
            <div className="col-lg-6 col-xlg-6 col-md-6 px-1">
              <div className={"card mb-0 mt-2 border-0 rounded-0"}>
                <div className={"card-body pb-0 pt-2"}>
                  <h3 className="text-info mt-2 mr-2 pb-2">Payments Details </h3>
                  <div className={"table-responsive"}>
                    {/* <h3 className="mt-2 mr-2 pb-2"> Paid: <i className="fa fa-rupee-sign"></i> {allPayments.fee} </h3> */}
                    {allPayments.length ? <table className={"table table-stripped"}>
                      <tbody>
                        <tr>
                          <th> #SN </th>
                          <th> DATE </th>
                          <th> MODE </th>
                          <th> PAYMENT ID </th>
                          <th> AMOUNT </th>
                        </tr>
                        {allPayments.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td> {++index} </td>
                              <td> {format(new Date(value.date), "dd/MM/yyyy")} </td>
                              <td> {value.payment_mode} </td>
                              <td> {value.razorpay_payment_id} </td>
                              <td> <i className="fa fa-rupee-sign"></i> {value.amount} </td>
                            </tr>
                          )
                        })}
                        <tr>
                          <td colSpan={"4"}>Total</td>
                          <td> <i className="fa fa-rupee-sign"></i> {allPayments.reduce((a, b) => +a + +b.amount, 0)} </td>
                        </tr>

                        <tr>
                          <td colSpan={5}>
                            {/* Full Paid */}
                            {allPayments.some(payment => payment.payment_id == "oneTimePayment") || allPayments.reduce((a, b) => +a + +b.amount, 0) >= courseType.fee ? <img style={style.img} className={"img img-fluid"} src={"https://pp.netclipart.com/pp/s/246-2468310_paid-free-images-transparent-background-paid-stamp.png"}></img> : ""}

                            {allPayments[0].amount >= courseType.onetime_fee ? <img style={style.img} className={"img img-fluid"} src={"https://pp.netclipart.com/pp/s/246-2468310_paid-free-images-transparent-background-paid-stamp.png"}></img> : ""}
                          </td>
                        </tr>

                      </tbody>

                    </table> :
                      <div className={"alert alert-danger"}>Not any payment yet</div>}
                  </div>
                </div>
              </div>

              {/* <div className={"card mb-0 mt-2 border-0 rounded-0"}>
              <div className={"card-body pb-0 pt-2"}>
                <div>
                  <h3 className="text-info mt-2 mr-2 pb-2">All Payments </h3>

                </div>
              </div>
            </div> */}

            </div>

          </div>
          : (
            <div className={"bg-white p-3 text-center"}>
              <span
                className="spinner-border spinner-border-sm mr-1"
                role="status"
                aria-hidden="true"
              ></span>
              Loading..
            </div>
          )}

        {/* Row */}

        {/* End PAge Content */}

      </div>
    </div>
  );
}

export default Payment;
