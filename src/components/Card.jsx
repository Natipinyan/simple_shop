import { useState } from "react";
import "../css/Cards.css";
import get_URL from "../services/GetURL";
import { useCart } from "../services/cartContext";

export default function Card({ CardData }) {
    return (
        <div className="allPage">
            <div className="DataContainer">
                {CardData.map((product) => (
                    <CreateCard key={product.Code} product={product} />
                ))}
            </div>
        </div>
    );
}

function CreateCard({ product }) {
    const { addToCart } = useCart();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleAddToCart = (event) => {
        event.preventDefault();
        addToCart(product);

        // Show success message for 3 seconds
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

    return (
        <div className="DataCardItem">
            <img src={get_URL(product.ImgURL)} alt={product.Name} />
            <b>{product.Code}</b>
            <b>{product.Name}</b>
            <b>{product.price}</b>
            <button id="btAdd" onClick={handleAddToCart}>
                Add to Cart
            </button>

            {showSuccessMessage && (
                <div className="successMessage">
                    Item added successfully
                </div>
            )}
        </div>
    );
}
