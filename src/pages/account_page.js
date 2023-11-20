import { Badge, Card, Col, Container, Form, Image, Row, Stack, Table } from "react-bootstrap";
import Paragraph from "../widgets/paragraph";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import SmallText from "../widgets/small_text";
import Heading from "../widgets/heading";
import { AiFillCheckCircle, AiOutlineArrowRight, AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import CustomButton from "../widgets/button";
import Heading2 from "../widgets/heading2";
import { FaArrowRight } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../controllers/order_controller";
import { timeAgo } from "../utils/tile_ago";
import LoginPage from "./authentication/login_page";
import { getUser, logout } from "../utils/local_storage";
import * as formik from 'formik';
import * as yup from 'yup';
import { sendReview } from "../controllers/review_controller";
import { getMyInfo, getUserInfo, updateUser } from "../controllers/user_controller";
import toast from "react-hot-toast";
import Loader from "../widgets/loading";
import { UserContext } from "../contexts/user_context";

const AccountPage = () => {
   const navigate =  useNavigate();
    const [selected, setSelected] = useState(0);
    const [orders, setOrders] = useState([]);
    const [userInfo, setuserInfo] = useState(null);
    const {refresh,setRefresh} = useContext(UserContext);
    useEffect(() => {
        setLoading(true)
        getMyOrders().then((data)=>{
            setOrders(data)
        })
        setLoading(false)
    }, []);
    const [loading, setLoading] = useState(false);
    const [submiting, setSubmiting] = useState(false);
useEffect(() => {
    if(submiting == false){
        setLoading(true)
        getMyInfo().then((data)=>{
            setuserInfo(data)
            setLoading(false)
        })
    }
}, [submiting]);

    const { Formik } = formik;
    const schema = yup.object().shape({
      name: yup.string().required('name is required'),
      phone: yup.string().required('Phone number is required'),
    });
    
    const handleSubmit = (values) => {
      const data = { ...values,user_uuid:null};
      setSubmiting(true)
      updateUser(data).then((status)=>{
         if(status == true){
            toast.success("Updated successfully")
         }
         setSubmiting(false)
      })
    };
  
//   const user = getUser()
    
    return ( <div>
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
                        logout()
                        setRefresh()
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
                {selected ==1 && <div>
                    {loading?<Loader/>:
                    orders.map((item,index)=>
                    <Card className=" border-0 mb-3">
                     <Card.Header>
                    {/* <Paragraph fontSize={16} text={`${index+1} order`}/> */}
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
                    
     </thead>
     <tbody>
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


            </tr>
         })}
        
     </tbody>
 </Table>
                    </div>
                 </div>
                        </Card.Body>
                    </Card>
                   
                 
                 )}
             </div>
}
                  
                {selected ==2 &&<div>
                   {
                    loading ? <Loader/>:
                    <Card className="border-0">
                    <Card.Body>
                        {/* <Paragraph color={primaryColor} text={"Update account"}/> */}
                        <SmallText text={"Update your account infromations below*"}/>
                    <Formik
            initialValues={{
              name: userInfo.name,
              phone: userInfo.phone,
            
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
             
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                         
                    <Row className="mt-3">
                        <Col md={6}>
                        <Form.Group className='mt-3'>    
                              <Form.Control
                                onChange={handleChange}
                                name='name'
                                placeholder="Name"
                                value={values.name}
                                isInvalid={!!errors.name && touched.name}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group className='mt-3'>    
                              <Form.Control
                                onChange={handleChange}
                                name='phone'
                                placeholder="Phone number"
                                value={values.phone}
                                isInvalid={!!errors.phone && touched.phone}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                       
                    </Row>
                    <CustomButton className={"mt-4"} loading={submiting} text={"Update account"}/>
              </Form>)}
              </Formik>
                    </Card.Body>
                  </Card>
                   }
                  
                </div>}
              
            </Col>
        </Row>
        </Container>
      

    </div> );
}
 
export default AccountPage;