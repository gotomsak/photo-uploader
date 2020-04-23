import React, { VideoHTMLAttributes } from 'react'
import Webcam from 'react-webcam'
import * as store from '../store'
import * as base64 from 'urlsafe-base64'
import './camera.css'
import EventListener from 'react-event-listener'
class Camera extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.render = this.render.bind(this)
        this.state={
            sendPicture:false
        }
    }

    public videoConstraints =  {
        facingMode: "environment",
    }
    public windowSize = {
        width: window.innerWidth,
        height: window.innerHeight - 70
    }

    public handleResize = () => {
        // console.info(
        //   `window height:width=${window.innerHeight}:${window.innerWidth}`,
        // );
        this.windowSize.width = window.innerWidth
        this.windowSize.height = window.innerHeight
    };
    
    public capture = () => {
        this.setState({sendPicture: true})
        const screenshot = (this.refs.webcam as Webcam).getScreenshot();
        console.log(screenshot)
        if (screenshot){
            store.ImageStateInit.img_src = screenshot
        }
        let b64img: any = screenshot?.split(',')[1]
        let imgName
            = store.nowTime.year + "_"
            + store.nowTime.month + "_"
            + store.nowTime.date + " "
            + store.nowTime.hour + ":"
            + store.nowTime.minute + ":"
            + store.nowTime.second
        this.sendBlobFile(b64img,imgName)
    }
    sendBlobFile(b64img: any, imgName: string){
        console.log(store.driveFilesID.folder)
        let parents: string[] = [store.driveFilesID.folder]
        let metadata: any = {"name":imgName,"parents": parents}
        let body = '--foo_bar_baz\n'+
                'Content-Type: application/json; charset=UTF-8\n\n'+
                JSON.stringify(metadata) + '\n\n' +
                '--foo_bar_baz\n'+
                'Content-Transfer-Encoding: base64\n'+
                'Content-Type: image/jpeg\n\n'+
                b64img+'\n--foo_bar_baz--'
        let body_length = body.length.toString()
        console.log(store.TokensData.accessToken)
        console.log(b64img)
        return fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/related; boundary=foo_bar_baz',
                'Content-Length': body_length,
                'Authorization': 'Bearer ' + store.TokensData.accessToken
            },
            body: body
        }).then((response: any)=>{
            console.log(response)
            this.setState({sendPicture:false})
        })
    }

    render(){
        // let cameraID = document.getElementById('camera')
        // console.log(cameraID?.style.backgroundColor)
        return (

            <div id='camera'>
                <EventListener target='window' onResize={this.handleResize}></EventListener>
                <Webcam
                    videoConstraints={this.videoConstraints}
                    ref={"webcam"}
                    screenshotFormat="image/jpeg"
                    audio={false}
                    height={this.windowSize.height}
                    width={this.windowSize.width}
                />
                <div id='capture-btn-par'>
                    {this.state.sendPicture
                        ? <h1 id='img-sending'>sending</h1>
                        :<button onClick={this.capture} id="capture-btn"></button>
                    }
                </div>
                
            </div>
        );
    }
}
export default Camera