import './button.css'
import GoogleLogo from "../../utils/images/Google.svg";
const Button = ({bgcolor, text, img, onClickHandler}) => {
    return (
        <button onMouseDown={onClickHandler} className='button' style={{backgroundColor: `${bgcolor}`}}>
            <span className="button-content">{img ? <img src={img} alt=""/> : null}<p>{text}</p></span>
        </button>
    )
}
export default Button