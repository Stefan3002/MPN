import './notebook-page.css'
import AddSVG from '../../utils/images/AddSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {getUser, getUserData} from "../../store/user/user-selectors";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import AddNotePage from "../add-note-page/add-note-page";
import Blur from "../blur/blur";
import {setAddNotesExtended} from "../../store/notes/notes-actions";
import {getAddNotesExtended, getNoteExtended, getNoteExtendedData} from "../../store/notes/notes-selectors";
import NotesViewer from "../notes-viewer/notes-viewer";
import NoteExtension from "../note-extension/note-extension";
const NotebookPage = () => {
    const user = useSelector(getUser)
    const userData = useSelector(getUserData)
    const navigate = useNavigate()
    useEffect(() => {
        if(!user)
            navigate('/auth')
    }, [user])
    const dispatch = useDispatch()
    const addPage = useSelector(getAddNotesExtended)
    const noteExtended = useSelector(getNoteExtended)
    const noteExtendedData = useSelector(getNoteExtendedData)
    const addNote = () => {
        dispatch(setAddNotesExtended(true))
    }

    return (
        <div className='notebook-page'>
            <h1>Your Notebook</h1>
            <img onMouseDown={addNote} className='add-button icon' src={AddSVG} alt=""/>
            {addPage ? <div> <Blur /> <AddNotePage /></div> : null}
            {userData ? <NotesViewer notes={userData.notes} /> : null}
            {noteExtended ? <div><Blur /><NoteExtension noCRUD={false} note={noteExtendedData} /></div> : null}
        </div>
    )
}
export default NotebookPage