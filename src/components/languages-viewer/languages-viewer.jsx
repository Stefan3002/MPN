import './languages-viewer.css'
import Language from "../language/language";
const LanguagesViewer = ({languages}) => {
    return (
        <div className='languages-viewer'>
            {languages ? languages.map((language) => {
                const {name, icon} = language
                return <Language name={name} icon={icon} key={name} />
            }) : null}
        </div>
    )
}
export default LanguagesViewer