import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)
    const host = "http://localhost:5000";

    const getNotes = async () => {
        // TODO : Api call
        const url = `${host}/api/notes/fetchnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers : {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json",
            },
        })
        const json = await response.json();
        setnotes(json);
    }

    // Add notes
    const addNotes = async (title, description, tag) => {
        // TODO : Api call
        const url = `${host}/api/notes/addNotes`;
        await fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })

        const note = {
            "_id": "651450b58c7368303b84ad6087a",
            "user": "65134d8c21266858de564e54",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-09-27T15:56:40.190Z",
            "__v": 0
        }
        setnotes(notes.concat(note));
    }

    //delete notes
    const deleteNotes = async (id) => {
        const url = `${host}/api/notes/deletenote/${id}`;
        await fetch(url, {
            method: 'DELETE',
            headers : {
                "auth-token": localStorage.getItem('token')
            }
        })
        // const json = await response.json();
        // console.log(json);
        // setnotes(json);
        const updatedNotes = notes.filter((note) => note._id !== id);
        setnotes(updatedNotes);
    }

    // Edit notes 
    const editNotes = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenote/${id}`;
        await fetch(url, {
            method: 'PUT',
            headers : {
                'Content-Type': "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })   

        const noteIndex = notes.findIndex((note) => note._id === id)
        if (noteIndex !== -1) {
            const updateNote = notes[noteIndex]
            updateNote.title = title;
            updateNote.description = description;
            updateNote.tag = tag;

            const updatedNotes = notes;
            updatedNotes[noteIndex] = updateNote; 
            setnotes(updatedNotes)
        }
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNotes, deleteNotes, editNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;