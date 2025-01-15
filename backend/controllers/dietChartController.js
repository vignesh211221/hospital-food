import DietChart from "../models/DietChart.js";

// Create a diet chart
export const createDietChart = async (req, res, next) => {
    try {
        const dietChart = await DietChart.create(req.body);
        res.status(201).json(dietChart);
    } catch (error) {
        next(error);
    }
};

// Get all diet charts
export const getDietCharts = async (req, res, next) => {
    try {
        const dietCharts = await DietChart.find().populate("patientId", "name roomNumber");
        res.status(200).json(dietCharts);
    } catch (error) {
        next(error);
    }
};

// Get a diet chart by ID
export const getDietChartById = async (req, res, next) => {
    try {
        const dietChart = await DietChart.findById(req.params.id).populate("patientId", "name roomNumber");
        if (!dietChart) {
            res.status(404);
            throw new Error("Diet chart not found");
        }
        res.status(200).json(dietChart);
    } catch (error) {
        next(error);
    }
};

// Update a diet chart
export const updateDietChart = async (req, res, next) => {
    try {
        const dietChart = await DietChart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!dietChart) {
            res.status(404);
            throw new Error("Diet chart not found");
        }
        res.status(200).json(dietChart);
    } catch (error) {
        next(error);
    }
};

// Delete a diet chart
export const deleteDietChart = async (req, res, next) => {
    try {
        const dietChart = await DietChart.findByIdAndDelete(req.params.id);
        if (!dietChart) {
            res.status(404);
            throw new Error("Diet chart not found");
        }
        res.status(200).json({ message: "Diet chart deleted successfully" });
    } catch (error) {
        next(error);
    }
};
