import"../css/Cards.css";
import get_URL from "../services/GetURL"

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
    return (
        <div className="DataCardItem">
            <img src={get_URL(person.ImgURL)} alt={person.Name} />
            <b>{person.Code}</b>
            <b>{person.Name}</b>
            <b>{person.price}</b>
            <button id="btAdd">Add to Cart</button>
        </div>
    );
}