
const MenuCat: React.FC = () => {


    return(
        <div className="menuCat">
      <div><button className="btnPag"><i className="material-icons" style={{fontSize: "30px"}}> keyboard_arrow_left</i></button></div>
        <div style={{fontSize: "24px"}}><a><i className="material-icons" > local_dining</i> Hamburguesas</a></div>
        {/*<div style="font-size: 24px;"><a><i class="material-icons"> local_dining</i> Pizza </a></div>
        <div style="font-size: 24px;"><a><i class="material-icons"> local_dining</i> Lomos</a></div>
    <div style="font-size: 24px;"><a><i class="material-icons"> local_dining</i> Bebidas</a></div>*/}
        <div style={{fontSize: "24px"}}><button className="btnPag"><i className="material-icons" style={{fontSize: "30px"}}> keyboard_arrow_right</i></button></div>
    </div>
    )
}

export default MenuCat;