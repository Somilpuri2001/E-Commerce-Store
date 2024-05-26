import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import Pagenotfound from "./Pages/Pagenotfound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import Resetpassword from "./Pages/Auth/Resetpassword";
import Forgotpassword from "./Pages/Auth/Forgotpassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Profile from "./Pages/user/Profile";
import Orders from "./Pages/user/Orders";
import ViewCategories from "./Pages/Admin/ViewCategories";
import EditCategory from "./Pages/Admin/EditCategory";
import ViewProducts from "./Pages/Admin/ViewProducts";
import EditProduct from "./Pages/Admin/EditProduct";
import HomepageBanner from "./Pages/Admin/HomepageBanner";
import CategoryPage from "./Pages/CategoryPage";
import SingleProductPage from "./Pages/SingleProductPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword/:id/:token" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/category/:id/:slug" element={<CategoryPage/>} />
        <Route path="/product/:id/:slug" element={<SingleProductPage/>} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/homepage-banner" element={<HomepageBanner />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/view-category" element={<ViewCategories />} />
          <Route path="admin/edit-category/:id" element={<EditCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<EditProduct />} />
          <Route path="admin/view-products" element={<ViewProducts />} />
          <Route path="admin/view-users" element={<Users />} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
