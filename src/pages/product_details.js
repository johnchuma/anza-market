import { Card, Carousel, Col, Container, Form, Image, Row, Spinner, Stack } from "react-bootstrap";
import Paragraph from "../widgets/paragraph";
import SmallText from "../widgets/small_text";
import { mutedColor, primaryColor, textColor } from "../utils/colors";
import { FaStar } from "react-icons/fa";
import CustomButton from "../widgets/button";
import { AiFillHeart, AiOutlineHeart, AiOutlineMinus, AiOutlineShareAlt } from "react-icons/ai";
import { BsPlus, BsSubtract } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/product_context";
import Heading from "../widgets/heading";
import Heading2 from "../widgets/heading2";
import { getProduct } from "../controllers/product_controller";
import { useParams } from "react-router-dom";
import Loader from "../widgets/loading";
import SizedBox from "../widgets/sizedBox";

import * as formik from 'formik';
import * as yup from 'yup';
import { sendReview } from "../controllers/review_controller";
import { getUser } from "../utils/local_storage";
import { timeAgo } from "../utils/tile_ago";
import { addWishlist, checkIfProductIsAddedToWishlist } from "../controllers/wishlist_controller";
import toast from "react-hot-toast";
import { is } from "date-fns/locale";
import ProductRating from "../widgets/product_rating";
import FormatMoney from "../utils/format_money";
const ProductDetails = () => {
    const{setCart,cart,wishlist,setWishlist} = useContext(ProductContext)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [wishlisting, setWishlisting] = useState(false);
    const [review, setReview] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    

    const [selectedOption, setSelectedOption] = useState("Description");
    const [isWishlisted, setisWishlisted] = useState(false);

    const {uuid} = useParams()

    useEffect(() => {
        
        if(review == false && wishlisting == false){
            setLoading(true)
            getProduct(uuid).then((data)=>{
               if(user){
                checkIfProductIsAddedToWishlist(data.uuid).then((data)=>{
                    setisWishlisted(data.isAdded)
                })
               }
               
                
                setProduct(data)
                setLoading(false)
            })
        }
       
    }, [review,wishlisting]);

    const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    email: yup.string().required('Email is required'),
    comment: yup.string().required('Comment is required'),
  });

  const handleSubmit = (values) => {
   const user = getUser()
    const data = { ...values,rate:rating,product_uuid:product.uuid,user_uuid:null};
    setReview(true)
    sendReview(data).then((data)=>{
       setReview(false)
       
    })
  };

