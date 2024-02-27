import ReactDOM from "react-dom";
import { Puff } from 'react-loading-icons'
import "./Loader.scss";

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="wrapper">
            <div className="loader">
                {/* <img src={loaderImg} alt="Loading..." /> */}
                <Puff stroke="#7086ff" strokeWidth="2px"/>
            </div>
        </div>,
        document.getElementById("loader")
    );
};

export default Loader;
