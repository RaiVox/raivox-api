// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import path from 'path';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Routes
app.use('/api', routes);
app.get('/visitante', (req, res) => {
  res.render('visitante');
});

app.get('/cita', (req, res) => {
  res.render('cita');
});

app.get('/anfitrion', (req, res) => {
  res.render('anfitrion');
});
app.get('/eliminaranfitrion/:id', (req, res) => {
  const id = req.params.id;
  // Aquí debes recuperar los datos del anfitrión desde la base de datos
  const anfitrion = {
    id: id,
    nombre: 'Nombre del anfitrion', // Reemplaza con la lógica para obtener el nombre desde la base de datos
    correo: 'correo@dominio.com', // Reemplaza con la lógica para obtener el correo desde la base de datos
    telefono: '123456789', // Reemplaza con la lógica para obtener el teléfono desde la base de datos
    // Otros campos según tu modelo
  };

  res.render('eliminaranfitrion', { anfitrion });
});
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la plantilla de bienvenida
});
// Ruta para manejar el error 404
app.use((req, res) => {
  res.status(404).render('error404'); // Renderiza la plantilla de error 404
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
