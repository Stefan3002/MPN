import './profile-page.css'
import {useSelector} from "react-redux";
import {getUser, getUserData} from "../../store/user/user-selectors";
import {useEffect, useState} from "react";
import {computeStatsLanguages, getLangData} from "../../utils/calculations";
import StatsViewer from "../stats-viewer/stats-viewer";
import {Link} from "react-router-dom";
import {getLanguages} from "../../store/utils/utils-selectors";
const ProfilePage = () => {
    const userData = useSelector(getUserData)
    const user = useSelector(getUser)
    const [stats, setStats] = useState({})
    const languages = useSelector(getLanguages)
    const [preferredLangIcon, setPreferredLangIcon] = useState(undefined)

    useEffect(() => {
        if(userData)
            setStats(computeStatsLanguages(userData.notes))
    }, [userData])

    useEffect(() => {
        if(userData)
            setPreferredLangIcon(getLangData(languages, userData.preferredLang).icon)
    }, [languages])


    return (
        <div className="profile-page-wrapper">
            {user ? <div className='profile-page'>
                <h1>The profile of a modern Programmer</h1>
                <p>That's u, {userData ? userData.displayName : null}!</p>
                <p>Public profile <Link to={`/publicprofile/${user.uid}`}>here.</Link></p>
                <img className='profile-img' src={userData ? userData.photoURL : null} alt=""/>
                <p>You are a <span className="preferred-lang">{userData.preferredLang}</span> programmer!</p>
                <img className='preferred-lang-icon' src={preferredLangIcon} alt=""/>
                <p>You have {userData ? userData.notes.length : 0} notes, programmer.</p>
                {stats ? <StatsViewer stats={stats} /> : null}
            </div> : null}

        </div>
    )
}
export default ProfilePage