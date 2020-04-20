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
        this.getToDay = this.getToDay.bind(this)

        this.state = {
            res: false,
            time: null,
            rootDir: 'None',
            subDir: 'None'
        }
    }
    
    componentDidMount(){
        this.codeCheck()
        this.setState({time: this.getToDay()})
    }

    componentDidUpdate(prevProps:any, prevState:any){
        if(this.state.res === true && prevState.res !== this.state.res ){
            this.checkFolder('photo-uploader', [], true)
        }
        if(this.state.rootDir !== 'None' && prevState.rootDir !== this.state.rootDir){
            let parents: string[] = [store.driveFilesID.folder]
            this.checkFolder(this.state.time, parents, false)
        }
        if(this.state.subDir !== 'None' && prevState.subDir !== this.state.subDir){
            store.driveFilesID.folder = this.state.subDir
        }
    }

    errGetToken(err: any){
        console.log(err)
        this.setState({res: false})
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
                console.log('Folder Id: ', file.data.id);
                store.driveFilesID.folder = file.data.id
            }
        });
    }

    getToDay(){
        return (store.nowTime.year + "_"
                + store.nowTime.month + "_" + store.nowTime.date).toString()
    }

    checkFolder(folderName: string, parents: any, root: boolean){

        store.drive.files.list({
            q: "name='" + folderName + "'",
            fileds:'nextPageToken, files(id, name)',
            parents: parents
        },(err:any,res:any) => {
            if(err){
                console.error(err);
            } else {
                if(root === true){
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