import { Card, Col, Image, Row, Stack } from "react-bootstrap";
import Heading from "../../../widgets/heading";
import CustomButton from "../../../widgets/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../../controllers/product_controller";
import Heading2 from "../../../widgets/heading2";
import { AiFillStar } from "react-icons/ai";
import Paragraph from "../../../widgets/paragraph";
import { mutedColor } from "../../../utils/colors";

const ViewProducts = () => {
   const navigate=  useNavigate()
   const [products, setProducts] = useState([]);
   useEffect(() => {
    getProducts().then((data)=>setProducts(data))
   }, []);
    return ( <div className="">

        <Stack direction="horizontal" className="d-flex justify-content-between">
            <Heading text={"Products"}/>
            <CustomButton onClick={()=>navigate("/dashboard/add-product")} text={"Add product"}/>
        </Stack>
        <Row className="mt-3">
            {products.map((item)=><Col md="4">
                <Card className="border-0  shadow-sm" style={{ background:"white",borderRadius:15 }}>
                    <Card.Body>
                        <div style={{ height:190 }}>
                          <Image style={{ borderRadius:10,objectFit:"cover",height:180 }}  src={item.ProductImages[0].image} fluid/>          
                        </div>
                <Stack className="mt-1" direction="horizontal">
                    <AiFillStar color="orange"/><Paragraph text={"4.5"}/>
                </Stack>
              <Heading2 text={item.name} className={"mt-2"} fontSize={16}/>
              <Paragraph text={"Reference: #0334948"} color={mutedColor}/>
              <Heading2 text={item.newPrice+"TZS"} className={"mt-2"} color={"orange"}/>
             
            </Card.Body>
            </Card>
                
            </Col>)}
        </Row>
    </div> );
}
 
export default ViewProducts;