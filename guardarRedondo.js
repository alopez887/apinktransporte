import pool from './conexion.js';

export default async function guardarRedondo(req, res) {
  const datos = req.body;

  if (!datos || !datos.nombre_cliente || !datos.telefono_cliente || !datos.precio_total) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // 1. Obtener el último folio tipo TR-xxxxx
    const result = await pool.query(
      "SELECT folio FROM reservaciones WHERE folio LIKE 'TR-%' ORDER BY id DESC LIMIT 1"
    );
    const ultimoFolio = result.rows[0]?.folio || 'TR-000000';
    const numero = parseInt(ultimoFolio.replace('TR-', '')) + 1;
    const nuevoFolio = `TR-${numero.toString().padStart(6, '0')}`;

    // 2. Preparar inserción
    const query = `
      INSERT INTO reservaciones (
        folio, codigo, total_pago, nombre_cliente, correo_cliente, telefono_cliente, nota,
        tipo_servicio, tipo_transporte, estatus, capacidad, cantidad_pasajeros,
        hotel_llegada, hotel_salida, fecha_llegada, hora_llegada, aerolinea_llegada, vuelo_llegada,
        fecha_salida, hora_salida, aerolinea_salida, vuelo_salida,
        codigo_descuento, porcentaje_descuento,
        precio_servicio, precio_total, zona, tipo_viaje
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18,
        $19, $20, $21, $22,
        $23, $24,
        $25, $26, $27, $28
      )
    `;

    const valores = [
      nuevoFolio,
      datos.codigo || null,
      datos.precio_total,
      datos.nombre_cliente,
      datos.correo_cliente,
      datos.telefono_cliente,
      datos.nota || '',
      'Transportacion', // tipo_servicio
      datos.tipo_transporte || null,
      1, // estatus
      datos.capacidad || null,
      datos.cantidad_pasajeros || null,
      datos.hotel_llegada || null,
      datos.hotel_salida || null,
      datos.fecha_llegada || null,
      datos.hora_llegada || null,
      datos.aerolinea_llegada || null,
      datos.vuelo_llegada || null,
      datos.fecha_salida || null,
      datos.hora_salida || null,
      datos.aerolinea_salida || null,
      datos.vuelo_salida || null,
      datos.codigo_descuento || null,
      datos.porcentaje_descuento || null,
      datos.precio_servicio || null,
      datos.precio_total,
      datos.zona || null,
      'Redondo' // tipo_viaje
    ];

    await pool.query(query, valores);

    return res.status(200).json({
      mensaje: '🟢 Reservación redondo guardada correctamente',
      folio: nuevoFolio
    });

  } catch (error) {
    console.error('❌ Error al guardar reservación redondo:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}