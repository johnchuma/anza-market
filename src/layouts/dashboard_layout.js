import { Col, Container, Form, Image, Row, Stack } from "react-bootstrap";

import { AiFillContacts, AiFillDashboard, AiFillMedicineBox, AiFillPieChart, AiFillSetting, AiFillShop, AiOutlineSearch } from "react-icons/ai";

import { Outlet, useNavigate } from "react-router-dom";
import Heading2 from "../widgets/heading2";
import { FaBell, FaUser } from "react-icons/fa";
import Paragraph from "../widgets/paragraph";
import { primaryColor } from "../utils/colors";

const DashboardLayout = () => {
    const navigate = useNavigate()
    return ( <div style={{ backgroundColor:"#F9FBFD" }}>
        <Container>
            <br/>
            <Row>
                <Col md={3} >
                 <div className="px-4" style={{ height:"90vh",backgroundColor:primaryColor,borderRadius:30,position:"fixed" }}>
                    <Container className="py-5 px-3">
                    <div style={{ width:80 }}>
                    <Image  src="/images/home/anza.png" fluid/>
                    </div> 
                    <Heading2 text={"Seller's dashboard"} color={"white"} className={"mb-5 mt-5"}/>
                    {[{title:"Dashboard",onClick:()=>{navigate("/dashboard/")},icon:<AiFillDashboard size={23} color="white"/>},
                    {title:"Products",onClick:()=>{navigate("/dashboard/products")},icon:<AiFillMedicineBox size={23} color="white"/>},
                    {title:"Orders",onClick:()=>{navigate("/dashboard/orders")},icon:<AiFillShop size={23} color="white"/>},
                    {title:"Categories",onClick:()=>{navigate("/dashboard/categories")},icon:<AiFillContacts size={23} color="white"/>},

                    {title:"Reports",onClick:()=>{},icon:<AiFillPieChart size={23} color="white"/>}].map((item)=><div>
                        <Stack onClick={item.onClick}  direction="horizontal" className="mb-3 btn border-0 p-0">
                            {item.icon} <Heading2 color={"white"} className={"ms-2"} fontSize={16} text={item.title}/>
                        </Stack>
                    </div>)}
                    </Container>
                   
                 </div>
                </Col>
                <Col md={9}>
                    <br/>
                    <br/>
                    <Stack>
                        <Row>
                            <Col md={4}>
                            <Stack style={{ backgroundColor:"white", }} className="p-1" direction="horizontal">
                            <Form.Control placeholder="Search content here"></Form.Control>
                            <div style={{ backgroundColor:"#00000010" }}><AiOutlineSearch size={20} className="m-2 rounded"/></div>
                            </Stack>
                            </Col>
                            <Col className="d-flex justify-content-end">                           
                            <Stack direction="horizontal">
                               <Heading2 text={"🇹🇿"} className={"me-2"} /> <FaBell className="me-2"/> 
                               <div className="mx-3">
                               <Heading2 fontSize={16} text={"John Chuma"}/>
                               <Paragraph text={"johnvchuma@gmail.com"}/>
                               </div>
                               <div style={{ height:50,width:50}}>
                                 <Image fluid roundedCircle src="https://hips.hearstapps.com/hmg-prod/images/how-to-shave-your-face-at-home-1648149510.png?crop=0.506xw:0.997xh;0.228xw,0.00318xh&resize=1200:*" />
                               </div>
                               <AiFillSetting className="ms-3"/>
                            </Stack>
                            </Col>
                        </Row>
                    </Stack>
                    <br/>

                    <Outlet/>
                </Col>
            </Row>
        </Container>
    </div> );
}
 
export default DashboardLayout;