import { Form,useNavigate } from "react-router-dom";
export default function AddProduct() {
    const navigate = useNavigate();
    let addStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "10px",
        height: "100%",
        width: "80%"
    };

    return (
        <Form
            style={addStyle}
            method="post" >
            <label>Code:<input  className="form-tag" placeholder="code" name="Code" type="text" required/></label>
            <label>Name:<input  className="form-tag" placeholder="name" name="Name" type="text" required/></label>
            <label>Price:<input  className="form-tag" placeholder="price" name="price" type="number" required/></label>
            <label>Image:<input  className="form-tag" placeholder="image" name="ImgURL" type="text" required/></label>
            <button className="form-tag" onClick={e => { navigate("/")}}>הוסף</button>
        </Form>
    );
}