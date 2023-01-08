import './profile-page.css'
import {useSelector} from "react-redux";
import {getUser, getUserData} from "../../store/user/user-selectors";
import {useEffect, useState} from "react";
import {computeStatsLanguages} from "../../utils/calculations";
const ProfilePage = () => {
    const userData = useSelector(getUserData)
    const [stats, setStats] = useState({})

    useEffect(() => {
        if(userData)
            setStats(computeStatsLanguages(userData.notes))

    }, [userData])

    return (
        <div className='profile-page'>
            <h1>The profile of a modern Programmer</h1>
            <p>That's u, {userData ? userData.displayName : null}!</p>
            <img className='profile-img' src={userData ? userData.photoURL : null} alt=""/>
            <p>You have {userData ? userData.notes.length : 0} notes, programmer.</p>
            {stats ?
                <div className="stats-viewer">
                    {Object.keys(stats).map((stat) => {
                        return <p>{stat} {stats[stat]}</p>
                    })}
            </div> : null}

        </div>
    )
}
export default ProfilePage