import './following-page.css'
import {useSelector} from "react-redux";
import {getUserData} from "../../store/user/user-selectors";
import {useEffect, useState} from "react";
import {getFollowingDataBack} from "../../utils/firebase/firebase";
import FollowingViewer from "../following-viewer/following-viewer";
const FollowingPage = () => {
    const userData = useSelector(getUserData)
    const [following, setFollowing] = useState([])

    useEffect(() => {
        (async () => {
            if(userData) {
                const data = await getFollowingDataBack(userData.following)
                console.log('aaaaaaaaaa', data, userData.following)
                setFollowing(data)
            }
        })()
    }, [userData])
    return (
        <div className="following-page-wrapper">
            <h1>Programmers you follow:</h1>
            {following ? <FollowingViewer following={following} /> : null}
        </div>
    )
}
export default FollowingPage