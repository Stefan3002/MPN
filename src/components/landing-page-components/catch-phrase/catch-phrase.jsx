import './catch-phrase.css'
import NotepadSVG from '../../../utils/images/landing-page-images/NoteSVG.svg'
import Button from "../../button/button";
import {useNavigate} from "react-router";
import {googleAuthBack} from "../../../utils/firebase/firebase";
import GoogleImg from '../../../utils/images/Google.svg'
import {useDispatch} from "react-redux";
import extendNavigation from "../../../store/navigation/navigation-actions";
import {setError, setErrorMessage} from "../../../store/error/error-actions";
import {setLoading} from "../../../store/utils/utils-actions";
const CatchPhrase = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const googleAuthFace = async () => {

        const userData = await googleAuthBack()
        try{
            dispatch(setLoading(true))
            const response = await fetch(`${process.env.REACT_APP_BACKURL}/auth/register`, {
                method: 'POST',
                body: new URLSearchParams({
                    'userData': JSON.stringify(userData)
                })
            })
            dispatch(setLoading(false))
            const responseData = await response.json()
            if(!response.ok)
                throw new Error(responseData.errorMessage)
            dispatch(extendNavigation(false))
            navigate('/profile')
        }catch (err){
            dispatch(setError(true))
            dispatch(setErrorMessage(err.message))
        }
    }

    return (
        <div className='catch-phrase'>
            <div className="left">
                <div className="left-wrapper">
                    <h2>Tired of taking notes on <span className="high">notepad</span>?</h2>
                </div>
            </div>
            <div className="middle">
                <img className='landing-icon' src={NotepadSVG} alt=""/>
            </div>
            <div className="right-top-section">
                <div className="right-top-section-wrapper">
                    <p><span className="high">Forget</span> about it!</p>
                </div>
            </div>
            <div className="right-bottom-section">
                <div className="right-bottom-wrapper">
                    <Button bgcolor='#D5CEA3' img={GoogleImg} text='Log In' onClickHandler={googleAuthFace} />
                </div>
            </div>
        </div>
    )
}
export default CatchPhrase