import { Carousel, Col, Container, Form, Image, Row, Stack } from "react-bootstrap";
import Heading2 from "../widgets/heading2";
import SizedBox from "../widgets/sizedBox";
import Heading from "../widgets/heading";
import { mutedColor, textColor } from "../utils/colors";
import SmallText from "../widgets/small_text";
import Paragraph from "../widgets/paragraph";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getFeaturedProducts, getTopRated, getTopSelling } from "../controllers/product_controller";
import { useNavigate } from "react-router-dom";
import ProductRating from "../widgets/product_rating";
import ProductItem from "../widgets/product_item";
// import FormatMoney from "../utils/format_money";



const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);


  const [selectedFirstCategory, setselectedFirstCategory] = useState("Featured");
  const [selectedSecondCategory, setselectedSecondCategory] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  
 useEffect(() => {
  setLoading(true);
  getTopSelling().then((data)=>{
    setTopSellingProducts(data)
    setLoading(false);

  })
    if(selectedFirstCategory == "Featured"){
      getFeaturedProducts().then((data)=>{
        setFeaturedProducts(data)
        setLoading(false);
  
      })
    }
    else{
      getTopRated().then((data)=>{
        setTopRatedProducts(data)
        setLoading(false);
  
      })
    }
    
 }, [selectedFirstCategory]);
    return ( 
    <div>
  
            <div>
              <Container className="p-0" fluid>
              <Carousel>
              <Carousel.Item >
                  <Image src="/images/ads/ad2.png" fluid/>
                </Carousel.Item>
              <Carousel.Item>
                <Image src="/images/ads/ad1.png" fluid/>
                </Carousel.Item>
               
              </Carousel>
            </Container>
             
            </div>
            <SizedBox height={70}/>

     <Container>
      <Stack direction="horizontal" className="d-flex justify-content-center">
        <Heading onClick={()=>{
            setselectedFirstCategory("Featured")
        }} className={"btn border-0 p-0"} color={selectedFirstCategory == "Featured"?textColor:"#afafaf"}  text={"Featured"}/>
        <SizedBox width={30} height={0}/>
        <Heading onClick={()=>{
            setselectedFirstCategory("Top rated")
        }} className={"btn border-0 p-0"}  color={selectedFirstCategory == "Top rated"?textColor:"#afafaf"}  text={"Top rated"}/>

      </Stack>
      <SizedBox />
     <Row>
            { selectedFirstCategory == "Top rated" &&
      topRatedProducts.map((item)=>
      <Col  md={3}>
         <ProductItem product={item}/>
      </Col>
      )
          }
            { selectedFirstCategory == "Featured" &&
      featuredProducts.map((item)=>
      <Col  md={3}>
         <ProductItem product={item}/>
      </Col>
      )
          }
     </Row>
     </Container>

     <SizedBox height={50}/>
     
     <Container >
     <Heading className={"text-center"} text={"Top selling products"}/>
          <SizedBox/>
          <Paragraph color={mutedColor} className={"text-center"}  text={"EXPLORE TOP SELLING PRODUCTS FROM VARIOUS SELLERS"}/>
      

      <SizedBox />
      <SizedBox/>
      
     <Row>
            {
      topSellingProducts.map((item)=>
      <Col md={2}>
         <ProductItem height={140} product={item}/>
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
<Container>
<Row>
          <Col md="8" className="mb-1">
          <Form.Control className="rounded-0" placeholder="Enter your email address"/>
          </Col>
          <Col lg={4}>
          
          <div className="px-3 py-2  rounded-0" style={{ backgroundColor:"white" }}>
            
            <Stack className="d-flex justify-content-center" direction="horizontal">
            <Heading2 text={"Subscribe"} fontSize={15}/>
         <SizedBox width={10}/>
         <FaArrowRight size={10}/>
            </Stack>
         
         </div>
          </Col>
        </Row>
</Container>
      
       

      </Col>
    </Row>
    </div>
    
   </div>
</div>
    </div> 
    );
}
 
export default HomePage;