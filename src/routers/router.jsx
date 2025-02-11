import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../Data";
import Store from "../components/store";
import AddProduct from "../components/addProducts";
import ShopingCart from "../components/shopingCart";
import MainLayout from "../layout/MainLayout";
import Manager from "../components/manager";
import Update from "../components/updateProducts";
import Payment from "../components/payment";


async function cashRegisterLoader() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cart.length === 0) {

        return { redirect: "/shopingCart" };
    }

    return { cart };
}

export default function Router() {
    const [products, setProducts] = useState(data);
    const [cart, setCart] = useState([]);
    const [pCodeToSearch, setProductToSearch] = useState("");

    const updateProduct = async ({ request }) => {
        const formData = await request.formData();
        const updatedProduct = Object.fromEntries(formData);

        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((productToChange) =>
                String(productToChange.Code) === String(updatedProduct.Code)
                    ? { ...productToChange, ...updatedProduct }
                    : productToChange
            );

            return updatedProducts;
        });
    };

    const addProduct = async ({ request }) => {
        const formData = await request.formData();
        const newProduct = Object.fromEntries(formData);

        if (newProduct) {
            setProducts(prevProducts => {
                const updatedProducts = [...prevProducts, newProduct];
                return updatedProducts;
            });
        }
    };

    const loadProduct = async ({ params }) => {
        return products.find((prod) => prod.Code == params.Code);
    };

    useEffect(() => {
        console.log("Products state after update:", products);
    }, [products]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    element: <Store products={products} setCart={setCart} />,
                    index: true,
                },
                {
                    path: "shopingCart",
                    element: <ShopingCart cart={cart} setCart={setCart} onCheckout={(cart, totalPrice) => setCart(cart)} />,
                },
                {
                    path: "payment",
                    element: <Payment cart={cart} />,
                    loader: cashRegisterLoader, // הלודר עבור עמוד התשלום
                },
                {
                    path: "manager",
                    element: <Manager pCodeToSearch={pCodeToSearch} setProductToSearch={setProductToSearch} />,
                    children: [
                        {
                            element: <AddProduct />,
                            action: addProduct,
                            index: true,
                        },
                        {
                            path: "edit/:Code?",
                            element: <Update pCodeToSearch={pCodeToSearch} setProductToSearch={setProductToSearch} />,
                            loader: loadProduct,
                            action: updateProduct,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
