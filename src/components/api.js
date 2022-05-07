export async function getAllNotes() {
    const result = await fetch('http://localhost:5000/notes');
    return result.json();
}

export async function postNote(noteTitle, noteBody) {
    const options =  {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id:  Math.floor(Math.random() * 50000),
            title: noteTitle,
            body: noteBody,
            created_by: 'User'
        })
    }

    await fetch('http://localhost:5000/notes', options);
}

export async function editNote(noteTitle, noteBody, noteId) {
    const options =  {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteTitle,
            body: noteBody,
            edit_history: [{
                edited_at: Date.now(),
                edited_by: 'This User',
            }],
        })
    }

    await fetch(`http://localhost:5000/notes/${noteId}`, options);
}

export async function deleteNote(noteId) {
    const options =  {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
    await fetch(`http://localhost:5000/notes/${noteId}`, options);
}