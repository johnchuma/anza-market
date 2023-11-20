import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import SmallText from "./small_text";
import SizedBox from "./sizedBox";
import Paragraph from "./paragraph";
import Heading from "./heading";
import { primaryColor } from "../utils/colors";
import Heading2 from "./heading2";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return ( <div className="mt-5">
        <Container>
            <Row>
                <Col className="mb-4" md={6}>
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
                <Col className="mb-4" md="2">
                  <Heading2 text={"Information"} fontSize={16}/>
                  <SizedBox/>
                  {["About us","FAQ","Contact us","Log in"].map((item)=><SmallText className={"mb-2"} text={item}/>)}
                </Col>
                <Col className="mb-5" md="2">
                  <Heading2 text={"Customer service"} fontSize={16}/>
                  <SizedBox/>
                  {[
"Payment Methods","Money-back guarantee","Returns","Shipping","Terms and conditions","Privacy Policy"
                  ].map((item)=><SmallText className={"mb-2"} text={item}/>)}
                </Col>
                <Col className="mb-4" md="2">
                  <Heading2 text={"My account"} fontSize={16}/>
                  <SizedBox/>
                  {["Sign In","View Cart","My Wishlist","Track My Order","Help"].map((item)=><SmallText className={"mb-2"} text={item}/>)}
                </Col>
            </Row>
            <SizedBox/>
            <div className="d-none d-md-block">
            <Row >
              <Col md="auto" >
                <SmallText text={"Copyright © 2023 Molla Store. All Rights Reserved."}/>
              </Col>
              <Col className="" md={"5"}>
                <Stack className="" direction="horizontal">
                <SmallText className={"me-1"} text={"Terms of use "}/>
                <SmallText className={"me-1"} text={"|"}/>
                <SmallText text={" Privacy policy"}/>
                </Stack>
              </Col>
              <Col  className="d-flex justify-content-end" md="3">
              <Stack direction="horizontal">
                <SmallText className={"me-2"} text={"Social media"}/>
                 <FaFacebook className="me-2" color="gray"/>
                 <FaInstagram className="me-2" color="gray"/>
                 <FaYoutube className="me-2" color="gray"/>
                 <FaLinkedin className="me-2" color="gray"/>

                </Stack>
              </Col>
             </Row>
            </div>
             <Row className="d-block d-md-none">
              <Col className="d-flex justify-content-center" md="auto" >
                <SmallText text={"Copyright © 2023 Molla Store. All Rights Reserved."}/>
              </Col>
              <Col md={"5 text-center"}>
                <Stack className="d-flex justify-content-center" direction="horizontal">
                <SmallText className={"me-1"} text={"Terms of use "}/>
                <SmallText className={"me-1"} text={"|"}/>
                <SmallText text={" Privacy policy"}/>
                </Stack>
              </Col>
              <Col  className="d-flex justify-content-center" md="3">
              <Stack direction="horizontal">
                <SmallText className={"me-2"} text={"Social media"}/>
                 <FaFacebook className="me-2" color="gray"/>
                 <FaInstagram className="me-2" color="gray"/>
                 <FaYoutube className="me-2" color="gray"/>
                 <FaLinkedin className="me-2" color="gray"/>

                </Stack>
              </Col>

             </Row>
            <SizedBox/>


        </Container>
    </div> );
}
 
export default Footer;