import { Navigate, Route, Routes } from "react-router-dom";
import { ProductDetail, Products } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="items" element={<Products />} />
        <Route path="items/:id" element={<ProductDetail />} />
        <Route path="/*" element={<Navigate to="/items" />} />
      </Routes>
    </>
  );
}

export default App;
