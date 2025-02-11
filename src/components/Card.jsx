import "../css/Cards.css";
import get_URL from "../services/GetURL";
import { useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";

export default function Card({ CardData }) {
    return (
        <div className="allPage">
            <div className="DataContainer">
                {CardData.map((person) => (
                    <CreateCard key={person.ID} person={person} />
                ))}
            </div>
        </div>
    );
}

function CreateCard({ person }) {
    const navigate = useNavigate();

    const handleAddToCart = (event) => {
        event.preventDefault(); // מונע את ההתנהגות ברירת המחדל של הטופס
        navigate("/shopingCart", {
            state: { product: person } // שולחים את המידע על המוצר
        });
    };

    return (
        <Form className="DataCardItem" onSubmit={handleAddToCart}>
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
