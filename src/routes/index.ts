// src/routes/index.ts
import express from 'express';
const router = express.Router();

import anfitrionesRoutes from './anfitrionesRoutes';
import visitantesRoutes from './visitantesRoutes';
import visitasRoutes from './visitasRoutes';
import citasRoutes from './citasRoutes';

router.use('/anfitriones', anfitrionesRoutes);
router.use('/visitantes', visitantesRoutes);
router.use('/visitas', visitasRoutes);
router.use('/citas', citasRoutes);

export default router;
