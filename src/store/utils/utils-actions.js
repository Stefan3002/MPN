export const setLanguages = (langs) => {
    return {
        type: "SET_LANGUAGES",
        payload: langs
    }
}
export const setSelectedLang = (lang) => {
    return {
        type: "SET_SELECTED_LANG",
        payload: lang
    }
}
export const setShareable = (bool) => {
    return {
        type: "SET_SHAREABLE",
        payload: bool
    }
}
export const setLoading = (bool) => {
    return {
        type: "SET_LOADING",
        payload: bool
    }
}