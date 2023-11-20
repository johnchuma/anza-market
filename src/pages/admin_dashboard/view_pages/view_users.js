import { Card, Image, Table } from "react-bootstrap";
import Heading from "../../../widgets/heading";
import { timeAgo } from "../../../utils/tile_ago";
import { getUsers } from "../../../controllers/user_controller";
import Loader from "../../../widgets/loading";
import { useEffect, useState } from "react";
import CustomButton from "../../../widgets/button";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        getUsers().then((data)=>{
            setUsers(data)
        setLoading(false)

        })
    }, []);
    return (<div>
    <Heading text={"Users list"}/>
     {loading?<Loader/>:
     <Card style={{ backgroundColor:"white"}} className="mt-3">
     <Card.Body>
     <Table className="table table-hover ">
         <thead>
             <th>Registered</th>
             <th>name</th>
             <th>email</th>
             <th>phone</th>
             <th>role</th>
             <th></th>
         </thead>
         <tbody>
             {users.map((item)=>{
                 return <tr>
                 <td>{timeAgo(item.createdAt)}</td>
                 <td>{item.name}</td>
                 <td>{item.email}</td>
                 <td>{item.phone}</td>
                 <td>{item.role}</td>
                 <td><CustomButton text={"View"} className={" py-0 btn-sm"}/></td>
 
                </tr>
             })}
            
         </tbody>
     </Table>
     </Card.Body>
     
 </Card>
     }
       
    </div>  );
}
 
export default ViewUsers;