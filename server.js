import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Configuración segura de CORS
const corsOptions = {
  origin: 'https://nkmsistemas.wixsite.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // 🔥 ESTA LÍNEA ES CRUCIAL PARA WIX

app.use(express.json());

// Ruta para guardar redondo
app.post('/guardar-redondo', guardarRedondo);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});