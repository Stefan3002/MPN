import './profile-image.css'
const ProfileImage = ({imgPath}) => {
    return (
        <div className='profile-pic'>
            <img src={`${process.env.REACT_APP_BACKURL}/${imgPath}`} alt=""/>
        </div>
    )
}
export default ProfileImage