import express from 'express';
import {busRouteController}  from '../controllers/BusRoute.controller';

const router = express.Router();

router.get('/get', busRouteController.getAllBusRoutes);
router.get('/get/:id', busRouteController.getBusRouteById);
router.post('/post', busRouteController.createBusRoute);
router.put('/put/:id', busRouteController.updateBusRoute);
// router.patch('/patch/:id', busRouteController.patchBusRoute);
router.delete('/delete/:id', busRouteController.deleteBusRoute);

export default router;