import './twomodes.css'
import SocialSVG from '../../../utils/images/landing-page-images/SocialSVG.svg'
const Twomodes = () => {
    return (
        <div className="twomodes">
            <div className="left">
                <div className="left-wrapper">
                    <img src={SocialSVG} alt=""/>
                </div>
            </div>
            <div className="right">
                <h2><span className='high'>More</span> than a notekeeper.</h2>
            </div>
        </div>
    )
}
export default Twomodes