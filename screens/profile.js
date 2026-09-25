/*
 * W4 - Perfil (Santiago).
 * Loaded before app.js; the router in app.js calls window.profile().
 * Uses brandTopbar() from screens/progress.js.
 */
(function () {
  const options = [
    { key: 'account', label: 'Cuenta', message: 'Datos de la cuenta (fuera del alcance del prototipo)' },
    { key: 'notifications', label: 'Notificaciones', message: 'Preferencias de notificaciones (fuera del alcance del prototipo)' },
    { key: 'privacy', label: 'Privacidad y datos de la cámara', route: 'verification' },
    { key: 'logout', label: 'Cerrar sesión', message: 'Cerrar sesión (fuera del alcance del prototipo)' }
  ];

  window.profile = function profile() {
    return `
      <main class="brand-page pf-page">
        ${brandTopbar('')}
        <div class="pf-avatar" aria-hidden="true">CR</div>
        <h1 class="pf-name">Camila Rojas</h1>
        <p class="pf-email">camila.rojas@correo.com</p>
        <ul class="pf-options">
          ${options.map((option, i) => `
            <li>
              <button class="pf-option" style="top:${i * 68}px" data-pf-option="${option.key}"${option.route ? ` data-nav="${option.route}"` : ''}>
                <span class="pf-option-label">${option.label}</span>
                <span class="pf-option-chevron" aria-hidden="true">&gt;</span>
              </button>
            </li>`).join('')}
        </ul>
      </main>`;
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-pf-option]');
    if (!button || button.dataset.nav) return;
    const option = options.find(item => item.key === button.dataset.pfOption);
    if (option) notify(option.message);
  });
})();
