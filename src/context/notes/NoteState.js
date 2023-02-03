import { useState } from 'react';
import NoteContext from './NoteContext';

export default function NoteState(props){
    const s1 = {
        "name":"vhbbhikrant",
        "class":"5b"
    }
    const [state,setState] = useState(s1);

    function update(){
        setTimeout(()=>{
            setState({
                "name":"mahajan",
                "class":"react"
            })
        }, 1000)
    }

    return(
        <NoteContext.Provider value={{state:state,update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}