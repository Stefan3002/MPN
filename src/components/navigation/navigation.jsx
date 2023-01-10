import "./navigation.css"
import HomeSVG from '../../utils/images/House.svg'
import NotebookSVG from '../../utils/images/Notebook.svg'
import {useDispatch, useSelector} from "react-redux";
import extendNavigation from "../../store/navigation/navigation-actions";
import {userReducer} from "../../store/user/user-reducer";
import {getUser} from "../../store/user/user-selectors";
import AuthSVG from '../../utils/images/AuthSVG.svg'
import ArrowsSVG from '../../utils/images/ArrowsSVG.svg'
import maleAvatarSVG from '../../utils/images/MaleAvatar.svg'
import LeaveSVG from '../../utils/images/LeaveSVG.svg'
import FollowingSVG from '../../utils/images/EyeEVG.svg'
import {Outlet} from "react-router";

const Navigation = () => {
    const dispatch = useDispatch()
    const user = useSelector(getUser)
    const expandNavigation = () => {
        dispatch(extendNavigation(true))
    }
    const closeNavigation = () => {
        dispatch(extendNavigation(false))
    }
    return (
        <div className='app-wrapper'>
            <div className='navigation' onMouseEnter={expandNavigation} onMouseLeave={closeNavigation}>
                <div className="top-content">
                    <h1>MPN</h1>
                    <div className="navigation-icons">
                        {
                            user ? <img className='navigation-icon' src={maleAvatarSVG} alt=""/> : <span className='navigation-option'><img className='navigation-icon' src={AuthSVG} alt=""/></span>
                        }
                        <img className='navigation-icon' src={HomeSVG} alt=""/>
                        <img className='navigation-icon' src={NotebookSVG} alt=""/>
                        <img className='navigation-icon' src={ArrowsSVG} alt=""/>
                        <img className='navigation-icon' src={FollowingSVG} alt=""/>
                        <img className='navigation-icon' src={LeaveSVG} alt=""/>
                    </div>
                </div>
                <div className="bottom-content">
                    {/*<p>About</p>*/}
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export default Navigation