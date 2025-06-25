import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ⚠️ IMPORTANTE: CORS debe ir después de crear `app`, y configurado correctamente
const corsOptions = {
  origin: 'https://nkmsistemas.wixsite.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta para guardar redondo
app.post('/guardar-redondo', guardarRedondo);

app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});