import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Form.css";

function StudentForm() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        age: "",
        course: "",
        city: ""
    });

    // Input Change
    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };

    // Form Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/student", student);

            console.log(response.data);

            alert("Student Added Successfully");

            // Form Reset
            setStudent({
                name: "",
                age: "",
                course: "",
                city: ""
            });

            // Home Page Redirect
            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Something Went Wrong");

        }

    };

    return (

        <div className="form-container">

            <h2>Add Student</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={student.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Enter Age"
                    value={student.age}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="course"
                    placeholder="Enter Course"
                    value={student.course}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    value={student.city}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Add Student
                </button>

            </form>

        </div>

    );

}

export default StudentForm;