import React, { Component } from "react";
import { NavLink } from "react-router-dom";


export class Login extends Component {


    userInput = React.createRef();
    passwordInput = React.createRef();


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.userInput.current.value, this.passwordInput.current.value)
    }

    render() {

        let message = "";

        if(this.props.registration){
            console.log("message is valid");
            message = <div class="alert alert-success successMessage" role="alert">Registration success</div>
        }        
        else
        {
            message = "";
        }


        return (

            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form className="login-form" onSubmit={this.handleSubmit} >
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" ref={this.userInput} />
                        <input type="text" id="password" className="fadeIn third" name="login" placeholder="password" ref={this.passwordInput} />
                        <input type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>                    
                    <div id="formFooter">
                        {/* <a className="underlineHover" href="#">Register account</a> */}
                        <NavLink to="/register" > Register account </NavLink>
                    </div>
                </div>                
                {message}

            </div>                       
        );
    }
}

