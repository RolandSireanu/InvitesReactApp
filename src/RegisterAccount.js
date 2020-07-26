import React, { Component } from "react";
import { Redirect } from "react-router";
import { withRouter } from 'react-router';

export class RegisterAccount extends Component {

    alertMessage = "";
    

    username = React.createRef();
    passwordInputFirst = React.createRef();
    passwordInputSecond = React.createRef();    


    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("handleSubmit !");
        // console.log(this.passwordInputFirst.current.value);
        // console.log(this.passwordInputSecond.current.value);
        // console.log(this.username.current.value);
        let pf = this.passwordInputFirst.current.value;
        let ps = this.passwordInputSecond.current.value;
        let us = this.username.current.value;        
        let success = this.props.handleRegistration(us, pf, ps);     
        console.log("success = ")
        console.log(success);
        if(success === true)
        {
            console.log("push /");
            this.props.history.push("/");                          
        }
        else if(success === false) {
            console.log("set alert message ");
            this.alertMessage = <div className="alert alert-danger successMessage" role="alert">Registration failed</div>;
            this.forceUpdate();
            //<div class="alert alert-danger successMessage" role="alert">Registration failed</div>       
        }
    }

    render() {
        console.log("RegisterAccount rendering ...");
        return (

            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form className="login-form" onSubmit={this.handleSubmit} >
                        <input type="text" id="username" className="fadeIn second" name="username" placeholder="username" ref={this.username} />
                        <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" ref={this.passwordInputFirst} />
                        <input type="text" id="password" className="fadeIn third" name="login" placeholder="repeat password" ref={this.passwordInputSecond} />
                        <input type="submit" className="fadeIn fourth" value="Register" />
                    </form>                    
                </div>
                {this.alertMessage}
            </div>                       
        );
    }
}

export default withRouter(RegisterAccount);