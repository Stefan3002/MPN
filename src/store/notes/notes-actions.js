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

export const setCommentsOpened = (opened) => {
    return {
        type: 'SET_COMMENTS_OPENED',
        payload: opened
    }
}
export const setCommentData = (data) => {
    return {
        type: 'SET_NOTE_DATA',
        payload: data
    }
}