
//import '././App.css'

import { useEffect, useState } from "react"
import { ContentDashboard } from "./ContentDashboard"
import { Sidebar } from "./Sidebar"
import { Link, redirect, useNavigate } from "react-router-dom";
import { fetchDataAuth } from "../utils/FetchData";
import { BotonAcciones } from "./BotonAcciones";
import TokenInvalido from "./TokenInvalido";
import Contador from "./Contador";

function Proveedores() {
  const [modalToken, setModalToken] = useState(null);
  const [provider, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchDataAuth('provider');
        setProducts(data);
  
        // Si el backend devuelve un mensaje de token expirado (aunque normalmente esto sería un error 401)
        if (data.message === 'Token expired') {
          setModalToken("Tu sesión ha expirado"); // Mostrar modal
          // Opcional: Forzar logout o refrescar token
          // localStorage.removeItem("token");
          // navigate("/login");
        }
      } catch (e) {
        // Verifica si el error viene del backend (e.response.data.message) o es genérico (e.message)
        
        const errorMessage = e.response?.data?.message || e.message;
        setModalToken(errorMessage); // Mostrar el error en el modal
        
        
      }
    };
  
    getProducts();
  }, [filters]);


  if (modalToken) {

    console.log("MENSAJE MODAL" + modalToken);
    
    if(modalToken === "Tu sesión ha expirado") return <Contador></Contador>

    return <TokenInvalido msg={modalToken} />;
  }


  const handleChangePage = (e) => {
    const page = e.target.value

    setFilters({
      ...setFilters,
      page: page
    })

  }


  const handlerNavegationSearchNav = (e) => {
    console.log(e.target);

    setFilters({
      ...filters,
      page: 0,
      name: e.target.value
    })

  }


  return (
    <div className="container-app">
      <Sidebar ></Sidebar>
      <ContentDashboard handlerNavegationSearch={handlerNavegationSearchNav} nombre={'Proveedores'} busqueda={true}>

        <section className="section-content active" id="productos">
          <section className="inventario">
            <div className="inventario-header">
              <h2></h2>
              <div className="inventario-botones">
                <button className="btn-filtro">
                  <img alt="Filtro" src="icons/Filtro.svg" />
                  <h4>Filtrar</h4>
                </button>
                <Link className="link-agregar" to='/crear-producto'>
                  <button className="btn-agregar">
                    <img alt="Agregar producto" src="icons/Añadir.svg" />
                    <h4>Agregar producto</h4>
                  </button>
                </Link>
              </div>
            </div>
            <table className="tabla-inventario">
              <thead>
                <tr>
                  <th className="borde-izquierdo" />
                  <th>
                    <h5>PRODUCTO</h5>
                  </th>
                  <th>
                    <h5>LOTE</h5>
                  </th>
                  <th>
                    <h5>EXPIRACIÓN</h5>
                  </th>
                  <th>
                    <h5>CATEGORÍA</h5>
                  </th>
                  <th>
                    <h5>COSTO</h5>
                  </th>
                  <th>
                    <h5>STOCK</h5>
                  </th>
                  <th>
                    <h5>PRECIO VENTA</h5>
                  </th>
                  <th>
                    <h5>ESTADO</h5>
                  </th>
                  <th className="borde-derecho">
                    <h5>ACCIONES</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map(product => (
                    <tr key={product.pk_product}>
                      <td>
                        <img alt="Producto" src={product.image} />
                      </td>
                      <td>{product.name}</td>
                      <td>
                        <h5>{product.pk_product}</h5>
                      </td>
                      <td>
                        <p>{product.expiration}</p>
                      </td>
                      <td>
                        <p>{product.category ? product.category.name : 'No tiene categoria'}</p>
                      </td>
                      <td>
                        <p>${product.price}</p>
                      </td>
                      <td>
                        <p>{product.stock}</p>
                      </td>
                      <td>
                        <p>${product.sale_price}</p>
                      </td>
                      <td className="estado">
                        <span className={product.status ? 'estado-activo' : ''}>Activo</span>
                      </td>
                      <td >
                        <BotonAcciones id={product.pk_product}  ></BotonAcciones>
                      </td>
                    </tr>

                  ))
                }


              </tbody>
            </table>
            <div className="pagination">
              <span>Página </span>
              <select onChange={handleChangePage} name="" id="">


                {[...Array(pagination.totalPages)].map((_, index) => (
                  <option key={index} className="page-number" id="page-dropdown" value={index + 1}>
                    {index + 1}
                  </option>
                ))}



              </select>

              <span>
                {" "}
                de <span id="total-pages">{pagination.totalPages}</span>
              </span>
              <ul className="page-list hidden" id="page-list" />
            </div>
          </section>
        </section>;


      </ContentDashboard>
    </div>
  )
}

export default Proveedores
