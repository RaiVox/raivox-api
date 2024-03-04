// src/models/Cita.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import Anfitrion from './anfitrion';
import Visitante from './visitante';

interface CitaAttributes {
  id?: number;
  id_anfitrion: number;
  id_visitante: number;
  codigoSeguridad: string;
  tiempoLimite?: Date;
  estado: string;
}

class Cita extends Model<CitaAttributes> implements CitaAttributes {
  id!: number;
  id_anfitrion!: number;
  id_visitante!: number;
  codigoSeguridad!: string;
  tiempoLimite?: Date;
  estado!: string;
}

Cita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_anfitrion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_visitante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigoSeguridad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tiempoLimite: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'citas',
    timestamps: false
  }
);

// Definir las relaciones con Anfitrion y Visitante
Cita.belongsTo(Anfitrion, { foreignKey: 'id_anfitrion', as: 'anfitrion' });
Cita.belongsTo(Visitante, { foreignKey: 'id_visitante', as: 'visitante' });

export default Cita;
