import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import CreateProduct from "./components/CreateProduct";

const app = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-producto" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default app;