const INITIAL_VALUE = {
    languages : [],
    selectedLang : null
}

export const utilsReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SET_LANGUAGES':
            return {
                ...state,
                languages: payload
            }
        case 'SET_SELECTED_LANG':
            return {
                ...state,
                selectedLang: payload
            }
        default:
            return state
    }
}