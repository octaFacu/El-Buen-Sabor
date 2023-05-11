
export default function MisFavoritosComponent() {
  return (
    <div className="text-center" style={{marginTop: "6rem"}}>
            <h2 className="bold">Mis favoritos</h2>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p>Comida</p>
                  </div>
                  <div>
                    <i className="material-icons mx-2" style={{fontSize: "45px", color:"white", cursor:"pointer"}}>favorite</i>
                    <i className="material-icons mx-2" style={{fontSize: "45px", color:"white", cursor:"pointer"}}>add_shopping_cart</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}
