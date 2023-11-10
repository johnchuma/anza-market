import { Card, Image, Table } from "react-bootstrap";
import { textColor } from "../../../utils/colors";
import Heading from "../../../widgets/heading";
import Heading2 from "../../../widgets/heading2";

const OrdersPage = () => {
    return (<div>
    <Heading text={"Orders list"}/>
    <Card style={{ backgroundColor:"white"}} className="mt-3">
        <Card.Body>
        <Table className="table table-hover table-bordered">
            <thead>
                <th>ID</th>
                <th>Item</th>
                <th>Customer name</th>
                <th>Quantity</th>
                <th>Price</th>
            </thead>
            <tbody>
                {["",""].map((item)=>{
                    return <tr>
                    <td>#839483</td>
                    <td><Image rounded src="https://www.washingtonpost.com/resizer/WhVZDM0EQGbUSU4rXhfHcHmfFis=/arc-anglerfish-washpost-prod-washpost/public/SOOK6M6YSWGW67ZQMQRAJEYWKU.jpg" style={{ height:80,width:80 }}/></td>
                    <td>John Chuma</td>
                    <td>12</td>
                    <td>50</td>
    
                   </tr>
                })}
               
            </tbody>
        </Table>
        </Card.Body>
        
    </Card>
    </div>  );
}
 
export default OrdersPage;