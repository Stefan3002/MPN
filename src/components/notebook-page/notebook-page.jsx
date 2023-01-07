import './notebook-page.css'
import AddSVG from '../../utils/images/AddSVG.svg'
import {useSelector} from "react-redux";
import {getUser} from "../../store/user/user-selectors";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import AddNotePage from "../add-note-page/add-note-page";
import Blur from "../blur/blur";
const NotebookPage = () => {
    const user = useSelector(getUser)
    const navigate = useNavigate()
    useEffect(() => {
        if(!user)
            navigate('/auth')
    }, [user])
    const [addPage, setAddPage] = useState(false)

    const addNote = () => {
        setAddPage(true)
    }

    return (
        <div className='notebook-page'>
            <h1>Your Notebook</h1>
            <img onMouseDown={addNote} className='icon' src={AddSVG} alt=""/>
            {addPage ? <div> <Blur /> <AddNotePage /></div> : null}
        </div>
    )
}
export default NotebookPage