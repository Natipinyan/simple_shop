import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { useState, useEffect} from "react";
import data from "../services/Data";
import Store from "../components/store";
import AddProduct from "../components/addProducts";
import ShopingCart from "../components/shopingCart";
import MainLayout from "../layout/MainLayout";
import Manager from "../components/manager";
import Payment from "../components/payment";
import {CartProvider} from "../services/cartContext";
import Update from "../components/updateProducts";


export default function Router() {
    const [products, setProducts] = useState(data);
    //משתנה שמכיל אתצ המוצרים

    const loadToStore = async () => {
        if (products.length === 0) return undefined;
        else return products;
    };
    //טעינת המוצרים לחנות

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
    //מקבלת את המוצרים בריקווסט ממירה לאובייקט אם המוצר תקין מעדכן
    const loadProduct = async ({ params }) => {
        return products.find((prod) => prod.Code == params.Code);
    };
    //מחזירה את המוצר הספציפי לעריכה

    const submitproduct = async ({request})=> {
        const formData = await request.formData();
        const newProduct = Object.fromEntries(formData);
        setProducts(products.map((product)=>{return product.Code == newProduct.Code ? newProduct: product;}))

    }
    //מקבלת את המוצרים ומשנה
    /*useEffect(() => {
        console.log("Products state after update:", products);
    }, [products]);*/

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

// useContext:
// מאפשר גישה לנתונים ממסגרת או ממשק עליון (context) מבלי להעביר אותם כפרופס לכל רכיב.
// משמש לשיתוף מידע בין רכיבים ללא צורך בהעברת פרופס ידנית.

// useEffect:
// משמש להרצת פונקציות לאחר render (כמו componentDidMount או componentDidUpdate).
// מאפשר ביצוע של פעולות צד-שני (side effects) כמו קריאות API, הגדרות מנויים או מניעת זיכרון ריק.
// הוא יכול להתבצע לאחר render וגם כשהמצב משתנה.

// useState:
// משמש לשמירה על מצב מקומי (state) בתוך רכיב.
// מאפשר לעדכן ערכים במצב ולהגיב לשינויים בו.
// לדוגמה, ניהול של ערך טקסט בתיבת קלט.


// הבדל בין שליחה מתוך ManagerPage לבין שליחה מתוך EditProduct:
// - ב-ManagerPage, המוצר נטען דרך הראוטר לפי קוד המוצר בכתובת ה-URL.
// - ב-EditProduct, המוצר נטען דרך חיפוש ידני עם קוד המוצר שהוזן בשדה.
// - ב-ManagerPage, המוצר מוצג אוטומטית לפי ה-URL, וב-EditProduct יש לבצע חיפוש לפני עריכה.
