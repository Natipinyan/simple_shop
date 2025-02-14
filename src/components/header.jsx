import { Link } from "react-router-dom";

export default function Header() {
    let NavStyle = {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "lightblue",
    };

    let LeftLinksStyle = {
        display: "flex",
        gap: "15px",
    };

    let RightLinkStyle = { marginLeft: "auto" };

    return (

            <nav style={NavStyle}>
            <div style={LeftLinksStyle}>
                <Link to="shopingCart">cart</Link>
                <Link to="/">home page</Link>
            </div>
            <Link to="/manager" style={RightLinkStyle}>manager</Link>
        </nav>

    );
}
