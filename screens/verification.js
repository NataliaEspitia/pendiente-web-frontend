/*
 * W5 - Verificación (Santiago).
 * Web version of the mobile verification selector (mockup M5), reached from
 * W4 Perfil > "Privacidad y datos de la cámara". Radios are visual only.
 * Loaded before app.js; the router in app.js calls window.verification().
 */
(function () {
  const methods = [
    { value: 'none', label: 'Ninguna', description: 'La alarma se descarta con un toque' },
    { value: 'motion', label: 'Movimiento', description: 'Camina unos pasos con el teléfono' },
    { value: 'scan', label: 'Escanear objeto', description: 'Apunta la cámara a tu foto de propósito' },
    { value: 'math', label: 'Operación matemática', description: 'Resuelve una cuenta simple para descartar' }
  ];

  let selected = 'scan';

  window.verification = function verification() {
    return `
      <main class="brand-page vf-page">
        ${brandTopbar('')}
        <button class="vf-back" data-nav="profile">← Volver al perfil</button>
        <h1 class="vf-title">Verificación</h1>
        <p class="vf-intro">Elige cómo confirmas que despertaste en tus alarmas nuevas.</p>
        <fieldset class="vf-options">
          <legend class="vf-legend">Verificación predeterminada</legend>
          ${methods.map((method, i) => `
            <label class="vf-option" style="top:${i * 74}px">
              <input class="vf-radio" type="radio" name="default-verification" value="${method.value}"${method.value === selected ? ' checked' : ''} />
              <span class="vf-label">${method.label}</span>
              <span class="vf-description">${method.description}</span>
            </label>`).join('')}
        </fieldset>
        <aside class="vf-privacy" aria-label="Tu privacidad">
          <p class="vf-privacy-title">Tu privacidad</p>
          <p class="vf-privacy-line vf-privacy-line--1">La imagen se procesa en tu teléfono.</p>
          <p class="vf-privacy-line vf-privacy-line--2">No se guarda ni se envía a ningún servidor.</p>
        </aside>
      </main>`;
  };

  document.addEventListener('change', (event) => {
    if (event.target.name === 'default-verification') selected = event.target.value;
  });
})();
