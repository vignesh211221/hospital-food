import mongoose from "mongoose";

const deliveryPersonnelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String },
});

export default mongoose.model("DeliveryPersonnel", deliveryPersonnelSchema);
