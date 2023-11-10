import { Card, Col, Container, Form, Image, Row, Stack, Table } from "react-bootstrap";
import Paragraph from "../widgets/paragraph";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import SmallText from "../widgets/small_text";
import Heading from "../widgets/heading";
import { AiFillCheckCircle, AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import CustomButton from "../widgets/button";
import Heading2 from "../widgets/heading2";
import { useContext, useState } from "react";
import { ProductContext } from "../contexts/product_context";
import { addOrder } from "../controllers/order_controller";

const ShoppingCart = () => {
  const{setCart,cart} = useContext(ProductContext)
    const [loading, setLoading] = useState(false);
    return ( <div >
         <div style={{ backgroundColor:mutedBackground }}>
            <Container className="text-center py-5">
                <Heading fontSize={30} text={"Shopping Cart"}/>
                <Paragraph color={primaryColor} fontSize={18} text={"Shop"}/>
            </Container>
        </div>
        <Container className="my-3">
        <Row>
            <Col md={8}>
            <Card style={{ backgroundColor:"white"}} className="mt-3 border-0">
        <Card.Body>
        <Table className="table ">
            <thead style={{ fontWeight:300,fontSize:13,color:mutedColor }}>
             
                <th>Image</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </thead>
            <tbody>
                {cart.map((item)=>{
                    return <tr>
                    <td><Image rounded src={item.ProductImages[0].image} style={{ height:80,width:80 }}/></td>
                    <td><SmallText text={item.name}/></td>
                    <td></td>
                    <td> <Stack direction="horizontal" className="">
                        <AiOutlineMinus/>
                            <Paragraph className={"mx-3"} text={"3"}/>
                        <BsPlus/>
                    </Stack></td>
                    <td><Paragraph text={"50,000TSH"} color={primaryColor}/></td>
    
                   </tr>
                })}
               
            </tbody>
        </Table>
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
                    <Paragraph text={"30,000TSH"}/>
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
                    <Heading fontSize={15} color={primaryColor} text={"30,000TSH"}/>
                  </Stack>
                  <CustomButton loading={loading}  onClick={()=>{
                    setLoading(true);
                      const data = {
                        products:cart
                      }
                      addOrder(data).then(()=>{
                        setLoading(false)
                      })
                  }} className={"w-100 py-3 mt-2"} text={"Proceed to checkout"}/>
                </Card.Body>
              </Card>
            </Col>
        </Row>
        </Container>
      

    </div> );
}
 
export default ShoppingCart;