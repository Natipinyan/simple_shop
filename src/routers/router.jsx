import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRef } from "react";
import Store from "../components/store";
import products from "../Data";
import MainLayout from "../layout/MainLayout";

export default function Router() {
    const productsRef = useRef(products);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    element: <Store productsRef={productsRef} />,
                    index: true,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
