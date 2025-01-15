import express from "express";
import {
    addPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.route("/").post(addPatient).get(getPatients);
router.route("/:id").get(getPatientById).put(updatePatient).delete(deletePatient);

export default router;
