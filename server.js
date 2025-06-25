import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';

dotenv.config();

const app = express(); // ✅ Declarar primero

const corsOptions = {
  origin: 'https://nkmsistemas.wixsite.com', // Reemplaza con tu dominio final si lo cambias
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
};

app.use(cors(corsOptions)); // ✅ Una sola vez
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post('/guardar-redondo', guardarRedondo);

app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});