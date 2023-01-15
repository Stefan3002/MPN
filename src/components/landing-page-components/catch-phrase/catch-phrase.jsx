import './catch-phrase.css'
import NotepadSVG from '../../../utils/images/landing-page-images/NoteSVG.svg'
import Notepad2SVG from '../../../utils/images/landing-page-images/NotepadSVG.svg'
import Steps from "../steps/steps";
import Button from "../../button/button";
import {useNavigate} from "react-router";
import {createUserDocBack, googleAuthBack} from "../../../utils/firebase/firebase";
import GoogleImg from '../../../utils/images/Google.svg'
const CatchPhrase = () => {

    const navigate = useNavigate()
    const googleAuthFace = async () => {
        const userData = await googleAuthBack()
        await createUserDocBack(userData)
        navigate(-1)
    }

    return (
        <div className='catch-phrase'>
            <div className="left">
                <div className="left-wrapper">
                    <h2>Tired of taking notes on <span className="high">notepad</span>?</h2>
                    <Button img={GoogleImg} text='Log In' onClickHandler={googleAuthFace} />
                </div>
            </div>
            <div className="right-top-section">
                <p><span className="high">Forget</span> about it!</p>
            </div>
            <div className="right-bottom-section">
                <img className='landing-icon' src={NotepadSVG} alt=""/>
            </div>
        </div>
    )
}
export default CatchPhrase