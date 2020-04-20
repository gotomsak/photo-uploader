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
            res: false,
            time: (store.nowTime.year + "_"
                    + store.nowTime.month + "_" + store.nowTime.date).toString(),
            rootDir: 'None',
            subDir: 'None'
        }
    }

    componentDidMount(){
        this.codeCheck()
    }

    componentDidUpdate(prevProps:any, prevState:any){
        if(this.state.res === true && prevState.res !== this.state.res ){
            this.checkFolder('photo-uploader', [])
        }
        if(this.state.rootDir !== 'None' && prevState.rootDir !== this.state.rootDir){
            store.driveFilesID.folder = this.state.rootDir
            let parents: string[] = [store.driveFilesID.folder]
            this.checkFolder(this.state.time, parents)
        }
        if(this.state.subDir !== 'None' && prevState.subDir !== this.state.subDir){
            store.driveFilesID.folder = this.state.subDir
        }
    }

    createFolder(folderName: any, parents: any){
        store.drive.files.create({
            resource: {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder',
                parents: parents
            },
            fields: 'id'
        }, (err: any, file: any) => {
            if (err) {
                console.error(err);
            } else {
                if(folderName === 'photo-uploader'){
                    this.setState({rootDir: file.data.id})
                }else{
                    this.setState({subDir: file.data.id})
                }
            }
        });
    }

    checkFolder(folderName: string, parents: any){
        store.drive.files.list({
            q: "name='" + folderName + "'",
            fileds:'nextPageToken, files(id, name)',
            parents: parents
        },(err:any,res:any) => {
            if(err){
                console.error(err);
            } else {
                if(folderName==='photo-uploader'){
                    if(res.data.files.length === 0){
                        this.createFolder(folderName, parents)
                    }else{
                        this.setState({rootDir: res.data.files[0].id})
                    }
                }else{
                    if(res.data.files.length === 0){
                        this.createFolder(folderName, parents)
                    }else{
                        this.setState({subDir: res.data.files[0].id})
                    }
                }
            }
        })
    }

    codeCheck(){
        console.log(this.props)
        let code:string = this.props.location.search
        code = code.replace('?code=','')
        store.oAuth2Client.getToken(code, (err:any,token:any)=>{
            if (err){
                this.setState({res: false})
                console.log(err)
            }
            store.oAuth2Client.setCredentials(token);
            if (token !== null){
                store.TokensData.accessToken = token.access_token
                this.setState({res: true})
            }
        })
    }

    public fileListViewTransition(){
        this.props.history.push({
            pathname: '/cloudfile'
        })
        console.log(store.nowTime.minute)
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