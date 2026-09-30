# E-commerce Backend - Entrega Final

Proyecto backend desarrollado con Node.js, Express y MongoDB, implementando patrones de diseño (Repository, DAO, DTO), manejo de roles y autorización, y lógica de negocio de un e-commerce.

## Tecnologías
- Node.js + Express
- MongoDB + Mongoose
- Passport (estrategia JWT vía cookie)
- Bcrypt
- Nodemailer (Ethereal para pruebas)

## Instalación

```bash
npm install
```

Crear un archivo `.env` en la raíz (ver `.env` incluido en el repo) con las variables:

PORT=8080
MONGO_URL=
JWT_SECRET=
BASE_URL=
MAIL_USER=
MAIL_PASS=
MAIL_HOST=
MAIL_PORT=


## Correr el proyecto

```bash
npm run dev
```

## Arquitectura

- `models/` → Esquemas de Mongoose
- `dao/` → Acceso directo a la base de datos
- `repositories/` → Capa intermedia entre DAO y lógica de negocio (patrón Repository)
- `dto/` → Objetos de transferencia de datos (sin información sensible)
- `services/` → Lógica de negocio (compra, mailing)
- `controllers/` → Manejo de requests/responses
- `routes/` → Definición de endpoints
- `middlewares/` → Autorización por rol
- `config/` → Variables de entorno, Passport, Nodemailer

## Endpoints principales

### Sesiones (`/api/sessions`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| POST | /register | Registro de usuario | Público |
| POST | /login | Login | Público |
| POST | /logout | Logout | Público |
| GET | /current | Usuario autenticado (DTO) | Autenticado |
| POST | /forgot-password | Solicitar recuperación | Público |
| POST | /reset-password | Restablecer contraseña | Público (con token) |

### Productos (`/api/products`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | / | Listar productos | Público |
| GET | /:pid | Ver producto | Público |
| POST | / | Crear producto | Admin |
| PUT | /:pid | Actualizar producto | Admin |
| DELETE | /:pid | Eliminar producto | Admin |

### Carrito (`/api/carts`)
| Método | Ruta | Descripción | Acceso |
|---|---|---|---|
| GET | / | Ver mi carrito | User |
| POST | /products/:pid | Agregar producto | User |
| POST | /purchase | Finalizar compra (genera Ticket) | User |

## Roles y autorización

- **admin**: gestiona productos (crear, actualizar, eliminar).
- **user**: gestiona su propio carrito y realiza compras.

La autorización se implementa mediante un middleware (`authorize`) que trabaja junto a la estrategia Passport `current`, validando el rol del usuario autenticado antes de permitir el acceso al endpoint.

## Lógica de compra

Al finalizar la compra, se verifica el stock de cada producto del carrito:
- Los productos con stock suficiente se descuentan y se agregan a un Ticket con código único, monto total y datos del comprador.
- Los productos sin stock suficiente permanecen en el carrito para una futura compra.