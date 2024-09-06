-- Eliminar las tablas si existen
DROP TABLE IF EXISTS anfitriones;
DROP TABLE IF EXISTS citas;
DROP TABLE IF EXISTS familias;
DROP TABLE IF EXISTS niveles;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS visitantes;
DROP TABLE IF EXISTS visitas;
DROP TABLE IF EXISTS logs;

-- Crear tabla 'anfitriones'
CREATE TABLE anfitriones (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  correo TEXT NOT NULL,
  telefono TEXT DEFAULT NULL,
  rol TEXT DEFAULT NULL,
  createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
  updatedAt DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Crear tabla 'citas'
CREATE TABLE citas (
  id TEXT PRIMARY KEY,
  id_anfitrion TEXT NOT NULL,
  id_visitante TEXT NOT NULL,
  codigoSeguridad TEXT NOT NULL,
  tiempoLimite DATETIME DEFAULT NULL,
  estado TEXT NOT NULL,
  observacion TEXT DEFAULT NULL,
  createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
  updatedAt DATETIME NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (id_anfitrion) REFERENCES anfitriones(id),
  FOREIGN KEY (id_visitante) REFERENCES visitantes(id)
);

-- Crear tabla 'familias'
CREATE TABLE familias (
  id TEXT PRIMARY KEY,
  nombres TEXT DEFAULT NULL,
  telefono TEXT DEFAULT NULL,
  parentezco TEXT DEFAULT NULL,
  activo INTEGER DEFAULT 1,
  id_anfitrion TEXT DEFAULT NULL,
  createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
  updatedAt DATETIME NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (id_anfitrion) REFERENCES anfitriones(id)
);

-- Crear tabla 'niveles'
CREATE TABLE niveles (
  id TEXT PRIMARY KEY,
  descripcion TEXT DEFAULT NULL,
  createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
  updatedAt DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Crear tabla 'usuarios'
CREATE TABLE usuarios (
  id TEXT PRIMARY KEY,
  usuario TEXT UNIQUE DEFAULT NULL,
  password TEXT DEFAULT NULL,
  id_anfitrion TEXT DEFAULT NULL,
  id_nivel TEXT DEFAULT '5',
  createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
  updatedAt DATETIME NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (id_anfitrion) REFERENCES anfitriones(id),
  FOREIGN KEY (id_nivel) REFERENCES niveles(id)
);

-- Crear tabla 'visitantes'
CREATE TABLE visitantes (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  correo TEXT DEFAULT NULL,
  telefono TEXT DEFAULT NULL,
  foto TEXT DEFAULT NULL,
  direccion TEXT DEFAULT NULL,
  rif TEXT DEFAULT NULL,
  createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
  updatedAt DATETIME NOT NULL DEFAULT (datetime('now'))
);

-- Crear tabla 'visitas'
CREATE TABLE visitas (
  id TEXT PRIMARY KEY,
  id_anfitrion TEXT NOT NULL,
  id_visitante TEXT NOT NULL,
  fecha_visita DATETIME NOT NULL,
  estado_visita TEXT DEFAULT NULL,
  id_familia TEXT DEFAULT NULL,
  observacion TEXT DEFAULT NULL,
  createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
  updatedAt DATETIME NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (id_anfitrion) REFERENCES anfitriones(id),
  FOREIGN KEY (id_visitante) REFERENCES visitantes(id),
  FOREIGN KEY (id_familia) REFERENCES familias(id)
);

-- Crear tabla 'logs'
CREATE TABLE logs (
  id TEXT PRIMARY KEY,
  tabla TEXT NOT NULL,
  id_registro TEXT NOT NULL,
  accion TEXT NOT NULL,
  usuario TEXT DEFAULT NULL,
  timestamp DATETIME NOT NULL DEFAULT (datetime('now')),
  descripcion TEXT DEFAULT NULL
);