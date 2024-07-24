import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import About from './pages/about/about';
import Shop from './pages/shop/shop';
import SignIn from './pages/signin/signin';
import Register from './pages/register/register';
import ShopDetail from './pages/shopDetail/shopDetal';
import Checkout from './pages/checkout/checkout';
import Admin from './pages/adminDashboard/admin';
import AdminProduct from './pages/adminProduct/adminProduct';
import AdminOrder from './pages/adminOrder/adminOrder';
import AdminLogin from './pages/adminLogin/adminLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:id' element={<ShopDetail />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/admin/dashboard' element={<Admin />} />
          <Route path='/admin/product' element={<AdminProduct />} />
          <Route path='/admin/order' element={<AdminOrder />} />
          <Route path='/admin' element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
