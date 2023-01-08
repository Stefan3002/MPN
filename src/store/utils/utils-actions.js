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