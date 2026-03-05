# ACT6-C2. Exposición y Consumo de APIs de Terceros

## API VALORANT
Esta es una aplicación web construida con Next.js 16, diseñada bajo los principios de Arquitectura Orientada a Servicios (SOA). La plataforma consume la API oficial de Valorant para ofrecer información en tiempo real sobre agentes, armas (con sus estadísticas y skins) y mapas tácticos.

### Características Principales
- Arquitectura SOA: Separación estricta entre la capa de presentación (UI) y la capa de servicios (API).

- Diseño Inmersivo: Interfaz inspirada en la estética oficial de Riot Games.

- FiltroS: Buscador por nombre y filtrado por categorías (roles de agentes, tipos de armas) que trabajan en conjunto.

- Detalle Profundo:

    - Agentes: Historia, roles y visualización de habilidades con iconos.

    - Armas: Estadísticas de tiro, costos y galería de skins.

    - Mapas: Coordenadas y planos tácticos 

### Stack Tecnológico
- Framework: Next.js 16.1.6 (App Router)
- Estilos: Tailwind CSS v4
- Lenguaje: TypeScript
- Contenedores: Docker & Docker Compose
- Servicio de Datos: Valorant-API

## Estructura del Proyecto
````
src/
├── api/           # Capa de Servicios (Consumo de API REST)
├── app/           # Rutas y Páginas (Next.js App Router)
│   ├── agentes/   # Vista de Agentes y Detalle
│   ├── armas/     # Vista de Armas y Skins
│   └── mapas/     # Vista de Mapas y Planos Tácticos
├── components/    # Componentes Reutilizables
└── globals.css    # Estilos Globales
````

### Ejecución con Docker
Para levantar el proyecto de forma local se siguen estos pasos:

Configura las variables de entorno:
Crea un archivo .env en la raíz:

- La variable se encuentra en el reporte entregado de la actividad

Construye y levanta el contenedor:

````
docker-compose up -d --build
````
Accede a la aplicación:
Abre tu navegador en http://localhost:3000