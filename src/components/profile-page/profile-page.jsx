import './profile-page.css'
import {useSelector} from "react-redux";
import {getUser, getUserData} from "../../store/user/user-selectors";
import {useEffect} from "react";
import {useNavigate} from "react-router";
const ProfilePage = () => {
    const user = useSelector(getUser)
    const userData = useSelector(getUserData)
    const navigate = useNavigate()
    useEffect(() => {
        if(!user)
            navigate('/auth')
    }, [user])
    return (
        <div className='profile-page'>
            <h1>The profile of a modern Programmer</h1>
            <p>That's u, {userData ? userData.displayName : null}!</p>
            <img className='profile-img' src={userData ? userData.photoURL : null} alt=""/>
        </div>
    )
}
export default ProfilePage