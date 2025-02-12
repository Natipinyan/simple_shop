import Card from "./Card";
import { useLoaderData } from "react-router-dom";


export default function Store({ products }) {
    let refProductsData = useLoaderData();
    return (
        <Card CardData={refProductsData} />
    );
}