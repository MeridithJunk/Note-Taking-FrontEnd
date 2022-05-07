import './App.css';
import {useEffect, useState} from "react";
import {deleteNote, editNote, getAllNotes, postNote} from "./api";

function App() {
    let [allNotes, setAllNotes] = useState(null);
    let [editNoteVisible, setEditNoteVisible] = useState(true);
    let [noteTitle, setNoteTitle] = useState(null);
    let [noteBody, setNoteBody] = useState(null);
    let [noteId, setNoteId] = useState(null);

    useEffect(() => {
        getAllNotes()
            .then((result) => {
                setAllNotes(result);
            })
    });

    if (!allNotes) {
        return (
            <header>loading...</header>
        )
    }

    const notesList = allNotes.map((note) =>
        <div className="note-container-small" id={note.id}>
            {note.title} <br/>
            {note.body} <br/>
            {note.created_by} <br/>
            {note.created_at}
            <button
                onClick={async () => {
                    await deleteNote(note.id);
                }}>Delete Note
            </button>
            <button
                onClick={async () => {
                    setNoteId(note.id);
                    setNoteBody(note.body);
                    setNoteTitle(note.title);
                    setEditNoteVisible(false);
                }}>Edit Note
            </button>
        </div>
    );
    return (
        <div>
            <div className="note-container">
                <header className="note_heading">All Notes</header>
                <div className="row" id="large-note-container">
                    {notesList}
                </div>
            </div>

            <div className="note-container">
                <header className="note_heading">Create a Note</header>
                <form className="form">
                    <input
                        id="note-title"
                        placeholder="Enter Note Title"
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                        />
                    <textarea
                        id="note-text"
                        required rows="5" cols="28"
                        placeholder="Enter Note"
                        onChange={(e) => setNoteBody(e.target.value)}
                        value={noteBody}
                    />
                        <button onClick={async () => {
                            await postNote(noteTitle, noteBody);
                        }}>
                            Create Note
                        </button>
                        <button onClick={async () => {
                            await editNote(noteTitle, noteBody, noteId);
                            setEditNoteVisible(true);
                        }} disabled={editNoteVisible}>
                            Save Edited Note
                        </button>
                </form>
            </div>
        </div>
);
}

export default App;
