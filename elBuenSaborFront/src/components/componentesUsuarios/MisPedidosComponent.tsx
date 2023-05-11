import React from 'react'

export default function MisPedidosComponent() {
  return (
    <div className="text-center" style={{marginTop: "6rem"}}>
    <h2 className="bold">Pedidos Anteriores</h2>
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p className="card-text">Entregado</p>
          <p className="text-center">Fecha entrega</p>
          <h5 className="card-text">Precio</h5>
        </div>
      </div>
    </div>
  </div>
  )
}
