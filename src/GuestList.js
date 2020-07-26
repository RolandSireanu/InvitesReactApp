import React from "react";
import PropTypes from "prop-types";
import Guest from "./Guest";
import PendingGuest from "./PendingGuest";

const GuestList = (props) => {

    return (
        <ul>
        {/* { props.pendingGuest !== "" ? 
            <Guest name={props.pendingGuest} conf={false} key={-1} isTextBox={false} toogleConfirmation={()=>null} handleEdit={()=>null} 
            handleInputChange={(text) => null} /> : null
        }     */}
        <PendingGuest name={props.pendingGuest} />
        
        { props.guests.filter((p) => (!props.isFiltered || p.conf) ? true : false)
            .map((person,index) => {
            return (                
                <Guest name={person.name} conf={person.conf} key={index} isTextBox={person.isTextBox} toogleConfirmation={()=>props.toogleConfirmationAt(person.id)} handleEdit={()=>props.handleEdit(person.id)} 
                handleInputChange={(text) => props.handleChangeName(text, person.id)} handleRemove={props.handleRemove}/>
            );
        })                    
        }
      </ul>
    )

}


GuestList.prototype = {
    guests : PropTypes.array.isRequired,
    toogleConfirmationAt : PropTypes.func
}

export default GuestList;