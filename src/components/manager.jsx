import { Outlet, Link } from "react-router-dom";
import "../css/manager.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function ManagerPage() {

    const [productCode, setProductCode] = useState("");

    return (
        <section className="allPageManager">
            <div className="left">
                <div className="top">
                    <Link to="/manager">הוספה</Link>
                </div>

                <div className="under">
                    <Link to={`/manager/edit/${productCode}`}>עריכה</Link>
                    <input
                        placeholder="קוד מוצר"
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