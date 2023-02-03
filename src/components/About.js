import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function About() {
    const a = useContext(NoteContext)
    useEffect(() =>{
        a.update();
        // eslint-disable-next-line 
    },[])
    return(
        <div>
            this is about {a.state.name} and he is in class {a.state.class}
        </div>
    )
}