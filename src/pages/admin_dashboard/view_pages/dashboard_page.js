import { Card, Col, Form, Row, Stack } from "react-bootstrap";
import Heading from "../../../widgets/heading";
import Heading2 from "../../../widgets/heading2";
import Paragraph from "../../../widgets/paragraph";
import { FaDollarSign, FaHome, FaSdCard } from "react-icons/fa";
import SizedBox from "../../../widgets/sizedBox";
import { useState } from "react";
import { mutedColor, primaryColor, textColor } from "../../../utils/colors";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
    const [category, setCategory] = useState("Today");
    return ( <div>
        <Heading text={"Dashboard"} className={"mb-3"}/>
        <Row>

            {[
    {title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign color="white"/>,stongColor:"#198754",lightColor:"#D1E7DD"},
    {title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign color="white"/>,stongColor:"#DC3545",lightColor:"#F8D7DA"},
    {title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign color="white"/>,stongColor:"#FFC107",lightColor:"#FFF3CD"}
        ].map((item)=>{
              return <Col md={4}>
                     <div style={{ backgroundColor:item.lightColor }} className="rounded" >
                    <Stack className="p-3" direction="horizontal">
                        <div className="d-flex justify-content-center align-items-center rounded"  style={{ height:50,width:50,backgroundColor:item.stongColor }}>
                            {item.icon}
                        </div>
                        <SizedBox width={10}/>
                        <div>
                        
                        <Heading2 text={item.title} color={item.stongColor} fontSize={18}/>
                    <Paragraph text={item.subtitle} color={item.stongColor} fontSize={13}/>
                        </div>
                    </Stack>
                    </div>
              </Col>
            })}
        </Row>
   <Row className="my-4">
    <Col md={4}>
       <Card className="bg-white rounded p-0">
        
        <Stack direction="horizontal" className="d-flex justify-content-between">
            {["Today","Week","Month","Year"].map((item)=><div className="py-2 px-2 btn border-0 p-0 rounded-0" onClick={()=>{
                setCategory(item)
            }}  style={{ backgroundColor:item==category?primaryColor:"white",color:item==category?"white":"black" }}>{item}</div>)}
        </Stack>
       </Card>
    </Col>
    <Col md={{ offset:4,span:4 }}>
        <Form.Control className="py-2" type="date"/>
    </Col>
   </Row>
   
   <Row className="mt-2">

{[
{title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign />,stongColor:"#198754",lightColor:"#D1E7DD"},
{title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign />,stongColor:"#DC3545",lightColor:"#F8D7DA"},
{title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign />,stongColor:"#FFC107",lightColor:"#FFF3CD"},
{title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign />,stongColor:"#FFC107",lightColor:"#FFF3CD"},
{title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign />,stongColor:"#FFC107",lightColor:"#FFF3CD"},
{title:"Revenue",subtitle:"25,000TZS",icon:<FaDollarSign />,stongColor:"#FFC107",lightColor:"#FFF3CD"},

].map((item)=>{
  return <Col md={4}>
         <Card style={{ backgroundColor:"white" }} className="rounded mb-2" >
        <Stack className="p-3 d-flex justify-content-between" direction="horizontal">
            <div>
            <Paragraph text={item.subtitle} color={mutedColor} fontSize={13}/>
            <Heading2 text={item.title} color={textColor} fontSize={18}/>
            </div> <div className="d-flex justify-content-center align-items-center rounded"  style={{ height:50,width:50,color:item.stongColor }}>
                {item.icon}
            </div>
        </Stack>
        </Card>
  </Col>
})}
</Row>
    </div> );
}
 
export default DashboardPage;