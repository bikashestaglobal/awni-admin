import React, { Fragment, createContext, useReducer, useContext, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import LeftNavigation from "./LeftNavigation"
import Branch from "./pages/Branch"
import TopNavigation from "./TopNavigation"
import Users from "./pages/Users"
import Login from "./pages/Login"
import { initialState, adminReducer } from "../../reducer/AdminReducer"
import Profile from "./pages/Profile"
import PageNoteFound from "./pages/PageNoteFound"

// Create Context
export const AdminContext = createContext();

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(AdminContext)
  useEffect(()=>{
    const admin = JSON.parse(localStorage.getItem("admin"))
    if(admin){
      dispatch({type: "ADMIN", payload: admin})
      // history.push("/")
    }else{
      history.push("/admin/login")
    }
  },[])
  return (
    <Switch>
      <Route exact path="/admin" component={Dashboard} />
      <Route exact path="/admin/login" component={Login} />
      <Route exact path="/admin/branch" component={Branch} />
      <Route exact path="/admin/users" component={Users} />
      <Route exact path={"/admin/profile"} component={Profile}/>
      <Route exact path={"*"} component={PageNoteFound}/>
    </Switch>
  );
};


const Admin = () => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <div id="main-wrapper">
      <AdminContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Router>
          <TopNavigation />

          <LeftNavigation />
          <Routing />
        </Router>
      </AdminContext.Provider>
    </div>
  );
};

export default Admin;
