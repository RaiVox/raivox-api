// src/routes/citasRoutes.ts
import express from 'express';
const router = express.Router();
import {
  getAllCitas,
  generarCita,
  validarCita,
  cancelarCita,
} from '../controllers/citasController';

router.get('/', getAllCitas);
router.post('/generar', generarCita);
router.post('/validar', validarCita);
router.put('/cancelar/:id', cancelarCita);

export default router;
