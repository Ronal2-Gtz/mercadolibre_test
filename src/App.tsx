import { Navigate, Route, Routes } from "react-router-dom";
import { ProductDetail, Products } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="products" element={<Products />} />
        <Route path="products/:query" element={<ProductDetail />} />
        <Route path="/*" element={<Navigate to="/products" />} />
      </Routes>
    </>
  );
}

export default App;
