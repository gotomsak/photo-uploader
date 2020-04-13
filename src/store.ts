import { createStore } from 'redux'
import * as api_key from './assets/api_key.json'
import axios, { AxiosInstance } from 'axios'
import { google } from 'googleapis'
import qs from 'qs'
import * as client_data from './assets/client_secret.json'
import React from 'react'
import { Link } from 'react-router-dom'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

interface ImageState{
    img_src: string
}

interface GoogleUserInfo {
    type: string,
    accessToken: string,
    googleId: string,
    name: string,
    imageUrl: string
}

export interface SendGoogleMessage {
    type: string,
    img: any
}
// let sendGoogleMessageInit: SendGoogleMessage = {
//     type: 'None',
//     img: 'None'
// }

interface googleOAuth2{
    client_id: string,
    client_secret: string,
    redirect_url: string,
    scopes: any
}

// export let oauth2Data:googleOAuth2 = {
//     client_id: client_data.web.client_id,
//     client_secret: client_data.web.client_secret,
//     redirect_url: 'https://localhost:3000'
// }

export const apiKey = api_key.api_key

export let GoogleUserInfoInit: GoogleUserInfo = {
    type: 'None',
    accessToken:'None',
    googleId:'None',
    name:'None',
    imageUrl:'None'
}

export let ImageStateInit: ImageState = {
    img_src: ''
}

export let oauth2Data: googleOAuth2 = {
    client_id: client_data.web.client_id,
    client_secret: client_data.web.client_secret,
    redirect_url: 'https://localhost:3000',
    scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.metadata',
        // 'https://www.googleapis.com/auth/drive.metadata.readonly',
        // 'https://www.googleapis.com/auth/drive.photos.readonly',
        // 'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/drive.scripts'
    ]
}

export let oAuth2Client: any = new google.auth.OAuth2(
    oauth2Data.client_id,
    oauth2Data.client_secret,
    oauth2Data.redirect_url
)

export let drive:any = google.drive({version: 'v3', auth: oAuth2Client})

// class GoogleApi {
//     public oauth2Data: googleOAuth2 = {
//         client_id: client_data.web.client_id,
//         client_secret: client_data.web.client_secret,
//         redirect_url: 'https://localhost:3000'
//     }
//     public oAuth2Client:any = new google.auth.OAuth2(
//         this.oauth2Data.client_id,
//         this.oauth2Data.client_secret,
//         this.oauth2Data.redirect_url
//     )
//     public drive: any = 'none';
//     public scopes: any = [
//         'https://www.googleapis.com/auth/drive',
//         'https://www.googleapis.com/auth/drive.appdata',
//         'https://www.googleapis.com/auth/drive.file',
//         'https://www.googleapis.com/auth/drive.metadata',
//         // 'https://www.googleapis.com/auth/drive.metadata.readonly',
//         // 'https://www.googleapis.com/auth/drive.photos.readonly',
//         // 'https://www.googleapis.com/auth/drive.readonly',
//         'https://www.googleapis.com/auth/drive.scripts'

//     ]
//     public url: any = "none"

//     public async OAuth2Init(){
//         let res = await this.oAuth2Client.generateAuthUrl({
//             // 'online' (default) or 'offline' (gets refresh_token)
//             access_type: 'offline',
//             // If you only need one scope you can pass it as a string
//             scope: this.scopes,
//             prompt: 'consent'
//         });
//         return res
//     }
//     public async getAToken(code:string){
//         console.log(code)
//         await this.oAuth2Client.getToken(code,(err:any,token:any)=>{
//             if (err){
//                 console.log(err)
//                 return(<Link to='signin'><button>signinに戻る</button></Link>)
//             }
//             // if (err) return console.error(err)
//             this.oAuth2Client.setCredentials(token);
//         })
//         // return res
//         // let tokens = await this.oAuth2Client.getToken(code)
//         // if (undefined===tokens){
//         //     console.log("error")
//         //     return tokens
//         // }
//         // this.oAuth2Client.setCredentials(tokens);
//         // return tokens
//         // this.oAuth2Client.setCredentials(tokens.tokens);
//         // console.log(tokens)
//         // // this.oAuth2Client.on('tokens', (tokens))
//         // // this.checkToken()
//         // return tokens
//     }
//     public checkToken(){
//         console.log('checkToken')
//         this.oAuth2Client.on('tokens',(tokens: any)=>{
//             console.log(tokens)
//             if(tokens.refresh_token){
//                 console.log(tokens.refresh_token)
//             }
//             console.log(tokens.access_token)
//         })
//     }

