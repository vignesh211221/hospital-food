import mongoose from "mongoose";

const mealAssignmentSchema = new mongoose.Schema({
    dietChartId: { type: mongoose.Schema.Types.ObjectId, ref: "DietChart", required: true },
    deliveryPersonnelId: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryPersonnel" },
    preparationStatus: { type: String, enum: ["Pending", "In Progress", "Prepared"], default: "Pending" },
    deliveryStatus: { type: String, enum: ["Pending", "In Transit", "Delivered"], default: "Pending" },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
});

export default mongoose.model("MealAssignment", mealAssignmentSchema);
