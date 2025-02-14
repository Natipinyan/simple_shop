import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.Code === product.Code);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.Code === product.Code ? { ...item, sum: item.sum + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, sum: 1 }];
            }
        });
    };

    const removeFromCart = (Code) => {
        setCart((prevCart) => {
            return prevCart.reduce((newCart, item) => {
                if (item.Code === Code) {
                    if (item.sum > 1) {
                        newCart.push({ ...item, sum: item.sum - 1 });
                    }
                    // אם sum == 1 לא דוחפים את הפריט לרשימה החדשה (כלומר הוא נמחק)
                } else {
                    newCart.push(item);
                }
                return newCart;
            }, []);
        });
    };

    const cartTotal = () => {
        return cart.reduce((sum, item) => sum + (Number(item.price) * item.sum), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
