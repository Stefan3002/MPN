import './steps.css'
import AddSVG from '../../../utils/images/landing-page-images/AddSVG.svg'
import WriteSVG from '../../../utils/images/landing-page-images/WriteSVG.svg'
import PostSVG from '../../../utils/images/landing-page-images/PostSVG.svg'
const Steps = () => {
    return (
        <div className='steps'>
            <div className="left">
                <h2>Easy as <spans className="high">1,2,3</spans>!</h2>
            </div>
            <div className="right">
                <div className="step">
                    <span className="step-title">1.</span>
                    <p>Press add.</p>
                    <img className='landing-icon' src={AddSVG} alt=""/>
                </div>
               <div className="step">
                   <span className="step-title">2.</span>
                   <p>Write the note.</p>
                   <img className='landing-icon' src={WriteSVG} alt=""/>
               </div>
                <div className="step">
                    <span className="step-title">3.</span>
                    <p>View your notes!</p>
                    <img className='landing-icon' src={PostSVG} alt=""/>
                </div>
            </div>
        </div>
    )
}
export default Steps