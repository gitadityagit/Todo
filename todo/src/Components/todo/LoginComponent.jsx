import React,{Component} from 'react'
import AuthenticationService from './AuthenticationService'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'aditya',
            password: '',
            showSuccessMessage: false,
            hasLoginFailed: false,
        }
    }
    // handleUsernameChange=(event)=>{
    //     console.log(event.target.value);
    //     this.setState({username:event.target.value})
    // }
    // handlePasswordChange=(event)=>{
    //     console.log(event.target.value);
    //     this.setState({password:event.target.value})
    // }

    handleChange = (event) => {
        console.log(".......")
        console.log(event);
        this.setState({ [event.target.name]: event.target.value })
    }
    loginClicked = (event) => {
        console.log();
        if (this.state.username === 'aditya' && this.state.password === 'dhanraj') {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            
            // this.setState({ showSuccessMessage: true })
            // this.setState({ hasLoginFailed: false })

            this.props.history.push(`/welcome/${this.state.username} `)

            
            // console.log('showSuccessMessage')
        } else {
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
            console.log('failed')
        }
    }

    render() {
        return (
            <div className="container">
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                {/* <ShowSuccessCredentials showSuccessMessage={this.state.showSuccessMessage}/> */}
                {/* {this.state.showSuccessMessage && <h5 className="alert alert-danger">Login Successful</h5>} */}
                {this.state.hasLoginFailed && <h5 className="alert alert-danger">invalid credentials !</h5>}
                
                <div>
                    UserName : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <button className="btn-primary" onClick={this.loginClicked}>login</button>
                </div>
            </div>
        );
    }
}

export default LoginComponent;