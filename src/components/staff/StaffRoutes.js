import React, { createContext, useReducer, useContext, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom"
import LeftNavigation from "./LeftNavigation"
import TopNavigation from "./TopNavigation"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { initialState, staffReducer } from "../../reducer/StaffReducer"
import Profile from "./pages/Profile"
import PageNoteFound from "./pages/PageNotFound"
import Session from "./pages/Session"
import Standard from "./pages/Standard"
import Subject from "./pages/Subject"
import CourseType from "./pages/CourseType"
import Batch from "./pages/Batch"
import StudentRegistration from "./pages/StudentRegistration"
import TakePicture from "./pages/TakePicture"
import StudentInquiry from "./pages/StudentInquiry"
import Staff from "./pages/Staff"
import StaffRights from "./pages/StaffRights"
import LiveClass from "./pages/LiveClass"
import QuestionType from "./pages/QuestionType"
import Questions from "./pages/Questions"
import Chapter from "./pages/Chapter"
import OnlineTest from "./pages/OnlineTest"
import AddQuestionToOnlineTest from "./pages/AddQuestionToTest"
import Video from "./pages/Video"
import ChapterLayouts from "./pages/ChapterLayouts"
import FormulaCharts from "./pages/FormulaCharts"
import Assignments from "./pages/Assignments"
import OnlineTestDetails from "./pages/OnlineTestDetails"



// Create Context
export const StaffContext = createContext();

// Create Context
const Routing = () => {
  const history = useHistory()
  // STAFF Context
  const { state, dispatch } = useContext(StaffContext)
  useEffect(() => {
    const staff = JSON.parse(localStorage.getItem("staff"))
    if (staff) {
      dispatch({ type: "STAFF", payload: staff })
      // history.push("/")
    } else {
      history.push("/staff/login")
    }
  }, [])

  return (
    <Switch>
      <Route exact path="/staff" component={Dashboard} />
      <Route exact path="/staff/dashboard" component={Dashboard} />
      <Route exact path="/staff/login" component={Login} />
      <Route exact path="/staff/liveClassSetup" component={LiveClass} />
      <Route exact path="/staff/profile" component={Profile} />
      <Route exact path="/staff/session" component={Session} />
      <Route exact path="/staff/standard" component={Standard} />
      <Route exact path="/staff/subject" component={Subject} />
      <Route exact path="/staff/courseType" component={CourseType} />
      <Route exact path="/staff/questionType" component={QuestionType} />
      <Route exact path="/staff/questions" component={Questions} />
      <Route exact path="/staff/onlineTest" component={OnlineTest} />
      <Route exact path="/staff/onlineTestDetails/:testId" component={OnlineTestDetails} />
      <Route exact path="/staff/AddQuestionToOnlineTest" component={AddQuestionToOnlineTest} />
      <Route exact path="/staff/video" component={Video} />
      <Route exact path="/staff/chapter" component={Chapter} />
      <Route exact path="/staff/batch" component={Batch} />
      <Route exact path="/staff/studentRegistration" component={StudentRegistration} />
      <Route exact path="/staff/takePicture" component={TakePicture} />
      <Route exact path="/staff/studentInquiry" component={StudentInquiry} />
      <Route exact path="/staff/chapterLayouts" component={ChapterLayouts} />
      <Route exact path="/staff/formulaCharts" component={FormulaCharts} />
      <Route exact path="/staff/assignments" component={Assignments} />
      <Route exact path="/staff/staff" component={Staff} />
      <Route exact path="/staff/staffRights" component={StaffRights} />
      <Route exact path="/*" component={PageNoteFound} />
    </Switch>
  );
};


const StaffRoutes = () => {
  const [state, dispatch] = useReducer(staffReducer, initialState);
  return (
    <div id="main-wrapper">
      <StaffContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Router>
          <TopNavigation />
          <LeftNavigation />
          <Routing />
        </Router>
      </StaffContext.Provider>
    </div>
  );
};

export default StaffRoutes;
