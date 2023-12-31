import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext' 

const Noteitem = (props) => {
  const {deleteNote} = useContext(noteContext);
  const {note, updateNote} = props 
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <p className="card-text">{note.tag}</p>
            <i className="fa-solid fa-trash mx-2" style={{color: "#000000"}} onClick={() => {deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note)}} style={{color: "#000000"}}></i>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
