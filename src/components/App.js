import './App.css';


import React, {useState, useEffect} from "react";
import {deleteNote, patchEditNote, fetchAllNotes, postNote} from "../api/notes";

export default function App() {
    const [allNotes, setAllNotes] = useState(null);
    const [noteTitle, setNoteTitle] = useState(null);
    const [noteBody, setNoteBody] = useState(null);
    const [noteId, setNoteId] = useState(null);
    const [editNote, setEditNote] = useState(true);

    useEffect(() => {
        fetchAllNotes()
            .then((response) => {
                setAllNotes(response);
            });
    });

    if (!allNotes) {
        return "loading...";
    }

    const notesList = allNotes.map((note) =>
        <div className="note-container-small">
            {note.title} <br/>
            {note.body}<br/>
            {new Date(note.created_at).toLocaleDateString()} <br/>
            {note.created_by}<br/>
            <button onClick={() => {
                deleteNote(note.id)
            }}>delete
            </button>
            <button onClick={() => {
                setNoteTitle(note.title);
                setNoteBody(note.body);
                setNoteId(note.id);
                setEditNote(false);
            }}>edit
            </button>
        </div>
    );

    return (
        <div>
            <div className="note-container">
                <h1 className="note_heading">All Notes</h1>
                <div className="row">
                    {notesList}
                </div>
            </div>
            <div className="note-container">
                <h1 className="note_heading">Create Note</h1>
                <form className="form">
                    <input id="note-title"
                           onChange={(e) => setNoteTitle(e.target.value)}
                           required type="text"
                           value={noteTitle}
                           placeholder="Enter Note Title"/>
                    <br/><br/>
                    <textarea name="note-text"
                              value={noteBody}
                              onChange={(e) => setNoteBody(e.target.value)}
                              required rows="5" cols="28"
                              placeholder="Enter Note"/>
                    <br/><br/>
                    <button onClick={async () => {
                        await postNote(noteTitle, noteBody);
                    }}>Note
                    </button>
                    <button onClick={async () => {
                        await patchEditNote(noteTitle, noteBody, noteId);
                        setEditNote(true);
                    }} disabled={editNote}>Edit Note
                    </button>
                </form>
            </div>
        </div>
    )
}

