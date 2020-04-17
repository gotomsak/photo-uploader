import React from 'react'
import ReactDOM from 'react-dom'
import Camera from '../components/camera'
import * as store from '../store'
import { withRouter, Link } from 'react-router-dom';
import { sourcerepo } from 'googleapis/build/src/apis/sourcerepo';


class TakePicture extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.render = this.render.bind(this)
        this.fileListViewTransition = this.fileListViewTransition.bind(this)
        this.createFolder = this.createFolder.bind(this)
        this.state = {
            res: false
        }
    }
    componentDidMount(){
        this.codeCheck()
    }
    errGetToken(err: any){
        console.log(err)
        this.setState({res: false})
    }

    createFolder(){
        store.drive.files.create({
            resource: {
                name: 'photo-uploader',
                mimeType: 'application/vnd.google-apps.folder'
            },
            fields: 'id'
        }, (err: any, file: any) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Folder Id: ', file.data.id);
            }
        });
    }

    checkFolder(){
        store.drive.files.list({
            q: "name='photo-uploader'",
            fields: 'nextPageToken, files(id, name)',
        }, (err:any, res:any) => {
            if (err) {
                console.error(err);
            } else {
                console.log(res)
                if(res.data.files.length === 0){
                    this.createFolder()
                }
                store.driveFilesID.folder = res.data.files[0].id
            }
        });
        
    }
    async tokenCheck(){
        let res = await store.oAuth2Client.getAccessToken()
        store.TokensData.accessToken = res.token
        console.log(res)
    }

    codeCheck(){
        console.log(this.props)
        let code:string = this.props.location.search
        code = code.replace('?code=','')
        store.oAuth2Client.getToken(code, (err:any,token:any)=>{
            if (err){
                this.setState({res: false})
                return console.log(err)
            }
            store.oAuth2Client.setCredentials(token);
            this.tokenCheck()
            this.checkFolder()
            this.setState({res: true})
        })
    }
    public fileListViewTransition(){
        this.props.history.push({
            pathname: '/cloudfile'
        })
    }

    
    render(){
        return(
            <div>
                {this.state.res
                ?<div><Camera></Camera> <Link to='cloudlist'><button>cloudFileView</button></Link></div>
                :<Link to='signin'><button> signinに戻る </button></Link>
                }
                {/* <button onClick={this.fileListViewTransition}>viewCloudFile</button> */}

            </div>
        )
    }
}

export default withRouter(TakePicture)