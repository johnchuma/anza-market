import { Button, Col, Collapse, Container, Form, Image, Row, Spinner, Stack } from "react-bootstrap";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import Heading2 from "../widgets/heading2";
import Heading from "../widgets/heading";
import Paragraph from "../widgets/paragraph";
import SizedBox from "../widgets/sizedBox";
import SmallText from "../widgets/small_text";
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { getProducts, getSectorProducts, searchProducts } from "../controllers/product_controller";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/product_context";
import { getSectors } from "../controllers/sector_controller";
import Loader from "../widgets/loading";
import { logout } from "../utils/local_storage";
import ProductRating from "../widgets/product_rating";
import FormatMoney from "../utils/format_money";

const ShopPage = () => {
    const [openCategory, setOpenCategory] = useState(true);
    const [openPrice, setOpenPrice] = useState(false);
    const [products, setProducts] = useState([]);
    const {setSelectedProduct} = useContext(ProductContext)
    const [loading, setLoading] = useState(false);
    const [selectedSector, setSelectedSector] = useState(null);
    const navigate =  useNavigate()
    const {category} = useParams()
    const {keyword} = useParams()
    const [limit, setlimit] = useState(2);
    const [page, setpage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [count, setCount] = useState(0);


    useEffect(() => {
   setLoading(true)
  if(keyword){
    searchProducts(keyword,page,limit).then((response)=>{
        setProducts(response.data)
        setpage(response.page);
        setCount(response.count);
        setTotalPages(response.totalPages)
        setLoading(false)
     })
  }else{
    if(category == "all") {
        getProducts({page,limit}).then((response)=>{
            setProducts(response.data)
            setpage(response.page);
            setCount(response.count);
            setTotalPages(response.totalPages)
            setLoading(false)
         })
      }
      else{
        getSectorProducts(category,page,limit).then((response)=>{
            setProducts(response.data)
            setpage(response.page);
            setCount(response.count);
            setTotalPages(response.totalPages)
           setLoading(false)
    
        })
      }
  }
  
     
    }, [category,page]);
    // useEffect(() => {
    //     if(selectedSector){
    //         setLoading(true)
            
    //     }
    // }, [selectedSector]);

    const [categories, setCategories] = useState([]);
  useEffect(() => {
    getSectors().then((value)=>setCategories(value))
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
            {loading?<Loader/>:<Row>
                <Col md={4}>
                <Paragraph text={"Filters"}/>
                    <Stack onClick={()=>{
                        
                        setOpenCategory(!openCategory)
                    }} className="d-flex justify-content-between btn p-0 border-0" direction="horizontal">
                        <Paragraph fontSize={20} text={"Category"}/>
                     {openCategory?<FaChevronUp size={15} color={mutedColor} />:<FaChevronDown size={15} color={mutedColor} />}   
                    </Stack>
                    {openCategory?<div className="mt-2" style={{  }}>
                    {categories.map((item)=>{
                         return <Stack onClick={()=>navigate(`/shop/${item.uuid}`)} className="d-flex justify-content-between btn border-0 p-0" direction="horizontal">
                          <SmallText  text={item.name}/>
                         
                      </Stack>
                    })}
                    </div>:<div></div>}
                    <SizedBox />
                    
                    {/* {openPrice?<div className="mt-2" style={{  }}>
                    <Stack direction="horizontal">
                     <SmallText text={"Price range"}/>
                     <SmallText className={"ms-2"} text={"$0 - $1000"} color={primaryColor}/>
                     </Stack>
                     <Form.Range color={primaryColor}></Form.Range>
                    </div>:<div></div>} */}
                    
                    
                </Col>
                <Col md={8}> 
                    {products.map((item)=>{
                        return <div onClick={()=>{
                            setSelectedProduct(item)
                            navigate(`/product-details/${item.uuid}`)
                        }} className="mb-4">
                            <Row className="d-flex align-items-center">
                                <Col md={4}>
                                    <Image src={item.ProductImages[0].image} style={{ height:200,width:"100%",objectFit:"cover" }} fluid/>
                                </Col>
                                <Col md={5}>
                                    <SmallText text={"Women"} fontSize={14}/>
                                    <Paragraph fontSize={18} text={item.name}/>
                                    <SmallText text={item.description}/>
                                </Col>
                                <Col>
                                  <Heading2 text={FormatMoney(item.newPrice)+ "TZS"} color={primaryColor}   fontSize={16}/>
                                 <ProductRating item={item} /> 
                                    
                                  {/* <Button className="border-0 mt-3" style={{ backgroundColor:primaryColor,fontSize:14 }} >Add to cart</Button> */}
                                </Col>
                            </Row>
                        </div>
                    })}
                    <Stack direction="horizontal" className="d-flex justify-content-center">
                        <Stack className="btn border-0 p-0" onClick={()=>{
                            if(page>1){
                                setpage(page-1);
                            }
                        }} direction="horizontal">
                        <FaArrowLeft color={mutedColor} size={10}/> 
                        <Paragraph color={mutedColor} className={"pe-3 ps-2"} text={"Prev"}/>
                        </Stack>
                       
                        <SmallText className={"me-1"} text={`${page}`}/>
                        <Paragraph color={mutedColor} text={`of ${totalPages}`}/>
                        <Stack className="btn border-0 p-0 cta" onClick={()=>{
                            if(page <totalPages){
                              setpage(page+1)
                            }
                        }} direction="horizontal">
                        <SmallText className={"ps-3 pe-2"} isCTA={true} text={"Next"}/>
                        <FaArrowRight color={mutedColor} size={10}/> 
                        </Stack>

                        

                        
                    </Stack>
                </Col>

            </Row> }
            
        </Container>
    <SizedBox height={100}/>
    </div> );
}
 
export default ShopPage;