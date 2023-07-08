import express from "express";
import { busStopController } from "../controllers/BusStop.controller";

const router = express.Router();

router.get("/get", busStopController.getAllBusStops);
router.get("/get/:id", busStopController.getBusStopById);
router.post("/post", busStopController.createBusStop);
router.put("/put/:id", busStopController.updateBusStop);
router.delete("/delete/:id", busStopController.deleteBusStop);

export default router;