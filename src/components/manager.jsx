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
                     <button>
                         <Link to="/manager">הוספה</Link>
                     </button>
                </div>

                <div className="under">
                    <button  >
                        <Link to={`/manager/edit/${productCode}`}>עריכה</Link>
                    </button>
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

// הבדל בין שליחה מתוך ManagerPage לבין שליחה מתוך EditProduct:
// - ב-ManagerPage, המוצר נטען דרך הראוטר לפי קוד המוצר בכתובת ה-URL.
// - ב-EditProduct, המוצר נטען דרך חיפוש ידני עם קוד המוצר שהוזן בשדה.
// - ב-ManagerPage, המוצר מוצג אוטומטית לפי ה-URL, וב-EditProduct יש לבצע חיפוש לפני עריכה.
