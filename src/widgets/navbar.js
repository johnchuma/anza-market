import { Carousel, Col, Container, Form, Image, Offcanvas, OverlayTrigger, Popover, Row, Stack } from "react-bootstrap";
import {FaHeart,FaCartPlus,FaUser, FaUserAlt} from "react-icons/fa"
import { AiOutlineBulb, AiOutlineClose, AiOutlineHeart, AiOutlineMenu, AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"

import SmallText from "../widgets/small_text";
import SizedBox from "../widgets/sizedBox";
import Paragraph from "../widgets/paragraph";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/local_storage";
import Heading2 from "./heading2";
import { primaryColor } from "../utils/colors";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/product_context";
import { getSectorProducts } from "../controllers/product_controller";
import { getSectors } from "../controllers/sector_controller";
import toast from "react-hot-toast";
import { UserContext } from "../contexts/user_context";

const NavigationBar = () => {
  // var user = getUser()
  const {cart,wishlist} = useContext(ProductContext);
  const {user,refresh,setRefresh} = useContext(UserContext)
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getSectors().then((value)=>setCategories(value))
    }, []);
  const navigate = useNavigate()

    return (        <Container>
        <SizedBox/>
     <Stack className="d-flex justify-content-between" direction="horizontal">
     <SmallText text="Special collection already available"/>
     <div className="d-none d-md-block">
     <Stack  direction="horizontal">
     <SmallText className={"me-5"} text={"TZS"}/>
      <SmallText className={"me-5"} text={"English"}/>
      {user ?
      user.Business?<Heading2 className={"btn border-0 p-0"} onClick={()=>navigate("/dashboard")} 
      text={"Go to seller dashboard"} color={primaryColor} fontSize={14}/>:
      <Heading2 className={"btn border-0 p-0"} onClick={()=>navigate("/apply-to-be-seller")} 
      text={"Apply to be seller"} color={primaryColor} fontSize={14}/>:
      <div className={"btn border-0 p-0"} onClick={()=>navigate("/login")}>
      <SmallText   text={"Sign In/ Sign Up"}/>
        </div>
      }
     </Stack>
     </div>
     </Stack>
     <SizedBox/>
    <Offcanvas>
      <Offcanvas.Body>
        <Stack direction="horizontal">
          <AiOutlineClose />
            
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
     <Row className="d-flex align-items-center">
     <Col md="">
     <Stack className="d-flex justify-content-between" direction="horizontal">
     <Stack direction="horizontal">
        <AiOutlineMenu onClick={()=>{
          
        }} className="d-block d-md-none me-2" size={30} color="black"/>
        <div className="btn p-0 border-0" onClick={()=>{
          // navigate("/")
          setRefresh(refresh+1)
        
        }} style={{ width:100 }}>
        <Image  src="/images/home/Shule-Yetu-–-52.png" fluid/>
        </div>
      </Stack>
     <Form className="d-none d-md-block w-100" onSubmit={(e)=>{
       var keyword = e.target.search.value
       navigate(`/shop/search/${keyword}`)
      }}>
         <Row>
    <Col md={{ offset:2,span:8 }}>
    <Form.Control name="search" placeholder="Search product"/>
    </Col>
   </Row>
      </Form>
     <Stack className="text-center  d-flex justify-content-between" direction="horizontal" >
         <div className="btn border-0 p-0 me-4" onClick={()=>{
          if(user){
          navigate("/account")
          }
          else{
            toast.error("Sign in to access your account")
          }
         }}>
           <AiOutlineUser size={25}/>
           <SmallText fontSize={12}  text="Account"/>
         </div>
         <div className="btn border-0 p-0 me-4" onClick={()=>{
          if(user != null){
            navigate("/wishlist")
          }
          else{
            toast.error("Sign in to access wishlist page")
          }
         }}>
          <div className="d-flex justify-content-center" style={{ position:"relative" }}>
            {wishlist.length > 0? <div className="rounded-circle" style={{ height:14,width:14,background:"red",position:"absolute" }}>
              <Paragraph text={wishlist.length} fontSize={10} color={"white"}/>
            </div>:<div></div>}
           <AiOutlineHeart size={25}/>
           </div>
         <SmallText fontSize={12}  text="Wishlist"/>
         </div>
         <div className="btn border-0 p-0" onClick={()=>{
          navigate("/shopping-cart")
         }}>
          <div className="d-flex justify-content-center" style={{ position:"relative" }}>
            {cart.length > 0? <div className="rounded-circle" style={{ height:14,width:14,background:"red",position:"absolute" }}>
              <Paragraph text={cart.length} fontSize={10} color={"white"}/>
            </div>:<div></div>}
          <AiOutlineShoppingCart size={25}/>
          </div>
       <SmallText fontSize={12}  text="Cart"/>
         </div>
     </Stack>
      </Stack>
     </Col>
    
    
  </Row>
<div className="d-none d-md-block">
<SizedBox/>
<Row className="d-flex align-items-center">

<Col md="3">
  <OverlayTrigger trigger="hover" offset={100} delay={{ hide:2000 }} placement="bottom" overlay={
  <Popover  style={{ borderRadius:0,width:"100%"}}>
    <Popover.Header style={{ backgroundColor:primaryColor,color:"white",borderRadius:0,fontSize:16 }}>Select category</Popover.Header>
    <Popover.Body className="py-0">
      {categories.map((item)=>{
        return<div onClick={()=>{
          navigate(`/shop/${item.uuid}`)

        }} className="shadow-sm btn border-0  p-0 py-2 w-100 text-start">
          <SmallText text={item.name}/>
          
        </div>
      })}
    </Popover.Body>
  </Popover>}>
  <Stack className="text-center d-flex justify-content-start btn border-0 p-0" direction="horizontal" >
<AiOutlineMenu/>
<SizedBox height={0} />
 <Paragraph text={"Browse categories"}/>
</Stack>
  </OverlayTrigger>


</Col>
<Col md={{ span:6 }}>
<Stack className="text-center d-flex justify-content-start" direction="horizontal" >

 <Paragraph className={"btn border-0 p-0"} onClick={()=>{navigate("/")}} text={"Home"}/>
 <SizedBox height={0}/>
 <Paragraph className={"btn border-0 p-0"} onClick={()=>{navigate("/shop/all")}}  text={"Shop"}/>
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
</div>
<SizedBox/>
</Container> );
}
 
export default NavigationBar;