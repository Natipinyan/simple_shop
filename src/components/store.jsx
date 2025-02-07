import Card from "./Card";

export default function Store({ productsRef }) {
    return (
        <Card CardData={productsRef.current} />
    );
}
