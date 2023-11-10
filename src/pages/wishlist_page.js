import { Card, Col, Container, Form, Image, Row, Stack, Table } from "react-bootstrap";
import Paragraph from "../widgets/paragraph";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import SmallText from "../widgets/small_text";
import Heading from "../widgets/heading";
import { AiFillCheckCircle, AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import CustomButton from "../widgets/button";
import Heading2 from "../widgets/heading2";

const WishlistPage = () => {
    return ( <div >
         <div style={{ backgroundColor:mutedBackground }}>
            <Container className="text-center py-5">
                <Heading fontSize={30} text={"Wishlist"}/>
                <Paragraph color={primaryColor} fontSize={18} text={"Shop"}/>
            </Container>
        </div>
        <Container className="my-3">
        <Row>
            <Col md={12}>
            <Card style={{ backgroundColor:"white"}} className="mt-3 border-0">
        <Card.Body>
        <Table className="table ">
            <thead style={{ fontWeight:300,fontSize:13,color:mutedColor }}>
             
                <th>Image</th>
                <th>Product name</th>
                <th>Price</th>
                <th>Stock status</th>
                <th></th>
            </thead>
            <tbody>
                {["",""].map((item)=>{
                    return <tr>
                    <td><Image rounded src="https://www.washingtonpost.com/resizer/WhVZDM0EQGbUSU4rXhfHcHmfFis=/arc-anglerfish-washpost-prod-washpost/public/SOOK6M6YSWGW67ZQMQRAJEYWKU.jpg" style={{ height:80,width:80 }}/></td>
                    <td><SmallText text={"Pajama"}/></td>
                    <td><Paragraph text={"20,000Tsh"}/></td>
                    
                    <td><Paragraph text={"in stock"} color={primaryColor}/></td>
                   <td><CustomButton text={"Add to cart"} /></td>
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
           
        </Row>
        </Container>
      

    </div> );
}
 
export default WishlistPage;