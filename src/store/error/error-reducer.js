const INITIAL_VALUE = {
    error: false,
    errorMessage: undefined
}

export const errorReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type){
        case 'SET_ERROR':
            return {
                ...state,
                error: payload
            }
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: payload
            }
        default:
            return state
    }
}