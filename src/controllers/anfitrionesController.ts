// src/controllers/anfitrionesController.ts
import { Request, Response } from 'express';
import Anfitrion from '../models/anfitrion';

export const getAllAnfitriones = async (req: Request, res: Response): Promise<void> => {
  try {
    const anfitriones = await Anfitrion.findAll();
    res.json(anfitriones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener anfitriones' });
  }
};

export const createAnfitrion = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoAnfitrion = await Anfitrion.create(req.body);
    res.status(201).json(nuevoAnfitrion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear un nuevo anfitrión' });
  }
};

export const updateAnfitrion = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const anfitrion = await Anfitrion.findByPk(id);
    if (anfitrion) {
      await anfitrion.update(req.body);
      res.json(anfitrion);
    } else {
      res.status(404).json({ error: 'Anfitrión no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el anfitrión' });
  }
};

export const deleteAnfitrion = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  try {
    const anfitrion = await Anfitrion.findByPk(id);
    if (anfitrion) {
      await anfitrion.destroy();
      res.json({ mensaje: 'Anfitrión eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Anfitrión no encontrado' });
    }
  } catch (error:any) {
    res.status(500).json({ error: 'Error al eliminar el anfitrión.\nn' + error.message });
  }
};
