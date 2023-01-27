import './following.css'
import {Link} from "react-router-dom";
import ProfileImage from "../profile-image/profile-image";
const Following = ({followingPerson}) => {
    const {displayName, photoURL, uid} = followingPerson
    return (
        <Link to={`/publicprofile/${uid}`}>
            <div className='following'>
                <p>{displayName}</p>
                <img src={`${process.env.REACT_APP_BACKURL}/${photoURL}`} alt=""/>
            </div>
        </Link>
    )
}
export default Following