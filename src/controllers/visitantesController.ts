// src/controllers/visitantesController.ts
import { Request, Response } from 'express';
import Visitante from '../models/visitante';

export const getAllVisitantes = async (req: Request, res: Response): Promise<void> => {
  try {
    const visitantes = await Visitante.findAll();
    res.json(visitantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener visitantes' });
  }
};

export const createVisitante = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoVisitante = await Visitante.create(req.body);
    res.status(201).json(nuevoVisitante);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo visitante' });
  }
};

export const updateVisitante = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const visitante = await Visitante.findByPk(id);
    if (visitante) {
      await visitante.update(req.body);
      res.json(visitante);
    } else {
      res.status(404).json({ error: 'Visitante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el visitante' });
  }
};

export const deleteVisitante = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const visitante = await Visitante.findByPk(id);
    if (visitante) {
      await visitante.destroy();
      res.json({ mensaje: 'Visitante eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Visitante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el visitante' });
  }
};
