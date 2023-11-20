
import { Col, Container, Image, Row } from "react-bootstrap";
import { mutedBackground, primaryColor } from "../utils/colors";
import Heading2 from "../widgets/heading2";
import Heading from "../widgets/heading";
import Paragraph from "../widgets/paragraph";
import SizedBox from "../widgets/sizedBox";
import CustomButton from "../widgets/button";
const AnzaMarketPlace = () => {
    return ( <div>
         <div style={{ backgroundColor:mutedBackground }}>
            <Container className="text-center py-5">
                <Heading fontSize={30} text={"Marketplace"}/>
                <Paragraph color={primaryColor} fontSize={18} text={"Anza"}/>
            </Container>
        </div>
        <SizedBox/>
        <Container>
        {[{
        title:"Buy on Anza",
        description:"At Jumia, our goal is to offer the widest range of products at the best prices while connecting sellers and brands with millions of consumers across the Continent. As Africa’s number one e-commerce company, we’re always looking for ways to widen our catalog and add value for our consumers and communities.",
        image:"https://group-live.jumia.is/images/business/5by4/business-marketplace-01.png"},
        {
            title:"Sell on Anza",
            description:"At Jumia, our goal is to offer the widest range of products at the best prices while connecting sellers and brands with millions of consumers across the Continent. As Africa’s number one e-commerce company, we’re always looking for ways to widen our catalog and add value for our consumers and communities.",
            image:"https://group-live.jumia.is/images/business/5by4/business-marketplace-02.png"},
        {
        title:"Become a J-Force Agent",
        description:"At Jumia, our goal is to offer the widest range of products at the best prices while connecting sellers and brands with millions of consumers across the Continent. As Africa’s number one e-commerce company, we’re always looking for ways to widen our catalog and add value for our consumers and communities.",
        image:"https://group-live.jumia.is/images/business/5by4/business-marketplace-03.png"},
     {
            title:"Become an affiliate or influencer partner",
            description:"At Jumia, our goal is to offer the widest range of products at the best prices while connecting sellers and brands with millions of consumers across the Continent. As Africa’s number one e-commerce company, we’re always looking for ways to widen our catalog and add value for our consumers and communities.",
            image:"https://group-live.jumia.is/images/business/5by4/business-marketplace-04.png"}
    
    ].map((item,index)=>{
          return <div className="">
           <SizedBox height={60}/>

<Row className="">
            <Col  md={{ span:5,order:index%2 == 0? 1:2 }}>
                <Heading fontSize={50} className={"mb-3"} color={primaryColor} text={item.title}/>
                <Paragraph className="mb-3" text={item.description}/>
                <CustomButton  text={"Read more"}/>
            </Col>
            <Col  md={{ span:7,order:1 }}>
            <Image src={item.image} style={{ borderTopRightRadius:30,borderBottomLeftRadius:30 }} fluid/>

            </Col>
            </Row>
           <SizedBox height={60}/>
          </div> 
        })}
        </Container>
     
    </div> );
}
 
export default AnzaMarketPlace;