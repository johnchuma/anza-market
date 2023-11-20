import { Outlet } from "react-router-dom";
import NavigationBar from "../widgets/navbar";
import Footer from "../widgets/footer";
import { useEffect, useState } from "react";
import { ProductContext } from "../contexts/product_context";
import { logout } from "../utils/local_storage";
import { Toaster } from "react-hot-toast";
const MainLayout = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
    return ( <div >
       <ProductContext.Provider value={{ cart,setCart,wishlist,setWishlist, selectedProduct,setSelectedProduct }}>
       
       <NavigationBar/>
        <Outlet/>
        <Footer/>
       </ProductContext.Provider>
    </div> );
}
 
export default MainLayout;