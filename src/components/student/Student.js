import React, { Fragment, createContext, useReducer, useContext, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import LeftNavigation from "./LeftNavigation"
import TopNavigation from "./TopNavigation"
import Users from "./pages/Users"
import Login from "./pages/Login"
import { initialState, studentReducer } from "../../reducer/StudentReducer"
import Profile from "./pages/Profile"
import PageNoteFound from "./pages/PageNoteFound"
import SelectSession from "./pages/SelectSession"
import Payment from "./pages/Payment"
import ChangePassword from "./pages/ChangePassword"
import ForgotPassword from "./pages/ForgotPassword"
import Videos from "./pages/Videos"
import OnlineTest from "./pages/OnlineTest"
import Assignments from "./pages/Assignments"
import ChapterLayout from "./pages/ChapterLayout"
import FormulaCharts from "./pages/FormulaCharts"
import LiveClass from "./pages/LiveClass";
import EnterOTP from "./pages/EnterOTP"
import CreateNewPassword from "./pages/CreateNewPassword"
import SuccessPayment from "./pages/SuccessPayment"
import StartOnlineTest from "./pages/StartOnlineTest"
import Result from "./pages/Result"
import PlayVideo from "./pages/PlayVideo"

// Create Context
export const StudentContext = createContext();

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(StudentContext)
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"))
    if (student) {
      dispatch({ type: "STUDENT", payload: student })
      // history.push("/")
    } else {
      window.location = '/studentLogin';
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/student" component={Dashboard} />
      <Route exact path="/student/login" component={Login} />
      <Route exact path="/student/selectSession" component={SelectSession} />
      <Route exact path="/admin/users" component={Users} />
      <Route exact path={"/student/profile"} component={Profile} />
      <Route exact path={"/student/videos/:type"} component={Videos} />
      <Route exact path={"/student/playVideo"} component={PlayVideo} />
      <Route exact path={"/student/onlineTest"} component={OnlineTest} />
      <Route exact path={"/student/startOnlineTest/:testId"} component={StartOnlineTest} />
      <Route exact path={"/student/result/:testId"} component={Result} />
      <Route exact path={"/student/assignments"} component={Assignments} />
      <Route exact path={"/student/chapterLayouts"} component={ChapterLayout} />
      <Route exact path={"/student/FormulaCharts"} component={FormulaCharts} />
      <Route exact path={"/student/payment"} component={Payment} />
      <Route exact path={"/student/payment-success/:razorpay_payment_id/:amount/:paymentId"} component={SuccessPayment} />
      <Route exact path={"/student/change-password"} component={ChangePassword} />
      <Route exact path={"/student/forgotPassword"} component={ForgotPassword} />
      <Route exact path={"/student/createNewPassword"} component={CreateNewPassword} />
      <Route exact path={"/student/enterOTP"} component={EnterOTP} />
      <Route exact path={"/student/liveClass"} component={LiveClass} />
      <Route exact path={"*"} component={PageNoteFound} />
    </Switch>
  );
};


const Student = () => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  return (
    <div id="main-wrapper">
      <StudentContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Router>
          <TopNavigation />

          <LeftNavigation />
          <Routing />
        </Router>
      </StudentContext.Provider>
    </div>
  );
};

export default Student;
