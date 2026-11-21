const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let productos = [
  { id: 1, nombre: 'Teclado', precio: 350.00, stock: 10 },
  { id: 2, nombre: 'Mouse', precio: 180.00, stock: 25 }
];

let siguienteId = 3;

// Obtener todos los productos
app.get("/", (req, res) => {
  res.json({mensaje : "API de productos funcinona correctamente"});
});

app.get("/api/productos", (req, res) => {
  res.status(200).json(productos);
});

// Obtener un producto por ID
app.get("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.status(200).json(producto);
});

function validar(Datos) {
  const errores = [];
  if (!Datos.nombre || typeof Datos.nombre !== 'string') {
    errores.push("El nombre es obligatorio y debe ser una cadena de texto.");
  }
  if (typeof Datos.precio !== 'number' || Datos.precio <= 0) {
    errores.push("El precio debe ser un número mayor a 0.");
  }
  if (!Number.isInteger(Datos.stock) || Datos.stock < 0) {
    errores.push("El stock debe ser un número entero mayor o igual a 0.");
  }
  return errores;
}

app.post("/api/productos", (req, res) => {
  const errores = validar(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }
  const nuevoProducto = {
    id: siguienteId++,
    ...req.body
  };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

app.put("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const productoIndex = productos.findIndex(p => p.id === id);
  if (productoIndex === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  const errores = validar(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }
  productos[productoIndex] = { ...productos[productoIndex], ...req.body };
  res.status(200).json(productos[productoIndex]);
});

app.delete("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = productos.some(p => p.id === id);
  if (!existe) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  productos = productos.filter(p => p.id !== id);
  res.status(204).send();
});

//Ruta no encontrada
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, () => console.log(`Servidor escuchando en https://localhost:${PORT}`));
