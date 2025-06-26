import express from 'express';
import pool from './conexion.js'; // Importa la configuración de la base de datos

const app = express();
const PORT = 3000;

app.use(express.json()); // Para manejar solicitudes JSON

// Ruta para obtener hoteles
app.get('/api/hoteles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hoteles_zona'); // Suponiendo que tienes una tabla llamada "hoteles"
    res.json(result.rows); // Devuelve los datos de los hoteles en formato JSON
  } catch (error) {
    console.error('Error al obtener los hoteles:', error);
    res.status(500).send('Error al obtener los hoteles');
  }
});

// Ruta para obtener aerolíneas
app.get('/api/aerolineas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM aerolineas'); // Suponiendo que tienes una tabla llamada "aerolineas"
    res.json(result.rows); // Devuelve las aerolíneas en formato JSON
  } catch (error) {
    console.error('Error al obtener las aerolíneas:', error);
    res.status(500).send('Error al obtener las aerolíneas');
  }
});

// Ruta para manejar el envío del formulario
app.post('/api/reservar', async (req, res) => {
  try {
    const { nombre_cliente, correo_cliente, telefono_cliente, numero_pasajeros, tipo_viaje, fecha_llegada, hora_llegada } = req.body;

    // Realizar una inserción en la base de datos (suponiendo que tienes una tabla llamada "reservas")
    const result = await pool.query(
      'INSERT INTO reservas (nombre_cliente, correo_cliente, telefono_cliente, numero_pasajeros, tipo_viaje, fecha_llegada, hora_llegada) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre_cliente, correo_cliente, telefono_cliente, numero_pasajeros, tipo_viaje, fecha_llegada, hora_llegada]
    );

    res.status(200).json({ message: 'Reservación realizada correctamente', reserva: result.rows[0] });
  } catch (error) {
    console.error('Error al procesar la reservación:', error);
    res.status(500).send('Error al procesar la reservación');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});