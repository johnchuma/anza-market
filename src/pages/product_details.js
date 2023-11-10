import { Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import Paragraph from "../widgets/paragraph";
import SmallText from "../widgets/small_text";
import { mutedColor, primaryColor } from "../utils/colors";
import { FaStar } from "react-icons/fa";
import CustomButton from "../widgets/button";
import { AiFillHeart, AiOutlineHeart, AiOutlineMinus, AiOutlineShareAlt } from "react-icons/ai";
import { BsPlus, BsSubtract } from "react-icons/bs";
import { useContext } from "react";
import { ProductContext } from "../contexts/product_context";
import Heading from "../widgets/heading";
import Heading2 from "../widgets/heading2";


const ProductDetails = () => {
    const{selectedProduct,setCart,cart} = useContext(ProductContext)
    return ( <div>
        <Container className="my-5">
        <Row>
            <Col md={6}>
                <Image rounded fluid src={selectedProduct.ProductImages[0].image}/>
            </Col>
            <Col md={6}>
                <Paragraph fontSize={25} text={"Black denim dungaree dress"}/>
                <Stack direction="horizontal" className="d-flex justify-content-start py-2">
                                    <FaStar size={12} color="orange"/>
                                    <FaStar size={12} color="orange"/>
                                    <FaStar size={12} color="orange"/>
                                    <FaStar size={12} color="orange"/>
                                    <SmallText className={"ms-2"} text={" (2 reviews)"} />
                                    </Stack>
                <Paragraph fontSize={25} color={primaryColor} text={"30,000 TZS"}/>
                <SmallText  text={"Excepteur eiusmod ea ullamco eu. Qui labore do laboris do irure eu quis minim tempor fugiat velit ullamco cupidatat. Enim mollit ad eu dolore elit irure "}/>
                <Stack className="my-3" direction="horizontal">
                    <SmallText text={"Qty:"}/>
                   <Card className="bg-white ms-2">
                    <Card.Body className="py-2">
                    <Stack direction="horizontal" className="">
                        <AiOutlineMinus/>
                            <Paragraph className={"mx-3"} text={"3"}/>
                        <BsPlus/>

                    </Stack>
                    </Card.Body>
                    
                   </Card>
                </Stack>
                <Stack direction="horizontal">
              {cart.includes(selectedProduct) == true?<div><Heading2 text={"Added to cart"} fontSize={13} color={primaryColor} /></div> :<CustomButton onClick={()=>{
                    selectedProduct.quantity = 0;
                    setCart([...cart,selectedProduct]);
                }} text={"Add to cart"}/>}  
                <div className="ms-2 btn btn-outline bg-white">
                <Stack direction="horizontal"><AiOutlineHeart color={mutedColor} /><SmallText text={"Add to wishlist"}/></Stack>

                </div>
                </Stack>
                

                <SmallText className={"mt-3"} text={"Category: Women"}/>
                <Stack className={"mt-3"} direction="horizontal">
                <SmallText  text={"Share"}/> <AiOutlineShareAlt className="ms-2"/>
                </Stack>
              

            </Col>
            
        </Row>
        </Container>
       
    </div> );
}
 
export default ProductDetails;