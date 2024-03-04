// src/controllers/citasController.ts
import { Request, Response } from 'express';
import Cita from '../models/cita';
import { generarCodigoSeguridad } from '../utils/codigoSeguridad';

export const getAllCitas = async (req: Request, res: Response): Promise<void> => {
  try {
    const citas = await Cita.findAll();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};

export const generarCita = async (req: Request, res: Response): Promise<void> => {
  const { id_anfitrion, id_visitante, tiempoLimite } = req.body;
  const _id_anfitrion=id_anfitrion ?? 1;
  const _id_visitante=id_visitante??1;
  const _tl= tiempoLimite?? Date();

  try {
    const codigoSeguridad = generarCodigoSeguridad(); // Lógica para generar código de seguridad
    const nuevaCita = await Cita.create({
      id_anfitrion: _id_anfitrion,
      id_visitante: _id_visitante,
      codigoSeguridad,
      estado: 'pendiente', // Puedes ajustar el estado según tu lógica de negocio
    });
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar una nueva cita' });
  }
};

export const validarCita = async (req: Request, res: Response): Promise<void> => {
  const { codigoSeguridad } = req.body;
  try {
    const cita = await Cita.findOne({
      where: { codigoSeguridad, estado: 'pendiente' },
    });
    if (cita) {
      // Verificar si la cita ha expirado
      if (new Date() > new Date(cita.tiempoLimite?? Date())) {
        res.status(400).json({ error: 'La cita ha expirado' });
      } else {
        // Actualizar el estado de la cita
        await cita.update({ estado: 'validada' });
        res.json({ mensaje: 'Cita validada correctamente' });
      }
    } else {
      res.status(404).json({ error: 'Cita no encontrada o ya validada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al validar la cita' });
  }
};

export const cancelarCita = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const cita = await Cita.findByPk(id);
    if (cita) {
      await cita.update({ estado: 'cancelada' });
      res.json({ mensaje: 'Cita cancelada correctamente' });
    } else {
      res.status(404).json({ error: 'Cita no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al cancelar la cita' });
  }
};
