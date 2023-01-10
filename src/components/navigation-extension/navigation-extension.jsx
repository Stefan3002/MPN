import "./navigation-extension.css"
import extendNavigation from "../../store/navigation/navigation-actions";
import {useDispatch, useSelector} from "react-redux";
import HomeSVG from "../../utils/images/House.svg";
import NotebookSVG from "../../utils/images/Notebook.svg";
import AuthSVG from '../../utils/images/AuthSVG.svg'
import ArrowsSVG from '../../utils/images/ArrowsSVG.svg'
import maleAvatarSVG from '../../utils/images/MaleAvatar.svg'
import LeaveSVG from '../../utils/images/LeaveSVG.svg'
import {getUser, getUserData} from "../../store/user/user-selectors";
import {Link} from "react-router-dom";
import CloseSVG from '../../utils/images/XSVG.svg'
import FollowingSVG from '../../utils/images/EyeEVG.svg'
import {signOutBack} from "../../utils/firebase/firebase";

const NavigationExtension = () => {
    const dispatch = useDispatch()
    const closeNavigation = () => {
        dispatch(extendNavigation(false))
    }
    const user = useSelector(getUser)
    const userData = useSelector(getUserData)

    const signOutFront = async () => {
       await signOutBack()
    }

    return (
        <div className='navigation-extension'>
            <div className="top-content">
                <div className="header">
                    <h1>Modern Programmer's Notebook</h1>
                    <p>Hi Programmer!</p>
                    <img onClick={closeNavigation} className='close-icon' src={CloseSVG} alt=""/>
                </div>
                <div className="navigation-icons">
                    {
                        user ? <Link to='/profile'><span onClick={closeNavigation} className="navigation-option"><img className='navigation-icon' src={maleAvatarSVG} alt=""/><p>{userData ? userData.displayName : null}</p></span></Link> : <Link to='/auth'><span className='navigation-option'><img className='navigation-icon' src={AuthSVG} alt=""/><p>Authenticate</p></span></Link>
                    }
                    <Link to='/home'><span onClick={closeNavigation} className='navigation-option'><img className='navigation-icon' src={HomeSVG} alt=""/><p>Home</p></span></Link>
                    <Link to='/notebook'><span onClick={closeNavigation} className='navigation-option'><img className='navigation-icon' src={NotebookSVG} alt=""/><p>Notebook</p></span></Link>
                    <Link to='/feed'><span onClick={closeNavigation} className='navigation-option'><img className='navigation-icon' src={ArrowsSVG} alt=""/><p>Feed</p></span></Link>
                    <Link to='/following'><span onClick={closeNavigation} className='navigation-option'><img className='navigation-icon' src={FollowingSVG} alt=""/><p>Following</p></span></Link>
                    <Link to='/auth'><span onClick={signOutFront} className='navigation-option'><img className='navigation-icon' src={LeaveSVG} alt=""/><p>Sign out</p></span></Link>
                </div>
            </div>
            <div className="bottom-content">
                {/*<p>About</p>*/}
            </div>
        </div>
    )
}
export default NavigationExtension