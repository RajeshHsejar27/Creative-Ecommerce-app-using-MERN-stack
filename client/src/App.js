import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"; //importing router package to manage the routing of urls
import {Toaster} from "react-hot-toast";
import Menu from "./components/nav/Menu";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import Category from "./pages/admin/Category";
import Product from "./pages/admin/Product";
import UserOrders from "./pages/user/Orders";
import UserProfile from "./pages/user/Profile";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";
import Cart from "./pages/Cart";
import AdminOrders from './pages/admin/Orders';
import Loading from "./components/routes/Loading";

const PageNotFound=()=>{
  return <><Loading /> </>;
}


export default function App() {
  return (
    <BrowserRouter>
    <Menu />
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/categories" element={<CategoriesList />} />
      <Route path="/category/:slug" element={<CategoryView />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product/:slug" element={<ProductView />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* private route for user */}
      {/* dont self close, so that you can put private routes inside  */}
      {/* No need to have a path in dashboard since its contained in private route's path
      later, if in case of adding a subpath to dashboard,just enter path name and avoid using slash */}
      <Route path="/dashboard" element={<PrivateRoute />} > 
      <Route path="user" element={<Dashboard />} />
      <Route path="user/profile" element={<UserProfile />} />
      <Route path="user/orders" element={<UserOrders />} />
      </Route>

      {/* private route for admin */}
      <Route path="/dashboard" element={<AdminRoute />} > 
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="admin/category" element={<Category />} />
      <Route path="admin/product" element={<Product />} />
      <Route path="admin/products" element={<AdminProducts />} />
      <Route path="admin/product/update/:slug"
       element={<AdminProductUpdate />} />

      <Route path="admin/orders" element={<AdminOrders />} />
      </Route>


      <Route path="*" element={<PageNotFound />} replace />
    </Routes>
    </BrowserRouter>
  );
}