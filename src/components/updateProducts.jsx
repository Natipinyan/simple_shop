import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
export default function EditProduct({ products }) {
    const [currentProduct, setCurrentProduct] = useState({});
    const [Code, setCode] = useState("");
    const loadedData = useLoaderData();

    useEffect(() => {
        if (loadedData) setCurrentProduct(loadedData);
    }, [loadedData]);

    const handleChanges = (e) => {
        setCurrentProduct((prevProduct) => {
            return { ...prevProduct, [e.target.name]: e.target.value };
        });
    };
    const handleSearch = () => {
        let foundProduct = products.find((prod) => prod.Code == Code);
        if (foundProduct) setCurrentProduct(foundProduct);
    };
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
            <Form method="POST">
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