import "../hoverStyle.css"
import React, {useContext, useState, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
  const context = useContext(noteContext)
  const {addNote, hoverName, hoverOverName} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""});

  useEffect(() => {
    hoverOverName()
    // eslint-disable-next-line
  }, [])

  let temp_name = (typeof(hoverName.user) !== "undefined") ? (hoverName.user.name) : "user"
  let temp_email = (typeof(hoverName.user) !== "undefined") ? (hoverName.user.email) : "email"

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
  }

  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <div className="d-flex">
        <h4>Add a Note</h4>
        <button type="button" id="myButton" className="btn btn-success btn-sm mx-3">{temp_name[0].toUpperCase()}</button>
        <div id="infoBox">
          <h2>{temp_name}</h2>
          <p>{temp_email}</p>
        </div>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default Addnote
