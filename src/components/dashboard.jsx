
//import '././App.css'

import { useEffect, useState } from "react"
import { ContentDashboard } from "./ContentDashboard"
import { Sidebar } from "./Sidebar"
import { redirect, useNavigate } from "react-router-dom";
import { fetchDataAuth } from "../utils/FetchData";

function App() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0

  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: 1,
  });

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchDataAuth('product', filters);
      setProducts(data.data);
      setPagination(data.pagination)

      console.log(data);
      console.log(data.data);

    };

    getProducts();
  }, [filters]);  // Aquí agregamos `filters` como dependencia



  const handleChangePage = (e) =>{
    const page  = e.target.value
  
    setFilters({
      ...setFilters,
      page: page
    })

  }


  const handlerNavegationSearchNav = (e) =>{
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
      <ContentDashboard handlerNavegationSearch={handlerNavegationSearchNav} nombre={'Productos'} busqueda={true}>

        <section className="section-content active" id="productos">
          <h2>Categorías</h2>
          <div className="category-list">
            <button className="category-item">
              <img alt="Todas las categorías" src="images/img/todos.png" />
              Todos los productos
            </button>
            <button className="category-item">
              <img alt="Jabones artesanales" src="images/img/ProductoMasVendido.png" />
              Productos mas vendidos
            </button>
            <button className="category-item">
              <img alt="Champú" src="images/img/BajoStock.png" />
              Productos con bajo stock
            </button>
            <button className="category-item">
              <img alt="Aceite corporal" src="images/img/NuevosProductos.png" />
              Nuevos productos
            </button>
            <button className="category-item">
              <img alt="Sales de baño" src="images/img/ProductoBajaVenta.png" />
              Productos con baja venta
            </button>
            <button className="category-item">
              <img alt="Loción" src="images/img/AltoStock.png" />
              Producto con alto stock
            </button>
          </div>
          <section className="inventario">
            <div className="inventario-header">
              <h2>Lista de productos</h2>
              <div className="inventario-botones">
                <button className="btn-filtro">
                  <img alt="Filtro" src="icons/Filtro.svg" />
                  <h4>Filtrar</h4>
                </button>
                <a className="link-agregar" href="pages/añadir-productos.html">
                  <button className="btn-agregar">
                    <img alt="Agregar producto" src="icons/Añadir.svg" />
                    <h4>Agregar producto</h4>
                  </button>
                </a>
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
                    <tr>
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
                        <p>{product.category ?? ''}</p>
                      </td>
                      <td>
                        <p>${product.stock}</p>
                      </td>
                      <td>
                        <p>{product.price}</p>
                      </td>
                      <td>
                        <p>${product.sale_price}</p>
                      </td>
                      <td className="estado">
                        <span className={product.status ? 'estado-activo' : ''}>Activo</span>
                      </td>
                      <td className="contenedor-acciones">
                        <button className="btn-acciones">
                          <img alt="Acciones" src="images/img/Trespuntos.png" />
                        </button>
                        <div className="opciones">
                          <img
                            alt="Añadir"
                            className="abrir-cantidad"
                            src="icons/Añadir-hover.svg"
                          />
                          <img
                            alt="Editar"
                            className="abrir-cantidad"
                            src="images/img/Editar.png"
                          />
                          <img alt="Eliminar" src="images/img/Eliminar.png" />
                        </div>
                        <div className="cantidad-container">
                          <button className="decrement-btn">-</button>
                          <input
                            className="cantidad-input"
                            defaultValue="1"
                            type="number"
                          />
                          <button className="increment-btn">+</button>
                        </div>
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

export default App
