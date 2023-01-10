export const computeStatsLanguages = (notes) => {
    const stats = notes.reduce((acc, note) => {
        const {selectedLang} = note
        if(!acc[selectedLang])
            acc[selectedLang] = 1
        else
            acc[selectedLang] += 1
        return acc
    }, {})
    return stats
}

export const amIFollowing = (following, target) => {
    return following.filter((followingPerson) => followingPerson.email === target).length === 1
}

export const getLangData = (languages, selectedLang) => (languages.filter((lang) => lang.name === selectedLang))[0]


