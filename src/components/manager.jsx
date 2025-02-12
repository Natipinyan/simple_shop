import { Outlet, Link } from "react-router-dom";
import "../css/manager.css";
import { useNavigate } from "react-router-dom";

export default function ManagerPage({ pCodeToSearch, setProductToSearch }) {
    let navigate = useNavigate();

    const handleSearch = () => {
        setProductToSearch(pCodeToSearch);
        navigate("/manager/edit/" + pCodeToSearch);
    };

    return (
        <section className="allPageManager">
            <p className="left">
                <section className="top">
                    <Link to="/manager">הוספה</Link>
                </section>

                <section className="under">
                    <Link to={`/manager/edit/${pCodeToSearch}`}>עריכה</Link>
                    <input
                        placeholder="קוד מוצר"
                        defaultValue={pCodeToSearch}
                        type="text"
                        onChange={(e) => {
                            setProductToSearch(e.target.value);
                        }}
                    />
                </section>
            </p>
            <Outlet />
        </section>
    );
}