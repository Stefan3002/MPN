import './banner.css'
import StockBanner from "../../utils/images/stockBanner.jpg";
const Banner = ({bannerURL}) => {
    return (
        <div className="banner">
            <img src={bannerURL ? `${process.env.REACT_APP_BACKURL}/${bannerURL}` : StockBanner} alt=""/>
        </div>
    )
}
export default Banner