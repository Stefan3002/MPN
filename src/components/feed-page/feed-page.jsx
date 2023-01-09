import './feed-page.css'
import {useEffect, useState} from "react";
import {computeFeedBack} from "../../utils/firebase/firebase";
import Note from "../note/note";
import {useSelector} from "react-redux";
import {getUserData} from "../../store/user/user-selectors";
import Blur from "../blur/blur";
import NoteExtension from "../note-extension/note-extension";
import {getNoteExtended, getNoteExtendedData} from "../../store/notes/notes-selectors";
const FeedPage = () => {
    const noteExtendedData = useSelector(getNoteExtendedData)
    const noteExtended = useSelector(getNoteExtended)
    const [feed, setFeed] = useState([])
    const userData = useSelector(getUserData)
    useEffect(() => {
        (async () => {
            setFeed(await computeFeedBack(userData))
        })()
    }, [userData])

    return (
        <div className='feed-page'>
            <h1>Your programming feed</h1>
            <div className="feed-viewer">
                {feed.map((feedItem) => {
                    const {userNote, userDisplayName, userImg} = feedItem
                    return <Note noShareable={true} userImg={userImg} noteData={userNote} />
                })}
            </div>
            {noteExtended ? <div><Blur /><NoteExtension noCRUD={true} note={noteExtendedData} /></div> : null}
        </div>
    )
}
export default FeedPage