import express from 'express';
import { leaseController } from '../controllers/LeaseController';


const router = express.Router();

router.post('/post', leaseController.createLease);

export default router;