const INITIAL_VALUE = {
    extended: false
}

const navigationReducer = (state = INITIAL_VALUE, action) => {
    const {type, payload} = action
    switch (type) {
        case "SET_NAVIGATION_EXTENDED":
            return {
                ...state,
                extended: payload
            }
        default:
            return {
                ...state
            }
    }
}
export default navigationReducer