// src/models/Visitante.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

interface VisitanteAttributes {
  nombre: string;
  correo?: string;
  telefono?: string;
  foto?: string;
}

class Visitante extends Model<VisitanteAttributes> implements VisitanteAttributes {
  nombre!: string;
  correo?: string;
  telefono?: string;
  foto?: string;
}

Visitante.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'visitantes',
    timestamps: false
  }
);

export default Visitante;
