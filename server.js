import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS oficial — compatible con Wix y Railway
const corsOptions = {
  origin: 'https://nkmsistemas.wixsite.com',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // 🔥 Esta línea es clave para preflight

app.use(express.json());

// Ruta funcional
app.post('/guardar-redondo', guardarRedondo);

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});