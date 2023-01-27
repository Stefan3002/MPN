import './add-node-page.css'
import XSVG from '../../utils/images/XSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {setAddNotesExtended} from "../../store/notes/notes-actions";
import Button from "../button/button";
import addSVG from '../../utils/images/AddSVG.svg'
import {getUser} from "../../store/user/user-selectors";
import {setUserData} from "../../store/user/user-actions";
import {getLanguages, getSelectedLang, getShareable} from "../../store/utils/utils-selectors";
import LanguagesViewer from "../languages-viewer/languages-viewer";

import ShareableViewer from "../shareable-viewer/shareable-viewer";
import {setError, setErrorMessage} from "../../store/error/error-actions";
import {setLoading} from "../../store/utils/utils-actions";
const AddNotePage = () => {
    const dispatch = useDispatch()
    const languages = useSelector(getLanguages)
    let selectedLang = useSelector(getSelectedLang)
    const closeAddNoteMenu = () => {
        dispatch(setAddNotesExtended(false))
    }
    const shareable = useSelector(getShareable)
    const user = useSelector(getUser)
    const addNoteFront = async (event) => {
        event.preventDefault()
        const title = event.target[0].value
        const content = event.target[1].value
        if(!selectedLang)
            selectedLang = 'Plain text'
        try{
            dispatch(setLoading(true))
            const response = await fetch('http://localhost:5000/notebook', {
                method: 'POST',
                body: new URLSearchParams({
                    title,
                    content,
                    selectedLang,
                    shareable,
                    uid: user.uid
                })
            })
            const responseData = await response.json()
            dispatch(setLoading(false))
            if(!response.ok)
                throw new Error(responseData.errorMessage)
            dispatch(setAddNotesExtended(false))
            dispatch(setUserData(responseData.docSnapData))
        } catch(err) {
            dispatch(setError(true))
            dispatch(setErrorMessage(err.message))
        }
        // const docSnap = await addNoteBack(title, content, selectedLang, shareable, user.uid)
        // dispatch(setAddNotesExtended(false))
        // dispatch(setUserData(docSnap.data()))
    }



    return (
        <div className='add-note-page'>
            <img onClick={closeAddNoteMenu} className='icon' src={XSVG} alt=""/>
            <h1>Add a new note, programmer!</h1>
            <form action="" onSubmit={addNoteFront}>
                <label htmlFor='note-title'>Title of note</label>
                <br/>
                <input id='note-title' required type="text" placeholder='Title of note'/>
                <br/>
                <label htmlFor='note-content'>Content of note</label>
                <br/>
                <textarea name="" id="note-content" required cols="30" rows="10" placeholder="Programmer's note"></textarea>
                <br/>
                <label>Language</label>
                <br/>
                <span className="lang-viewer"><LanguagesViewer languages={languages} /></span>
                <p>Shareable?</p>
                <span className="shareable-viewer-helper"><ShareableViewer /></span>
                <br/>
                <Button text='Add' img={addSVG} onClickHandler={undefined} />
            </form>
        </div>
    )
}
export default AddNotePage