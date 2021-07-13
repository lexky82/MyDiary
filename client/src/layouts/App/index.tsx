import React from "react";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import { CoverSidebar } from "./styles";

const LogIn = loadable(() => import("../../pages/LogIn"));
const SignUp = loadable(() => import("../../pages/SignUp"));
const Calendar = loadable(() => import("../../pages/Calendar"));
const MapView = loadable(() => import("../../pages/MapView"));
const Diary = loadable(() => import("../../pages/Diary"));
const Mainpage = loadable(() => import("../../pages/Mainpage"));

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <div>
        <Sidebar />
        <CoverSidebar>
          <Route exact path="/" component={Mainpage} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/diary" component={Diary} />
          <Route exact path="/mapview" component={MapView}  />
        </CoverSidebar>
      </div>
    </Switch>
  );
};

export default App;
