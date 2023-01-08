const INITIAL_VALUE = {
    addNotesExtended : false
}

export const notesReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_ADD_NOTES_EXTENDED':
            return {
                ...state,
                addNotesExtended: payload
            }
        default:
            return state
    }
}