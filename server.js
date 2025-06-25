import express from 'express';
import dotenv from 'dotenv';
import guardarRedondo from './guardarRedondo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 🔥 CORS compatible con Wix
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://nkmsistemas.wixsite.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Preflight ok
  }
  next();
});

app.use(express.json());
app.post('/guardar-redondo', guardarRedondo);

app.listen(PORT, () => {
  console.log(`✅ API de reservaciones redondo activa en el puerto ${PORT}`);
});