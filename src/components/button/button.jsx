import './button.css'
import GoogleLogo from "../../utils/images/Google.svg";
const Button = ({text, img, onClickHandler}) => {
    return (
        <button onMouseDown={onClickHandler} className='button'>
            <span className="button-content"><img src={img} alt=""/><p>{text}</p></span>
        </button>
    )
}
export default Button