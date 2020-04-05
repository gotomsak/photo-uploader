import React from 'react'
import {GoogleLogin} from 'react-google-login'
import ReactDOM from 'react-dom'
import Camera from '../components/camera'
import useGoogleLogin from 'react-google-login'
// import '../index'
import * as client_data from '../assets/client_secret.json'
import * as store from '../store'
import { createStore } from 'redux'

class LoginAuth extends React.Component{
    
    async responseGoogle(response:any) {
        let res:any;
        console.log(response)
        console.log(client_data.web.client_id)
        let getAccessTokenStore = createStore(store.getAccessToken)
        getAccessTokenStore.subscribe(() => console.log(getAccessTokenStore.getState()))
        
        getAccessTokenStore.dispatch(
            {
                type: "LoginCheck",
                accessToken: (response.accessToken as string),
                googleId: (response.googleId as string),
                name: (response.profileObj.name as string),
                imageUrl: (response.profileObj.imageUrl as string)
            })

        res = await store.sendGoogleMessage({type: 'createCloudFolder', img: 'none'})
        console.log(res)
    }
    responseGoogleError(response:any){
        return 'loginできませんでした'
    }
    render(){
        return(
            <div>
                <GoogleLogin
                    clientId={ client_data.web.client_id }
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogleError}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    scope={"https://www.googleapis.com/auth/drive"}
                />
                <div>{this.responseGoogleError}</div>
            </div>
        )
    }
}
//ReactDOM.render(<LoginAuth/>, document.getElementById('googleButton'))
export default LoginAuth



