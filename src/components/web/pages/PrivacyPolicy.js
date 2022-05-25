import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import Config from "../../config/Config"

function PrivacyPolicy() {
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
              <span className="pl-3">PRIVACY POLICY</span>
            </button>
          </div>
        </div>
      </div>
      <div className={"row"}>
        <div className={"col-md-12 mt-3"}>
          <h4> <span style={{ fontWeight: "bold" }}> Privacy Policy </span> </h4>
          <div className="devider mb-2"></div>
          <h5 style={{ fontWeight: "bold" }}> You certainly understand and concur that:</h5>
          <p style={{ fontSize: "14px" }}><span style={{ fontWeight: "bold" }}>Vijay Physics</span> has created this privacy policy in order to demonstrate own organization commitment to privacy. Throughout the cyberspace we want to contribute towards providing a safe and secure environment, safe information gathering and dissemination practices for all our sites. This policy applies to http://3.15.226.139/
            (“Website”) and mobile application Vijay Physics app related to  Vijay Physics brand but not to any other companies or organizations' websites or mobile applications to which we link.
          </p>
          <h4> <span style={{ fontWeight: "bold" }}> Information Gathering And Usage </span> </h4>
          <h5> <span style={{ fontWeight: "bold" }}>1. Registration / Information</span> </h5>

          <p style={{ fontSize: "14px" }}>
            When you sign up/register with Website or App we ask you for personal information. We may combine the information you submit under your account with information from other services / third parties in order to provide you with a better experience and to improve the quality of our services. For certain services, we may give you the opportunity to opt out of combining such information.
          </p>
          <p style={{ fontSize: "14px" }}>
            You may provide us with certain information such as your Name, E-mail, Mobile when registering for certain services such as Online Registration Contests. This information will primarily be used for the purpose of providing personalisation and verification.
          </p>

          <h5> <span style={{ fontWeight: "bold" }}>2. Cookies</span> </h5>
          <p style={{ fontSize: "14px" }}>
            A cookie is a small data file that Websites or App write to your hard drive when you visit them. A cookie file can contain information such as a user ID that the site uses to track the pages you have visited. A cookie can contain information you supply yourself. A cookie can't read data of your hard disk or read cookie files created by other sites. Our Website/App uses cookies to track user traffic patterns and for the personalisation feature.
          </p>

          <h5> <span style={{ fontWeight: "bold" }}>3. User communications</span> </h5>
          <p style={{ fontSize: "14px" }}>
            When you send email or other communications to our Website or App , we may retain those communications in order to process your inquiries, respond to your requests and improve our services. When you send and receive SMS messages to or from one of our services
            that provides SMS functionality, we may collect and maintain information associated with those messages, such as the phone number, the content of the message, and the date and time of the transaction. We may use your email address to communicate with you about our services.
          </p>

          <h5> <span style={{ fontWeight: "bold" }}>4. Log information</span> </h5>
          <p style={{ fontSize: "14px" }}>
            When you access our Website or App services via a browser or, mobile application or other client, our servers automatically record certain information. These server logs may include information such as your web request, your interaction with a service, Internet Protocol address, browser type, browser language, the date and time of your request and one or more cookies that may uniquely identify your browser or your account.
          </p>

          <h5> <span style={{ fontWeight: "bold" }}>5. Confidential</span> </h5>
          <p style={{ fontSize: "14px" }}>
            Vijay Physics Privacy Policy applies to its Website and App. Vijay Physics do not exercise control over the sites displayed as search results, sites that include other applications, products or services, or links from within our various services. Personal information that you provide to other sites may be sent to our Website and/or App in order to deliver the service. We process such information under this Privacy Policy.
          </p>

          <h5> <span style={{ fontWeight: "bold" }}>6. Feedback </span> </h5>
          <p style={{ fontSize: "14px" }}>
            Vijay Physics's Feedback Form requires personal information of users like contact number, name and e-mail address and demographic information like their pin code, age etc. for any feedback by the users pertaining to the services rendered by Vijay Physics.
          </p>

          <h5> <span style={{ fontWeight: "bold" }}>7. Queries regarding the Website or APP </span> </h5>
          <p style={{ fontSize: "14px" }}>
            If you have any query regarding this Privacy Policy, you may contact at vijayprsad@gmail.com
          </p>

        </div>
      </div>
    </div>

  );
}
export default PrivacyPolicy;
