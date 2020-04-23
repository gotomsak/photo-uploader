import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import './backToSignin.css'

class BackToSignin extends React.Component<any,any>{
    render(){
        return (
            <div id='back-to-signin'>
                <h1>Signinしてください</h1>
                <Link to='signin'>
                    <button className='back-button'>Signinページへ</button>
                </Link>
            </div>

        )
    }
}

export default BackToSignin