import React from "react";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import { CoverSidebar } from "./styles";
import Navbar from "../Navbar";

const LogIn = loadable(() => import("../../pages/LogIn"));
const SignUp = loadable(() => import("../../pages/SignUp"));
const Calendar = loadable(() => import("../../pages/Calendar"));
const MapView = loadable(() => import("../../pages/MapView"));
const Diary = loadable(() => import("../../pages/Diary"));
const ViewDiary = loadable(() => import("../../pages/ViewDiary"));
const Mainpage = loadable(() => import("../../pages/Mainpage"));
const UpdateDiary = loadable(() => import("../../pages/UpdateDiary"));
const SearchPage = loadable(() => import("../../pages/SearchPage"));

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <div>
        <Sidebar />
        <Navbar />
        <CoverSidebar>
          <Route exact path="/" component={Mainpage} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/diary" component={Diary} />
          <Route exact path="/mapview" component={MapView} />
          <Route exact path="/viewdiary/:diaryid" component={ViewDiary} />
          <Route exact path="/updatediary/:diaryid" component={UpdateDiary} />
          <Route exact path="/search/:searchtext" component={SearchPage} />
        </CoverSidebar>
      </div>
    </Switch>
  );
};

export default App;
