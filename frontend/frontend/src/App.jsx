import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";
import ManagerPage from "./pages/ManagerPage";
import PantryPage from "./pages/PantryPage";
import DeliveryPage from "./pages/DeliveryPage";
import Register from "./components/Register";
import PatientDetails from "./components/ViewPatient";
import ViewPatient from "./components/ViewPatient";
import AddPatientForm from "./components/AddPatientForm";
import AddDietChartForm from "./components/AddDietChartForm";
import PatientTable from "./components/PatientTable";
import EditPatient from "./components/EditPatient";

const App = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/manager" element={user?.role === "manager" ? <ManagerPage /> : <Navigate to="/login" />} />
            <Route path="/pantry" element={user?.role === "pantry" ? <PantryPage /> : <Navigate to="/login" />} />
            <Route path="/delivery" element={user?.role === "delivery" ? <DeliveryPage /> : <Navigate to="/login" />} />
            <Route path="/patient/id" element={<ViewPatient />} />
            <Route path="/manager/adddiet" element={<AddDietChartForm />} />
            <Route path="/manager/addpatient" element={<AddPatientForm />} />
            <Route path="/manager/patients" element={<PatientTable/>} />
            <Route path="/manager/edit" element={<EditPatient />} />
        </Routes>
    );
};

export default App;
