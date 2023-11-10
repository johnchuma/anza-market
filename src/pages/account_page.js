import { Card, Col, Container, Form, Image, Row, Stack, Table } from "react-bootstrap";
import Paragraph from "../widgets/paragraph";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import SmallText from "../widgets/small_text";
import Heading from "../widgets/heading";
import { AiFillCheckCircle, AiOutlineArrowRight, AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import CustomButton from "../widgets/button";
import Heading2 from "../widgets/heading2";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../controllers/order_controller";
import { timeAgo } from "../utils/tile_ago";

const AccountPage = () => {
   const navigate =  useNavigate();
    const [selected, setSelected] = useState(0);
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        getMyOrders().then((data)=>{
            setOrders(data)
            console.log(data)
        })
    }, []);
    
    return ( <div >
         <div style={{ backgroundColor:mutedBackground }}>
            <Container className="text-center py-5">
                <Heading fontSize={30} text={"My Account"}/>
                <Paragraph color={primaryColor} fontSize={18} text={"Shop"}/>
            </Container>
        </div>
        <Container className="my-5">
        <Row>
            <Col md={4}>
               {["Dashboard","Orders","Account details","Sign out"].map((item,index)=>{
                return <div className="" onClick={()=>{
                    if(index == 3){
                        navigate("/")
                    }
                    setSelected(index)
                }}>
                 <Stack direction="horizontal" className="btn border-0 p-0">
                   {index == selected && <AiOutlineArrowRight color={ primaryColor} className="me-2"/> }  
                     <Paragraph color={index == selected?primaryColor:null} text={item}/>
                    </Stack>   
                    <hr/>
                </div>
               })}
            </Col>
            <Col md={8}>
                {selected ==0 &&<div>
                    <Stack direction="horizontal">
                    <SmallText text={"Hello User (not User? "}/><SmallText color={primaryColor} className={"p-0 btn border-0"} text={"Log out"}/><SmallText  text={")"}/>

                    </Stack>
                    <SmallText className={"mt-2"} text={"From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details."}/>
                
                </div>}
                {selected ==1 &&<div>
                    {orders.map((item,index)=><div className="mb-3">
                           <Paragraph text={`created ${timeAgo(item.createdAt)}`}/>
                           <div>
                            <Heading2 text={"Products"}/>
                            <Table className="table ">
            <thead style={{ fontWeight:300,fontSize:13,color:mutedColor }}>
             
                <th>Image</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </thead>
            <tbody>
                {orders.OrderProducts.map((orderProduct)=>{
                    var item = orderProduct.Product;
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
                           </div>
                        </div>)}
                    </div>}
                {selected ==2 &&<div>
                
                </div>}
              
            </Col>
        </Row>
        </Container>
      

    </div> );
}
 
export default AccountPage;