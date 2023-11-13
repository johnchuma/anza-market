import { Button, Col, Collapse, Container, Form, Image, Row, Stack } from "react-bootstrap";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import Heading2 from "../widgets/heading2";
import Heading from "../widgets/heading";
import Paragraph from "../widgets/paragraph";
import SizedBox from "../widgets/sizedBox";
import SmallText from "../widgets/small_text";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { getProducts } from "../controllers/product_controller";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/product_context";

const ShopPage = () => {
    const [openCategory, setOpenCategory] = useState(true);
    const [openPrice, setOpenPrice] = useState(false);
    const [products, setProducts] = useState([]);
    const {setSelectedProduct} = useContext(ProductContext)
    const navigate =  useNavigate()
    useEffect(() => {
     getProducts().then((data)=>setProducts(data))
    }, []);

    return ( <div>
        <div style={{ backgroundColor:mutedBackground }}>
            <Container className="text-center py-5">
                <Heading fontSize={30} text={"List"}/>
                <Paragraph color={primaryColor} fontSize={18} text={"Shop"}/>

            </Container>
        </div>
        <SizedBox height={100}/>
        <Container>
            <Row>
                <Col md={4}>
                <Paragraph text={"Filters"}/>

                    <Stack onClick={()=>{
                        
                        setOpenCategory(!openCategory)
                    }} className="d-flex justify-content-between btn p-0 border-0" direction="horizontal">
                        <Paragraph fontSize={20} text={"Category"}/>
                     {openCategory?<FaChevronUp size={15} color={mutedColor} />:<FaChevronDown size={15} color={mutedColor} />}   
                    </Stack>
                    {openCategory?<div className="mt-2" style={{  }}>
                    {["Furniture","Clothes","Lighting","Decoration","Beds","Matresses"].map((item,index)=>{
                         return <Stack className="d-flex justify-content-between" direction="horizontal">
                          <SmallText  text={item}/>
                          <SmallText  text={index}/>     
                      </Stack>
                    })}
                    </div>:<div></div>}
                    <SizedBox />
                    <Stack onClick={()=>{
                        setOpenPrice(!openPrice)
                    }} className="d-flex justify-content-between btn p-0 border-0" direction="horizontal">
                      <div>
                      <Paragraph fontSize={20} text={"Price"}/>
                     
                     
                      </div>
                      
                     {openPrice?<FaChevronUp size={15} color={mutedColor} />:<FaChevronDown size={15} color={mutedColor} />}   
                    </Stack>
                    {openPrice?<div className="mt-2" style={{  }}>
                    <Stack direction="horizontal">
                     <SmallText text={"Price range"}/>
                     <SmallText className={"ms-2"} text={"$0 - $1000"} color={primaryColor}/>
                     </Stack>
                     <Form.Range color={primaryColor}></Form.Range>
                    </div>:<div></div>}
                    
                    
                </Col>
                <Col md={8}>
                    {products.map((item)=>{
                        return <div onClick={()=>{
                            setSelectedProduct(item)
                            navigate("/product-details")
                        }} className="mb-4">
                            <Row className="d-flex align-items-center">
                                <Col md={4}>
                                    <Image src={item.ProductImages[0].image} fluid/>
                                </Col>
                                <Col md={5}>
                                    <SmallText text={"Women"} fontSize={14}/>
                                    <Paragraph fontSize={18} text={item.name}/>
                                    <SmallText text={item.description}/>
                                </Col>
                                <Col>
                                  <Paragraph text={item.newPrice+ "TZS"} color={primaryColor} fontSize={18}/>
                                  <Stack direction="horizontal" className="d-flex justify-content-start">
                                    <FaStar size={12} color="orange"/>
                                    <FaStar size={12} color="orange"/>
                                    <FaStar size={12} color="orange"/>
                                    <FaStar size={12} color="orange"/>
                                    <SmallText className={"ms-2"} text={" (2 reviews)"} />
                                    </Stack>
                                    
                                  {/* <Button className="border-0 mt-3" style={{ backgroundColor:primaryColor,fontSize:14 }} >Add to cart</Button> */}
                                </Col>
                            </Row>
                        </div>
                    })}
                </Col>

            </Row>
        </Container>
    <SizedBox height={100}/>
    </div> );
}
 
export default ShopPage;