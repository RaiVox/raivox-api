// src/routes/visitasRoutes.ts
import express from 'express';
const router = express.Router();
import {
  getAllVisitas,
  createVisita,
  updateVisita,
  deleteVisita,
} from '../controllers/visitasController';

router.get('/', getAllVisitas);
router.post('/', createVisita);
router.put('/:id', updateVisita);
router.delete('/:id', deleteVisita);

export default router;
