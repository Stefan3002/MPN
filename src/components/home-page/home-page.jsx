import './home-page.css'
import NotesViewer from "../notes-viewer/notes-viewer";
import {useSelector} from "react-redux";
import {getUserData} from "../../store/user/user-selectors";
import {useEffect} from "react";
const HomePage = () => {

    const userData = useSelector(getUserData)
    let notes = undefined
    let profileImg = undefined
    if(userData) {
        notes = userData.notes
        profileImg = userData.photoURL
    }
    return (
        <div className='home-page'>
            <div className="recents">
                <p className='section-title'>Recent notes</p>
                {notes ? <NotesViewer notes={notes.slice(0,3)} /> : null}
            </div>
            <div className="snapshot">
                <p className="section-title">Programmer</p>
                <img className='profile-img' src={profileImg} alt=""/>
            </div>
        </div>
    )
}
export default HomePage