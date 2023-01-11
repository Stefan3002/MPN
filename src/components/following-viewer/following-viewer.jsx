import './following-viewer.css'
import Following from "../following/following";
const FollowingViewer = ({following}) => {
    return (
        <div className='following-viewer'>
            {following.map((followingPerson) => {
                return <Following followingPerson={followingPerson} />
            })}
        </div>
    )
}
export default FollowingViewer