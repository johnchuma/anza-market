import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/main_layout';
import HomePage from './pages/home_page';
import './molla.css';
import './flaming.css'
import AnzaMarketPlace from './pages/anza_marketplace';
import ShopPage from './pages/shop_page';
import LoginPage from './pages/authentication/login_page';
import DashboardLayout from './layouts/dashboard_layout';
import AddProduct from './pages/admin_dashboard/add_products';
import RegisterPage from './pages/authentication/registration_page';
import ApplyToBeSeller from './pages/application/apply_to_be_seller';
import AddCategory from './pages/admin_dashboard/add_pages/add_category';
import ViewProducts from './pages/admin_dashboard/view_pages/view_products';
import DashboardPage from './pages/admin_dashboard/view_pages/dashboard_page';
import OrdersPage from './pages/admin_dashboard/view_pages/orders_page';
import ProductDetails from './pages/product_details';
import ShoppingCart from './pages/shopping_cart';
import WishlistPage from './pages/wishlist_page';
import AccountPage from './pages/account_page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<RegisterPage/>}/>

      <Route path='/dashboard' element={<DashboardLayout/>}>
        <Route  path='/dashboard/' element={<DashboardPage/>}/>
        <Route  path='/dashboard/products' element={<ViewProducts/>}/>
        <Route  path='/dashboard/add-product' element={<AddProduct/>}/>
        <Route  path='/dashboard/add-category' element={<AddCategory/>}/>
        <Route  path='/dashboard/categories' element={<AddCategory/>}/>
        <Route  path='/dashboard/orders' element={<OrdersPage/>}/>
      </Route>
        <Route element={<MainLayout/>} path='/'>
      <Route path='apply-to-be-seller' element={<ApplyToBeSeller/>}/>

          <Route index element={<HomePage/>}/>
          <Route path='shop' element={<ShopPage/>}/>
          <Route path='product-details' element={<ProductDetails/>}/>
          <Route path='shopping-cart' element={<ShoppingCart/>}/>
          <Route path='wishlist' element={<WishlistPage/>}/>
          <Route path='account' element={<AccountPage/>}/>



          <Route path='marketplace' element={<AnzaMarketPlace/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
