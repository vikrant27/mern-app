import React from "react";

export default function Alert(props){
    return(
        <div>
            <div className="aler alert-primary" role="alert">
                {props.message}
            </div>
        </div>
    )
}