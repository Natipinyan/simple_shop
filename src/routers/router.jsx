import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import data from "../Data";
import Store from "../components/store";
import AddProduct from "../components/addProducts";
import ShopingCart from "../components/shopingCart";
import MainLayout from "../layout/MainLayout";
import Manager from "../components/manager";
import Update from "../components/updateProducts";
import Payment from "../components/payment";
import {CartProvider} from "../services/cartContext";
export default function Router() {

    let refProductsData = useRef(data);

    const [products, setProducts] = useState(data);
    const [cart, setCart] = useState([]);
    const [pCodeToSearch, setProductToSearch] = useState("");

    const loadToStore = async () => {
        if(refProductsData.current === undefined || refProductsData.current.length === 0)
            return undefined;
        else
            return refProductsData.current;
    };

    /*
    const loadProductToEdit = async ({ params }) => {
        return products.find((prod)  => prod.Code == params.Code);
    };
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
    */

    useEffect(() => {
        console.log("Products state after update:", products);
    }, [products]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    element: <Store products={products}  />,
                    index: true,
                    loader: loadToStore,
                },
                {
                    path: "shopingCart",
                    element: <ShopingCart/>,
                },
                {
                    path: "payment",
                    element: <Payment cart={cart} />,
                },
                /*{
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
                            loader: loadProductToEdit,
                            action: updateProduct,
                        },
                    ],
                },*/
            ],
        },
    ]);

    return (
        <CartProvider>
            <RouterProvider router={router} />
        </CartProvider>
    );
}