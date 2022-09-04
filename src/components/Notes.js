import React from 'react'
import {useContext,useEffect,useRef,useState} from "react";
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


 const Notes = (props) => {

  let navigate=useNavigate();

    const context=useContext(noteContext);
    const {notes,setNotes,getAllNotes,editNote}=context;

    const updateNote=(currentnote)=>{

      ref.current.click();
      setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})

    }

    useEffect(() => {
   
      if(localStorage.getItem("token")){
        getAllNotes();
      }
      else
      {
        navigate('/login');
      }
     
       
     }, [])

     const ref = useRef(null);
     const refClose = useRef(null);

     const [note, setnote] = useState({id:"",title:"",description:"",tag:"default"})

     const handleClick=(e)=>{

      editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click();
      props.showAlert("Updated Successfully","success");
      
      
            
    
    }

const onChange=(e)=>{

  setnote({...note,[e.target.name]:e.target.value}); // appending or overriding note with new title and description
  

}

  return (
    <>
    <AddNote showAlert={props.showAlert}/>

  

<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="etitle"
              id="etitle"
              value={note.etitle}
              aria-describedby="emailHelp"
              onChange={onChange} minLength={5}
              required
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              value={note.edescription}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
          <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              value={note.etag}
              onChange={onChange}
            />
          </div>
          
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    
    <div className="row my-3">
        <h2>Your Notes</h2>
        
        <div className="container mx-2">
          {notes.length==0 && "No Notes To Display"}
        </div>

        {notes.map((note)=>{
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        })}
        
      </div>

      </>

  )
}

export default Notes
