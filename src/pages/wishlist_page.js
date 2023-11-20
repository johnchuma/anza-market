import { Card, Col, Container, Form, Image, Row, Spinner, Stack, Table } from "react-bootstrap";
import Paragraph from "../widgets/paragraph";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import SmallText from "../widgets/small_text";
import Heading from "../widgets/heading";
import CustomButton from "../widgets/button";
import { deleteWishlist, getUserWishlists } from "../controllers/wishlist_controller";
import { useEffect, useState } from "react";
import Loader from "../widgets/loading";
import { AiFillDelete, AiOutlineMinus } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Heading2 from "../widgets/heading2";
import SizedBox from "../widgets/sizedBox";


const WishlistPage = () => {
    const [wishlist, setwishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [selectionWishlist, setSelectionWishlist] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        if(deleting == false){
            setLoading(true)
            getUserWishlists().then((data)=>{
              setwishlist(data)
              setLoading(false)
            })
        }
      
    }, [deleting]);
    return (
        
        <div >
         <div style={{ backgroundColor:mutedBackground }}>
            <Container className="text-center py-5">
                <Heading fontSize={30} text={"Wishlist"}/>
                <Paragraph color={primaryColor} fontSize={18} text={"Shop"}/>
            </Container>
        </div>
        {
            loading? <Loader/>: wishlist.length < 1? <Stack direction="horizontal" className="d-flex justify-content-center text-center">
            <div>
            <Image  style={{width:200}} fluid src="https://cdni.iconscout.com/illustration/premium/thumb/wishlist-6299853-5295175.png"/>
             <Heading2  text={"No product in wishlist"}/>
             
             <Paragraph color={primaryColor} className={"btn border-0 p-0"} onClick={()=>{
               navigate("/shop")
             }} text={"Explore anza marketplace"}/>

             <SizedBox/>
            </div>
          </Stack >:
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
                   {/* <th>Stock status</th> */}
                   <th></th>
                   <th></th>
   
               </thead>
               <tbody>
                   {wishlist.map((item)=>{
                       var product = item.Product;
                       return <tr>
                       <td><Image src={product.ProductImages[0].image} style={{ height:80,width:80,objectFit:"cover" }}/></td>
                       <td><SmallText text={product.name}/></td>
                       <td><Paragraph text={`${product.newPrice}`}/></td>
                       <td><CustomButton onClick={()=>{
                           navigate(`/product-details/${product.uuid}`)
                           }} text={"View product"} /></td>
                       <td>
                           {selectionWishlist == item.id && deleting ?
                             <Spinner size="14"/> :
                             <AiOutlineMinus onClick={()=>{
                               setSelectionWishlist(item.id)
                               setDeleting(true)
                               deleteWishlist(item.uuid).then((value)=>{
                                if(value){
                                   setDeleting(false)
                                    toast.success("Product is removed from wishlist")
                                }
                               })
                         }}/>
                           }
                           
                            </td>
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
        
        }
           
         
        
        
      

    </div> );
}
 
export default WishlistPage;