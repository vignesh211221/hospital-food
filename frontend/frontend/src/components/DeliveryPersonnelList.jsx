import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Delivery.css'; // Import the CSS file

const DeliveryPersonnelList = () => {
    const [personnel, setPersonnel] = useState([]);
    const [formData, setFormData] = useState({ name: "", contact: "", location: "" });
    const [loading, setLoading] = useState(true);  // For loading state
    const [error, setError] = useState(null);      // For error state

    // Fetch personnel when component loads
    useEffect(() => {
        const fetchPersonnel = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/inner-pantry/delivery-personnel`);
                setPersonnel(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching personnel:", error);
                setError("Failed to load personnel. Please try again later.");
                setLoading(false);
            }
        };

        fetchPersonnel();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/inner-pantry/delivery-personnel`, formData);
            alert("Delivery personnel added successfully!");
            setFormData({ name: "", contact: "", location: "" }); // Reset form fields

            // Refetch the list of personnel after adding new one
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/inner-pantry/delivery-personnel`);
            setPersonnel(data);

        } catch (error) {
            console.error("Error adding personnel:", error);
            alert("Failed to add personnel. Please try again.");
        }
    };

    return (
        <div className="container">
            <h2 className="header">Delivery Personnel</h2>

            {/* Show loading message while data is being fetched */}
            {loading ? (
                <p className="loading">Loading personnel...</p> 
            ) : error ? (
                <p className="error">{error}</p>  // Show error message
            ) : (
                <>
                    {/* Form to add new delivery personnel */}
                    <form onSubmit={handleSubmit} className="form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="input"
                        />
                        <button type="submit" className="button">
                            Add Personnel
                        </button>
                    </form>

                    {/* List of delivery personnel */}
                    <ul className="list">
                        {personnel.map((person) => (
                            <li key={person._id}>
                                {person.name} - {person.contact} - {person.location}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default DeliveryPersonnelList;
