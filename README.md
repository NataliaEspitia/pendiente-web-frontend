# Pendiente — frontend web

Prototipo navegable del frontend web de **Pendiente**, construido en HTML, CSS y JavaScript puros para que pueda clonarse y abrirse sin instalar dependencias.

## Pantallas incluidas

- **W1 — Planificador semanal**: alarmas, cumplimiento, grilla semanal y drag & drop demostrativo.
- **W2 — Editor de alarma**: propósito, hora, días repetidos, foto, radios de verificación, guardar/eliminar.
- **W3 — Mi progreso**: 68% de cumplimiento, barras de 4 semanas, sugerencia aceptable/descartable y ranking de posposiciones.
- **W4 — Perfil**: datos de Camila Rojas y opciones de cuenta, notificaciones, privacidad y cierre de sesión.

## Interacciones demostrativas

- Navegación entre Planificador, Mi progreso y Perfil.
- Apertura del editor desde las alarmas o desde `+ Nueva alarma`.
- Chips de días y radios de verificación seleccionables.
- Drag & drop de alarmas hacia la grilla semanal.
- Aceptar/descartar sugerencia.
- Opciones de perfil expandibles.

No hay backend ni persistencia real; las interacciones son deliberadamente de prototipo.

## Ejecutar

Abrí `index.html` directamente en el navegador, o serví la carpeta con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8080
```

Luego visitá `http://localhost:8080`.

## Referencia de diseño

Figma (web):
https://www.figma.com/proto/iYEIPtxf5rfIvabAcStQ4B/Pendiente-%E2%80%94-Wireframes-y-prototipo?node-id=3-2&starting-point-node-id=3%3A2&scaling=scale-down-width&t=CCl7qrvKNNk46Yls-1

## Distribución del trabajo

- **Natalia:** W1 Planificador semanal y W2 Editor de alarma.
- **Santiago:** W3 Mi progreso y W4 Perfil.

La descripción detallada de los issues está en [`ISSUES.md`](ISSUES.md).
