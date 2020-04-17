import { createStore } from 'redux'
import * as api_key from './assets/api_key.json'
import axios, { AxiosInstance } from 'axios'
import { google } from 'googleapis'
import qs from 'qs'
import * as client_data from './assets/client_secret.json'
import React from 'react'
import { Link } from 'react-router-dom'


interface ImageState{
    img_src: string
}
interface DriveFilesID{
    img: string,
    folder: string
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
interface Tokens{
    accessToken: string
}
interface googleOAuth2{
    client_id: string,
    client_secret: string,
    redirect_url: string,
    scopes: any
}

export let TokensData: Tokens = {
    accessToken: 'None'
}

export const apiKey = api_key.api_key

export let GoogleUserInfoInit: GoogleUserInfo = {
    type: 'None',
    accessToken:'None',
    googleId:'None',
    name:'None',
    imageUrl:'None'
}
export let driveFilesID: DriveFilesID = {
    img: 'None',
    folder: 'None'
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

