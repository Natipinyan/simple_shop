import "../css/Cards.css";
import get_URL from "../services/GetURL";
import { useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";

export default function Card({ CardData, setCart }) {
    return (
        <div className="allPage">
            <div className="DataContainer">
                {CardData.map((person) => (
                    <CreateCard
                        key={person.Code}
                        person={person}
                        setCart={setCart}
                    />
                ))}
            </div>
        </div>
    );
}

function CreateCard({ person, setCart }) {
    const navigate = useNavigate();

    const handleAddToCart = (event) => {
        event.preventDefault();

        setCart((prevCart) => [...prevCart, person]);
    };

    return (
        <Form className="DataCardItem" method="post" onSubmit={handleAddToCart}>
            <img src={get_URL(person.ImgURL)} alt={person.Name} />
            <b>{person.Code}</b>
            <b>{person.Name}</b>
            <b>{person.price}</b>
            <button id="btAdd" type="submit">
                Add to Cart
            </button>
        </Form>
    );
}
