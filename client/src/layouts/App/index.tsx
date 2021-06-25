import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from "react-router-dom";

const LogIn = loadable(() => import('../../pages/LogIn'));
const SignUp = loadable(() => import('../../pages/SignUp'));
const Diary = loadable(() => import('../../pages/Diary'))

const App = () => {
  return (
  <Switch>
    <Redirect exact path="/" to="/login"></Redirect>
    <Route path="/login" component={LogIn}></Route>
    <Route path="/signup" component={SignUp}></Route>
    <Route path="/diary" component={Diary}></Route>
  </Switch>
  )
  
};

export default App;