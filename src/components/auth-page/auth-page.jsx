import './auth-page.css'
import GoogleLogo from '../../utils/images/Google.svg'
import Button from "../button/button";
import {createUserDocBack, googleAuthBack} from "../../utils/firebase/firebase";
import {useNavigate} from "react-router";
const AuthPage = () => {
    const navigate = useNavigate()
    const googleAuthFace = async () => {
        const userData = await googleAuthBack()
        await createUserDocBack(userData)
        navigate(-1)
    }

    return (
        <div className='auth-page'>
            <div className="top-section-wrapper">
                <div className="top-section">
                    <h1>Modern Programmer's Notebook</h1>
                    <h2>Start taking notes today, programmer!</h2>
                    <Button text="Google" img={GoogleLogo} onClickHandler={googleAuthFace} />
                </div>
            </div>
            <div className="bottom-section" />
        </div>
    )
}
export default AuthPage