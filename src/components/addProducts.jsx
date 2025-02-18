import { Form } from "react-router-dom";
import "../css/AddProduct.css";

export default function AddProduct() {
    return (
        <Form className="add-form" method="post">
            <label>Code:
                <input className="form-tag" placeholder="code" name="Code" type="text" required />
            </label>
            <label>Name:
                <input className="form-tag" placeholder="name" name="Name" type="text" required />
            </label>
            <label>Price:
                <input className="form-tag" placeholder="price" name="price" type="number" required />
            </label>
            <label>Image:
                <input className="form-tag" placeholder="image" name="ImgURL" type="text" required />
            </label>
            <button className="send">Add</button>
        </Form>
    );
}
