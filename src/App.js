import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/main_layout';
import HomePage from './pages/home_page';
import './molla.css';
import './flaming.css'
import './App.css'
import AnzaMarketPlace from './pages/anza_marketplace';
import ShopPage from './pages/shop_page';
import LoginPage from './pages/authentication/login_page';
import DashboardLayout from './layouts/dashboard_layout';
import RegisterPage from './pages/authentication/registration_page';
import ApplyToBeSeller from './pages/application/apply_to_be_seller';
import ViewProducts from './pages/admin_dashboard/view_pages/view_products';
import DashboardPage from './pages/admin_dashboard/view_pages/dashboard_page';
import OrdersPage from './pages/admin_dashboard/view_pages/orders_page';
import ProductDetails from './pages/product_details';
import ShoppingCart from './pages/shopping_cart';
import WishlistPage from './pages/wishlist_page';
import AccountPage from './pages/account_page';
import PrivateRoute from './pages/authentication/private_route';
import ViewUsers from './pages/admin_dashboard/view_pages/view_users';
import ViewSellers from './pages/admin_dashboard/view_pages/view_sellers';
import AddProduct from './pages/admin_dashboard/add_pages/add_products';
import ViewSectors from './pages/admin_dashboard/view_pages/view_sectors';
import AddBusinessSector from './pages/admin_dashboard/add_pages/add_sector';
import ViewSellersApplications from './pages/admin_dashboard/view_pages/view_sellers_applications';
import AllLayout from './layouts/all_layout';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route element={<AllLayout/>} path='/' >
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<RegisterPage/>}/>

      <Route path='/dashboard' element={<PrivateRoute><DashboardLayout/></PrivateRoute> }>
        <Route  path='/dashboard/' element={<DashboardPage/>}/>
        <Route  path='/dashboard/products' element={<ViewProducts/>}/>
        <Route  path='/dashboard/add-product' element={<AddProduct/>}/>
        <Route  path='/dashboard/add-sector' element={<AddBusinessSector/>}/>
        <Route  path='/dashboard/orders' element={<OrdersPage/>}/>
        <Route path='/dashboard/users' element={<ViewUsers/>}/>
        <Route path='/dashboard/applications' element={<ViewSellersApplications/>}/>
        <Route path='/dashboard/sectors' element={<ViewSectors/>}/>
        <Route path='/dashboard/sellers' element={<ViewSellers/>}/>
      </Route>
        <Route element={<MainLayout/>} path='/'>
      <Route path='apply-to-be-seller' element={<ApplyToBeSeller/>}/>
          <Route index element={<HomePage/>}/>
          <Route path='shop/search/:keyword' element={<ShopPage/>}/>
          <Route path='shop/:category' element={<ShopPage/>}/>
          <Route path='product-details/:uuid' element={<ProductDetails/>}/>
          <Route path='shopping-cart' element={<ShoppingCart/>}/>
          <Route path='wishlist' element={<WishlistPage/>}/>
          <Route path='account' element={<AccountPage/>}/>
          <Route path='marketplace' element={<AnzaMarketPlace/>}/>
        </Route>
      </Route>

      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
