import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    // Check User Login
    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");

        alert("Logout Successfully");

        navigate("/login");

    };

    return (

        <nav>

            <h2>Student CRUD</h2>

            <div>

                {

                    token ? (

                        <>

                            <Link to="/home">
                                Home
                            </Link>

                            <Link to="/add">
                                Add Student
                            </Link>

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link to="/register">
                                Register
                            </Link>

                            <Link to="/login">
                                Login
                            </Link>

                        </>

                    )

                }

            </div>

        </nav>

    );

}

export default Navbar;