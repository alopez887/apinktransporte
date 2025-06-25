import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS seguro y estricto para tu dominio gratuito de Wix
const corsOptions = {
  origin: 'https://nkmsistemas.wixsite.com',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta para guardar redondo
app.post('/guardar-redondo', guardarRedondo);

app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});