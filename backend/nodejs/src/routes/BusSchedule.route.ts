import express from 'express';
import { busScheduleController } from '../controllers/BusSchedule.controller';

const router = express.Router();

router.get('/get', busScheduleController.getAllBusSchedules);
router.get('/get/:id', busScheduleController.getBusScheduleById);
router.post('/post', busScheduleController.createBusSchedule);
router.put('/put/:id', busScheduleController.updateBusSchedule);
router.patch('/patch/:id', busScheduleController.patchBusSchedule);
router.delete('/delete/:id', busScheduleController.deleteBusSchedule);

export default router;