import './note.css'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getLanguages} from "../../store/utils/utils-selectors";
const Note = ({noteData}) => {
    const {title, content, selectedLang, createdAt} = noteData
    // console.log(new Date(createdAt.seconds, createdAt.nanoseconds).toDateString(), createdAt)
    const languages = useSelector(getLanguages)
    const [selectedLangData, setSelectedLangData] = useState(undefined)
    useEffect(() => {
        setSelectedLangData(languages.filter((lang) => lang.name === selectedLang)[0])
    }, [selectedLang])

    return (
        <div className='note'>
            <div className="note-title">
                <p className="note-title">{title}</p>
                {selectedLangData ? <img className='icon' src={selectedLangData.icon} alt=""/> : null}
            </div>
            <hr/>
            <pre className="note-content">{content.slice(0, 150)}</pre>
            {/*<p>{createdAt}</p>*/}
        </div>
    )
}
export default Note