import express from 'express';
import {
  getTenants,
  createTenant,
  getTenant,
  updateTenant,
  deleteTenant,
} from '../controllers/TenantController';

const router = express.Router();

router.post('/', createTenant);
router.get('/', getTenants);
router.get('/:id', getTenant);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);

export default router;
