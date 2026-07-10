import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import StudentTable from "../components/StudentTable";

import "../styles/Home.css";

function Home() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    useEffect(() => {

        // Check Login
        const token = localStorage.getItem("token");

        if (!token) {

            alert("Please Login First");

            navigate("/login");

            return;

        }

        getStudents();

    }, []);

    const getStudents = async () => {

        try {

            // Get JWT Token
            const token = localStorage.getItem("token");

            const response = await API.get("/student", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setStudents(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to Fetch Students");

        }

    };

    return (

        <div className="home">

            <h1>Student Management System</h1>

            <p>Student List</p>

            <StudentTable students={students} />

        </div>

    );

}

export default Home;