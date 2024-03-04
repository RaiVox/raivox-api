// src/controllers/visitasController.ts
import { Request, Response } from 'express';
import Visita from '../models/visita';

export const getAllVisitas = async (req: Request, res: Response): Promise<void> => {
  try {
    const visitas = await Visita.findAll();
    res.json(visitas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener visitas' });
  }
};

export const createVisita = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevaVisita = await Visita.create(req.body);
    res.status(201).json(nuevaVisita);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear una nueva visita' });
  }
};

export const updateVisita = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const visita = await Visita.findByPk(id);
    if (visita) {
      await visita.update(req.body);
      res.json(visita);
    } else {
      res.status(404).json({ error: 'Visita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la visita' });
  }
};

export const deleteVisita = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const visita = await Visita.findByPk(id);
    if (visita) {
      await visita.destroy();
      res.json({ mensaje: 'Visita eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Visita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la visita' });
  }
};
