
import { Container } from "react-bootstrap";
import { mutedBackground, primaryColor } from "../utils/colors";
import Heading2 from "../widgets/heading2";
import Heading from "../widgets/heading";
import Paragraph from "../widgets/paragraph";
import SizedBox from "../widgets/sizedBox";
const AnzaMarketPlace = () => {
    return ( <div>
         <div style={{ backgroundColor:mutedBackground }}>
            <Container className="text-center py-5">
                <Heading fontSize={30} text={"Marketplace"}/>
                <Paragraph color={primaryColor} fontSize={18} text={"Anza"}/>

            </Container>
        </div>
        <SizedBox/>
    </div> );
}
 
export default AnzaMarketPlace;