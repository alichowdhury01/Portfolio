import express from "express";
import UserRoutes from "./UserRoutes";
import EmployeeRoutes from "./EmployeeRoute";
import TenantRoutes from "./TenantRoute";
import ServiceRoutes from "./ServiceRoute";
import LoginRoute from "./LoginRoute";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/employees", EmployeeRoutes);
router.use("/tenants", TenantRoutes);
router.use("/services", ServiceRoutes);
router.use("/login", LoginRoute);


export default router;