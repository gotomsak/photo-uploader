import React from 'react'
import {GoogleLogout} from 'react-google-login'
import * as client_data from '../assets/client_secret.json'


class LogoutAuth extends React.Component {

    logout(){
        console.log("logout")
    }

    render(){
        return (
            <GoogleLogout
                clientId={client_data.web.client_id}
                buttonText="Logout"
                onLogoutSuccess={this.logout}
                >

            </GoogleLogout>
        )
    }
}

export default LogoutAuth

