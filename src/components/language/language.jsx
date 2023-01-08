import './language.css'
import {useDispatch, useSelector} from "react-redux";
import {setSelectedLang} from "../../store/utils/utils-actions";
import {getSelectedLang} from "../../store/utils/utils-selectors";
const Language = ({name, icon}) => {
    const dispatch = useDispatch()
    const selectedLang = useSelector(getSelectedLang)
    const selectLanguage = (event) => {
        const selectedLang = event.target.id
        dispatch(setSelectedLang(selectedLang))
    }

    return (
        <div id={name} className='language' onClick={selectLanguage} style={selectedLang === name ? {backgroundColor: 'lightgray'} : null}>
            <p id={name}>{name}</p>
            <img id={name} className='icon' src={icon} alt=""/>
        </div>
    )
}
export default Language