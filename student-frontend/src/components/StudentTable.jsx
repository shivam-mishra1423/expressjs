import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Table.css";

function StudentTable({ students }) {

    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/student/${id}`);

            alert("Student Deleted Successfully");

            window.location.reload();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

    return (

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th>City</th>
                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                {

                    students.map((student) => (

                        <tr key={student.id}>

                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.course}</td>
                            <td>{student.city}</td>

                            <td>

                                <Link
                                    className="edit-btn"
                                    to={`/edit/${student.id}`}
                                >
                                    Edit
                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteStudent(student.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}

export default StudentTable;