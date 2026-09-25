# Pendiente: frontend web

Prototipo navegable del frontend web de **Pendiente**, la alarma que verifica que despertaste. Está construido para abrirse directamente en el navegador: no necesita instalación, compilación ni servidor.

## Stack

- HTML5, CSS3 y JavaScript vanilla (ES2020).
- Sin framework, sin dependencias y sin paso de compilación.
- Los scripts se cargan como `<script src>` clásicos (no módulos ES), por eso el prototipo funciona también abierto como archivo local (`file://`).
- Tipografía Inter cargada desde Google Fonts. Sin conexión, el navegador usa una fuente sans serif del sistema y el prototipo sigue funcionando.
- Navegación con un router por hash (`#planner`, `#progress`, etc.) definido en `app.js`.

## Navegador requerido

Google Chrome o Chromium 105 o superior (también sirve Microsoft Edge 105+). Se usa el selector CSS `:has()`, disponible en esas versiones. Firefox 121+ y Safari 15.4+ también lo soportan, pero la verificación pixel perfect se hizo en Chrome.

## Cómo ejecutarlo

1. Clona el repositorio:

   ```bash
   git clone https://github.com/NataliaEspitia/pendiente-web-frontend.git
   ```

2. Entra a la carpeta del proyecto:

   ```bash
   cd pendiente-web-frontend
   ```

3. Elige una de estas dos opciones:
   - **Sin servidor:** abre `index.html` con doble clic o arrástralo a una ventana de Chrome.
   - **Con servidor estático:** ejecuta

     ```bash
     python3 -m http.server 8080
     ```

     y visita `http://localhost:8080`.

## Pantallas

| ID | Pantalla | Ruta | Responsable |
| --- | --- | --- | --- |
| W1 | Planificador semanal | `#planner` | Natalia |
| W2 | Editor de alarma | `#editor` | Natalia |
| W3 | Mi progreso | `#progress` | Santiago |
| W4 | Perfil | `#profile` | Santiago |
| W5 | Verificación (desde Perfil > Privacidad y datos de la cámara) | `#verification` | Santiago |
| W6 | Pendiente de definir | | Natalia (pendiente) |

W5 es la versión web del selector de verificación del mockup mobile M5: opciones Ninguna, Movimiento, Escanear objeto y Operación matemática, más la nota de privacidad.

## Viewport de referencia

Los mockups web miden **1360 x 780 px** (el marco de cada pantalla en `gen_mockups.py` y en Figma). Las pantallas W3, W4 y W5 se verificaron en Chrome con un viewport de exactamente **1360 x 780** y factor de escala 1, comparando capturas contra los mockups. Para revisarlas igual, usa las herramientas de desarrollo de Chrome (modo dispositivo, dimensiones 1360 x 780).

## Interacciones

Solo la navegación está programada. El resto de controles responde visualmente, sin lógica real:

- Navegación entre Planificador, Mi progreso, Perfil y Verificación.
- Apertura del editor desde las alarmas o desde `+ Nueva alarma`.
- Chips de días y radios de verificación seleccionables.
- Drag and drop de alarmas hacia la grilla semanal.
- Aceptar o descartar la sugerencia de Mi progreso.
- Opciones de Perfil con mensaje de confirmación.

No hay backend ni persistencia: al recargar, el prototipo vuelve a su estado inicial.

## Estructura

```
index.html           punto de entrada
app.js               router, estado y pantallas W1 y W2
styles.css           estilos de W1 y W2
screens/             W3 (progress.js), W4 (profile.js), W5 (verification.js)
styles/              tokens y barra superior (brand.css) y estilos de W3, W4 y W5
```

## Distribución del trabajo

- **Natalia:** W1 Planificador semanal, W2 Editor de alarma y W6 (pendiente).
- **Santiago:** W3 Mi progreso, W4 Perfil y W5 Verificación.

El detalle de cada issue está en [`ISSUES.md`](ISSUES.md).

## Referencia de diseño

Figma (web):
https://www.figma.com/proto/iYEIPtxf5rfIvabAcStQ4B/Pendiente-%E2%80%94-Wireframes-y-prototipo?node-id=3-2&starting-point-node-id=3%3A2&scaling=scale-down-width&t=CCl7qrvKNNk46Yls-1
