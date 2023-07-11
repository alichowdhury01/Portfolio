import express from "express";
import UserRoutes from "./UserRoutes";
import EmployeeRoutes from "./EmployeeRoute";
import TenantRoutes from "./TenantRoute";
import ServiceRoutes from "./ServiceRoute";
import LoginRoute from "./LoginRoute";
import Bus from "./Bus.route";
import BusStopRoute from "./BusStop.route";
import BusRoute from "./BusRoute.route";
import BusScheduleRoute from "./BusSchedule.route";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/employees", EmployeeRoutes);
router.use("/tenants", TenantRoutes);
router.use("/services", ServiceRoutes);
router.use("/login", LoginRoute);
router.use("/buses", Bus);
router.use("/busStops", BusStopRoute);
router.use("/busRoutes", BusRoute);
router.use("/busSchedules", BusScheduleRoute);

export default router;