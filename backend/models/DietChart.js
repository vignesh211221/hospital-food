import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    meals: {
        morning: {
            items: [String],
            instructions: String,
        },
        afternoon: {
            items: [String],
            instructions: String,
        },
        evening: {
            items: [String],
            instructions: String,
        },
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("DietChart", dietChartSchema);
