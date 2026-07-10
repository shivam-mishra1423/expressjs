import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/Form.css";

function EditStudent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [student, setStudent] = useState({

        name: "",
        age: "",
        course: "",
        city: ""

    });

    useEffect(() => {

        fetchStudent();

    }, []);

    const fetchStudent = async () => {

        try {

            const response = await API.get(`/student/${id}`);

            setStudent(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/student/${id}`, student);

            alert("Student Updated Successfully");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="form-container">

            <h2>Edit Student</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="age"
                    value={student.age}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="course"
                    value={student.course}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="city"
                    value={student.city}
                    onChange={handleChange}
                />

                <button>

                    Update Student

                </button>

            </form>

        </div>

    );

}

export default EditStudent;