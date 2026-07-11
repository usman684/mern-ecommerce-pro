import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import CategoryList from "./components/CategoryList.jsx";
import CategoryProducts from "./pages/CategoryProducts.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Cart from "./pages/Cart.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import Wishlist from "./pages/Wishlist.jsx";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Navbar />
          <CategoryList />
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route
              path="/category/:categoryId"
              element={<CategoryProducts />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
