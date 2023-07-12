import express from 'express';
import { busController } from '../controllers/Bus.controller';

const router = express.Router();

router.get('/get', busController.getAllBuses);
router.get('/get/:id', busController.getBusById);
router.post('/post', busController.createBus);
router.put('/put/:id', busController.updateBus);
router.patch('/patch/:id', busController.patchBus);
router.delete('/delete/:id', busController.deleteBus);

export default router;
