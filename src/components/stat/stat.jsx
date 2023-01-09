import './stat.css'
import {useEffect, useState} from "react";
import {getLangData} from "../../utils/calculations";
import {useSelector} from "react-redux";
import {getLanguages} from "../../store/utils/utils-selectors";
const Stat = ({name, count}) => {

    const [langData, setLangData] = useState(undefined)
    const languages = useSelector(getLanguages)

    useEffect(() => {
        setLangData(getLangData(languages, name))
    }, [])

    return (
        <div className='stat'>
            <p>{count}</p>
            {langData ? <img className='stat-icon' src={langData.icon} alt=""/> : null}

        </div>
    )
}
export default Stat