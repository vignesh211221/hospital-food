import DeliveryPersonnelList from "../components/DeliveryPersonnelList";
import "../styles/PantryPage.css"; // Import the CSS file

const PantryPage = () => {
    return (
        <div className="pantry-page">
            <h1>Inner Pantry Dashboard</h1>
            <DeliveryPersonnelList />
        </div>
    );
};

export default PantryPage;
