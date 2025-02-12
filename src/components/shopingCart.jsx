import { Link } from "react-router-dom";
import { useCart } from "../services/cartContext";

export default function ShoppingCart() {
    const { cart, removeFromCart, cartTotal } = useCart();
    console.log("Cart:", cart);

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
                {cart.map((product) => (
                    <tr key={product.Code}>
                        <td>
                            <img src={product.ImgURL} alt={product.Name} style={{ width: "50px" }} />
                        </td>
                        <td>{product.Name}</td>
                        <td>${product.price}</td>
                        <td>
                            <button onClick={() => removeFromCart(product.Code)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <strong>Total: ${cartTotal()}</strong>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Link className="linkToRegister" to="/payment">עבור לקופה</Link>
            </div>
        </div>
    );
}
