import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DeliveryPage.css"; // Import the CSS file

const DeliveryPage = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/inner-pantry/meal-assignments`);
                setAssignments(data);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };

        fetchAssignments();
    }, []);

    const markAsDelivered = async (id, notes) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/inner-pantry/meal-assignments/${id}`, {
                deliveryStatus: "Delivered",
                notes,
            });
            alert("Delivery marked as completed!");
            setAssignments(assignments.map(a => a._id === id ? { ...a, deliveryStatus: "Delivered" } : a));
        } catch (error) {
            console.error("Error marking delivery:", error);
        }
    };

    return (
        <div className="delivery-page">
            <h1>Delivery Personnel Dashboard</h1>
            {assignments.length === 0 ? (
                <p>No meal boxes assigned yet.</p>
            ) : (
                <div>
                    {assignments.map((assignment) => (
                        <div key={assignment._id} className="assignment">
                            <h2>Patient Details:</h2>
                            <p><strong>Name:</strong> {assignment.dietChartId?.patientId?.name || "N/A"}</p>
                            <p><strong>Room Number:</strong> {assignment.dietChartId?.patientId?.roomNumber || "N/A"}</p>
                            <p><strong>Meal:</strong> Morning, Afternoon, and Evening</p>
                            <p><strong>Current Status:</strong> {assignment.deliveryStatus}</p>
                            <button
                                onClick={() => {
                                    const notes = prompt("Add optional delivery notes:");
                                    markAsDelivered(assignment._id, notes);
                                }}
                                disabled={assignment.deliveryStatus === "Delivered"}
                            >
                                {assignment.deliveryStatus === "Delivered" ? "Delivered" : "Mark as Delivered"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryPage;
