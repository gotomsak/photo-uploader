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
import * as token from '../assets/access_token.json'
import SignIn from '../pages/signIn'

interface googleOAuth2{
    client_id: string,
    client_secret: string,
    redirect_url: string
}

class GoogleApiTest extends React.Component<any,any,googleOAuth2>{
    constructor(
        props: any,
        public oauth2Data: googleOAuth2,
        public oAuth2Client:any,
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
        this.state = {
            url: 'none'
         }
    }
    public componentDidMount(){
        this.authorize()
    }
    public authorize(){
        this.oAuth2Client = new google.auth.OAuth2(
            // 'apiKey': api_key.api_key,
            this.oauth2Data.client_id,
            this.oauth2Data.client_secret,
            this.oauth2Data.redirect_url
            // 'scope': this.scopes
        )
        this.OAuth2Init()

    }
    public async OAuth2Init(){
        
        let res = this.oAuth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
            // If you only need one scope you can pass it as a string
            scope: this.scopes
        });
        
        // const rl = readline.createInterface({
        //     input: process.stdin,
        //     output: process.stdout,
        // });
        let token= 'none'
        console.log(process.stdin)
        // this.oAuth2Client()
        // rl.question('Enter the code from that page here: ', (code)=>{
        //     // rl.close
        //     token = this.oAuth2Client.getToken(code)
        //     callback(this.oAuth2Client)
        // })
        console.log(token)
        this.setState ({url: res})
        // console.log (res)
        return res
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
                <a href={this.state.url}>login</a>
                
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
export default GoogleApiTest