import express from "express";
import {
    addDeliveryPersonnel,
    getDeliveryPersonnel,
    assignMeal,
    updateMealStatus,
    getMealAssignments,
} from "../controllers/innerPantryController.js";

const router = express.Router();

router.route("/delivery-personnel").post(addDeliveryPersonnel).get(getDeliveryPersonnel);
router.route("/meal-assignments").post(assignMeal).get(getMealAssignments);
router.route("/meal-assignments/:id").put(updateMealStatus);

export default router;
