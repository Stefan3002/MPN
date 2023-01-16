import './auth-page.css'
import GoogleLogo from '../../../utils/images/Google.svg'
import Button from "../../button/button";
import {createUserDocBack, googleAuthBack} from "../../../utils/firebase/firebase";
import {useNavigate} from "react-router";
import CatchPhrase from "../catch-phrase/catch-phrase";
import Steps from "../steps/steps";
import Twomodes from "../twomodes/twomodes";
import Logo from "../logo/logo";
import TwomodesChoice from "../twomodes-choice/twomodes-choice";
import Separator from "../separator/separator";
import Footer from "../footer/footer";
const AuthPage = () => {

    return (
        <div className='auth-page'>
            <div className="top-section-wrapper">
                <div className="top-section">
                    <h1 className='big-title'>Modern Programmer's Notebook</h1>
                    <h2 className='subtitle'>Start taking notes today, programmer!</h2>
                    {/*<Button text="Google" img={GoogleLogo} onClickHandler={googleAuthFace} />*/}
                </div>
            </div>
            <div className="bottom-section">
                <CatchPhrase />
                <Separator height='4em' />
                <Steps />
                <Logo />
                <Twomodes />
                <Separator />
                <TwomodesChoice />
                <Footer />
            </div>
        </div>
    )
}
export default AuthPage