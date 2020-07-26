import React from "react";
import {Consumer} from "./Context";

const Counter = (props) => {

    return (
    <Consumer>
        {
            context => (
        <table className="counter">
            <tbody>
            <tr>
                <td>Attending:</td>
                <td>{context.numberOfConf}</td>
            </tr>
            <tr>
                <td>Unconfirmed:</td>
                <td>{context.numberOfUnconf}</td>
            </tr>
            <tr>
                <td>Total:</td>
                <td>{context.numberOfInvites}</td>
            </tr>
            </tbody>
        </table>
        )}
      </Consumer>
    );
}

export default Counter;