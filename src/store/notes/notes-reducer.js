const INITIAL_VALUE = {
    addNotesExtended : false,
    noteExtended : false,
    noteExtendedData : null,
    commentsOpened: false,
    noteData: null
}

export const notesReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_ADD_NOTES_EXTENDED':
            return {
                ...state,
                addNotesExtended: payload
            }
        case "SET_NOTE_EXTENDED":
            return {
                ...state,
                noteExtended: payload
            }
        case "SET_NOTE_EXTENDED_DATA":
            return {
                ...state,
                noteExtendedData: payload
            }
        case 'SET_COMMENTS_OPENED':
            return {
                ...state,
                commentsOpened: payload
            }
        case 'SET_NOTE_DATA':
            return {
                ...state,
                noteData: payload
            }
        default:
            return state
    }
}