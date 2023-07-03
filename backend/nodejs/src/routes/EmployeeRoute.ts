import express from 'express';
import { createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee} from '../controllers/EmployeeController';

const router = express.Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;