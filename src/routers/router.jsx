import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import data from "../Data";
import Store from "../components/store";
import AddProduct from "../components/addProducts";
import ShopingCart from "../components/shopingCart";
import MainLayout from "../layout/MainLayout";
import Manager from "../components/manager";
import Update from "../components/updateProducts";

import { useEffect } from "react";


export default function Router() {
    const [products, setProducts] = useState(data);
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

    //print changes in products state
    useEffect(() => {
        console.log("Products state after update:", products);
    }, [products]);

    const addProduct = async ({ request }) => {
        const formData = await request.formData();
        const newProduct = Object.fromEntries(formData);

        if (newProduct) {
            setProducts(prevProducts => {
                const updatedProducts = [...prevProducts, newProduct];
                //console.log("Updated Products:", updatedProducts);
                return updatedProducts;
            });
        }
    };


    const loadProduct = async ({ params }) => {
        return products.find((prod) => prod.Code == params.Code);
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    element: <Store products={products} />,
                    index: true,
                },
                {
                    path: "shopingCart",
                    element: <ShopingCart />,
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
                            children: [],
                        },
                    ]
                    }
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
