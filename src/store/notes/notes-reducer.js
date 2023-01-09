const INITIAL_VALUE = {
    addNotesExtended : false,
    noteExtended : false,
    noteExtendedData : null
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
        default:
            return state
    }
}