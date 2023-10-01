import React, {useContext, useState} from 'react'
import noteContext from '../context/NoteContext'
import Alert from './Alert'

const AddNotes = () => {
    const context = useContext(noteContext)
    const {addNotes} = context;
    const [err, setErr] = useState('');
    const [note, setNote] = useState({title: "", description:"", tag:""});
    const handleClick = (e) =>{ 
        e.preventDefault();
        if (note.title.trim() === '' || note.description.trim() === ''){
            setErr("title and description both must be filled")
            setTimeout(() => {
                setErr('')
            }, 2000)
        }
        else {
            addNotes(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
        }
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container" >
            <h1>Add Note Here</h1>
            {err && <Alert message={err} />}
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" id="title"  name="title"
                        aria-describedby="emailHelp" onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" 
                        name="description" onChange={onChange} value={note.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" 
                        onChange={onChange} value={note.tag} />
                </div>
                
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default AddNotes
