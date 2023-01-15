import './twomodes-choice.css'
import Notebook2SVG from '../../../utils/images/landing-page-images/Notebook2SVG.svg'
import Social2SVG from '../../../utils/images/landing-page-images/Social2SVG.svg'
const TwomodesChoice = () => {
    return (
        <div className="twomodes-choice">
            <div className="left">
                <h2>Notebook</h2>
                <img className='landing-icon' src={Notebook2SVG} alt=""/>
            </div>
            <div className="right">
                <h2>SocialMedia</h2>
                <img className='landing-icon' src={Social2SVG} alt=""/>
            </div>
        </div>
    )
}
export default TwomodesChoice