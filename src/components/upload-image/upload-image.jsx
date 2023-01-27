import './upload-image.css'
import {useDispatch, useSelector} from "react-redux";
import {setError, setErrorMessage} from "../../store/error/error-actions";
import {getUserData} from "../../store/user/user-selectors";
import {setUserData} from "../../store/user/user-actions";
import {useRef} from "react";
const UploadImage = ({type}) => {
    const profileFilePicker = useRef()
    const dispatch = useDispatch()
    const userData = useSelector(getUserData)
    const bannerFilePicker = useRef()
    const pickedImageHandler = async (event) => {
        profileFilePicker.current ? profileFilePicker.current.click() : bannerFilePicker.current.click()
        if(event.target.files && event.target.files.length === 1){
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('pic', file)
            formData.append('uid', userData.uid)
            if(type === 'profile')
                formData.append('oldPicPath', userData.photoURL)
            else
                formData.append('oldPicPath', userData.bannerURL)
            try{
                let URL = ''
                if(type === 'profile')
                    URL = `${process.env.REACT_APP_BACKURL}/utils/changeProfilePic`
                else
                    URL = `${process.env.REACT_APP_BACKURL}/utils/changeBannerPic`
                const response = await fetch(URL, {
                    method: 'POST',
                    body: formData
                })
                const responseData = await response.json()
                if(!response.ok)
                    throw new Error(responseData.errorMessage)
                else{
                    dispatch(setUserData(responseData.userData))
                }
            }catch (err) {
                dispatch(setError(true))
                dispatch(setErrorMessage(err.message))
            }
        }

    }
    return (
        <div className='upload-image'>
            {type === 'profile' ? <div>
                <input ref={profileFilePicker} hidden onChange={pickedImageHandler} type="file" accept='.jpg, .jpeg, .png'/>
                <p onClick={pickedImageHandler}>Change profile pic.</p>
            </div> : <div>
                <input ref={bannerFilePicker} hidden onChange={pickedImageHandler} type="file" accept='.jpg, .jpeg, .png'/>
                <p onClick={pickedImageHandler}>Change banner pic.</p>
            </div>}

        </div>
    )
}
export default UploadImage