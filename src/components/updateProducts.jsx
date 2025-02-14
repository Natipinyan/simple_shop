import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import "../css/editAndAdd.css";

export default function EditProduct({ products }) {
    const [currentProduct, setCurrentProduct] = useState({});
    //אובייקט נוכחי של המוצר שאני עורך
    const [Code, setCode] = useState("");
    //קי של המוצר
    const loadedData = useLoaderData();
    //מקבל את הנתונים מהלואדר של המוצר לאחר חיפוש

    useEffect(() => {
        if (loadedData) setCurrentProduct(loadedData);
    }, [loadedData]);
    //לואדר דאטה משתנה טוען את הקורנט לללואדר דאטה

    const handleChanges = (e) => {
        setCurrentProduct((prevProduct) => {
            return { ...prevProduct, [e.target.name]: e.target.value };
        });
    };
    //מעדכן כל הזמן את המוצר הנוכחי כדי לערוך אותו
    const handleSearch = () => {
        let foundProduct = products.find((prod) => prod.Code == Code);
        if (foundProduct) setCurrentProduct(foundProduct);
    };
    //מוצא את המוצר לפי הקוד
    return (
        <div
            style={{
                display: "flex",
                margin: "auto",
                flexDirection: "column",
            }}>
            <div style={{ margin: "30px" }}>
                <input
                    className="form-tag"
                    value={Code}
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                    placeholder="קוד המוצר"
                    name="Code"
                    type="search"
                />
                <button className="form-tag" onClick={handleSearch}>
                    חפש מוצר
                </button>
            </div>
            <Form method="POST" >
                <input name="Code" type="disabled" value={currentProduct.Code} />
                <input
                    className="form-tag"
                    value={currentProduct.Name}
                    onChange={handleChanges}
                    placeholder="שם המוצר"
                    name="Name"
                    type="text"
                />
                <input
                    className="form-tag"
                    value={currentProduct.ImgURL}
                    onChange={handleChanges}
                    placeholder="תמונת המוצר"
                    name="ImgURL"
                    type="text"
                />
                <input
                    className="form-tag"
                    value={currentProduct.price}
                    onChange={handleChanges}
                    placeholder="מחיר המוצר"
                    name="price"
                    type="number"
                />
                <button className="form-tag">ערוך</button>
            </Form>
        </div>
    );
}