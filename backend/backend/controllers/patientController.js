import Patient from "../models/Patient.js";

// Add a new patient
export const addPatient = async (req, res, next) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (error) {
        next(error);
    }
};

// Get all patients
export const getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
};

// Get a specific patient
export const getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            res.status(404);
            throw new Error("Patient not found");
        }
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

// Update patient details
export const updatePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            res.status(404);
            throw new Error("Patient not found");
        }
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

// Delete a patient
export const deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            res.status(404);
            throw new Error("Patient not found");
        }
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        next(error);
    }
};
