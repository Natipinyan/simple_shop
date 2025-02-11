import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ShoppingCart() {
    const location = useLocation();
    const navigate = useNavigate();

    // מקבלים את המוצרים מה-state שנשלחו ב-navigate
    const [products, setProducts] = useState(location.state?.products || []);

    // מחיקת מוצר
    const handleDelete = (id) => {
        setProducts(products.filter(product => product.Code !== id));
    };

    // חישוב סכום
    const totalPrice = products.reduce((total, product) => total + parseFloat(product.price), 0);

    const handleCheckout = () => {
        navigate("/payment", {
            state: {
                products: products,
                totalPrice: totalPrice
            }
        });
    };

    useEffect(() => {
        if (location.state?.products) {
            setProducts((prevProducts) => [...prevProducts, ...location.state.products]);
        }
    }, [location.state]);

    return (
        <div style={{ width: "75%", margin: "0 auto", padding: "10%" }}>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.Code}>
                        <td><img src={product.ImgURL} alt={product.Name} style={{ width: "50px" }} /></td>
                        <td>{product.Name}</td>
                        <td>${product.price}</td>
                        <td>
                            <button onClick={() => handleDelete(product.Code)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <strong>Total: ${totalPrice}</strong>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button onClick={handleCheckout}>Proceed to Payment</button>
            </div>
        </div>
    );
}
