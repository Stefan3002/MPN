export const setAddNotesExtended = (bool) => {
    return {
        type: "SET_ADD_NOTES_EXTENDED",
        payload: bool
    }
}
export const setNoteExtended = (bool) => {
    return {
        type: "SET_NOTE_EXTENDED",
        payload: bool
    }
}
export const setNoteExtendedData = (data) => {
    return {
        type: "SET_NOTE_EXTENDED_DATA",
        payload: data
    }
}