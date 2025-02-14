import React, { useState } from "react";
import { useCart } from "../services/cartContext";

export default function Payment() {
    const { cart, cartTotal } = useCart();
    const [customerId, setCustomerId] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");

    const handlePayment = () => {
        if (!customerId || !shippingAddress) {
            alert("Please fill all fields before proceeding.");
            return;
        }

        alert(
            `Processing payment for:
            Customer ID: ${customerId}
            Shipping Address: ${shippingAddress}
            Total: $${cartTotal().toFixed(2)}
            Cart: ${JSON.stringify(cart, null, 2)}`
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Payment Page</h2>

            <div>
                <h3>Order Summary</h3>
                <ul>
                    {cart.map((product) => (
                        <li key={product.Code}>
                            {product.Name} - ${product.price} x {product.sum}
                        </li>
                    ))}
                </ul>
                <h4>Total Price: ${cartTotal().toFixed(2)}</h4>
            </div>

            <div>
                <label>Customer ID:</label>
                <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter Customer ID"
                />
            </div>

            <div>
                <label>Shipping Address:</label>
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter Shipping Address"
                />
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button onClick={handlePayment}>Confirm Payment</button>
            </div>
        </div>
    );
}
