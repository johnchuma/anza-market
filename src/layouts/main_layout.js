import { Outlet } from "react-router-dom";
import NavigationBar from "../widgets/navbar";
import Footer from "../widgets/footer";
import { useState } from "react";
import { ProductContext } from "../contexts/product_context";
const MainLayout = () => {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
    return ( <div >
       <ProductContext.Provider value={{ cart,setCart,selectedProduct,setSelectedProduct }}>
       <NavigationBar/>
        <Outlet/>
        <Footer/>
       </ProductContext.Provider>
        
    </div> );
}
 
export default MainLayout;