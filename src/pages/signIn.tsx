import React from 'react'
import ReactDOM from 'react-dom'
import GoogleApiTest from '../components/googleApiTest'
import * as store from '../store'


class SignIn extends React.Component<any,any>{

    constructor(
        props:any,
        ){
        super(props)
        this.state={
            url: 'None'
        }
    }

    componentDidMount(){
        this.getURL()
    }
    async getURL(){
        let res = await store.oAuth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
            // If you only need one scope you can pass it as a string
            scope: store.oauth2Data.scopes,
            prompt: 'consent'
        });
        this.setState({url: res})
    }

    render(){
        return (
            <div>
                <h1>サインインページ</h1>
                <a href={this.state.url}>signin</a>
            </div>

        )
    }


}

export default SignIn