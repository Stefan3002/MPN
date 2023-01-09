import './shareable-viewer.css'
import ShareSVG from "../../utils/images/ShareSVG.svg";
import {setShareable} from "../../store/utils/utils-actions";
import {useDispatch, useSelector} from "react-redux";
import {getShareable} from "../../store/utils/utils-selectors";
const ShareableViewer = () => {
    const dispatch = useDispatch()
    const optForShareable = () => {
        dispatch(setShareable(!shareable))
    }
    const shareable = useSelector(getShareable)
    return (
        <div className='shareable-viewer' style={shareable ? {backgroundColor: 'lightgray'} : null}>
            <img onClick={optForShareable} className='icon' src={ShareSVG} alt=""/>
        </div>
    )
}
export default ShareableViewer