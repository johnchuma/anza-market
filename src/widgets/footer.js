import { Col, Container, Image, Row } from "react-bootstrap";
import SmallText from "./small_text";
import SizedBox from "./sizedBox";
import Paragraph from "./paragraph";
import Heading from "./heading";
import { primaryColor } from "../utils/colors";
import Heading2 from "./heading2";

const Footer = () => {
    return ( <div>
        <Container>
            <Row>
                <Col md={6}>
                <div style={{ width:80 }}>
                <Image  src="/images/home/Shule-Yetu-–-52.png" fluid/>
                </div>
                <SizedBox/>
                <SmallText text={"Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus."}/>
                <SizedBox/>
                <Paragraph text={"Got question ? 24/7"}/>
                <Heading text={"07263748472"} color={primaryColor}/>
                <SizedBox/>
                <SmallText text={"Copyright © 2023 Molla Store. All Rights Reserved."}/>
                </Col>
                <Col>
                  <Heading2 text={"Information"} fontSize={16}/>
                  <SizedBox/>
                  {["About us","FAQ","Contact us","Log in"].map((item)=><SmallText className={"mb-2"} text={item}/>)}
                </Col>
                <Col>
                  <Heading2 text={"Customer service"} fontSize={16}/>
                  <SizedBox/>
                  {[
"Payment Methods","Money-back guarantee","Returns","Shipping","Terms and conditions","Privacy Policy"
                  ].map((item)=><SmallText className={"mb-2"} text={item}/>)}
                </Col>
                <Col>
                  <Heading2 text={"My account"} fontSize={16}/>
                  <SizedBox/>
                  {["Sign In","View Cart","My Wishlist","Track My Order","Help"].map((item)=><SmallText className={"mb-2"} text={item}/>)}
                </Col>
            </Row>
            <SizedBox/>
            <SizedBox/>

        </Container>
    </div> );
}
 
export default Footer;