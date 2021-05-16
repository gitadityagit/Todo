import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService'
import {Route,Redirect} from 'react-router-dom'
// import LoginComponent from './LoginComponent';

class AuthenticatedUser extends Component {
    render() {
            if(AuthenticationService.isLoggedIn()){
                return(
                    <Route {...this.props}></Route>
                )
            }else{
                return <Redirect to="/login"></Redirect>
            }
    
    }
}

export default AuthenticatedUser;