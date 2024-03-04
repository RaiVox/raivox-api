// src/config/sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('raivox', 'root', '0001', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
