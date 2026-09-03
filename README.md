# APIs, Fetch y Axios — Ejercicio Sprint 3

Ejercicio práctico de la especialización frontend para comparar dos formas de consumir una API REST desde JavaScript vanilla: `fetch` nativo y la librería `axios`. La aplicación permite buscar, paginar y visualizar posts obtenidos de una API pública, alternando entre ambos métodos desde la misma interfaz.

## Funcionalidades

- Selector para elegir el método de petición: `fetch` o `axios`.
- Buscador de texto que filtra los resultados por el parámetro `q`.
- Paginación (10 resultados por página), calculada a partir de la cabecera `X-Total-Count` que devuelve la API.
- Estados de carga y error visibles en la interfaz mientras se resuelve la petición.
- Resultados mostrados en tarjetas dentro de una cuadrícula responsive.

## Tecnologías

- HTML, CSS y JavaScript vanilla (sin frameworks ni bundler).
- [Axios](https://axios-http.com/) (vía CDN en `index.html`).
- API pública de pruebas: [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts).

## Estructura del proyecto

├── index.html # Estructura de la interfaz (selector, buscador, resultados, paginación)
├── main.js # Lógica: peticiones con fetch y axios, paginación, render de resultados
├── styles.css # Estilos de la interfaz
└── package.json # Declara axios como dependencia (uso opcional, ya se carga por CDN)


## Cómo ejecutarlo

No requiere instalación ni build. Basta con abrir `index.html` directamente en el navegador, o servirlo con una extensión tipo *Live Server* para evitar restricciones de CORS al abrir el archivo con `file://`.

Si prefieres tener axios también como dependencia local:

```bash
npm install
```

(no es necesario para que la app funcione, ya que `index.html` carga axios desde CDN).

## Uso

1. Elige el método de consulta en el desplegable (`Fetch` o `Axios`).
2. Escribe un término de búsqueda si quieres filtrar los resultados (opcional).
3. Pulsa **Obtener Datos**.
4. Navega entre páginas con los botones de paginación inferiores.

## Qué practica este ejercicio

- Peticiones HTTP asíncronas con `async/await`.
- Diferencias prácticas entre `fetch` y `axios`: manejo de errores (`response.ok` frente a las excepciones automáticas de axios), lectura de cabeceras de respuesta y construcción de parámetros de consulta.
- Manipulación del DOM para reflejar estados de carga, error y resultados.
- Implementación de paginación basada en metadatos de la API.