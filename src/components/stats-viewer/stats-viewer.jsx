import './stats-viewer.css'
import Stat from "../stat/stat";
const StatsViewer = ({stats}) => {
    return (
        <div className="stats-viewer">
            {Object.keys(stats).map((stat) => {
                return <Stat name={stat} count={stats[stat]} />
            })}
        </div>
    )
}
export default StatsViewer