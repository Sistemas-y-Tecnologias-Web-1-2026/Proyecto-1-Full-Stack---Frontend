# Series Tracker — Frontend 🎬

Cliente web en HTML, CSS y JavaScript vanilla (sin frameworks). Consume la API REST con fetch.

## Screenshot

### Pantalla principal
Agrega aquí una captura de la app funcionando.

## Links
- Aplicación en producción: (agregar enlace Vercel)
- Repositorio backend: https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Proyecto-1-Full-Stack---Backend

## Cómo correr el proyecto localmente

### Requisitos
- Backend corriendo en: `https://proyecto-1-full-stack-backend.onrender.com`
- Un servidor estático local

### Instalación
```bash
git clone https://github.com/Sistemas-y-Tecnologias-Web-1-2026/Proyecto-1-Full-Stack---Frontend.git
cd Proyecto-1-Full-Stack---Frontend
python3 -m http.server 5500
```

Abrir:
- `http://localhost:5500/index.html`
- `http://localhost:5500/create.html`

## Estructura del proyecto

```
.
├── index.html      # Lista de series (búsqueda/sort/paginación)
├── create.html     # Crear y editar series
├── list.js         # Lógica de listado, rating, delete
├── create.js       # Lógica de create/edit + upload imagen
├── styles.css      # Estilos globales
└── README.md
```

## Páginas

| Página | Ruta | Descripción |
|--------|------|-------------|
| Lista | `index.html` | Tabla de series con búsqueda, orden y paginación |
| Crear/Editar | `create.html` | Formulario para crear y editar series |

## Funcionalidades

- Listar series
- Crear, editar y eliminar
- Sistema de rating visible
- Subida de imagen (max 1MB)
- Búsqueda por nombre (`q`)
- Ordenamiento (`sort`, `order`)
- Paginación (`page`, `limit`)

## CORS

El frontend corre en un origen distinto al backend. Por eso el backend habilita CORS para permitir las peticiones fetch entre dominios.

## Challenges implementados

- CRUD completo vía API REST
- Sistema de rating
- Subida de imagen (1MB)
- OpenAPI/Swagger en backend
- Códigos HTTP correctos
- Validación server-side con errores JSON
- Búsqueda, ordenamiento y paginación

## Reflection

Vanilla JS fue suficiente para este proyecto y ayudó a entender mejor la separación entre cliente y servidor. La API permitió mantener la lógica en backend y dejar la UI enfocada solo en presentación e interacción.
