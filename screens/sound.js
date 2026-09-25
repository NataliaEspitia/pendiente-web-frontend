/*
 * W6 - Sonido de la alarma (Natalia).
 *
 * Pantalla web basada en M10.
 * Permite seleccionar un sonido y ajustar visualmente el volumen.
 */

(function () {
  let selectedSound = 'Radar';
  let volume = 70;

  const sounds = [
    'Radar',
    'Amanecer',
    'Clásico',
    'Suave'
  ];

  window.getSelectedSound = function getSelectedSound() {
    return selectedSound;
  };

  window.soundScreen = function soundScreen() {
    return `
      <main class="shell sound-page">

        <header class="sound-header">
          <button
            class="text-button sound-back"
            data-nav="editor"
            aria-label="Volver al editor de alarma"
          >
            ← Volver
          </button>

          <h1>Sonido de la alarma</h1>

          <div class="sound-header-spacer"></div>
        </header>

        <section class="sound-content">

          <div class="sound-card">

            <div class="sound-section-heading">
              <div>
                <h2>Sonido</h2>
                <p>
                  Elige el sonido que se reproducirá cuando suene la alarma.
                </p>
              </div>
            </div>

            <div
              class="sound-options"
              role="radiogroup"
              aria-label="Sonido de la alarma"
            >
              ${sounds.map((sound) => {
                const selected = selectedSound === sound;

                return `
                  <button
                    type="button"
                    class="sound-option ${selected ? 'selected' : ''}"
                    data-sound-option="${sound}"
                    role="radio"
                    aria-checked="${selected}"
                  >
                    <span class="sound-radio" aria-hidden="true">
                      ${selected ? '<span class="sound-radio-dot"></span>' : ''}
                    </span>

                    <span class="sound-option-label">
                      ${sound}
                    </span>

                    ${
                      selected
                        ? '<span class="sound-selected-label">Seleccionado</span>'
                        : ''
                    }
                  </button>
                `;
              }).join('')}
            </div>

            <div class="sound-volume-section">
              <div class="sound-volume-heading">
                <label for="alarmVolume">
                  Volumen
                </label>

                <span id="volumeValue">
                  ${volume}%
                </span>
              </div>

              <input
                id="alarmVolume"
                class="sound-slider"
                type="range"
                min="0"
                max="100"
                value="${volume}"
                aria-label="Volumen de la alarma"
              />

              <div class="sound-volume-labels">
                <span>Bajo</span>
                <span>Alto</span>
              </div>
            </div>

          </div>

          <aside class="sound-preview">
            <span class="sound-preview-icon">
              ♪
            </span>

            <p class="sound-preview-label">
              Sonido seleccionado
            </p>

            <strong id="soundPreviewName">
              ${selectedSound}
            </strong>

            <p class="sound-preview-help">
              Toca otro sonido para cambiar la selección.
            </p>
          </aside>

        </section>

      </main>
    `;
  };

  document.addEventListener('click', (event) => {
    const option = event.target.closest('[data-sound-option]');

    if (!option) {
      return;
    }

    selectedSound = option.dataset.soundOption;

    notify(`Sonido cambiado a ${selectedSound}`);

    render();
  });

  document.addEventListener('input', (event) => {
    if (event.target.id !== 'alarmVolume') {
      return;
    }

    volume = Number(event.target.value);

    const value = document.querySelector('#volumeValue');

    if (value) {
      value.textContent = `${volume}%`;
    }
  });
})();