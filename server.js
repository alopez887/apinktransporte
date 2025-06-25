import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';
import pool from './conexion.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS configurado para Wix y archivos HTML embebidos (iframe)
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://nkmsistemas.wixsite.com',
      'https://nkmsistemas-wixsite-com.filesusr.com'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ No autorizado por CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ Refuerzo manual para CORS (por si Railway cachea mal)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowed = [
    'https://nkmsistemas.wixsite.com',
    'https://nkmsistemas-wixsite-com.filesusr.com'
  ];
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

// 🔹 Ruta para hoteles
app.get('/hoteles', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT nombre_hotel FROM hoteles_zona ORDER BY nombre_hotel');
    res.json(resultado.rows);
  } catch (error) {
    console.error('❌ Error al obtener hoteles:', error.message);
    res.status(500).json({ error: 'Error al obtener hoteles' });
  }
});

// 🔹 Ruta para obtener capacidades según tipo y zona
app.get('/capacidades', async (req, res) => {
  const { tipo, zona } = req.query;

  if (!tipo || !zona) {
    return res.status(400).json({ error: 'Faltan parámetros tipo y zona' });
  }

  try {
    const resultado = await pool.query(
      'SELECT capacidad FROM tarifas_transportacion WHERE tipo_transporte = $1 AND zona = $2 ORDER BY capacidad',
      [tipo, zona]
    );

    const capacidades = resultado.rows.map(row => row.capacidad);
    res.json(capacidades);
  } catch (error) {
    console.error('❌ Error al obtener capacidades:', error.message);
    res.status(500).json({ error: 'Error interno al obtener capacidades' });
  }
});

// 🔹 Ruta para guardar redondo
app.post('/guardar-redondo', guardarRedondo);

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});