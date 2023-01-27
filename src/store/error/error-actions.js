export const setError = (bool) => {
    return {
        type: 'SET_ERROR',
        payload: bool
    }
}
export const setErrorMessage = (message) => {
    return {
        type: 'SET_ERROR_MESSAGE',
        payload: message
    }
}