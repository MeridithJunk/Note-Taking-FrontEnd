export async function fetchAllNotes() {
    let response = await fetch("http://localhost:5000/notes/");
    return response.json()
}

export async function postNote(noteTitle, noteBody) {
    await fetch("http://localhost:5000/notes/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: Math.floor(Math.random() * 50000),
            title: noteTitle,
            body: noteBody,
            created_at: Date.now(),
            created_by: 'admin',
            edit_history: [{
                edited_at: Date.now(),
                edited_by: 'A User',
            }],
        })
    });
}

export async function patchEditNote (noteTitle, noteBody, noteId) {
    console.log(noteId);
    await fetch(`http://localhost:5000/notes/${noteId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteTitle,
            body: noteBody,
            edit_history: [{
                edited_at: Date.now(),
                edited_by: 'A User',
            }],
        })
    });
}

export async function deleteNote(noteId) {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
        method: 'DELETE',
    });
}
