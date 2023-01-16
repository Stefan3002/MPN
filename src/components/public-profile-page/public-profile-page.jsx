import './public-profile-page.css'
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {addFollowingBack, getUserPublicDataBack, removeFollowingBack} from "../../utils/firebase/firebase";
import {eventWrapper} from "@testing-library/user-event/dist/utils";
import NotesViewer from "../notes-viewer/notes-viewer";
import EyeSVG from '../../utils/images/EyeEVG.svg'
import followSVG from '../../utils/images/AddSVG.svg'
import {amIFollowing} from "../../utils/calculations";
import {useSelector} from "react-redux";
import {getUserData} from "../../store/user/user-selectors";
import Blur from "../blur/blur";
import NoteExtension from "../note-extension/note-extension";
import Comments from "../comments/comments";
import {getCommentNote, getCommentsOpened} from "../../store/notes/notes-selectors";
const PublicProfilePage = () => {

    const {userUid} = useParams()
    const [userData, setUserData] = useState({})
    const [following, setFollowing] = useState(false)
    const currentUserData = useSelector(getUserData)
    useEffect(() => {
        (async () => {
           setUserData(await getUserPublicDataBack(userUid))
        })()
    }, [userUid])

    useEffect(() => {
        if(currentUserData && userData)
            setFollowing(amIFollowing(currentUserData.following, userData.email))
    },[currentUserData, userData])

    const addFollowingFront = async () => {
        await addFollowingBack(currentUserData, userUid)
        setFollowing(true)
    }

    const removeFollowingFront = async () => {
        await removeFollowingBack(currentUserData, userUid)
        setFollowing(false)
    }
    const commentsOpened = useSelector(getCommentsOpened)
    const noteData = useSelector(getCommentNote)

    return (
        <div className="public-profile-page-wrapper">
            {userData ? <div className='public-profile-page'>
                <div className="header" >
                    <h1>{userData.name}</h1>
                </div>
                {following ? <img onClick={removeFollowingFront} className='following-icon' src={EyeSVG} alt=""/> : <img onClick={addFollowingFront} className='following-icon' src={followSVG} alt=""/>}
                <img className='icon' src={userData.photoURL} alt=""/>
                <p className='subtitle'>Public notes:</p>
                <NotesViewer noShareable={true} notes={userData.notes} />
            </div> : null}
            {commentsOpened ? <div> <Blur /> <NoteExtension noCRUD={true} note={noteData} /> <Comments noteData={noteData} /></div> : null}

        </div>
    )
}
export default PublicProfilePage