// src/models/Visita.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import Anfitrion from './anfitrion';
import Visitante from './visitante';

interface VisitaAttributes {
  id: number;
  id_anfitrion?: number | null;
  id_visitante?: number | null;
  fechaVisita?: Date | null;
  estadoVisita?: string | null;
}

class Visita extends Model<VisitaAttributes> implements VisitaAttributes {
  id!: number;
  id_anfitrion?: number | null;
  id_visitante?: number | null;
  fechaVisita?: Date | null;
  estadoVisita?: string | null;
}

Visita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_anfitrion: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    id_visitante: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    fechaVisita: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    estadoVisita: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'visitas',
    timestamps: false
  }
);

// Definir las relaciones con Anfitrion y Visitante
Visita.belongsTo(Anfitrion, { foreignKey: 'idAnfitrion', as: 'anfitrion' });
Visita.belongsTo(Visitante, { foreignKey: 'idVisitante', as: 'visitante' });

export default Visita;
