import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
//import Camera from '../src/components/camera';
import LoginAuth from '../src/components/loginAuth'
//import '../src/components/loginAuth'
// import './store'
// import LogoutAuth from './components/logoutAuth';
// import GetCloud from './components/getCloudPhoto';


ReactDOM.render(
  <React.StrictMode>
    
    <LoginAuth/>
    {/* <LogoutAuth/>
    <Camera></Camera>
    <GetCloud></GetCloud> */}
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
