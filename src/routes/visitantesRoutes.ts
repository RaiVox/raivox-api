// src/routes/visitantesRoutes.ts
import express from 'express';
const router = express.Router();
import {
  getAllVisitantes,
  createVisitante,
  updateVisitante,
  deleteVisitante,
} from '../controllers/visitantesController';

router.get('/', getAllVisitantes);
router.post('/', createVisitante);
router.put('/:id', updateVisitante);
router.delete('/:id', deleteVisitante);

export default router;
