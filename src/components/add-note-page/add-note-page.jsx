import './add-node-page.css'
import XSVG from '../../utils/images/XSVG.svg'
import Blur from "../blur/blur";
import {useDispatch, useSelector} from "react-redux";
import {setAddNotesExtended} from "../../store/notes/notes-actions";
import Button from "../button/button";
import addSVG from '../../utils/images/AddSVG.svg'
import {getUser, getUserData} from "../../store/user/user-selectors";
import {addNoteBack} from "../../utils/firebase/firebase";
import {setUserData} from "../../store/user/user-actions";
import {getLanguages, getSelectedLang} from "../../store/utils/utils-selectors";
import LanguagesViewer from "../languages-viewer/languages-viewer";
const AddNotePage = () => {
    const dispatch = useDispatch()
    const languages = useSelector(getLanguages)
    let selectedLang = useSelector(getSelectedLang)
    const closeAddNoteMenu = () => {
        dispatch(setAddNotesExtended(false))
    }
    const user = useSelector(getUser)
    const addNoteFront = async (event) => {
        event.preventDefault()
        const title = event.target[0].value
        const content = event.target[1].value
        if(!selectedLang)
            selectedLang = 'Plain text'
        const docSnap = await addNoteBack(title, content, selectedLang, user.uid)
        dispatch(setAddNotesExtended(false))
        dispatch(setUserData(docSnap.data()))
    }

    return (
        <div className='add-note-page'>
            <img onClick={closeAddNoteMenu} className='icon' src={XSVG} alt=""/>
            <h1>Add a new note, programmer!</h1>
            <form action="" onSubmit={addNoteFront}>
                <label htmlFor='note-title'>Title of note</label>
                <br/>
                <input id='note-title' type="text" placeholder='Title of note'/>
                <br/>
                <label htmlFor='note-content'>Content of note</label>
                <br/>
                <textarea name="" id="note-content" cols="30" rows="10" placeholder="Programmer's note"></textarea>
                <br/>
                <label>Language</label>
                <br/>
                <LanguagesViewer languages={languages} />
                <br/>
                <Button text='Add' img={addSVG} onClickHandler={undefined} />
            </form>
        </div>
    )
}
export default AddNotePage