import './comment.css'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCommentsOpened} from "../../store/notes/notes-actions";
const Comment = ({commentData}) => {
    const {comment, displayName, uid, photoURL} = commentData
    const dispatch = useDispatch()
    const closeComments = () => {
        dispatch(setCommentsOpened(false))
    }

    return (
        <div className="comment">
            <Link onClick={closeComments} to={`/publicprofile/${uid}`}>
                <div className="user-info">
                    <img className='photo' src={photoURL} alt=""/>
                    <p className='name'>{displayName}</p>
                </div>
            </Link>
            <p className='comment'>{comment}</p>
        </div>
    )
}
export default Comment