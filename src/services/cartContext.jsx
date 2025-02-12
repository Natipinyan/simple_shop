import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            if (prevCart.length === 0) return [{ ...product, quantity: 1 }];

            const foundItem = prevCart.find((item) => item.Code == product.Code);
            if (foundItem)
                return prevCart.map((item) =>
                    item.Code === product.Code
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };
    const removeFromCart = (Code) => {
        setCart((prevCart) => {
            return prevCart
                .map((item) =>
                    item.Code === Code ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0);
        });
    };

    const cartTotal = () => {
        return cart.reduce((sum, item) => (sum += item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}