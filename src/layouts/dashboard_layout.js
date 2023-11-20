import { Col, Container, Form, Image, Offcanvas, Row, Stack } from "react-bootstrap";

import { AiFillCloseCircle, AiFillContacts, AiFillDashboard, AiFillMedicineBox, AiFillPieChart, AiFillProfile, AiFillSetting, AiFillShop, AiOutlineClose, AiOutlineMenu, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

import { Outlet, useNavigate } from "react-router-dom";
import Heading2 from "../widgets/heading2";
import { FaBell, FaUser } from "react-icons/fa";
import Paragraph from "../widgets/paragraph";
import { mutedBackground, mutedColor, primaryColor } from "../utils/colors";
import { useContext, useEffect, useState } from "react";
import SizedBox from "../widgets/sizedBox";
import { BsForward, BsPeople, BsPeopleFill, BsPerson, BsPersonFill, BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { logout } from "../utils/local_storage";
import { UserContext } from "../contexts/user_context";

const DashboardLayout = () => {
    const [show, setShow] = useState(false);
    const {user} = useContext(UserContext);
    const navigate = useNavigate()
    return ( <div style={{ backgroundColor:"#F9FBFD" }}>
        <Offcanvas show={show} onClick={()=>setShow(false)} placement="start">
            <Offcanvas.Body  style={{ backgroundColor:primaryColor,overflowY:"hidden" }}>
            <div className="px-4" style={{ borderRadius:30}}>
                    <Container className="py-5 px-3">
                    <Stack className="d-flex justify-content-end" direction="horizontal">
                    <div onClick={()=>{
                        setShow(false)
                    }} className="btn border-0 p-0">
                      <AiOutlineClose style={{color:"#ffffff50" }} size={20}/>
                    </div>
                 </Stack>
                    <div onClick={()=>navigate("/")} className="btn p-0" style={{ width:80 }}>
                        <Image src="/images/home/anza.png" fluid/>
                    </div>
                    
                    <Heading2 text={user.role=="admin"?"Admin dashboard":"Seller's dashboard"} color={"white"} className={"mb-5 mt-5"}/>
                    {[  {title:"Dashboard",role:["seller","admin"], onClick:()=>{navigate("/dashboard/")},icon:<AiFillDashboard size={16} color={"#9ba3b4"}/>},
                        {title:"Uploaded Products",role:["seller"], onClick:()=>{navigate("/dashboard/products")},icon:<AiFillMedicineBox size={16} color={"#9ba3b4"}/>},
                        {title:"Customer orders",role:["seller"], onClick:()=>{navigate("/dashboard/orders")},icon:<AiFillShop size={16} color={"#9ba3b4"}/>},
                        {title:"System users",role:["admin"], onClick:()=>{navigate("/dashboard/users")},icon:<BsPeopleFill size={16} color={"#9ba3b4"}/>},
                        {title:"Marketplace sellers",role:["admin"], onClick:()=>{navigate("/dashboard/sellers")},icon:<AiFillContacts size={16} color={"#9ba3b4"}/>},
                        {title:"Applications",role:["admin"], onClick:()=>{navigate("/dashboard/applications")},icon:<BsPlusCircleFill size={16} color={"#9ba3b4"}/>},
                        {title:"Business sectors",role:["admin"], onClick:()=>{navigate("/dashboard/sectors")},icon:<AiFillPieChart size={16} color={"#9ba3b4"}/>}
                    ].map((item)=> item.role.includes(user.role)&& <div>
                        <Stack onClick={item.onClick} direction="horizontal" className="mb-3 btn border-0 p-0">
                            {item.icon} <Paragraph color={"white"} className={"ms-2"} fontSize={17} text={item.title}/>
                        </Stack>
                    </div>)}
                    </Container>
                 </div>
                 
            </Offcanvas.Body>
        </Offcanvas>
        <Container>
            <br/>
            <Row >
                <Col md={12}>
                    <br/>
                    <br/>
                    <Stack>
                        <Row>
                            <Col md={4}>
                            <Stack style={{  }} className="p-1" direction="horizontal">
                            <div className="btn border-0 p-0 me-3" onClick={()=>navigate("/")} style={{ width:170 }}>
                             <Image  src="/images/home/Shule-Yetu-–-52.png" fluid/>
                            </div>  
                            <Form.Control style={{ borderTopLeftRadius:5,borderBottomLeftRadius:5,borderTopRightRadius:0,borderBottomRightRadius:0 }} placeholder="Search content here" className=" shadow-none"></Form.Control>
                            <div style={{ borderTopRightRadius:5,borderBottomRightRadius:5, backgroundColor:"white",borderColor:"#00000020",borderWidth:1,borderStyle:"solid" }}><AiOutlineSearch size={20} className="m-2 rounded"/></div>
                            </Stack>
                            </Col>
                            <Col className="d-flex justify-content-end">                           
                            <Stack direction="horizontal">
                              
                               <div className="mx-3">
                                  <Paragraph fontSize={16} text={"John Chuma"}/>
                                  {/* <Paragraph text={"johnvchuma@gmail.com"}/> */}
                               </div>
                               <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ height:35,width:35,backgroundColor:"rgb(255, 222, 160)"}}>
                                  <BsPersonFill color="rgb(143, 94, 5)"/>
                               </div>
                               <div className="btn border-0" onClick={()=>{
                                    setShow(true)
                                  }}>
                                  <AiOutlineMenu size={28} color={mutedColor} className="ms-3"/>
                               </div>
                            </Stack>
                            </Col>
                        </Row>
                    </Stack>
                    {/* <hr/> */}
                    <SizedBox/>
                  
                    <Outlet/>
                </Col>
            </Row>
        </Container>
    </div> );
}
 
export default DashboardLayout;