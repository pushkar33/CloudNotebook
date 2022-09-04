import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState=(props)=>{

  let host="http://localhost:5000";

    const notesInitial=[
      
    ]

    // Get All Notes

    const getAllNotes=async ()=>{

      // ToDo : API CALL

      const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          "auth-token": localStorage.getItem('token')
        }
       
      });

    const json=await response.json();
    setNotes(json);

    }

    // Add note

    const addNote=async (title,description,tag)=>{

      // ToDo : API CALL

      const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });

    const note=await response.json();

    setNotes(notes.concat(note));

    }
    
    // Delete Note

    const deleteNote=async (id)=>{

      //console.log("Deleting a note with id "+id);

      const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          "auth-token": localStorage.getItem('token')
        },
       
      });

      const newNote=notes.filter((note)=>{
        return note._id!==id;
      })
      setNotes(newNote);
      
      
    }

    // Edit Note

    const editNote=async (id,title,description,tag)=>{

      const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkZTNmMGQwNmI4NjIwNTgyNDg3YzAyIn0sImlhdCI6MTY1ODczMjM5N30.bnggYbKeJiGj0NW_p7Ag0uMvinERJEV8MTMy6_MvPjw"
        },
        body:JSON.stringify({title,description,tag})
      });

      const json= await response.json();
      setNotes(json);

      let newNote=JSON.parse(JSON.stringify(notes));
      
      for(let i=0;i<newNote.length;i++)
      {
          if(newNote[i]._id===id)
          {
            newNote[i].title=title;
            newNote[i].description=description;
            newNote[i].tag=tag;
            break;
          }
      }

      setNotes(newNote);

    }

    const[notes, setNotes] = useState(notesInitial);

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,setNotes,getAllNotes}}>
          {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;