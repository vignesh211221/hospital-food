import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/patients/${id}`);
                setPatient(data);
            } catch (error) {
                console.error("Error fetching patient:", error);
            }
        };

        fetchPatient();
    }, [id]);

    if (!patient) {
        return <p>Loading patient details...</p>;
    }

    return (
        <div>
            <h2>Patient Details</h2>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Contact:</strong> {patient.contact}</p>
            <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
            <p><strong>Diseases:</strong> {patient.diseases.join(", ")}</p>
            <p><strong>Allergies:</strong> {patient.allergies.join(", ")}</p>
            <p><strong>Room Number:</strong> {patient.roomNumber}</p>
            <p><strong>Bed Number:</strong> {patient.bedNumber}</p>
            <p><strong>Floor Number:</strong> {patient.floorNumber}</p>
        </div>
    );
};

export default ViewPatient;
