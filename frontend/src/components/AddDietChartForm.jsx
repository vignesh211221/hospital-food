import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddDietChartForm.css"; // Import the new CSS file

const AddDietChartForm = () => {
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({
        patientId: "",
        meals: {
            morning: { items: "", instructions: "" },
            afternoon: { items: "", instructions: "" },
            evening: { items: "", instructions: "" },
        },
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split(".");
        const updatedFormData = { ...formData };

        if (keys.length === 2) {
            updatedFormData.meals[keys[0]][keys[1]] = value;
        } else {
            updatedFormData[keys[0]] = value;
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/diet-charts`, formData);
            alert("Diet chart created successfully!");
        } catch (error) {
            console.error("Error creating diet chart:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="diet-chart-form">
            <h2 className="form-title">Create Diet Chart</h2>
            <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="form-select"
                required
            >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                        {patient.name} (Room: {patient.roomNumber})
                    </option>
                ))}
            </select>
            {["morning", "afternoon", "evening"].map((meal) => (
                <div key={meal} className="meal-section">
                    <h3 className="meal-title">
                        {meal.charAt(0).toUpperCase() + meal.slice(1)} Meal
                    </h3>
                    <input
                        type="text"
                        name={`${meal}.items`}
                        placeholder="Items (comma-separated)"
                        value={formData.meals[meal].items}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name={`${meal}.instructions`}
                        placeholder="Instructions"
                        value={formData.meals[meal].instructions}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
            ))}
            <button type="submit" className="form-button">
                Create Diet Chart
            </button>
        </form>
    );
};

export default AddDietChartForm;
