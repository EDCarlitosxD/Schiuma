import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    


    return (
        <>
            <div className="hamburger-menu">
                <img src="/icons/Hamburguesa.svg" alt="Menú" />
            </div>

            <aside className="sidebar" id="sidebar">
                <div className="logo">
                    <img src="/images/logo.jpg" alt="Logo" />
                </div>

                <nav>
                    <ul>
                        <li className="active">
                            <Link to='/dashboard' href="#productos">
                                <img className="icon-default" src="/icons/products.svg" alt="Productos" />
                                <img className="icon-hover" src="/icons/products-hover.svg" alt="Productos" />
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link to='/clientes' href="#clientes">
                                <img className="icon-default" src="/icons/cliente.svg" alt="Clientes" />
                                <img className="icon-hover" src="/icons/products-hover.svg" alt="Clientes" />
                                Clientes
                            </Link>
                        </li>
                        <li>
                            <Link to='/provedores' href="#proveedores">
                                <img className="icon-default" src="/icons/proveedores.svg" alt="Proveedores" />
                                <img className="icon-hover" src="/icons/products-hover.svg" alt="Proveedores" />
                                Proveedores
                            </Link>
                        </li>
                        <li>
                            <Link to='/ventas' href="#ventas">
                                <img className="icon-default" src="/icons/ventas.svg" alt="Ventas" />
                                <img className="icon-hover" src="/icons/ventas-hover.svg" alt="Ventas" />
                                Ventas
                            </Link>
                        </li>
                        <li>
                            <a href="#reportes">
                                <img className="icon-default" src="/icons/reportes.svg" alt="Reportes" />
                                <img className="icon-hover" src="/icons/ventas-hover.svg" alt="Reportes" />
                                Reportes
                            </a>
                        </li>
                        <li>
                            <a href="#empleados">
                                <img className="icon-default" src="/icons/empleados.svg" alt="Empleados" />
                                <img className="icon-hover" src="/icons/ventas-hover.svg" alt="Empleados" />
                                Empleados
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

        </>
    )
}
