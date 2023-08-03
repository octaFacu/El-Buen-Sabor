import listLoader from "../../../assets/listLoader.gif";
import "./listLoader.css"

const ListLoader = () => {
  return (
    <div className="list-loader-container ">
      <img src={listLoader} alt="Loading..." className="list-loader-gif" />
    </div>
  );
};

export default ListLoader;