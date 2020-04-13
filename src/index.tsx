import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Camera from '../src/components/camera';
import LoginAuth from '../src/components/loginAuth'
//import '../src/components/loginAuth'
import './store'
import LogoutAuth from './components/logoutAuth';

import GoogleApiTest from './components/googleApiTest'
// react-native
// import { NativeRouter, Switch } from "react-router-native";
import { Switch, Redirect } from 'react-router';
// react-dom (what we'll use here)
import { BrowserRouter, Route } from "react-router-dom";
import  SignIn  from './pages/signIn'
import GetCloudPhoto from './components/getCloudPhoto';
import TakePicture from './pages/takePicture';
import * as store from './store'
import CloudFileView from './pages/cloudFileView';

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
