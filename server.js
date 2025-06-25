import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS SEGURO para Wix gratuito
const corsOptions = {
  origin: 'https://nkmsistemas.wixsite.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));       // 🔒 Aplica CORS
app.use(express.json());          // 📦 Permite leer JSON en el body

// 📌 Ruta para guardar redondo
app.post('/guardar-redondo', guardarRedondo);

// 🚀 Inicia el servidor
app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});