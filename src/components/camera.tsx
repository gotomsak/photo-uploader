import React, { VideoHTMLAttributes } from 'react'
import Webcam from 'react-webcam'
import * as store from '../store'
import * as base64 from 'urlsafe-base64'

class Camera extends React.Component{
    
    public videoConstraints =  {
        facingMode: "user"
    }
    public capture = () => {
        const screenshot = (this.refs.webcam as Webcam).getScreenshot();
        console.log(screenshot)
        if (screenshot){
            store.ImageStateInit.img_src = screenshot
        }
        let b64img: any = screenshot?.split(',')[1]
        let img = base64.decode(b64img);
        let blob = new Blob([img],{type: 'image/jpeg'})

        store.sendGoogleMessage({type: 'uploadFile', img: blob})
    }

    render(){
        
        return (
    
            <div>
                <Webcam
                    videoConstraints={this.videoConstraints}
                    ref={"webcam"}
                    screenshotFormat="image/jpeg"
                    audio={false}
                    height={720}
                    width={1280}
                />
                <button onClick={this.capture}>Capture photo</button>
            </div>
        );
    }
}
export default Camera