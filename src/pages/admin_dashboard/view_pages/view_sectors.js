import { Card, Image, Stack, Table } from "react-bootstrap";
import Heading from "../../../widgets/heading";
import { timeAgo } from "../../../utils/tile_ago";
import {  getSellers, getUsers } from "../../../controllers/user_controller";
import Loader from "../../../widgets/loading";
import { useEffect, useState } from "react";
import CustomButton from "../../../widgets/button";
import { deleteSector, getSectors } from "../../../controllers/sector_controller";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ViewSectors = () => {
    const [sectors, setSectors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

    const navigate =  useNavigate()

    useEffect(() => {
        if(deleting == false){
            setLoading(true)
            getSectors().then((data)=>{
                setSectors(data)
            setLoading(false)
    
            })
        }
       
    }, [deleting]);
    return (<div>
        <Stack className="d-flex justify-content-between" direction="horizontal">
        <Heading text={"View sectors"}/>
        <CustomButton onClick={()=>{
            navigate("/dashboard/add-sector")
        }} text={"Add sector"}/>
        </Stack>
     {loading?<Loader/>:
     <Card style={{ backgroundColor:"white"}} className="mt-3">
     <Card.Body>
     <Table className="table table-hover ">
         <thead>
             <th>Created at</th>
             <th>name</th> 
             <th></th>
         </thead>
         <tbody>
             {sectors.map((item,index)=>{
                 return <tr>
                 <td>{timeAgo(item.createdAt)}</td>
                 <td>{item.name}</td>
                 <td><CustomButton color={"red"} loading={deleting && selectedIndex == index} onClick={()=>{
                    setDeleting(true)
                    setSelectedIndex(index)
                   deleteSector(item.uuid).then((data)=>{
                    toast.success("Deleted successfully")
                    setDeleting(false)

                   });
                 }} text={"Delete"} className={" py-0 btn-sm"}/></td>
 
                </tr>
             })}
            
         </tbody>
     </Table>
     </Card.Body>
     
 </Card>
     }
       
    </div>  );
}
 
export default ViewSectors;