const user = getUser()

    return ( <div>
        <Container className="my-5"> 
          {loading == true?<Loader/>:<Row>
          <Col md={6}>
              {product?
              <Carousel>
                {product.ProductImages.map((item)=>
                <Carousel.Item>
                 <Image  style={{ height:400,width:"100%",objectFit:"cover"}} fluid src={item.image}/>            
                </Carousel.Item>
                )}
              </Carousel>
              :null}
          </Col>
          {
            product && <Col md={6}>
            <Paragraph fontSize={20} text={product.name}/>
           
            <ProductRating item={product} /> 
                                
            <Paragraph fontSize={20} color={primaryColor} text={`${FormatMoney(product.newPrice)} TZS`}/>
            <SmallText  text={product.description}/>
            <Stack className="my-3" direction="horizontal">
                <SmallText text={"Qty:"}/>
               <Card className="bg-white ms-2">
                <Card.Body className="py-2">
                <Stack direction="horizontal" className="">
                    <AiOutlineMinus className="btn border-0 p-0" onClick={()=>{
                      if(quantity >1){
                          setQuantity(quantity -1)
                      }
                  }}/>
                        <Paragraph className={"mx-3"} text={quantity}/>
                    <BsPlus className="btn border-0 p-0" onClick={()=>{
                         if( quantity < product.amount){
                          setQuantity(quantity +1)

                         }
                    }}/>

                </Stack>
                </Card.Body>
                
               </Card>
            </Stack>
            <Stack direction="horizontal">
          {cart.includes(product) == true?<div><Heading2 text={"Added to cart"} fontSize={13} color={primaryColor} /></div> :<CustomButton onClick={()=>{
                product.quantity = quantity;
                setCart([...cart,product]);
            }} text={"Add to cart"}/>}  
            <div className="ms-2 btn btn-outline bg-white">
            <Stack direction="horizontal">{isWishlisted?<AiFillHeart size={20} className="me-1" color="red" />:wishlisting?<Spinner color={mutedColor}/>:<AiOutlineHeart color={mutedColor} /> } 
            {isWishlisted?<div><Heading2 text={"is Added to wishlist"} fontSize={13} color={primaryColor} /></div> :
            <div onClick={()=>{
              if(user){
                  setWishlisting(true);
                  addWishlist(product.uuid).then((status)=>{
                      
                    setWishlisting(false)
                      if(status){
                          toast.success("Added to wishlist successfully")
                      }
                  })
              }
              else{
                  toast.error("Sign in to add products to wishlist")
                  
              }
             
            }}>
            <SmallText text={"Add to wishlist"}/>

            </div>
            }
            
            </Stack>

            </div>
            </Stack>
            

            <SmallText className={"mt-3"} text={"Category: Women"}/>
            <Stack className={"mt-3"} direction="horizontal">
            <SmallText  text={"Share"}/> <AiOutlineShareAlt className="ms-2"/>
            </Stack>
          

        </Col>
          }
          
          
      </Row>
       
          
          }
          <SizedBox/>
           <Stack className="d-flex justify-content-center mt-5" direction="horizontal">
              {["Description","Shipping & returns","Reviews"].map((item)=><div onClick={()=>{
                setSelectedOption(item)
              }} className="btn border-0 p-0 me-5">
                <Paragraph color={selectedOption == item?primaryColor:textColor} text={item}/>
                <div style={{ width:"100%",height:"3px",backgroundColor:selectedOption == item?primaryColor:"transparent" }}></div>
              </div>)}
            </Stack>
            <SizedBox/>
            {
            selectedOption == "Description" && product &&<div>
                <Card>
                    <Card.Body className="px-4 py-5">
                        <SmallText text={product.description}/>
                    </Card.Body>
                </Card>
            </div>
        }
         {
            selectedOption == "Shipping & returns"&&<div>
                <Card>
                    <Card.Body className="px-4 py-5">
                        <Paragraph text={"Shipping & returns"}/>
                        <SmallText text={`
                        We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our Delivery information
                        We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our Returns information
                        `}/>
                    </Card.Body>
                </Card>
            </div>
        }
       
       {
            selectedOption == "Reviews"&&<div>
                <Card>
                    <Card.Body className="px-4 py-5">
                    <Heading2 text={`Reviews (${product.Reviews.length})`}/>
                    
                    <SizedBox/>
                    {product.Reviews.map((item)=>{
                        return <div className="mb-4">
                            <Row>
                                <Col md={2}>
                                    <Paragraph text={item.name}/>
                                    <Stack direction="horizontal" className="d-flex justify-content-start py-2">
                                  <FaStar size={12} color={item.rate>0?"orange":mutedColor}/>
                                  <FaStar size={12} color={item.rate>1?"orange":mutedColor}/>
                                  <FaStar size={12} color={item.rate>2?"orange":mutedColor}/>
                                  <FaStar size={12} color={item.rate>3?"orange":mutedColor}/>
                                  <FaStar size={12} color={item.rate>4?"orange":mutedColor}/>
                                  </Stack>      
                                  <SmallText text={timeAgo(item.createdAt)}/>
                                </Col>
                                <Col>
                                  <Paragraph text={item.comment}/>
                                </Col>
                            </Row>
                        </div>
                    })}
                    <SizedBox height={50}/>
                    <Heading2 text={"Add your review"}/>
                    <SmallText text={"Your email address will not be published."}/>
                    <SizedBox/>
                    <Stack className="btn border-0 p-0" direction="horizontal">
                    <SmallText className={"me-2"}  text={"Your review*"}/>
                    <FaStar size={12} onClick={()=>{
                        setRating(1)
                    }} color={rating>0?"orange":mutedColor}/>
                    <FaStar size={12} onClick={()=>{
                        setRating(2)
                    }} color={rating>1?"orange":mutedColor}/>
                    <FaStar size={12} onClick={()=>{
                        setRating(3)
                    }} color={rating>2?"orange":mutedColor}/>
                    <FaStar size={12} onClick={()=>{
                        setRating(4)
                    }} color={rating>3?"orange":mutedColor}/>
                    <FaStar size={12} onClick={()=>{
                        setRating(5)
                    }} color={rating>4?"orange":mutedColor}/>
                    </Stack>
                    <Formik
            initialValues={{
              name: "",
              email: "",
              comment:""    
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
             
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                          <Form.Group className='mt-3'>    
                              <Form.Control
                                onChange={handleChange}
                                name='comment'
                                as="textarea"
                                cols={10}
                                placeholder="Comment"
                                value={values.comment}
                                isInvalid={!!errors.comment && touched.comment}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.comment}</Form.Control.Feedback>
                            </Form.Group>
                    <Row className="mt-3">
                        <Col>
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
                        <Col>
                        <Form.Group className='mt-3'>    
                              <Form.Control
                                onChange={handleChange}
                                name='email'
                                placeholder="Email"
                                value={values.email}
                                isInvalid={!!errors.email && touched.email}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <CustomButton className={"mt-4"} loading={review} text={"Submit"}/>
              </Form>)}
              </Formik>
                    
                    </Card.Body>
                </Card>
            </div>
        }
       
        </Container>
       
    </div> );
}
 
export default ProductDetails;