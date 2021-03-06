'use strict'


//read exisiting notes from localStorage

const getSavedNotes =  () =>{
    const notesJSON = localStorage.getItem('notes')
    try{
        return notesJSON ? JSON.parse(notesJSON) : [] // use of condition operator 
    }catch(e){
        return []
    }
}

// save the notes to localStorage
const saveNotes =  (notes)=> {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove note from list

const removeNote = (id)=> {
    const noteIndex = notes.findIndex((note)=>note.id === id)
    
    if(noteIndex > -1){
        notes.splice(noteIndex,1)
    }
}

//generate dom structure

const generateNoteDOM = (note) =>{
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    noteEl.classList.add('list-item')
    textEl.classList.add('list-item__title')
    statusEl.classList.add('list-item__subtitle')


    //set up note title text

    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    noteEl.appendChild(textEl)

    //set up link 
    noteEl.setAttribute('href', `/edit.html#${note.id}`)

    //set up status message
    statusEl.textContent= generateLastEdited(note.updatedAt)
    noteEl.appendChild(statusEl)

    return noteEl
}

const sortNotes = (notes, sortBy) =>{
    if (sortBy ==='byEdited'){
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt){
                return -1
            } else if (a.updatedAt < b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }

    else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    }
    else if (sortBy === 'alphabetical'){
        return notes.sort( (a, b) =>{
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

//render application notes 

const renderNotes =  (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if(filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const noteEL = generateNoteDOM(note)
            notesEl.appendChild(noteEL)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No Notes To Show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)   
    }  
}

const generateLastEdited = (timeStamp) => `Last edited ${moment(timeStamp).fromNow()}`

