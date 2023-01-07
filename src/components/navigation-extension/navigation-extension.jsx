import "./navigation-extension.css"
import extendNavigation from "../../store/navigation/navigation-actions";
import {useDispatch, useSelector} from "react-redux";
import HomeSVG from "../../utils/images/House.svg";
import NotebookSVG from "../../utils/images/Notebook.svg";
import AuthSVG from '../../utils/images/AuthSVG.svg'
import maleAvatarSVG from '../../utils/images/MaleAvatar.svg'
import {getUser, getUserData} from "../../store/user/user-selectors";
import {Link} from "react-router-dom";

const NavigationExtension = () => {
    const dispatch = useDispatch()
    const closeNavigation = () => {
        dispatch(extendNavigation(false))
    }
    const user = useSelector(getUser)
    const userData = useSelector(getUserData)
    return (
        <div className='navigation-extension' onMouseLeave={closeNavigation}>
            <div className="top-content">
                <h1>Modern Programmer's Notebook</h1>
                <p>Hi Programmer!</p>
                <div className="navigation-icons">
                    {
                        user ? <Link to='/profile'><span className="navigation-option"><img className='navigation-icon' src={maleAvatarSVG} alt=""/><p>{userData ? userData.displayName : null}</p></span></Link> : <Link to='/auth'><span className='navigation-option'><img className='navigation-icon' src={AuthSVG} alt=""/><p>Authenticate</p></span></Link>
                    }
                    <span className='navigation-option'><img className='navigation-icon' src={HomeSVG} alt=""/><p>Home</p></span>
                    <Link to='/notebook'><span className='navigation-option'><img className='navigation-icon' src={NotebookSVG} alt=""/><p>Notebook</p></span></Link>
                </div>
            </div>
            <div className="bottom-content">
                <p>About</p>
            </div>
        </div>
    )
}
export default NavigationExtension