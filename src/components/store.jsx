import Card from "./Card";

export default function Store({ products , setCart }) {
    return (
        <Card CardData={products} setCart={setCart}/>
    );
}
