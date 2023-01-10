import './following-page.css'
import {useSelector} from "react-redux";
import {getUserData} from "../../store/user/user-selectors";
import {useEffect, useState} from "react";
import {getFollowingDataBack} from "../../utils/firebase/firebase";
const FollowingPage = () => {
    const userData = useSelector(getUserData)
    const [following, setFollowing] = useState([])

    useEffect(() => {
        if(userData)
            setFollowing(getFollowingDataBack(userData.following))
    }, [userData])
    console.log(following)
    return (
        <div className='following-page'>
            {following.map((followingPerson) => {
                return <p>{followingPerson.displayName}</p>
            })}
        </div>
    )
}
export default FollowingPage