import { Card, Form, Image, Table } from "react-bootstrap";
import Heading from "../../../widgets/heading";
import { timeAgo } from "../../../utils/tile_ago";
import {  getSellers, getUsers } from "../../../controllers/user_controller";
import Loader from "../../../widgets/loading";
import { useEffect, useState } from "react";
import CustomButton from "../../../widgets/button";
import {  getBusinessApplications, updateBusiness } from "../../../controllers/business_controller";
import toast from "react-hot-toast";

const ViewSellersApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);



    useEffect(() => {
        if(updating == false){
            setLoading(true)
            getBusinessApplications().then((data)=>{
                setApplications(data)
            setLoading(false)
    
            })
        }
        
    }, [updating]);
    return (<div>
    <Heading text={"Business applications"}/>
     {loading?<Loader/>:
     <Card style={{ backgroundColor:"white"}} className="mt-3">
     <Card.Body>
     <Table className="table table-hover ">
         <thead>
             <th>Sent</th>
             <th>name</th>
             <th>phone</th>
             <th>Business name</th>
             <th>Approve</th>
       
             <th></th>
         </thead>
         <tbody>
             {applications.map((item,index)=>{
                 return <tr>
                 <td>{timeAgo(item.createdAt)}</td>
                 <td>{item.User.name}</td>
                 <td>{item.User.phone}</td>
                 <td>{item.name}</td>
                
                 <td><CustomButton text={"Approve"} loading={updating && selectedIndex== index} onClick={()=>{
                        setSelectedIndex(false);
                        setUpdating(true)
                        updateBusiness({"status":"accepted"},item.uuid).then((data)=>{
                            if(data){
                                toast.success("Seller request is approved successfully ")
                            }
                            setUpdating(false)

                        })
                    
                 }} className={" py-0 btn-sm"}/></td>
                  <td><CustomButton text={"Reject"} loading={updating && selectedIndex== index} onClick={()=>{
                        setSelectedIndex(false);
                        setUpdating(true)
                        updateBusiness(item.uuid,{"status":"rejected"}).then((data)=>{
                            if(data){
                                toast.success("Seller request is rejected")
                            }
                            setUpdating(false)

                        })
                    
                 }} className={" py-0 btn-sm"}/></td>
 
                </tr>
             })}
            
         </tbody>
     </Table>
     </Card.Body>
     
 </Card>
     }
       
    </div>  );
}
 
export default ViewSellersApplications;