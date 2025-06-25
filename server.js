import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS CORRECTO PARA WIX
const corsOptions = {
  origin: 'https://nkmsistemas.wixsite.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // NECESARIO PARA PREFLIGHT (WIX)

app.use(express.json());

// Ruta
app.post('/guardar-redondo', guardarRedondo);

app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});