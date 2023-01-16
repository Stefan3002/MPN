import './notebook-page.css'
import AddSVG from '../../utils/images/AddSVG.svg'
import {useDispatch, useSelector} from "react-redux";
import {getUser, getUserData} from "../../store/user/user-selectors";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import AddNotePage from "../add-note-page/add-note-page";
import Blur from "../blur/blur";
import {setAddNotesExtended} from "../../store/notes/notes-actions";
import {
    getAddNotesExtended, getCommentNote,
    getCommentsOpened,
    getNoteExtended,
    getNoteExtendedData
} from "../../store/notes/notes-selectors";
import NotesViewer from "../notes-viewer/notes-viewer";
import NoteExtension from "../note-extension/note-extension";
import extendNavigation from "../../store/navigation/navigation-actions";
import Comments from "../comments/comments";
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
    const commentsOpened = useSelector(getCommentsOpened)
    const noteData = useSelector(getCommentNote)
    const addNote = () => {
        dispatch(setAddNotesExtended(true))
    }

    const [filteredNotes, setFilteredNotes] = useState([])

    useEffect(() => {
        if(userData)
            setFilteredNotes(userData.notes)
    }, [userData])

    // useEffect(() => {
    //     dispatch(extendNavigation(false))
    // }, [])

    const filterNotes = (event) => {
        if(event){
            setFilteredNotes(userData.notes)
            const target = event.target.value
            setFilteredNotes(userData.notes.filter(note => {
                return note.title.includes(target) || note.content.includes(target)
            }))
        }
    }
    return (
        <div className='notebook-page'>
            <h1>Your Notebook</h1>
            <input onChange={filterNotes} type="text" placeholder='Search note.'/>
            <img onMouseDown={addNote} className='add-button icon' src={AddSVG} alt=""/>
            {addPage ? <div> <Blur /> <AddNotePage /></div> : null}
            {userData ? <NotesViewer uid={userData.uid} notes={filteredNotes} /> : null}
            {noteExtended ? <div><Blur /><NoteExtension noCRUD={false} note={noteExtendedData} /></div> : null}
            {commentsOpened ? <div> <Blur /> <NoteExtension noCRUD={true} note={noteData} /> <Comments noteData={noteData} /></div> : null}
        </div>
    )
}
export default NotebookPage