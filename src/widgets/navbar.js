import { Carousel, Col, Container, Form, Image, Row, Stack } from "react-bootstrap";
import {FaHeart,FaCartPlus,FaUser, FaUserAlt} from "react-icons/fa"
import { AiOutlineBulb, AiOutlineHeart, AiOutlineMenu, AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"

import SmallText from "../widgets/small_text";
import SizedBox from "../widgets/sizedBox";
import Paragraph from "../widgets/paragraph";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/local_storage";
import Heading2 from "./heading2";
import { primaryColor } from "../utils/colors";
import { useContext } from "react";
import { ProductContext } from "../contexts/product_context";

const NavigationBar = () => {
  var user = getUser()
  const {cart} = useContext(ProductContext);
  const navigate = useNavigate()
    return (        <Container>
        <SizedBox/>
       <Row>
     
     <Col md="9">
    <SmallText text="Special collection already available"/>

     </Col>
     <Col md="3" className="d-flex justify-content-between">
      
      <SmallText text={"TZS"}/>
       
      <SmallText text={"English"}/>
      {user ?<Heading2 onClick={()=>navigate("/apply-to-be-seller")} text={"Apply to be seller"} color={primaryColor} fontSize={14}/>:
      <div className={"btn border-0 p-0"} onClick={()=>navigate("/login")}>
      <SmallText   text={"Sign In/ Sign Up"}/>
        </div>
      }
     
     </Col>
    
  </Row>
  <SizedBox/>

       <Row className="d-flex align-items-center">
     
     <Col md="">
      <div style={{ width:100 }}>
      <Image  src="/images/home/Shule-Yetu-–-52.png" fluid/>

      </div>

     </Col>
     <Col md={{ offset:1,span:6 }}>
      <Form.Control placeholder="Search product"/>
     </Col>
     <Col md={{ offset:1,span:2}} >
     <Stack className="text-center d-flex justify-content-between" direction="horizontal" >
         <div className="btn border-0 p-0" onClick={()=>{
          navigate("/account")
         }}>
           <AiOutlineUser size={25}/>
           <SmallText fontSize={12}  text="Account"/>

         </div>
         <div className="btn border-0 p-0" onClick={()=>{
          navigate("/wishlist")
         }}>
          <div className="d-flex justify-content-end" style={{ position:"relative" }}>
            {cart.length > 0? <div className="rounded-circle" style={{ height:14,width:14,background:"red",position:"absolute" }}>
              <Paragraph text={cart.length} fontSize={10} color={"white"}/>
            </div>:<div></div>}
           
           <AiOutlineHeart size={25}/>
           </div>
         <SmallText fontSize={12}  text="Wishlist"/>

         </div>
         <div className="btn border-0 p-0" onClick={()=>{
          navigate("/shopping-cart")
         }}>
          <div className="d-flex justify-content-end" style={{ position:"relative" }}>
            {cart.length > 0? <div className="rounded-circle" style={{ height:14,width:14,background:"red",position:"absolute" }}>
              <Paragraph text={cart.length} fontSize={10} color={"white"}/>
            </div>:<div></div>}
            
          <AiOutlineShoppingCart size={25}/>

          </div>
       <SmallText fontSize={12}  text="Cart"/>
           
         </div>
     </Stack>
     </Col>
    
  </Row>
  <SizedBox/>

<Row className="d-flex align-items-center">

<Col md="3">
<Stack className="text-center d-flex justify-content-start" direction="horizontal" >
<AiOutlineMenu/>
<SizedBox height={0} />
 <Paragraph text={"Browse categories"}/>
</Stack>

</Col>
<Col md={{ span:6 }}>
<Stack className="text-center d-flex justify-content-start" direction="horizontal" >

 <Paragraph className={"btn border-0 p-0"} onClick={()=>{navigate("/")}} text={"Home"}/>
 <SizedBox height={0}/>
 <Paragraph className={"btn border-0 p-0"} onClick={()=>{navigate("/shop")}}  text={"Shop"}/>
 <SizedBox height={0}/>
 <Paragraph className={"btn border-0 p-0"} onClick={()=>{navigate("/marketplace")}} text={"Anza marketplace"}/>

</Stack>
</Col>
<Col md={{ span:3}} >
<Stack className="text-center d-flex justify-content-end" direction="horizontal" >
<AiOutlineBulb/>
<SizedBox height={0} />
 <Paragraph text={"Clearance Up to 30% Off"}/>
</Stack>
</Col>
<SizedBox />
</Row>
</Container> );
}
 
export default NavigationBar;