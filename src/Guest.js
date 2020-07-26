import React from "react";
import PropTypes from "prop-types";
import GuestName from "./GuestName";


const Guest = (props) => {

    return (                
        <li className="responded">            
            <GuestName name={props.name} isTextBox={props.isTextBox} handleInputChange={ (e) => props.handleInputChange(e.target.value)} />
            {/* {props.isTextBox ? <input type="text"></input> : <span>{props.name}</span>} */}
            <label>
                <input type="checkbox" checked={props.conf} onChange={props.toogleConfirmation}/> Confirmed
            </label>
            <button onClick={props.handleEdit}>{props.isTextBox ? "save":"edit"}</button>
            <button onClick={() => props.handleRemove(props.name)}>remove</button>
        </li>
        );     
}


Guest.prototype = {
    name : PropTypes.string.isRequired,
    conf : PropTypes.bool.isRequired,
    toogleConfirmation : PropTypes.func
}

export default Guest;