import { Outlet, Link } from "react-router-dom";
import "../css/manager.css";
import { useState } from "react";



export default function ManagerPage() {

    const [productCode, setProductCode] = useState("");

    return (
        <section className="allPageManager">
            <div className="left">
                <div className="top">
                     <button className="button-link" >
                         <Link to="/manager">Add</Link>
                     </button>
                </div>

                <div className="under">
                    <button className="button-link" >
                        <Link to={`/manager/edit/${productCode}`}>Edit</Link>
                    </button>
                    <input
                        placeholder="product code"
                        defaultValue={productCode}
                        type="text"
                        onChange={(e) => {
                            setProductCode(e.target.value);
                        }}
                    />
                </div>
            </div>
            <Outlet />
        </section>
    );
}

