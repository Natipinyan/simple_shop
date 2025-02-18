import { Link } from "react-router-dom";
import { useCart } from "../services/cartContext";
import get_URL from "../services/GetURL";
import "../css/shoppingCart.css";

export default function ShoppingCart() {
    const { cart, removeFromCart, cartTotal } = useCart();

    return (
        <div className="shopping-cart-container">
            <table className="cart-table">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Sum</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((product) => (
                    <tr key={product.Code}>
                        <td>
                            <img
                                src={get_URL(product.ImgURL)}
                                className="product-image"
                                alt={product.Name}
                            />
                        </td>
                        <td>{product.Name}</td>
                        <td>${product.price}</td>
                        <td>{product.sum}</td>
                        <td>
                            <button className="remove-button" onClick={() => removeFromCart(product.Code)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="cart-total">
                <strong>Total: ${cartTotal()}</strong>
            </div>
            <div className="checkout-link">
                <Link to="/payment">
                    <button className="checkout-button">Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
}
