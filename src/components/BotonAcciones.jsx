import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const BotonAcciones = (props) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`${isActive ? 'active' : ''}  contenedor-acciones`}>
            <button onClick={() => setIsActive(!isActive)} className="btn-acciones"  >
                <img alt="Acciones" src="images/img/Trespuntos.png" />
            </button>
            <div className='opciones'>
                <img
                    alt="Añadir"
                    className="abrir-cantidad"
                    src="icons/Añadir-hover.svg"
                />
                <Link to={`/editar-producto/${props.id}`}>
                    <img
                        alt="Editar"
                        className="abrir-cantidad"
                        src="images/img/Editar.png"
                    />
                </Link>

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

        </div>
    )
}
