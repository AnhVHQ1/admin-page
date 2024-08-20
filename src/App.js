import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import MainLayout from "./components/MainLayout";
import AddBrand from "./pages/AddBrand";
import BrandList from "./pages/BrandList";
import AddCategory from "./pages/AddCategory";
import CategoryList from "./pages/CategoryList";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Orderlist from "./pages/Orderlist";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product/:id" element={<AddProduct />} />
          <Route path="order" element={<Orderlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
