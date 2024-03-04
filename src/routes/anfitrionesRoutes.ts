// src/routes/anfitrionesRoutes.ts
import express from 'express';
const router = express.Router();
import {
  getAllAnfitriones,
  createAnfitrion,
  updateAnfitrion,
  deleteAnfitrion,
} from '../controllers/anfitrionesController';

router.get('/', getAllAnfitriones);
router.post('/', createAnfitrion);
router.put('/:id', updateAnfitrion);
router.post('/eliminar', deleteAnfitrion);

export default router;
