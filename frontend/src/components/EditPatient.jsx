import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import '../styles/EditPatient.css';

const EditPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        emergencyContact: "",
        diseases: [],
        allergies: [],
        roomNumber: "",
        bedNumber: "",
        floorNumber: "",
    });

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/patients/${id}`);
                setFormData(data);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        fetchPatient();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, fieldName) => {
        const values = e.target.value.split(",").map((item) => item.trim());
        setFormData({ ...formData, [fieldName]: values });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/patients/${id}`, formData);
            alert("Patient updated successfully!");
            navigate('/');
        } catch (error) {
            console.error("Error updating patient:", error);
        }
    };

    return (
        <form className="edit-patient-form" onSubmit={handleSubmit}>
            <h2>Edit Patient</h2>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />

            <label>Gender:</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} required />

            <label>Contact:</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required />

            <label>Emergency Contact:</label>
            <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} required />

            <label>Diseases (comma-separated):</label>
            <input type="text" value={formData.diseases.join(", ")} onChange={(e) => handleArrayChange(e, "diseases")} />

            <label>Allergies (comma-separated):</label>
            <input type="text" value={formData.allergies.join(", ")} onChange={(e) => handleArrayChange(e, "allergies")} />

            <label>Room Number:</label>
            <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleInputChange} required />

            <label>Bed Number:</label>
            <input type="text" name="bedNumber" value={formData.bedNumber} onChange={handleInputChange} required />

            <label>Floor Number:</label>
            <input type="text" name="floorNumber" value={formData.floorNumber} onChange={handleInputChange} required />

            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditPatient;
