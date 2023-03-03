import { useState } from 'react';
import NoteContext from './NoteContext';

export default function NoteState(props){
    const host = "http://localhost:5000";
    const noteInitial = [];
    const [notes, setNotes] = useState(noteInitial);

     //fecth Note
     const fetchNotes = async () => {
        console.log('fetch note');
        const response = await fetch(`${host}/api/notes/fetchuserallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        //console.log(json)
        setNotes(json)
    }

    //Add Note
    const addNote = async (title,description,tag) => {
        console.log('adding new note');
        const response = await fetch(`${host}/api/notes/addnotes`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        setNotes(notes.concat(json))
        console.log(json)
    }

    // Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token': localStorage.getItem('token')
            }
            
        });
        const json = await response.json();
        console.log(json)

        const newNotes = notes.filter((note) => {return note._id !== id})
        setNotes(newNotes)
    }

    // edit Notes
    const editNote = async (id,title,description,tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });

        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))

        //logic to edit in client side
        for(let index =0;index <newNotes.length;index++){
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title =title;
                newNotes[index].description =description;
                newNotes[index].tag=tag;
                break;
            }  
        }
        setNotes(newNotes);
        
    }//edit note


    return(
        <NoteContext.Provider value={{notes, addNote,deleteNote,editNote,fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}