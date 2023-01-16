import './comments.css'
import Comment from "../comment/comment";
import ArrowUpSVG from '../../utils/images/ArrowUpSVG.svg'
import CloseSVG from '../../utils/images/XSVG.svg'
import Button from "../button/button";
import {addCommentBack} from "../../utils/firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../store/user/user-selectors";
import {setCommentData, setCommentsOpened} from "../../store/notes/notes-actions";
const Comments = ({noteData}) => {
    const dispatch = useDispatch()
    const {uid, title, comments} = noteData
    const userData = useSelector(getUserData)
    const addCommentFront = async (event) => {
        if(userData) {
            event.preventDefault()
            const input = event.target[0].value

            // Sanitize input
            let goodInput = true
            for (let letter of input) {
                if(letter === '<' || letter === '>') {
                    goodInput = false
                    alert("Trying to HTML Inject me? XD")
                    break
                }
            }
            if(input.length > 100){
                alert("Too many characters.")
                goodInput = false
            }
            if(goodInput) {
                const newNote = await addCommentBack(input, uid, title, userData.uid, userData.photoURL, userData.displayName)
                dispatch(setCommentData(newNote))
            }
        }
    }
    const closeComments = () => {
        dispatch(setCommentsOpened(false))
    }

    return (
        <div className="comments">
            <div className="top-section">
                <img onClick={closeComments} className='close-icon' src={CloseSVG} alt=""/>
                <h2>Comments</h2>
            </div>
            <div className="mid-section">
                {
                    comments.comments.map((comment) => {
                        return <Comment commentData={comment} />
                    })
                }
            </div>
            <div className="bottom-section">
                <form action="" onSubmit={addCommentFront}>
                    <input type="text" placeholder='I think...'/>
                    <Button img={ArrowUpSVG} text='' bgcolor='transparent'/>
                </form>
            </div>
        </div>
    )
}
export default Comments