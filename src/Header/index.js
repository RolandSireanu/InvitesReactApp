import React from "react";
import GuestInputForm from "./GuestInputForm";
import {Consumer} from "./../Context";

const Header = (props) => {

    return(
        <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <Consumer>
            {
            context => (
                
                <GuestInputForm pendingGuest={context.pendingGuest} 
                    setPendingGuest={context.setPendingGuest}
                    handleOnSubmit={context.handleOnSubmit} 
                />
            )}
        </Consumer>
        </header>
    );
}

export default Header;