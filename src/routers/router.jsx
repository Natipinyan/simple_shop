import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { useState, useEffect} from "react";
import data from "../Data";
import Store from "../components/store";
import AddProduct from "../components/addProducts";
import ShopingCart from "../components/shopingCart";
import MainLayout from "../layout/MainLayout";
import Manager from "../components/manager";
import Payment from "../components/payment";
import {CartProvider} from "../services/cartContext";
import {useNavigate} from "react-router-dom";
import Update from "../components/updateProducts";


export default function Router() {
    const [products, setProducts] = useState(data); // רק useState

    const loadToStore = async () => {
        if (products.length === 0) return undefined;
        else return products;
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
    const submitproduct = async ({request})=> {
        const formData = await request.formData();
        const newProduct = Object.fromEntries(formData);
        setProducts(products.map((product)=>{return product.Code == newProduct.Code ? newProduct: product;}))

    }
    useEffect(() => {
        console.log("Products state after update:", products);
    }, [products]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    element: <Store products={products} />,
                    index: true,
                    loader: loadToStore,
                },
                {
                    path: "shopingCart",
                    element: <ShopingCart />,
                },
                {
                    path: "payment",
                    element: <Payment />,
                },
                {
                    path: "manager",
                    element: <Manager />,
                    children: [
                        {
                            element: <AddProduct />,
                            action: addProduct,
                            index: true,
                        },
                        {
                            path: "edit/:Code?",
                            element: <Update products={products}  />,
                            loader:loadProduct,
                            action: submitproduct
                        },
                    ],
                },
            ],
        },
    ]);

    return (
        <CartProvider>
            <RouterProvider router={router} />
        </CartProvider>
    );
}
