import express from "express";
import { busStopController } from "../controllers/BusStop.controller";

const router = express.Router();

router.get("/", busStopController.getAllBusStops);
router.get("/:id", busStopController.getBusStopById);
router.post("/", busStopController.createBusStop);
router.put("/:id", busStopController.updateBusStop);
router.delete("/:id", busStopController.deleteBusStop);

export default router;