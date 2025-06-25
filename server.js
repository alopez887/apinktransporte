import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';
import pool from './conexion.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: 'https://nkmsistemas.wixsite.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

// CORS oficial + refuerzo
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://nkmsistemas.wixsite.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// Ruta para hoteles
app.get('/hoteles', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT nombre_hotel FROM hoteles_zona ORDER BY nombre_hotel');
    res.json(resultado.rows);
  } catch (error) {
    console.error('❌ Error al obtener hoteles:', error.message);
    res.status(500).json({ error: 'Error al obtener hoteles' });
  }
});

// Ruta para guardar redondo
app.post('/guardar-redondo', guardarRedondo);

app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});