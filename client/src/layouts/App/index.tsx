import React from "react";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import { CoverSidebar } from "./styles";

const LogIn = loadable(() => import("../../pages/LogIn"));
const SignUp = loadable(() => import("../../pages/SignUp"));
const Calendar = loadable(() => import("../../pages/Calendar"));
const Diary = loadable(() => import("../../pages/Diary"));
const Mainpage = loadable(() => import("../../pages/Mainpage"));

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LogIn}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <div>
        <Sidebar />
        <CoverSidebar>
          <Route exact path="/" component={Mainpage}></Route>
          <Route exact path="/calendar" component={Calendar}></Route>
          <Route exact path="/diary" component={Diary}></Route>
        </CoverSidebar>
      </div>
    </Switch>
  );
};

export default App;
