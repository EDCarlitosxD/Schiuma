import React from 'react'
import { TopBar } from './TopBar'

export const ContentDashboard = (props) => {
  return (
    <main class="content">
        <TopBar nombre={props.nombre} 
        handlerNavegationSearch={props.handlerNavegationSearch}  
        busqueda={props.busqueda}></TopBar>

        {props.children}

    </main>
  )
}
