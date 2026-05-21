# Contexto del Proyecto: Script Trainer App

Aplicación en React (Vite) para que actores practiquen sus líneas de guion de forma interactiva con una IA que lee el resto de los personajes.

## Arquitectura de Datos

- Las escenas se guardan en `src/data/scenes/` como archivos JSON.
- Estructura de cada JSON:

```json
{
  "id": "string",
  "titulo": "string",
  "dialogos": [
    {
      "personaje": "string",
      "texto": "string"
    }
  ]
}
```

## Flujo de la Aplicación (Estados)

La aplicación debe gestionarse mediante un estado central de **fase** en `App.jsx`.

### `fase: 'seleccion'`

El usuario:

1. Elige una escena de la carpeta de datos.
2. Selecciona qué personaje quiere interpretar.

### `fase: 'jugando'`

Se recorre el array de diálogos.

#### Si el diálogo pertenece a otro personaje

- Se muestra el texto en pantalla.
- Un botón permite avanzar al siguiente diálogo.

#### Si el diálogo pertenece al personaje del usuario

- Se detiene el avance.
- Se muestra un campo de texto para que el usuario escriba su línea.
- Al enviar la respuesta se cambia a la fase `verificando`.

### `fase: 'verificando'`

Tras enviar la línea:

- Se muestra una comparativa lado a lado:
  - **Texto Real**
  - **Texto del Usuario**
- Se ofrecen dos opciones:
  - **Bueno**
  - **Malo**
- Al pulsar cualquiera de ellas:
  - Se registra el resultado.
  - Se avanza al siguiente diálogo.
  - Se vuelve a la fase `jugando`.

## Reglas de Desarrollo para Claude

- Mantén el estado lo más simple posible en `App.jsx` o mediante un contexto si es necesario.
- Usa estilos limpios y legibles:
  - Enfoque minimalista.
  - Estética de guion cinematográfico.
  - Textos centrados.
  - Nombres de personajes en mayúsculas.
- No borres los archivos JSON de prueba durante refactorizaciones.
- Controla correctamente el final de la escena:
  - Cuando el índice llegue al último diálogo, mostrar un resumen final.
  - El resumen debe incluir el número de:
    - Aciertos.
    - Errores.