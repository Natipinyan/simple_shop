import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
export default function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout/>,
        }

    ]);

    return <RouterProvider router={router} />;
}
