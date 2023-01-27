import './error-modal.css'
import ErrorSVG from '../../utils/images/ErrorSVG.svg'
import {useDispatch} from "react-redux";
import {setError, setErrorMessage} from "../../store/error/error-actions";
const ErrorModal = ({errorMessage}) => {
    const dispatch = useDispatch()
    const dismissError = () => {
        dispatch(setError(false))
        dispatch(setErrorMessage(undefined))
    }

    return (
        <div className='error-container' onClick={dismissError}>
            <div className="header">
                <p className='header-text'>Something bad happened!</p>
            </div>
            <div className="body">
                <img src={ErrorSVG} alt=""/>
                <p>{errorMessage}</p>
            </div>
        </div>
    )
}
export default ErrorModal