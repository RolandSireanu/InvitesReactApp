import React from "react";

const GuestInputForm = (props) => {

    return (
        <form>
            <input type="text" value={props.pendingGuest} placeholder="Invite Someone" onChange = {props.setPendingGuest} />
            <button type="submit" name="submit" value="submit" onClick={props.handleOnSubmit}>Submit</button>
        </form>
    );
}

export default GuestInputForm;