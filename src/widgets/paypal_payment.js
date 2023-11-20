import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Image, Modal } from "react-bootstrap";
import Heading2 from "./heading2";
import SmallText from "./small_text";
import SizedBox from "./sizedBox";

const PaypalPaymentModel = ({show,onHide}) => {
    
    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: 1,
              },
            },
          ],
        });
      };
    
      const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
          if(details.status == "COMPLETED"){
            console.log("Fine")
          }
        });
      };
    return ( <div>
        <Modal show={show} centered onHide={onHide}>
            <Modal.Body className="text-center">
             <Image style={{ width:200 }} src="https://img.freepik.com/free-vector/flat-woman-paying-by-pos-terminal-refund-cashback_88138-785.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1699747200&semt=ais" flud/>
             <Heading2 text={"Continue paying"}/>
             <SmallText text={"Select payment method below to proceed"}/>
             <SizedBox/>
            <PayPalScriptProvider  onError ={(error)=>console.log(error)} options={{ "client-id": "ASYgGsuQca4aUJvRdoFffzj-kdpo_2890MLCcbmAgexcpdSPnuDmdihXlP0-_WEA5zn-t0XzBtX0zEKU" }} >
            <PayPalButtons createOrder={createOrder} onApprove={onApprove}  />
            </PayPalScriptProvider>
            </Modal.Body>
        </Modal>
       
    </div> );
}
 
export default PaypalPaymentModel;