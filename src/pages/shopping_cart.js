import { Card, Col, Container, Form, Image, Row, Stack, Table } from "react-bootstrap";
import Paragraph from "../widgets/paragraph";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import SmallText from "../widgets/small_text";
import Heading from "../widgets/heading";
import { AiFillCheckCircle, AiOutlineMinus } from "react-icons/ai";
import { BsPlus, BsSubtract } from "react-icons/bs";
import CustomButton from "../widgets/button";
import Heading2 from "../widgets/heading2";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/product_context";
import { addOrder } from "../controllers/order_controller";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SizedBox from "../widgets/sizedBox";
import PaypalPaymentModel from "../widgets/paypal_payment";

const ShoppingCart = () => {
  const{setCart,cart} = useContext(ProductContext)
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState();
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const navigate = useNavigate()
    const [total, setTotal] = useState(0);
    useEffect(() => {
      var price = 0
      cart.map((item)=>{
        price  = price + item.newPrice*item.quantity
       
      });
      setTotal(price)
      
    }, [update]);
  
    return ( <div >
      <PaypalPaymentModel show={showPaymentModal} onHide={()=>setShowPaymentModal(false)}/>
         <div style={{ backgroundColor:mutedBackground }}>
            <Container className="text-center py-5">
                <Heading fontSize={30} text={"Shopping Cart"}/>
                <Paragraph color={primaryColor} fontSize={18} text={"Shop"}/>
            </Container>
        </div>
        <Container className="my-3">
          {cart.length < 1? <Stack direction="horizontal" className="d-flex justify-content-center text-center">
            <div>
            <Image className="rounded-0" style={{width:200}} fluid src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"/>
             <Heading2  text={"No product in cart"}/>
             
             <Paragraph color={primaryColor} className={"btn border-0 p-0"} onClick={()=>{
               navigate("/shop")
             }} text={"Explore anza marketplace"}/>

             <SizedBox/>
            </div>
          </Stack >:<Row>
          <Col md={8}>
          <Card style={{ backgroundColor:"white"}} className="mt-3 border-0">
      <Card.Body>
        <div className="table table-responsive">
        <Table className="table ">
          <thead style={{ fontWeight:300,fontSize:13,color:mutedColor }}>
           
              <th>Image</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
          </thead>
          <tbody>
              {cart.map((item,index)=>{
                  return <tr>
                  <td><Image  src={item.ProductImages[0].image} style={{ height:80,width:80 }}/></td>
                  <td><SmallText text={item.name}/></td>
                  <td><SmallText text={`${item.newPrice}TSH`} /></td>
                  <td>
                  <Stack direction="horizontal" className="">
                      <Paragraph className={"mx-3"} text={item.quantity}/>
                  </Stack>
                  </td>
                  <td><Paragraph text={`${item.newPrice*item.quantity}TSH`} color={primaryColor}/></td>
                   <td><AiOutlineMinus className="btn border-0 p-0" onClick={()=>{
                    var newCart = [];
                    setUpdate(true);
                    cart.map((item,ind)=>{
                      if(index != ind){
                        newCart = [...newCart,item]
                      }
                    })
                    setCart([...newCart]);
                    setUpdate(false);
                     
                   }} /></td>
                 </tr>
              })}
             
          </tbody>
      </Table>
        </div>
     
      </Card.Body>
  </Card>
  <Stack direction="horizontal" className="d-flex justify-content-start">
  {/* <CustomButton text={"Update order"}/> */}

  </Stack>
          </Col>
          <Col md={4}>
            <Card className="border-0 my-5" style={{ backgroundColor:"#F9F9F9" }}>
              <Card.Body className="py-4">
                <Heading2 text={"Cart Total"} fontSize={15}/>
                <hr/>
                <Stack direction="horizontal" className="d-flex justify-content-between">
                  <Paragraph text={"Subtotal:"}/>
                  <Paragraph text={`${total}TSH`}/>
                </Stack>

                <Paragraph  className="mt-4 mb-1" text={"shipping"}/>
                <Stack direction="horizontal" className="d-flex justify-content-between">
                  <Stack direction="horizontal">
                      <AiFillCheckCircle className="me-2" color={primaryColor}/>
                  <Paragraph className={""} text={"Free shipping:"}/>
                  </Stack>
                  
                  <Paragraph className={""} text={"0TSH"}/>
                </Stack>
                <Stack direction="horizontal" className="d-flex justify-content-between mt-4">
                  <Heading fontSize={15} color={primaryColor} text={"Total:"}/>
                  <Heading fontSize={15} color={primaryColor} text={`${total}TSH`}/>
                </Stack>
                <CustomButton loading={loading}  onClick={()=>{
                  setShowPaymentModal(true)
                  // setLoading(true);
                  //   const data = {
                  //     products:cart
                  //   }
                    
                  //   addOrder(data).then((status)=>{
                  //     if(status){
                  //       toast.success("Your order is sent successfully")
                  //      setCart([])
                  //     }
                  //     setLoading(false)
                  //   })
                }} className={"w-100 py-3 mt-2"} text={"Proceed to checkout"}/>
              </Card.Body>
            </Card>
          </Col>
      </Row>}
        
        </Container>
      

    </div> );
}
 
export default ShoppingCart;