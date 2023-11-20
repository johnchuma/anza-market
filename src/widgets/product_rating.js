import { FaStar } from "react-icons/fa";
import SmallText from "./small_text";
import { Stack } from "react-bootstrap";
import { mutedColor } from "../utils/colors";

const ProductRating = ({item,isCentered}) => {
    return (<div>
         <Stack direction="horizontal" className={`d-flex ${isCentered?'justify-content-center':`justify-content-start`} py-2`}>
                                <FaStar size={12} color={item.rating>0?"orange":mutedColor}/>
                                <FaStar size={12} color={item.rating>1?"orange":mutedColor}/>
                                <FaStar size={12} color={item.rating>2?"orange":mutedColor}/>
                                <FaStar size={12} color={item.rating>3?"orange":mutedColor}/>
                                <FaStar size={12} color={item.rating>4?"orange":mutedColor}/>
                                <SmallText className={"ms-2"} text={` (${item.ratingCount??0} reviews)`} />

                                </Stack> 
    </div>  );
}
 
export default ProductRating;