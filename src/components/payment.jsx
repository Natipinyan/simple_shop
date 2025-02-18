import React, { useState } from "react";
import { useCart } from "../services/cartContext";
import "../css/payment.css"

export default function Payment() {
    const { cart, cartTotal } = useCart();
    const [customerId, setCustomerId] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [orders, setOrders] = useState([]);

    const handlePayment = () => {
        if (!customerId || !shippingAddress) {
            alert("Please fill all fields before proceeding.");
            return;
        }

        const newOrder = {
            customerId,
            shippingAddress,
            total: cartTotal().toFixed(2),
            cartDetails: cart,
        };

        setOrders((prevOrders) => [...prevOrders, newOrder]);

        setCustomerId("");
        setShippingAddress("");
    };

    return (
        <div className="payment-container">
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

            {orders.length > 0 && (
                <div className="order-summary">
                    <h3>Order History</h3>
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index}>
                                <strong>Order #{index + 1}</strong>
                                <p>Customer ID: {order.customerId}</p>
                                <p>Shipping Address: {order.shippingAddress}</p>
                                <p>Total: ${order.total}</p>
                                <p>Cart Details:</p>
                                <ul>
                                    {order.cartDetails.map((product) => (
                                        <li key={product.Code}>
                                            {product.Name} - ${product.price} x {product.sum}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
