# Series Tracker — Frontend 🎬

Cliente web en HTML, CSS y JavaScript vanilla (sin frameworks). Consume la API REST con fetch.

## Screenshot

### Pantalla principal
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/32d455f9-f7cd-4312-bec1-9293542a5660" />


## Links
- Aplicación en producción: https://proyecto-1-full-stack-frontend.vercel.app/
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

### API y Backend
| Challenge | Puntos |
|-----------|--------|
| Spec de OpenAPI/Swagger escrita y precisa (contrato de API en YAML/JSON) | 20 |
| Swagger UI corriendo y servido desde el backend | 20 |
| Códigos HTTP correctos (201, 204, 404, 400, etc.) | 20 |
| Validación server-side con respuestas de error en JSON descriptivas | 20 |
| Paginación en `GET /series` con `?page=` y `?limit=` | 30 |
| Búsqueda por nombre con `?q=` | 15 |
| Ordenamiento con `?sort=` y `?order=asc|desc` | 15 |

### Challenges adicionales
| Challenge | Puntos |
|-----------|--------|
| Sistema de rating con tabla propia en DB, endpoints REST propios y visible en cliente | 30 |
| Subida de imágenes (máximo 1MB) | 30 |

Total implementado: 200 puntos

## Reflexion

Vanilla JS fue suficiente para este proyecto y ayudó a entender mejor la separación entre cliente y servidor. La API permitió mantener la lógica en backend y dejar la UI enfocada solo en presentación e interacción.
