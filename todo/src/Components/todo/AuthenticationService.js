

class AuthenticationService {

     registerSuccessfulLogin(username,password){
        console.log("Authentication function")
        sessionStorage.setItem("authenticatedUser",username)
        
    }

    logout(){
        sessionStorage.removeItem("authenticatedUser")
    }

    isLoggedIn(){
        let user=sessionStorage.getItem("authenticatedUser");
        if(user==null){
            return false;
        }else{
            return true;
        }
    }

    getLoggedInUser(){
        let user=sessionStorage.getItem("authenticatedUser");
        if(user==null){
            return '';
        }else{
            return user;
        }
    }
}

export default new AuthenticationService();