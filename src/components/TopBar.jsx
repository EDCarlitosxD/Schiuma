import React from 'react'

export const TopBar = ({nombre,busqueda, handlerNavegationSearch}) => {
  
  return (
    <header className="search-bar">
            <div className="title-container">
                <h1>{nombre}</h1>
            </div>
            {busqueda ? <div className="search-container">
                <input onChange={handlerNavegationSearch} type="text" placeholder="Buscar producto por nombre o código" />
                <button><img src="/images/img/searchbar.svg" alt="Buscar" /></button>
            </div>:''
             }
            
            <div className="notify-userprofile">
                <button><img src="/icons/notification.svg" alt="" srcSet="" /></button>
                <button><img src="/images/UserPhoto.png" alt="" srcSet=""/></button>
            </div>
    </header>
  )
}
