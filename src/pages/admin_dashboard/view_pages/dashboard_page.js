import { Card, Col, Form, Row, Stack } from "react-bootstrap";
import Heading from "../../../widgets/heading";
import Heading2 from "../../../widgets/heading2";
import Paragraph from "../../../widgets/paragraph";
import { FaDollarSign, FaHome, FaSdCard } from "react-icons/fa";
import SizedBox from "../../../widgets/sizedBox";
import { useState } from "react";
import { mutedColor, primaryColor, textColor } from "../../../utils/colors";
import { Navigate } from "react-router-dom";
import OrdersPage from "./orders_page";

const DashboardPage = () => {
    const [orders, setOrders] = useState([]);

    const [category, setCategory] = useState("Today");
    return ( <div>
        <SizedBox/>
        <Heading text={"Dashboard"} className={"mb-3"}/>
        <Row>

            {[
    {title:"500,000TZS",subtitle:"Total sales",icon:<FaDollarSign color="white"/>,stongColor:"#198754",lightColor:"#D1E7DD"},
    {title:"300,000TZS",subtitle:"Total profit",icon:<FaDollarSign color="white"/>,stongColor:"#DC3545",lightColor:"#F8D7DA"},
    {title:"170",subtitle:"Total orders",icon:<FaDollarSign color="white"/>,stongColor:"#c69606",lightColor:"#FFF3CD"}
        ].map((item)=>{
              return <Col md={4}>
                     <div style={{ backgroundColor:item.lightColor }} className="rounded" >
                    <Stack className="p-3" direction="horizontal">
                        <div className="d-flex justify-content-center align-items-center rounded"  style={{ height:45,width:45,backgroundColor:item.stongColor,fontSize:16 }}>
                            {item.icon}
                        </div>
                        <SizedBox width={10}/>
                        <div>
                        <Paragraph text={item.subtitle} color={item.stongColor} fontSize={15}/>
                        <Heading text={item.title} color={item.stongColor} fontSize={18}/>
                        </div>
                    </Stack>
                    </div>
              </Col>
            })}
        </Row>
        <SizedBox height={50}/>
        {/* <Heading fontSize={20} text={"Recent orders"} className={"mb-3"}/> */}
         <OrdersPage/>

 
    </div> );
}
 
export default DashboardPage;