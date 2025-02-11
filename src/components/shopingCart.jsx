import {Link} from "react-router-dom";
export default function ShoppingCart({ cart, setCart, onCheckout }) {
    // מחיקת מוצר
    const handleDelete = (id) => {
        setCart(cart.filter(product => product.Code !== id));
    };

    // חישוב סכום
    const totalPrice = cart.reduce((total, product) => total + parseFloat(product.price), 0);

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
                <Link className="linkToRegister" to="/payment">עבור לקופה</Link>
            </div>
        </div>
    );
}
