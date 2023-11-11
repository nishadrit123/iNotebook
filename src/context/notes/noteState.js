import NoteContext from './noteContext'
import { useState } from 'react'

const NoteState = (props) => {
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);
    const [hoverName, setHoverName] = useState({});

    //Read
    const getNotes = async() => {
      const url = 'http://localhost:5000/api/notes/fetchallnotes';
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    }

    // Add 
    const addNote = async(title, description, tag) => {
      const url = 'http://localhost:5000/api/notes/addnote';
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    }

    // Update
    const editNote = async(id, title, description, tag) => {
      const url = `http://localhost:5000/api/notes/updatenote/${id}`;
      // eslint-disable-next-line
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });
      // const json =  response.json();

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
        }
      }
      setNotes(newNotes);
    }

    // Delete
    const deleteNote = async(id) => {
      const url = `http://localhost:5000/api/notes/deletenote/${id}`;
      // eslint-disable-next-line
      const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      // const json = response.json()

      const newNote = notes.filter((i) => {return i._id !== id});
      setNotes(newNote);
    }

    // Hover over the name
    const hoverOverName = async() => {
      const url = 'http://localhost:5000/api/auth/getuser';
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin", 
          headers: {
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json();
        setHoverName(json);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes, hoverOverName, hoverName}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;