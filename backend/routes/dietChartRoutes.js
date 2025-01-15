import express from "express";
import {
    createDietChart,
    getDietCharts,
    getDietChartById,
    updateDietChart,
    deleteDietChart,
} from "../controllers/dietChartController.js";

const router = express.Router();

router.route("/").post(createDietChart).get(getDietCharts);
router.route("/:id").get(getDietChartById).put(updateDietChart).delete(deleteDietChart);

export default router;
