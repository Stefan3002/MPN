import './note-extension.css'
import XSVG from '../../utils/images/XSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {setNoteExtended} from "../../store/notes/notes-actions";
import {useEffect, useState} from "react";
import {getLangData} from "../../utils/calculations";
import {getLanguages} from "../../store/utils/utils-selectors";
import FireSVG from '../../utils/images/FireSVG.svg'
import {getUser} from "../../store/user/user-selectors";
import {deleteNoteBack, modifyNoteBack} from "../../utils/firebase/firebase";
import {setUserData} from "../../store/user/user-actions";
import PenSVG from '../../utils/images/PenSVG.svg'
const NoteExtension = ({noCRUD, note}) => {
    const user = useSelector(getUser)
    const {content, title, selectedLang} = note
    const dispatch = useDispatch()
    const [langIcon, setLangIcon] = useState(undefined)
    const languages = useSelector(getLanguages)
    useEffect(() => {
        setLangIcon(getLangData(languages, selectedLang))
    }, [])
    const closeNoteExtension = () => {
        dispatch(setNoteExtended(false))
    }

    const deleteNoteFront = async () => {
        // if(confirm("Are you sure you want to delete the note?")) {
            // This is for real-time update
            dispatch(setUserData(await deleteNoteBack(user.uid, note.title)))
            dispatch(setNoteExtended(false))
        // }
    }
    const modifyNoteFront = async () => {
        await modifyNoteBack(user.uid, note.title)
    }

    return (
        <div className='note-extension'>
            <div className="menu">
                <img onClick={closeNoteExtension} className='icon' src={XSVG} alt=""/>
                {!noCRUD ? <div className="crud-menu">
                    <img onClick={modifyNoteFront} className='icon' src={PenSVG} alt=""/>
                    <img onClick={deleteNoteFront} className='icon' src={FireSVG} alt=""/>
                </div> : null}

            </div>
            <hr/>
            <div className="note-body">
                <div className="note-header">
                    <h1>{title}</h1>
                    {langIcon ? <img className='icon' src={langIcon.icon} alt=""/> : null}
                </div>
                <pre>{content}</pre>
            </div>
        </div>
    )
}
export default NoteExtension