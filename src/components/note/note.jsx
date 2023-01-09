import './note.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLanguages} from "../../store/utils/utils-selectors";
import {getLangData} from "../../utils/calculations";
import {setNoteExtended, setNoteExtendedData} from "../../store/notes/notes-actions";
import ShareSVG from '../../utils/images/ShareSVG.svg'
const Note = ({noShareable, userImg, noteData}) => {
    const {title, content, selectedLang, createdAt, shareable} = noteData
    // console.log(new Date(createdAt.seconds, createdAt.nanoseconds).toDateString(), createdAt)
    const languages = useSelector(getLanguages)
    const [selectedLangData, setSelectedLangData] = useState(undefined)
    useEffect(() => {
        setSelectedLangData(getLangData(languages, selectedLang))
    }, [selectedLang])

   const dispatch = useDispatch()
    const extendNote = () => {
        dispatch(setNoteExtended(true))
        dispatch(setNoteExtendedData(noteData))
    }

    return (
        <div className='note' onClick={extendNote}>
            <div className="note-title">
                <p className="note-title">{title}</p>
                {userImg ? <img className='icon' src={userImg} alt=""/> : null}
                {!noShareable && shareable ? <img className='icon' src={ShareSVG} alt=""/> : null}
                {selectedLangData ? <img className='icon' src={selectedLangData.icon} alt=""/> : null}
            </div>
            <hr/>
            <pre className="note-content">{content.slice(0, 150)}</pre>
            {/*<p>{createdAt}</p>*/}
        </div>
    )
}
export default Note