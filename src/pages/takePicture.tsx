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
        this.fileListViewTransition = this.render.bind(this)
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
    async codeCheck(){
        console.log(this.props)
        let code:string = this.props.location.search
        code = code.replace('?code=','')
        let res = await store.oAuth2Client.getToken(code,(err:any,token:any)=>{
            if (err){
                this.setState({res: false})
                // return(<Link to='signin'><button>signinに戻る</button></Link>)
                // this.errGetToken(err)
                return console.log(err)
            }
            // if (err) return console.error(err)
            store.oAuth2Client.setCredentials(token);
            this.setState({res: true})
        })
        console.log(res)
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