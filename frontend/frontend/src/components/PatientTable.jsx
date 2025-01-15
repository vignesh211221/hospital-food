import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/PatientTable.css';

const PatientTable = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    // Fetch patients when the component loads
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/patients`);
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, []);

    // Delete a patient
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/patients/${id}`);
                setPatients(patients.filter(patient => patient._id !== id)); // Update state to remove deleted patient
            } catch (error) {
                console.error("Error deleting patient:", error);
            }
        }
    };

    // View patient details
    const handleView = (id) => {
        navigate(`/patient/${id}`); // Redirect to the view page
    };

    return (
        <div className="table-container">
            <h2>Patient List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Contact</th>
                        <th>Room</th>
                        <th>Bed</th>
                        <th>Floor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient._id}>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.contact}</td>
                            <td>{patient.roomNumber}</td>
                            <td>{patient.bedNumber}</td>
                            <td>{patient.floorNumber}</td>
                            <td>
                                <button className="view-button" onClick={() => handleView(patient._id)}>View</button>
                                
                                <button><Link to={`/patient/edit/${patient._id}`} className="-button">Edit</Link></button>
                                <button className="delete-button" onClick={() => handleDelete(patient._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientTable;
