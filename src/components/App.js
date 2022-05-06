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
            <h1>{note.title}</h1>
            <textarea  value={this.state.value} onChange={this.handleChange} >

            </textarea>
        </div>
    )
}

