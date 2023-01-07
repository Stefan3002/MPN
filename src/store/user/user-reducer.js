const INITIAL_STATE = {
    user: null,
    userData: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action
    switch (type) {
        case "SET_USER":
            return {
                ...state,
                user: payload
            }
        case "SET_USER_DATA":
            return {
                ...state,
                userData: payload
            }
        default:
            return {
                ...state
            }
    }
}