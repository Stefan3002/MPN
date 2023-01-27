import './profile-page.css'
import {useSelector} from "react-redux";
import {getUser, getUserData} from "../../store/user/user-selectors";
import {useState} from "react";
import StatsViewer from "../stats-viewer/stats-viewer";
import {Link} from "react-router-dom";
import {getLanguages} from "../../store/utils/utils-selectors";
import UploadImage from "../upload-image/upload-image";
import ProfileImage from "../profile-image/profile-image";
import StockBanner from '../../utils/images/stockBanner.jpg'
import Banner from "../banner/banner";
const ProfilePage = ({}) => {
    const userData = useSelector(getUserData)
    const user = useSelector(getUser)
    const [stats, setStats] = useState({})
    const languages = useSelector(getLanguages)
    const [preferredLangIcon, setPreferredLangIcon] = useState(undefined)

    const triggerBannerUpload = () => {

    }


    if(!userData || Object.keys(userData).length === 0)
        return (
            <h1>No user!</h1>
        )
    else
        return (
            <div className="profile-page-wrapper">
                <Banner bannerURL={userData.bannerURL} />
                {/*<h1>The profile of a modern Programmer</h1>*/}
                {/*<p>That's u, {userData ? userData.displayName : null}!</p>*/}
                {/*<p>Public profile <Link to={`/publicprofile/${user.uid}`}>here.</Link></p>*/}
                <div className="middle-section">
                    <div className="profile-image">
                        <ProfileImage imgPath={userData.photoURL} />
                        <h2>{userData.displayName}</h2>
                    </div>
                    <div className="user-info">
                        {/*<p>Student</p>*/}
                    </div>
                </div>
                <UploadImage type='profile' />
                <UploadImage type='banner' />
                <p>You are a <span className="preferred-lang">{userData.preferredLang}</span> programmer!</p>
                <img className='preferred-lang-icon' src={preferredLangIcon} alt=""/>
                <p>You have {userData ? userData.notes.length : 0} notes, programmer.</p>
                {stats ? <StatsViewer stats={stats} /> : null}
            </div>
        )
}
export default ProfilePage