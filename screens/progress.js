/*
 * W3 - Mi progreso (Santiago).
 * Also defines brandTopbar(), the mockup top bar shared by W3, W4 and W5.
 * Loaded before app.js; the router in app.js calls window.progress().
 */
(function () {
  window.brandTopbar = function brandTopbar(active) {
    const tab = (route, label) =>
      `<button class="bt-tab bt-tab--${route}${active === route ? ' is-active' : ''}" data-nav="${route === 'progress' ? 'progress' : 'planner'}"${active === route ? ' aria-current="page"' : ''}>${label}</button>`;
    return `
      <header class="bt">
        <button class="bt-brand" data-nav="planner">Pendiente</button>
        <nav aria-label="Navegación principal">
          ${tab('planner', 'Planificador')}
          ${tab('progress', 'Mi progreso')}
        </nav>
        <button class="bt-avatar" data-nav="profile" aria-label="Perfil de Camila Rojas">CR</button>
      </header>`;
  };

  const weeks = [
    [30, 42, 55, 38],
    [44, 58, 66, 52],
    [58, 66, 74, 62],
    [66, 74, 78, 70]
  ];

  const ranking = [
    { time: '06:30', label: 'Levantarme', count: '12 posposiciones', photo: false },
    { time: '06:00', label: 'Gimnasio', count: '7 posposiciones', photo: false },
    { time: '06:30', label: 'Remedios de mamá', count: '1 posposición', photo: true }
  ];

  let suggestionVisible = true;

  const chart = () => weeks.map((values, week) => `
    ${values.map((value, i) => `<span class="pg-bar${i % 2 ? ' pg-bar--strong' : ''}" style="left:${week * 120 + i * 22}px;height:${(value * 1.1).toFixed(1)}px"></span>`).join('')}
    <span class="pg-week" style="left:${week * 120 + 20}px">S${week + 1}</span>`).join('');

  const suggestion = () => suggestionVisible ? `
    <section class="pg-suggestion" aria-label="Sugerencia">
      <p class="pg-eyebrow">SUGERENCIA</p>
      <p class="pg-suggestion-text">Los martes pospones 3 veces la alarma de las 06:30. ¿La movemos a las 07:00?</p>
      <button class="pg-accept" data-pg-action="accept">Aceptar</button>
      <button class="pg-discard" data-pg-action="discard">Descartar</button>
    </section>` : '';

  window.progress = function progress() {
    return `
      <main class="brand-page pg-page">
        ${brandTopbar('progress')}
        <h2 class="pg-heading pg-heading--rate">Cumplimiento</h2>
        <p class="pg-rate">68%</p>
        <div class="pg-track" role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100" aria-label="Cumplimiento"><div class="pg-fill"></div></div>
        <h2 class="pg-heading pg-heading--weeks">Últimas 4 semanas</h2>
        <div class="pg-chart" role="img" aria-label="Cumplimiento semanal de las últimas 4 semanas, en aumento">${chart()}</div>
        ${suggestion()}
        <h2 class="pg-heading pg-heading--ranking">Alarmas que más pospones</h2>
        <table class="pg-table">
          <colgroup><col style="width:110px" /><col style="width:450px" /><col style="width:240px" /><col /></colgroup>
          <tbody>
            ${ranking.map(row => `
              <tr tabindex="0">
                <td class="pg-time">${row.time}</td>
                <td>${row.label}</td>
                <td class="pg-count">${row.count}</td>
                <td class="pg-tagcell">${row.photo ? '<span class="fototag">FOTO</span>' : ''}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </main>`;
  };

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-pg-action]');
    if (!button) return;
    suggestionVisible = false;
    if (button.dataset.pgAction === 'accept') {
      notify('Alarma movida a las 07:00');
      setTimeout(() => nav('planner'), 250);
    } else {
      notify('Sugerencia descartada');
      render();
    }
  });
})();
