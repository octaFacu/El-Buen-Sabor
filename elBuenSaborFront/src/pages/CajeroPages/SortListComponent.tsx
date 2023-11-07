import { useState } from "react";
import Pedido from "../../context/interfaces/Pedido";
import './CajeroPagesStyle.css'

interface SortDropdownProps{
  key: number,
  list: Pedido[];
  setList: any;
}

function SortListComponent({ key, list, setList }: SortDropdownProps) {

  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const attributeNames: Record<string, keyof Pedido> = {
    "Número de Pedido": "numeroPedidoDia",
    "Hora Estimada": "horaEstimada",
    "Precio Total": "precioTotal"
  };
  const handleAttributeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAttribute(event.target.value as keyof Pedido);
    sortList(event.target.value as keyof Pedido, sortOrder);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    sortList(selectedAttribute as keyof Pedido, newSortOrder);
  };

  const sortList = (attribute: keyof Pedido, order: string) => {
    const sortedList = [...list].sort((a, b) => {
      if (a[attribute] && b[attribute]) {
        if (order === "asc") {
          return a[attribute]! > b[attribute]! ? 1 : -1;
        } else {
          return a[attribute]! < b[attribute]! ? 1 : -1;
        }
      } else {
       
        return 0;
      }
    });
    setList(sortedList);
  };
  return (
    <div className="ms-3 d-flex">
      <select className="dropdown-estado form-select" style={{ maxWidth: "17%" }} value={selectedAttribute as string} onChange={handleAttributeChange}>
        {Object.entries(attributeNames).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="btn" onClick={toggleSortOrder}>
  {sortOrder === "asc" ? <i className="material-icons white" style={{ fontSize: "30px", cursor: "pointer" }}>arrow_drop_up</i> : <i className="material-icons" style={{ fontSize: "30px", cursor: "pointer" }}>arrow_drop_down</i>}
</div>

    </div>
  );
}

export default SortListComponent;

