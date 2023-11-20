import { Badge, Card, Form, Image, Table,Stack } from "react-bootstrap";
import Heading from "../../../widgets/heading";
import { getSellerOrders, updateOrderProduct } from "../../../controllers/order_controller";
import SmallText from "../../../widgets/small_text";
import { useContext, useEffect, useState } from "react";
import { mutedColor } from "../../../utils/colors";
import Loader from "../../../widgets/loading";
import Paragraph from "../../../widgets/paragraph";
import { timeAgo } from "../../../utils/tile_ago";
import toast from "react-hot-toast";
import { UserContext } from "../../../contexts/user_context";
import Heading2 from "../../../widgets/heading2";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [waiting, setWaiting] = useState(false);
   const {user} = useContext(UserContext)
    useEffect(() => {
        if(waiting == false){
            setLoading(true)
            getSellerOrders(user.Business.uuid).then((data)=>{
                setOrders(data)
                setLoading(false)
            })
        }
    }, [waiting]);
    return (<div>
    <Heading text={"New orders"}/>
    {
        loading == true? <Loader/>:

    <Card style={{ backgroundColor:"white"}} className="mt-3">
        <Card.Body>
        
     {loading?<Loader/>: orders.length <1?
     <Stack className="d-flex justify-content-center align-items-center text-center" direction="horizontal">
            <div>
        <Image style={{ height:200 }} src="https://cdni.iconscout.com/illustration/premium/thumb/man-receiving-canceled-orders-back-4438793-3718471.png"/>
        <Heading2 text={"No available data"}/>
        <SmallText text={"Customers orders will appear here"}/>

     
     </div>
     </Stack>
     :
                    orders.map((item,index)=>
                    <Card className=" border-0 mb-3">
                     <Card.Header>
                     <Paragraph text={`Ordered ${timeAgo(item.createdAt)}`}/>
                     </Card.Header>
                        <Card.Body>
                        <div className="mb-3">
                    <div>
                    <Table className="table ">
                        <thead style={{ fontWeight:300,fontSize:13,color:mutedColor }}>
                        <th>Image</th>
                        <th>Product name</th>
                        <th>Quantity</th>
                        <th>Total price</th>
                        <th>Payment status</th>
                        <th>Order status</th>
                        <th>Is delivered</th>

                    
     </thead>
     <tbody>
        {/* {item.} */}
         {item.OrderProducts.map((orderProduct)=>{
             var item = orderProduct.Product;
             return <tr>
             <td><Image rounded src={item.ProductImages[0].image} style={{ height:80,width:80,objectFit:"cover" }}/></td>
             <td><SmallText text={item.name}/></td>
             <td> <SmallText text={orderProduct.quantity}/> </td>
             <td><SmallText text={`${orderProduct.quantity* item.newPrice}TSH`} /></td>
             <td><Badge bg="success" >Paid</Badge></td>
             <td>
                {orderProduct.status == "delivered"?<Badge bg="success" >Delivered</Badge>:<Badge bg="secondary" >Waiting</Badge>}
                
             
             </td>
             <td>
                <Form.Switch  checked={orderProduct.status == "delivered"} onChange={(e)=>{
                    setWaiting(true)
                    if(e.target.checked){
                            updateOrderProduct(orderProduct.uuid,{"status":"delivered"}).then((value)=>{
                                    toast.success("Saved changes")
                                    setWaiting(false)
                            })
                          }
                    else{
                    setWaiting(true)
                        updateOrderProduct(orderProduct.uuid,{"status":"waiting"}).then((value)=>{
                                toast.success("Saved changes")
                                setWaiting(false)
                        })
                    }
                
                }} />
             </td>


            </tr>
         })}
        
     </tbody>
 </Table>
                    </div>
                 </div>
                        </Card.Body>
                    </Card>
                   
                 
                 )}
     
        </Card.Body>
        
       </Card>
    }
    
    </div>  );
}
 
export default OrdersPage;