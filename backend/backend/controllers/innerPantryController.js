import DeliveryPersonnel from "../models/DeliveryPersonnel.js";
import MealAssignment from "../models/MealAssignment.js";

// Add delivery personnel
export const addDeliveryPersonnel = async (req, res, next) => {
    try {
        const personnel = await DeliveryPersonnel.create(req.body);
        res.status(201).json(personnel);
    } catch (error) {
        next(error);
    }
};

// Get all delivery personnel
export const getDeliveryPersonnel = async (req, res, next) => {
    try {
        const personnel = await DeliveryPersonnel.find();
        res.status(200).json(personnel);
    } catch (error) {
        next(error);
    }
};

// Assign a meal to delivery personnel
export const assignMeal = async (req, res, next) => {
    try {
        const assignment = await MealAssignment.create(req.body);
        res.status(201).json(assignment);
    } catch (error) {
        next(error);
    }
};

// Update meal preparation or delivery status
export const updateMealStatus = async (req, res, next) => {
    try {
        const assignment = await MealAssignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!assignment) {
            res.status(404);
            throw new Error("Meal assignment not found");
        }
        res.status(200).json(assignment);
    } catch (error) {
        next(error);
    }
};

// Get all meal assignments
export const getMealAssignments = async (req, res, next) => {
    try {
        const assignments = await MealAssignment.find()
            .populate("dietChartId", "patientId meals")
            .populate("deliveryPersonnelId", "name contact");
        res.status(200).json(assignments);
    } catch (error) {
        next(error);
    }
};
