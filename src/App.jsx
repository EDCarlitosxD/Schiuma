import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import CreateProduct from "./components/CreateProduct";
import EditarProducto from "./components/EditarProducto";
import TokenInvalido from "./components/TokenInvalido";
import Proveedores from "./components/Proveedores";

const app = () =>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-producto" element={<CreateProduct />} />
        <Route path="/editar-producto/:id" element={<EditarProducto/>} />
        <Route path="prueba" element={<TokenInvalido/>} />
        <Route path="/provedores" element={<Proveedores />} />

      
      </Routes>
    </BrowserRouter>
  );
};

export default app;