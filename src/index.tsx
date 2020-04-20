import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Switch, Redirect } from 'react-router';
import { BrowserRouter, Route } from "react-router-dom";
import  SignIn  from './pages/signIn'
import TakePicture from './pages/takePicture';
import * as store from './store'
import * as dateTimeFunc from './utils/dateTimeFunc'
import CloudFileView from './pages/cloudFileView';

dateTimeFunc.nowTimeUpdate()
setInterval(dateTimeFunc.nowTimeUpdate, 1000)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TakePicture}>
          {/* {
            store.GoogleUserInfoInit.accessToken === 'None'?
            <Redirect to="/signin" />: <SignIn />
          } */}
        </Route>
        {/* <Route path="/code/:code" component={TakePicture}
          // render={({match})=>(
          //   <Redirect to={'/'}/>
          // )}
        >
        </Route> */}
        <Route exact path="/cloudlist" component={CloudFileView}></Route>
        <Route exact path="/signin" component={SignIn}>
          {/* {store.GoogleUserInfoInit.accessToken !== 'None'?
          <Redirect to="/" />: <TakePicture />} */}
        </Route>
        
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
