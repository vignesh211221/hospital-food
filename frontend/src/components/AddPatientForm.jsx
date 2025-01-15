import { useState } from "react";
import axios from "axios";
import "../styles/AddPatientForm.css"; // Import the CSS file for styling

const AddPatientForm = () => {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (e, arrayName) => {
        const updatedArray = [...formData[arrayName]];
        if (e.target.value) {
            updatedArray[e.target.dataset.index] = e.target.value;
        }
        setFormData({ ...formData, [arrayName]: updatedArray });
    };

    const handleAddInput = (arrayName) => {
        const updatedArray = [...formData[arrayName], ""];
        setFormData({ ...formData, [arrayName]: updatedArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/patients`, formData);
            alert("Patient added successfully!");
            setFormData({
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
            }); // Reset form after submission
        } catch (error) {
            console.error("Error adding patient:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="patient-form">
            <h2 className="form-title">Add New Patient</h2>

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
            />
            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                required
            />
            <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input"
                required
            />
            <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="form-input"
                required
            />
            <input
                type="text"
                name="emergencyContact"
                placeholder="Emergency Contact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="form-input"
                required
            />

            <div className="form-section">
                <label>Diseases</label>
                {formData.diseases.map((disease, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="Disease"
                        value={disease}
                        onChange={(e) => handleArrayChange(e, "diseases")}
                        data-index={index}
                        className="form-input"
                    />
                ))}
                <button type="button" onClick={() => handleAddInput("diseases")} className="form-button">
                    Add Disease
                </button>
            </div>

            <div className="form-section">
                <label>Allergies</label>
                {formData.allergies.map((allergy, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="Allergy"
                        value={allergy}
                        onChange={(e) => handleArrayChange(e, "allergies")}
                        data-index={index}
                        className="form-input"
                    />
                ))}
                <button type="button" onClick={() => handleAddInput("allergies")} className="form-button">
                    Add Allergy
                </button>
            </div>

            <input
                type="text"
                name="roomNumber"
                placeholder="Room Number"
                value={formData.roomNumber}
                onChange={handleChange}
                className="form-input"
                required
            />
            <input
                type="text"
                name="bedNumber"
                placeholder="Bed Number"
                value={formData.bedNumber}
                onChange={handleChange}
                className="form-input"
                required
            />
            <input
                type="text"
                name="floorNumber"
                placeholder="Floor Number"
                value={formData.floorNumber}
                onChange={handleChange}
                className="form-input"
                required
            />

            <button type="submit" className="form-button">
                Add Patient
            </button>
        </form>
    );
};

export default AddPatientForm;
