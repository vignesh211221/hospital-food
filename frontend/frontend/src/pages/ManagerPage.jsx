import { Button } from "react-bootstrap";
import AddDietChartForm from "../components/AddDietChartForm";
import AddPatientForm from "../components/AddPatientForm";
import PatientTable from "../components/PatientTable";
import "../styles/ManagerPage.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const ManagerPage = () => {
    return (
        <div className="manager-page">
            <h1 className="dashboard-title">Hospital Food Manager Dashboard</h1>
            <div>
                <Button classname="btn_class">
                    <Link to="/manager/addpatient">Add Patient</Link>
                    
                </Button>
                <Button classname="btn_class2">
                    <Link to="/manager/adddiet">Add Diet</Link>
                </Button>
                <Button classname="btn_class2">
                    <Link to="/manager/patients">PatientList</Link>
                </Button>
            </div>
            
        </div>
    );
};

export default ManagerPage;
