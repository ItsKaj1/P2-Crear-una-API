# P2 · API REST de productos

API REST construida con **Node.js** y **Express** para administrar un catálogo de productos. Ofrece las cuatro operaciones CRUD (crear, leer, actualizar y eliminar), responde en formato **JSON** y usa los **códigos de estado HTTP** correspondientes a cada caso.

Práctica 2 de Programación Web · Unidad 5 *Cómputo en la nube y servicios* (subtemas 5.3 Patrones de diseño y 5.4 Estándares en servicios).

**Autores:** _(nombres del equipo)_

## Tecnologías

- Node.js 18 o superior
- Express
- cors

## Instalación

```bash
git clone <URL-del-repositorio>
cd p2-api-productos
npm install
```

## Ejecución

```bash
npm start        # inicia el servidor
npm run dev      # inicia el servidor y lo reinicia al guardar cambios
```

El servidor queda disponible en `http://localhost:3000`. Si la variable de entorno `PORT` está definida (por ejemplo, en una plataforma en la nube), se usa ese puerto en lugar del 3000.

Para comprobar que funciona, abre `http://localhost:3000` en el navegador; debe responder:

```json
{ "mensaje": "API de productos funcionando" }
```

## Recurso: producto

| Campo    | Tipo    | Reglas                          |
|----------|---------|---------------------------------|
| `id`     | número  | Lo asigna el servidor           |
| `nombre` | texto   | Obligatorio                     |
| `precio` | número  | Obligatorio, mayor o igual a 0  |
| `stock`  | entero  | Obligatorio, mayor o igual a 0  |

Los datos se guardan **en memoria**: al reiniciar el servidor vuelven a los dos productos iniciales (Teclado y Mouse).

## Rutas

| Método | Ruta                   | Acción        | Respuesta correcta      | Posibles errores |
|--------|------------------------|---------------|-------------------------|------------------|
| GET    | `/api/productos`       | Listar todos  | 200 + arreglo           | —                |
| GET    | `/api/productos/:id`   | Ver uno       | 200 + objeto            | 404              |
| POST   | `/api/productos`       | Crear         | 201 + objeto creado     | 400              |
| PUT    | `/api/productos/:id`   | Actualizar    | 200 + objeto actualizado| 400, 404         |
| DELETE | `/api/productos/:id`   | Eliminar      | 204 sin contenido       | 404              |

Cualquier otra ruta responde `404` con `{ "error": "Ruta no encontrada" }`.

## Ejemplos

### Listar productos

```http
GET /api/productos
```

Respuesta `200 OK`:

```json
[
  { "id": 1, "nombre": "Teclado", "precio": 350, "stock": 10 },
  { "id": 2, "nombre": "Mouse", "precio": 180, "stock": 25 }
]
```

### Crear un producto

```http
POST /api/productos
Content-Type: application/json

{ "nombre": "Monitor", "precio": 2500, "stock": 5 }
```

Respuesta `201 Created`:

```json
{ "id": 3, "nombre": "Monitor", "precio": 2500, "stock": 5 }
```

### Datos inválidos

```http
POST /api/productos
Content-Type: application/json

{ "nombre": "", "precio": -1 }
```

Respuesta `400 Bad Request`:

```json
{
  "errores": [
    "nombre es obligatorio",
    "precio debe ser un número positivo",
    "stock debe ser un entero positivo"
  ]
}
```

### Producto inexistente

```http
GET /api/productos/99
```

Respuesta `404 Not Found`:

```json
{ "error": "No existe el producto 99" }
```

### Actualizar un producto

```http
PUT /api/productos/1
Content-Type: application/json

{ "nombre": "Teclado RGB", "precio": 420, "stock": 8 }
```

Respuesta `200 OK`:

```json
{ "id": 1, "nombre": "Teclado RGB", "precio": 420, "stock": 8 }
```

### Eliminar un producto

```http
DELETE /api/productos/2
```

Respuesta `204 No Content` (sin cuerpo). Si se repite la petición, responde `404`.

## Pruebas

En el repositorio se incluye la colección de Postman exportada (archivo `.json`) con las 8 peticiones de prueba y los códigos esperados: 200, 200, 404, 201, 400, 200, 204 y 404.

## Estructura del proyecto

```
p2-api-productos/
├── server.js
├── package.json
├── README.md
└── .gitignore
```
