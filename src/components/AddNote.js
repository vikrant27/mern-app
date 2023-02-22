import React,{ useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props){
    const context = useContext(NoteContext)
    const {addNote} = context;

    const [note,setNote] = useState({titles:"",description:"",tag:""})

    const handleclick = (e) =>{
        e.preventDefault();
        addNote(note.titles,note.description,note.tag)
        setNote({titles:"",description:"",tag:""})
        props.showAlert('Added Successfully','success');
    }
    const onchange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return(
        <div className="containe my-3">
            <h1>Add a Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="titles" className="form-label">Title</label>
                    <input type="text" className="form-control" id="titles" aria-describedby="emailHelp" value={note.titles}  name="titles" onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" value={note.tag}  id="tag" onChange={onchange} name="tag"/>
                    
                </div>
                <button disabled={note.titles.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>
    
        </div>
    )
}