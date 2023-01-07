export const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
}
export const setUserData = (userData) => {
    return {
        type: 'SET_USER_DATA',
        payload: userData
    }
}