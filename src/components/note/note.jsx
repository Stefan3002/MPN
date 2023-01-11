import './note.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLanguages} from "../../store/utils/utils-selectors";
import {getLangData} from "../../utils/calculations";
import {setNoteExtended, setNoteExtendedData} from "../../store/notes/notes-actions";
import ShareSVG from '../../utils/images/ShareSVG.svg'
import EmptyHeartSVG from '../../utils/images/EmptyHeartSVG.svg'
import {Link} from "react-router-dom";
import {increaseHeartsBack, transformDateBack} from "../../utils/firebase/firebase";
const Note = ({noShareable, userImg, noteData, uid}) => {

    const {title, content, selectedLang, createdAt, shareable} = noteData
    const DBHearts = noteData.hearts
    const [hearts, setHearts] = useState(DBHearts)
    const [date, setDate] = useState(new Date())
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

    useEffect(() => {
        if(createdAt)
            setDate(transformDateBack(createdAt))
    }, [createdAt])


    const increaseHeartsFront = async () => {
        setHearts((await increaseHeartsBack(uid, noteData)).hearts)
    }

    return (
        <div className='note'>
            <div className="top-section" onClick={extendNote}>
                <div className="note-title">
                    <p className="note-title">{title}</p>
                    {userImg ? <Link to={`/publicprofile/${uid}`}><img className='icon' src={userImg} alt={noteData.displayName}/></Link> : null}
                    {!noShareable && shareable ? <img className='icon' src={ShareSVG} alt=""/> : null}
                    {selectedLangData ? <img className='icon' src={selectedLangData.icon} alt=""/> : null}
                </div>
                <hr/>
                <span className="content"><pre className="note-content">{content.slice(0, 150)}</pre></span>
            </div>
            <div className="bottom-section">
                <div className="hearts-stats">
                    <img className='heart-icon' onClick={increaseHeartsFront} src={EmptyHeartSVG} alt=""/>
                    <p>{hearts}</p>
                </div>
                <p className='date'>{date.toLocaleDateString()}</p>
            </div>
        </div>
    )
}
export default Note