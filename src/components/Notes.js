import React,{ useContext, useEffect,useRef,useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

export default function Notes(props){
    const context = useContext(NoteContext)
    const {notes,fetchNotes,editNote} = context;
    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    console.log(notes);
    useEffect(()=>{
        fetchNotes();
        // eslint-disable-next-line
    },[])
    const updateNote = (currentNote) =>{
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag:currentNote.tag})
        
    }
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleclick = (e) =>{
        editNote(note.id, note.etitle,note.edescription,note.etag)
        e.preventDefault();
        props.showAlert('Updated Successfully','success');

    }

    const onchange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <>
        <AddNote showAlert={props.showAlert}/>

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>
        <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="titles" className="form-label">Title</label>
                        <input type="text" value={note.etitle} className="form-control" id="etitle"  name="etitle" onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="tag">Tag</label>
                        <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onchange}/>
                        
                    </div>
                   
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
            </div>
        </div>
        </div>
        </div>
        <div className="row my-3">
            <h1>Yours Notes</h1>
            <div className="container">
            {notes.length === 0 && 'No notes to display'}
            </div>
            {notes.map((note)=>{
                //return note.title;
                return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
            })}
        </div>
        </>
    )
}