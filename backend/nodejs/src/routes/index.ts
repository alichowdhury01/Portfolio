import express from "express";
import UserRoutes from "./UserRoutes";
import EmployeeRoutes from "./EmployeeRoute";
import TenantRoutes from "./TenantRoute";
import ServiceRoutes from "./ServiceRoute";
import LoginRoute from "./LoginRoute";
import BusRoute from "./Bus.route";
import BusStopRoute from "./BusStop.route";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/employees", EmployeeRoutes);
router.use("/tenants", TenantRoutes);
router.use("/services", ServiceRoutes);
router.use("/login", LoginRoute);
router.use("/buses", BusRoute);
router.use("/busStops", BusStopRoute);



export default router;