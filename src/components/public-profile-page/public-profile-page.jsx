import './public-profile-page.css'
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getUserPublicDataBack} from "../../utils/firebase/firebase";
import {eventWrapper} from "@testing-library/user-event/dist/utils";
import NotesViewer from "../notes-viewer/notes-viewer";
import EyeSVG from '../../utils/images/EyeEVG.svg'
import {amIFollowing} from "../../utils/calculations";
import {useSelector} from "react-redux";
import {getUserData} from "../../store/user/user-selectors";
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
        if(currentUserData)
            setFollowing(amIFollowing(currentUserData.following, userData.email))
    },[currentUserData, userData])

    return (
        <div className="public-profile-page-wrapper">
            {userData ? <div className='public-profile-page'>
                <div className="header" >
                    <h1>{userData.name}</h1>
                </div>
                {following ? <img className='following-icon' src={EyeSVG} alt=""/> : null}
                <img className='icon' src={userData.photoURL} alt=""/>
                <p className='subtitle'>Public notes:</p>
                <NotesViewer noShareable={true} notes={userData.notes} />
            </div> : null}
        </div>
    )
}
export default PublicProfilePage