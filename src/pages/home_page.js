import { Carousel, Col, Container, Form, Image, Row, Stack } from "react-bootstrap";
import Heading2 from "../widgets/heading2";
import SizedBox from "../widgets/sizedBox";
import Heading from "../widgets/heading";
import { mutedColor } from "../utils/colors";
import SmallText from "../widgets/small_text";
import Paragraph from "../widgets/paragraph";
import { FaArrowRight, FaStar } from "react-icons/fa";



const HomePage = () => {
  
    return ( 
    <div>
  
            <div>
              <Container className="p-0" fluid>
              <Carousel>
                <Carousel.Item >
                  <Image src="images/ads/SY Web 1920 – 6.png" fluid/>
                </Carousel.Item>
                <Carousel.Item>
                <Image src="images/ads/SY Web 1920 – 7.png" fluid/>

                </Carousel.Item>
              </Carousel>
              </Container>
             
            </div>
            <SizedBox height={100}/>


     <Container>
      <Stack direction="horizontal" className="d-flex justify-content-center">
        <Heading text={"Featured"}/>
        <SizedBox width={30} height={0}/>
        <Heading color={mutedColor}  text={"On sale"}/>
        <SizedBox width={30} height={0}/>
        <Heading  color={mutedColor} text={"Top rated"}/>

      </Stack>

      <SizedBox />
      
     <Row>
            {
      ["https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_d265cc4cd6.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_2_2_300x300_798eabaee1.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_3_2_300x300_7ef429113e.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_4_2_300x300_ec63a5f054.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_d265cc4cd6.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_2_2_300x300_798eabaee1.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_3_2_300x300_7ef429113e.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_4_2_300x300_ec63a5f054.jpg"
      ].map((item)=>
      <Col  className="text-center  mb-4"  md={3}>
      <div>
        <Image src={item} fluid/>
      </div>
      <SmallText text={"Furniture"}/>
      <Paragraph text={"2-Seaters"} fontSize={18} />
      <Paragraph text={"$250 - $300"} fontSize={18} />
      <Stack direction="horizontal" className="d-flex justify-content-center">
        <FaStar size={12} color="orange"/>
        <FaStar size={12} color="orange"/>
        <FaStar size={12} color="orange"/>
        <FaStar size={12} color="orange"/>
        <SmallText text={" (2 reviews)"} />
      </Stack>

      </Col>
      )
          }
     </Row>
     </Container>

   
    
    
     <SizedBox height={100}/>
     {/* <div>
     <Carousel>
     <Carousel.Item>
                <Image src="images/backgrounds/bg-large.jpg" fluid/>

                </Carousel.Item>
                <Carousel.Item >
                  <Image src="images/backgrounds/bg-large.jpg" fluid/>
                </Carousel.Item>
               
              </Carousel>
            </div> */}
     <SizedBox height={100}/>
     
     <Container>
     <Heading className={"text-center"} text={"Top selling products"}/>
          <SizedBox/>
      <Stack direction="horizontal" className="d-flex justify-content-center">
        <Paragraph text={"ALL"}/>
        <SizedBox width={30} height={0}/>
        <Paragraph color={mutedColor}  text={"FURNITURE"}/>
        <SizedBox width={30} height={0}/>
        <Paragraph color={mutedColor}  text={"DECORATION"}/>
        <SizedBox width={30} height={0}/>
        <Paragraph color={mutedColor}  text={"LIGHTING"}/>
      </Stack>

      <SizedBox />
      <SizedBox/>
      
     <Row>
            {
      ["https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_d265cc4cd6.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_2_2_300x300_798eabaee1.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_3_2_300x300_7ef429113e.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_4_2_300x300_ec63a5f054.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_d265cc4cd6.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_2_2_300x300_798eabaee1.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_3_2_300x300_7ef429113e.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_4_2_300x300_ec63a5f054.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_4_2_300x300_ec63a5f054.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_d265cc4cd6.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_2_2_300x300_798eabaee1.jpg",
      "https://d-themes.com/react_asset_api/molla/uploads/product_3_2_300x300_7ef429113e.jpg",
      ].map((item)=>
      <Col  className="text-center  mb-4"  md={2}>
      <div>
        <Image src={item} fluid/>
      </div>
      <SmallText text={"Furniture"}/>
      <Paragraph text={"2-Seaters"} fontSize={18} />
      <Paragraph text={"$250 - $300"} fontSize={18} />
      <Stack direction="horizontal" className="d-flex justify-content-center">
        <FaStar size={12} color="orange"/>
        <FaStar size={12} color="orange"/>
        <FaStar size={12} color="orange"/>
        <FaStar size={12} color="orange"/>
        <SmallText text={" (2 reviews)"} />
      </Stack>

      </Col>
      )
          }
     </Row>
     </Container>
     <SizedBox height={100}/>
<div className=" " style={{ height:300,backgroundImage:"url('images/backgrounds/bg-2.jpg')",backgroundRepeat:"no-repeat" }}>
   <div className="text-center" style={{ height:300 }}>
    <div className="py-5">
    <Heading text={"Get the latest deals"} color={"White"}/>
    <Paragraph text={"and receive $20 coupon for first shoppin"} color={"#ffffff"}/>
    <SizedBox/>
    <Row>
      <Col md={{ offset:3,span:6 }}>

        <Stack direction="horizontal" className="bg-white">
        <Form.Control placeholder="Enter your email address"/>
         <SizedBox width={10}/>
         <Heading2 text={"Subscribe"} fontSize={15}/>
         <SizedBox width={10}/>
         <FaArrowRight size={10}/>
         <SizedBox width={30}/>

        </Stack>
      </Col>
    </Row>
    </div>
    
   </div>
</div>
    </div> 
    );
}
 
export default HomePage;