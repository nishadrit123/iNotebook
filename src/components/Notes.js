import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const context = useContext(noteContext)
  const {notes, getNotes, editNote} = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) getNotes()
    else navigate('/login');
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", title: "", description: "", tag: ""});

  const updateNote = (currNote) => {
    ref.current.click();
    setNote({id: currNote._id, title: currNote.title, description: currNote.description, tag: currNote.tag});
  }

  const handleClick = () => {
    editNote(note.id, note.title, note.description, note.tag);
    refClose.current.click();
  }
  const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
        <Addnote/>

        <button type="button" ref = {ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
              </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleClick} className="btn btn-primary">Edit Note</button>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
        <h4 className='my-3'>Your Notes</h4>
        {notes.map((note, index) => {
            return <Noteitem note = {note} updateNote = {updateNote} key = {index}/>
        })}
        </div>
    </>
  )
}

export default Notes
