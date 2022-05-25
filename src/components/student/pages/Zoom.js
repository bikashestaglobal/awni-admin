// import "./Zoom.css";
import { ZoomMtg } from "@zoomus/websdk";
import React, { useEffect } from "react";
import M from "materialize-css";

const crypto = require("crypto"); // crypto comes with Node.js

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  return new Promise((res, rej) => {
    // Prevent time sync issue between client signature generation and zoom
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
      "base64"
    );
    const hash = crypto
      .createHmac("sha256", apiSecret)
      .update(msg)
      .digest("base64");
    const signature = Buffer.from(
      `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString("base64");

    res(signature);
  });
}

var apiKey = "CowC_petSSCHNyuvdiO3Ew";
var apiSecret = "1nW8MBlbBkBY1GWFGLmapdKhmUxJyIXPTH7g";
var meetingNumber = 75421943398;
var leaveUrl = "http://localhost:3000/student/live-class"; // our redirect url
var userName = "Vijay Prasad Pal";
var userEmail = "test@gmail.com";
var passWord = "dTE3Nm5HQjhRVU9XMW4vT3FKeXhvUT09";

var signature = "";
generateSignature(apiKey, apiSecret, meetingNumber, 0).then((res) => {
  signature = res;
}); // need to generate based on meeting id - using - role by default 0 = javascript

const Zoom = () => {
  // loading zoom libraries before joining on component did mount
  useEffect(() => {
    showZoomDIv();
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initiateMeeting();
  }, []);

  const showZoomDIv = () => {
    document.getElementById("zmmtg-root").style.display = "block";
  };

  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            if(error.status === false){
                M.toast({ html: "Live Class is Not Started Yet....", classes: "bg-danger" });
                alert("Live Class is Not Started Yet....");
            }
            console.log("Error", error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return <span></span>;
};

export default Zoom;