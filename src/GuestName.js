import React from "react";
import {Component} from "react";


class GuestName extends Component {

    render() {

        if(this.props.isTextBox){
            return(
                <input type="text" onChange={this.props.handleInputChange} />
            );
        }
        return (<span>{this.props.name}</span>);
    }

}

export default GuestName;