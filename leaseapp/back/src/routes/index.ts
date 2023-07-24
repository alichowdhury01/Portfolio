import express from 'express';
import LeaseRoute from './LeaseRoute';


const router = express.Router();

router.use('/lease', LeaseRoute);


export default router;