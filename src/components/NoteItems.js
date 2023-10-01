import React, { useContext, useState } from 'react'
import noteContext from '../context/NoteContext';
import Alert from './Alert';


const NoteItems = (props) => {
    const { note } = props;
    const { deleteNotes, editNotes } = useContext(noteContext)
    const [err, setErr] = useState('');
    const [Notes, setNote] = useState({ etitle: note.title, edescription: note.description, etag: note.tag });
    console.log(Notes);
    const deleteNote = () => {
        deleteNotes(note._id);
    }

    const handleClick = (e) => {
        e.preventDefault();
        
        if (Notes.etitle.trim() === '' || Notes.edescription.trim() === '') {
            setErr("title and description both must be filled")
            setTimeout(() => {
                setErr('')
            }, 2000)
        }
        else { 
            editNotes(note._id, Notes.etitle, Notes.edescription, Notes.etag);
        }
    }

    const onChange = (e) => {
        setNote({ ...Notes, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='col-md-3 my-1'>
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex align-items-center'>
                            <h5 className="card-title">{note.title}</h5>
                            <i className="far fa-edit mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                            <i className='far fa-trash-alt' onClick={deleteNote}></i>
                            
                            
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                                <h1>Add Note Here</h1>
                                                {err && <Alert message={err} />}
                                                <form>
                                                    <div className="mb-3">
                                                        <label htmlFor="etitle" className="form-label">title</label>
                                                        <input type="text" className="form-control" id="etitle" name="etitle"
                                                        aria-describedby="emailHelp" value={Notes.etitle} onChange={onChange}  />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="edescription" className="form-label">Description</label>
                                                        <input type="text" className="form-control" id="edescription" 
                                                            name="edescription" onChange={onChange} value={Notes.edescription}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="etag" className="form-label">Tag</label>
                                                        <input type="text" className="form-control" id="etag" 
                                                            name="etag" onChange={onChange} value={Notes.etag} />
                                                    </div>
                                                </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItems
