// src/models/Anfitrion.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

interface AnfitrionAttributes {
  nombre: string;
  correo?: string;
  telefono: string;
  rol?: string;
}

class Anfitrion extends Model<AnfitrionAttributes> implements AnfitrionAttributes {
  nombre!: string;
  correo?: string;
  telefono!: string;
  rol?: string;
}

Anfitrion.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'anfitriones',
    timestamps: false
  }
);

export default Anfitrion;
