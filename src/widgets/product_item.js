import { useNavigate } from "react-router-dom";
import Paragraph from "./paragraph";
import ProductRating from "./product_rating";
import { Image } from "react-bootstrap";

const ProductItem = ({product,height}) => {
   const navigate = useNavigate()
    return ( <div>
         <div onClick={()=>{
        navigate(`/product-details/${product.uuid}`)
      }} className="text-center w-100 btn border-0 mb-4"  md={3}>
      <div>
        <Image  style={{ height:height??200,width:"100%", objectFit:"cover" }} src={product.ProductImages[0].image} fluid/>
      </div>
      {/* <SmallText text={item.}/> */}
      <Paragraph text={product.name} fontSize={18} />
      <Paragraph text={`${product.newPrice} TSH`} fontSize={18} />
      <ProductRating isCentered={true} item={product} /> 
      

      </div>
    </div> );
}
 
export default ProductItem;