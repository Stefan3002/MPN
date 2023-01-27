const INITIAL_VALUE = {
    languages : [],
    selectedLang : null,
    shareable : false,
    loading: false
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
        case 'SET_SHAREABLE':
            return {
                ...state,
                shareable: payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}