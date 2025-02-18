import { Link } from "react-router-dom";
import "../css/Header.css";

export default function Header() {
    return (
        <nav className="nav-container">
            <div className="nav-left-links">
                <Link to="shopingCart" className="nav-link">Cart</Link>
                <Link to="/" className="nav-link">Home Page</Link>
            </div>
            <Link to="/manager" className="nav-link nav-right">Manager</Link>
        </nav>
    );
}