//     public async getFilesList(){
//         this.drive = google.drive({version: 'v3', auth: this.oAuth2Client})
//         let res = await this.drive.files.list({
//             pageSize: 10,
//             files: 'nextPageToken, files(id, name)'
//         })
//         return res
//     }
// }

// export let googleApi = new GoogleApi()

// export function getAccessToken(state = GoogleUserInfoInit, action:any){
//     if(action.accessToken === ''){
//         window.alert("error")
//         return state
//     }else{
//         state.type = action.type
//         state.accessToken = action.accessToken
//         state.googleId = action.googleId
//         state.name = action.name
//         state.imageUrl = action.imageUrl
//         return state
//     }
// }

// export async function sendGoogleMessage(state = sendGoogleMessageInit){
//     let res: any;
//     const instance:AxiosInstance = axios.create({
//         baseURL: 'https://www.googleapis.com',
//         headers: {
//             'Authorization' :  'Bearer ' + (GoogleUserInfoInit.accessToken as string),
//             'Accept': 'application/json',
//             // 'Content-Type': 'application/json; charset=UTF-8'
//         }
//     })

//     if (state.type === 'getCloudPhoto'){
//         res = await instance.get(
//             '/drive/v3/files?key=' + (apiKey as string),
//             {
//                 params: {
//                     pageSize: 100
//                 }
//             }
//         )
//         return res.data.files
//     }

//     if (state.type === 'createCloudFolder'){
//         res = await instance.post(
//             '/drive/v3/files?key=' + (apiKey as string),
//             {
//                 mimeType: 'application/vnd.google-apps.folder',
//                 name: 'photo-uploader'
//             }
//         )
//         return res
//     }

//     if (state.type === 'uploadFile'){
//         let data = new FormData()
//         data.append('photo',state.img,'image.jpg')
//         console.log(state.img)        
//         // instance.defaults.headers.common['Content-Type'] = 'multipart/related; boundary=image_bar'
//         instance.defaults.headers.common['Content-Type'] = 'image/jpeg'
//         // instance.defaults.headers.common['Content-Length'] = state.img.length
//         res = await instance.post(
//             // '/upload/drive/v3/files?uploadType=multipart',
//             '/upload/drive/v3/files?uploadType=media',
//             state.img,{params: {mimeType: 'image/jpeg'}}
//             // {
//             //     resource: {'name':'testPhoto.jpg'},
//             //     media:{
//             //         mimeType: 'image/jpeg',
//             //         body: state.img
//             //     },   
//             //     // fields: 'id'
//             // }
            
//         )
//         console.log(res)
//     }
//     if (state.type === 'getAppFolder'){
//         res = await instance.get(
//             '/drive/v3/files', (qs.stringify({mimeType: 'application/vnd.google-apps.folder'}) as any)
//         )
//         return res

//     }
// }




// let getAccessTokenStore = createStore(getAccessToken)


// getAccessTokenStore.subscribe(() => console.log(getAccessTokenStore.getState()))

// interface action { 
//     type: string 
// }



// function counter(state = 0, action: action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     default:
//       return state
//   }
// }

// // Create a Redux store holding the state of your app.
// // Its API is { subscribe, dispatch, getState }.
// let store = createStore(counter)

// // You can use subscribe() to update the UI in response to state changes.
// // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// // However it can also be handy to persist the current state in the localStorage.

// let action: action = {type: 'INCREMENT'}

// store.subscribe(() => console.log(store.getState()))

// // The only way to mutate the internal state is to dispatch an action.
// // The actions can be serialized, logged or stored and later replayed.
// store.dispatch(action)
// // 1
// store.dispatch({ type: 'INCREMENT' })
// // 2
// store.dispatch({ type: 'DECREMENT' })
// // 1