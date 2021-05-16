import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import ListTodos from './ListTodos'
import AuthenticatedUser from './AuthenticatedUser'
import HelloWorldService from '../../api/todo/HelloWorldService'
import '../../../src/App.css'
import TodoComponent from './TodoComponent'


class TodoApp extends Component {
    render() {
        return (
            <div>
                <>
                    <Route component={HeaderComponent}></Route>
                    <Switch>
                        <Route exact path="/" component={LoginComponent}></Route>
                        <Route exact path="/login" component={LoginComponent}></Route>
                        <AuthenticatedUser exact path="/welcome/:name" component={WelcomeComponent}></AuthenticatedUser>
                        <AuthenticatedUser exact path="/todos" component={ListTodos}></AuthenticatedUser>
                        <AuthenticatedUser exact path="/logout" component={LogOutComponent}></AuthenticatedUser>
                        <AuthenticatedUser exact path="/todos/:id" component={TodoComponent}></AuthenticatedUser>
                        <Route component={ErrorComponent}></Route>
                    </Switch>
                    <FooterComponent></FooterComponent>
                </>
                

                {/* <LoginComponent />
                <WelcomeComponent /> */}
            </div>
        );
    }
}



class FooterComponent extends Component {
    render() {
        return (
            <>
                <footer className="footer">
                    <span className="text-muted">Hey! This is my footer</span>
                </footer>
            </>
        )
    }
}


class LogOutComponent extends Component {
    render() {
        return (
            <div className="container">
                <h4>You have logged out.</h4>
                <h1> thank you for using this application.</h1>
            </div>
        );
    }
}



class WelcomeComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            welcomeMessage:''
        }
    }

    
    
    render() {
        return (
            <>
                <div className="container">
                    <h4>welcome {this.props.match.params.name}. You can manage todos from <Link to="/todos">here</Link></h4>
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        );
    }
    // handleSuccessfulResponse=(response)=>{
    //     this.setState({welcomeMessage: response.data})
    // }
    handleWelcomeMessageState=(response)=>{
        console.log("handle welcome message")
        console.log(response)
        this.setState({
            welcomeMessage:response.data.message
        })
    }
    
    handleError=(error)=>{
        console.log(error.response)
        let errorMessage=''

        if(error.message)
        errorMessage+=error.message

        if(error.response && error.response.data)
        errorMessage+=error.response.data.message

        this.setState({
            welcomeMessage:errorMessage
        })
    }
    retrieveWelcomeMessage=()=>{
        // console.log("retrieve welcome message")
        // HelloWorldService.executeHelloWorldService().then(response=> this.setState({welcomeMessage: response.data}));
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
                            .then(response=> this.handleWelcomeMessageState(response))
                            .catch(error=> this.handleError(error))
    }
}






// const ShowInvalidCredentials=(props)=>{
//     if(props.hasLoginFailed) return <h1>invalid credentials</h1>
//     else return null
// }

// const ShowSuccessCredentials=(props)=>{
//     if(props.showSuccessMessage) return <h1>Login Successful</h1>
//     else return null
// }

class ErrorComponent extends Component {
    render() {
        return (
            <div>
                <h3>Page does not found</h3>
            </div>
        );
    }
}



export default TodoApp;