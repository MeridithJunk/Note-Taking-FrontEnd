import './App.css';


import React, {useState, useEffect} from "react";

export default function App() {
    const [note, setNote] = useState(null);

    async function fetchUserData() {
        let response = await fetch("http://localhost:5000/notes/1");
        return response.json()
    }

    useEffect(() => {
        fetchUserData().then((response) => {
            setNote(response);
        });
    });

    if (!note) {
        return "loading...";
    }

    return (
        <div>
            <div className="note-container">
                <h1 className="note_heading">All Notes</h1>
                <h1>{note.title}</h1>
            </div>
            <div className="note-container">
                <h1 className="note_heading">Create Note</h1>
                <form className="form">
                    <input required type="text"
                           placeholder="Enter Note Title"/>
                    <br/><br/>
                    <textarea required rows="5" cols="28"
                              placeholder="Enter Note"/>
                    <br/><br/>
                    <button>Note</button>
                </form>
            </div>
        </div>
    )
}

