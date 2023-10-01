import React, { useContext, useEffect } from 'react'
import noteContext from '../context/NoteContext';
import NoteItems from './NoteItems';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes} = context
    let history = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes();
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [])
    
    return (
        <>
            <AddNotes />
            <div className='container my-3 mx-0'> <h4>Your Saved Notes Here</h4></div>
            <div className='container mx-1'>
                {notes.length === 0 && "no notes to display"}
            </div>
            <div className='row' >
                {notes.map((note) => {
                    return <NoteItems key={note._id} note={note} />
                })}
            </div>  
        </>
    )
}

export default Notes
