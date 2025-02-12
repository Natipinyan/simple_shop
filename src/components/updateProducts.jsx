import { Form, useLoaderData,useNavigate } from "react-router-dom";

import data from "../Data";

export default function EditProduct({pCodeToSearch,setProductToSearch}) {
    const product = useLoaderData() || {};
    let navigate = useNavigate();


    const styles = {
        allPage: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
            height: "100%",
            width: "80%"
        },
        label: {
            display: "block",
            marginBottom: "10px"
        }
    };
    const handleSearch = () => {
        setProductToSearch(pCodeToSearch);
        navigate("/manager/edit/" + pCodeToSearch);
    };


    return (
        <section style={styles.allPage}>
            <div>
                <div>
                    <input
                        value={pCodeToSearch}
                        onChange={e => setProductToSearch(e.target.value)} // Update pCodeToSearch directly
                        className="form-tag"
                        placeholder="product code"
                        name="Code"
                        type="search"
                    />
                    <button
                        className="form-tag"
                        onClick={handleSearch}
                    >
                        search
                    </button>
                </div>

                <Form method="POST">
                    <input name="Code" type="hidden" defaultValue={product.Code} />
                    <label style={styles.label}>Code:<input className="form-tag" defaultValue={product.Code} placeholder="code" name="Code" type="text" /></label>
                    <label style={styles.label}>Name:<input className="form-tag" defaultValue={product.Name} placeholder="name" name="Name" type="text" /></label>
                    <label style={styles.label}>Image:<input className="form-tag" defaultValue={product.ImgURL} placeholder="image" name="ImgURL" type="text" /></label>
                    <label style={styles.label}>Price:<input className="form-tag" defaultValue={product.price} placeholder="price" name="price" type="number" /></label>
                    <button className="form-tag" onClick={e => { navigate("/")}}>ערוך</button>
                </Form>
            </div>
        </section>
    );
}
