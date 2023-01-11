import './following.css'
import {Link} from "react-router-dom";
const Following = ({followingPerson}) => {
    const {displayName, photoURL, uid} = followingPerson
    return (
        <Link to={`/publicprofile/${uid}`}>
            <div className='following'>
                <p>{displayName}</p>
                <img src={photoURL} alt=""/>
            </div>
        </Link>
    )
}
export default Following