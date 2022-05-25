import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import StudentCreateNewPassword from "./pages/StudentCreateNewPassword";
import StudentEnterOTP from "./pages/StudentEnterOTP";
import StudentEnterRegistrationOTP from "./pages/StudentEnterRegistrationOTP";
import StudentForgotPassword from "./pages/StudentForgotPassword";
import StudentLogin from "./pages/StudentLogin";
import StudentRegistration from "./pages/StudentRegistration";
import TermsCondition from "./pages/TermsCondition";

const Routing = () => {
  const history = useHistory();

  return (
    <Switch>
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/studentLogin" component={StudentLogin} />
      <Route
        exact
        path="/studentForgotPassword"
        component={StudentForgotPassword}
      />
      <Route exact path="/studentEnterOTP" component={StudentEnterOTP} />
      <Route exact path="/terms-condition" component={TermsCondition} />
      <Route exact path="/contact-us" component={Contact} />
      <Route exact path="/about-us" component={About} />
      <Route
        exact
        path="/studentCreateNewPassword"
        component={StudentCreateNewPassword}
      />
      <Route
        exact
        path="/studentRegistration"
        component={StudentRegistration}
      />
      <Route
        exact
        path="/studentEnterRegistrationOTP"
        component={StudentEnterRegistrationOTP}
      />
      <Route exact path="/" component={Index} />
    </Switch>
  );
};

const Website = () => {
  return (
    <div id="wrapper" style={{ padding: "0px", margin: "0px" }}>
      <Router>
        <Routing />
      </Router>
    </div>
  );
};

export default Website;
