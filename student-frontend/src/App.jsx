import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

    return (

        <>

            <Navbar />

            <Routes>

                {/* Application Start */}
                <Route path="/" element={<Register />} />

                {/* Authentication */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Student Dashboard */}
                <Route path="/home" element={<Home />} />
                <Route path="/add" element={<AddStudent />} />
                <Route path="/edit/:id" element={<EditStudent />} />

            </Routes>

        </>

    );

}

export default App;