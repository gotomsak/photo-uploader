import React from 'react'
import {GoogleLogin} from 'react-google-login'
import ReactDOM from 'react-dom'
//import Camera from '../components/camera'
//import useGoogleLogin from 'react-google-login'
// import '../index'
import * as client_data from '../assets/client_secret.json'
import * as api_key from '../assets/api_key.json'
import * as store from '../store'
import { createStore } from 'redux'
import { google } from 'googleapis'


interface googleOAuth2{
    client_id: string,
    client_secret: string,
    redirect_url: string
}

class LoginAuth extends React.Component<any,any,googleOAuth2>{
    constructor(
        props: any,
        public oauth2Data: googleOAuth2,
        public oauth2Client:any,
        public scopes: any,
        public url: any = "none"
    ) {
        super(props);
        this.oauth2Data = {
            client_id: client_data.web.client_id,
            client_secret: client_data.web.client_secret,
            redirect_url: 'https://localhost:3000'
        }
        
        this.scopes = [
            'https://www.googleapis.com/auth/drive'
        ]
        
        this.createUrl = this.createUrl.bind(this)
        this.OAuth2Init = this.OAuth2Init.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    public componentDidMount(){
        this.OAuth2Init()
    }
    public async OAuth2Init(){
        let res = await gapi.client.init({
            'apiKey': api_key.api_key,
            'clientId': client_data.web.client_id,
            'scope': this.scopes
        });
        console.log (res)
        // this.oauth2Client = new google.auth.OAuth2(
        //     this.oauth2Data.client_id,
        //     this.oauth2Data.client_secret,
        //     this.oauth2Data.redirect_url
        // ).generateAuthUrl({
        //     access_type: 'offline',
        //     scope: this.scopes
        // })
    }

    public createUrl(){
        
        // this.url = this.oauth2Client.generateAuthUrl({
            
        //     scope: this.scopes
        // })
        console.log(this.url)
        // return this.url
    }

    public render(){
        
        return(
            <div>
                

            </div>
        )
    }

    // async responseGoogle(response:any) {
    //     let res:any;
    //     console.log(response)
    //     console.log(client_data.web.client_id)
    //     let getAccessTokenStore = createStore(store.getAccessToken)
    //     getAccessTokenStore.subscribe(() => console.log(getAccessTokenStore.getState()))
        
    //     getAccessTokenStore.dispatch(
    //         {
    //             type: "LoginCheck",
    //             accessToken: (response.accessToken as string),
    //             googleId: (response.googleId as string),
    //             name: (response.profileObj.name as string),
    //             imageUrl: (response.profileObj.imageUrl as string)
    //         })

    //     res = await store.sendGoogleMessage({type: 'createCloudFolder', img: 'none'})
    //     console.log(res)
    // }
    // responseGoogleError(response:any){
    //     return 'loginできませんでした'
    // }
    // render(){
    //     return(
    //         <div>
    //             <GoogleLogin
    //                 clientId={ client_data.web.client_id }
    //                 buttonText="Login"
    //                 onSuccess={this.responseGoogle}
    //                 onFailure={this.responseGoogleError}
    //                 cookiePolicy={'single_host_origin'}
    //                 isSignedIn={true}
    //                 scope={"https://www.googleapis.com/auth/drive"}
    //             />
    //             <div>{this.responseGoogleError}</div>
    //         </div>
    //     )
    // }
}
//ReactDOM.render(<LoginAuth/>, document.getElementById('googleButton'))
export default LoginAuth



