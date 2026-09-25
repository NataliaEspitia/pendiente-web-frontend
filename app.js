const app = document.querySelector('#app');
const toast = document.querySelector('#toast');

const state = {
  editor: {
    purpose: 'Remedios de mamá',
    time: '06:30',
    days: new Set(['M1', 'J']),
    verification: 'scan'
  },
  dropped: [],
};

const nav = (route) => {
  location.hash = route;
};

const notify = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
};

const W1_DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const W1_HOURS = ['05:00', '06:00', '07:00', '08:00', '...', '18:00', '19:00'];
const W1_ROW = 88;
const W1_COL = 148;

function planner() {
  // Event blocks per day: row = hour row, frac = offset inside the row (0.5 = half hour).
  const events = {
    0: [{row: 1, frac: 0, title: 'Levantarme'}],
    1: [{row: 1, frac: 0, title: 'Levantarme'}, {row: 1, frac: 0.5, title: 'Remedios', photo: true}],
    2: [{row: 1, frac: 0, title: 'Levantarme'}],
    3: [{row: 1, frac: 0, title: 'Levantarme'}, {row: 1, frac: 0.5, title: 'Remedios', photo: true}],
    4: [{row: 1, frac: 0, title: 'Levantarme'}, {row: 5, frac: 0.5, title: 'Sacar la ropa', photo: true}],
    5: [], 6: []
  };
  const block = (e) => {
    const top = e.top ?? W1_ROW * (e.row + e.frac) + 4;
    return `<div class="w1-event${e.photo ? ' w1-event--photo' : ''}${e.dropped ? ' w1-event--dropped' : ''}" style="top:${top}px"><strong>${e.title}</strong>${e.photo ? '<small>FOTO</small>' : ''}</div>`;
  };
  for (const d of state.dropped) events[d.day].push({top: d.top, title: d.title, dropped: true});
  const cards = [
    ['Gimnasio', '06:00', false],
    ['Remedios de mamá', '06:30', true],
    ['Sacar la ropa', '18:30', true]
  ];
  return `
    <main class="brand-page w1-page">
      ${brandTopbar('planner')}
      <span class="w1-kpi">Cumplimiento 68%</span>
      <h2 class="w1-title">Mis alarmas</h2>
      ${cards.map(([name, time, photo], i) => `
        <div class="alarm-card w1-card" style="top:${117.25 + i * 80}px" draggable="true" data-alarm="${name}" role="button" tabindex="0">
          <strong>${name}</strong><small>${time}</small>
          ${photo ? '<span class="fototag w1-card-tag">FOTO</span>' : ''}
        </div>`).join('')}
      <button class="w1-new" data-nav="editor">+ Nueva alarma</button>
      <p class="w1-helper">Arrastra una alarma a la grilla</p>
      ${W1_DAYS.map((d, i) => `<span class="w1-day${i === 1 ? ' is-today' : ''}" style="left:${300 + i * W1_COL}px">${d}</span>`).join('')}
      <div class="w1-grid">
        ${W1_HOURS.map((h, j) => `<span class="w1-hline" style="top:${j * W1_ROW}px"></span><span class="w1-hour" style="top:${j * W1_ROW}px">${h}</span>`).join('')}
        ${W1_DAYS.map((_, i) => `
          <div class="day-column w1-col" data-day="${i}" style="left:${i * W1_COL}px">
            ${events[i].map(block).join('')}
          </div>`).join('')}
      </div>
    </main>`;
}

function editor() {
  const days = [['L','L'],['M1','M'],['M2','M'],['J','J'],['V','V'],['S','S'],['D','D']];
  const options = [['none','Ninguna'],['motion','Movimiento'],['scan','Escanear objeto'],['math','Operación matemática']];
  return `
    <main class="brand-page w2-page">
      <header class="w2-bar">
        <button class="w2-back" data-nav="planner">← Volver</button>
        <h1 class="w2-heading">Editar alarma</h1>
        <button class="w2-save" id="saveAlarm">Guardar</button>
      </header>
      <label class="w2-label" for="purpose" style="top:calc(120px - 0.8633em)">¿Para qué es?</label>
      <input id="purpose" class="w2-input w2-input--purpose" type="text" value="${state.editor.purpose}" />
      <label class="w2-label" for="time" style="top:calc(226px - 0.8633em)">Hora (formato 24 h)</label>
      <input id="time" class="w2-input w2-input--time" type="text" inputmode="numeric" maxlength="5"
        pattern="([01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM" aria-describedby="timeHelp" value="${state.editor.time}" />
      <span id="timeHelp" hidden>Formato de 24 horas, por ejemplo 06:30</span>
      <span class="w2-label" style="top:calc(336px - 0.8633em)">Repetir</span>
      <div class="w2-chips" role="group" aria-label="Repetir">
        ${days.map(([key, label], i) => `<button class="w2-chip${state.editor.days.has(key) ? ' is-on' : ''}" style="left:${i * 52}px" data-day-chip="${key}" aria-pressed="${state.editor.days.has(key)}">${label}</button>`).join('')}
      </div>
      <span class="w2-label" style="top:calc(446px - 0.8633em)">Sonido</span>
      <button type="button" class="w2-sound" data-nav="sound">
        <span>${window.getSelectedSound?.() || 'Radar'}</span><span aria-hidden="true">›</span>
      </button>
      <span class="w2-divider"></span>
      <span class="w2-label w2-right" style="top:calc(120px - 0.8633em)">Foto de propósito</span>
      <div class="w2-photo" role="img" aria-label="Foto de propósito: el pastillero de los remedios">
        <span class="w2-photo-caption">los remedios</span>
        <div class="w2-pillbox">
          ${['M','J','S','D'].map(d => `<span class="w2-pill"><b>${d}</b><i></i></span>`).join('')}
        </div>
      </div>
      <button class="w2-link w2-link--change" id="changePhoto">Cambiar</button>
      <button class="w2-link w2-link--remove" id="removePhoto">Quitar</button>
      <span class="w2-label w2-right" style="top:calc(344px - 0.8633em)">Verificación</span>
      <div class="w2-radios" role="radiogroup" aria-label="Verificación">
        ${options.map(([value, label], i) => `<label class="w2-radio" style="top:${i * 40}px"><input type="radio" name="verification" value="${value}" ${state.editor.verification === value ? 'checked' : ''}/><span>${label}</span></label>`).join('')}
      </div>
      <p class="w2-privacy">La imagen se procesa en tu equipo; no se guarda ni se envía.</p>
      <button class="w2-delete" id="deleteAlarm">Eliminar alarma</button>
    </main>`;
}

function render() {
  const route = (location.hash || '#planner').slice(1);

  app.innerHTML =
    route === 'editor'
      ? editor()

      : route === 'sound'
        ? soundScreen()

      : route === 'progress'
        ? progress()

      : route === 'profile'
        ? profile()

      : route === 'verification'
        ? verification()

      : planner();

  bind();
}

function bind() {
  document.querySelectorAll('[data-nav]').forEach(el => el.addEventListener('click', () => nav(el.dataset.nav)));
  document.querySelectorAll('.alarm-card').forEach(el => {
    el.addEventListener('click', () => nav('editor'));
    el.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', el.dataset.alarm));
  });
  document.querySelectorAll('.day-column').forEach(col => {
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', e => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const title = e.dataTransfer.getData('text/plain');
      if (!title) return;
      const bounds = col.getBoundingClientRect();
      const top = Math.max(4, Math.min(W1_ROW * W1_HOURS.length - 38, e.clientY - bounds.top - 17));
      state.dropped.push({day: Number(col.dataset.day), top, title});
      notify(`${title} añadida a la grilla`);
      render();
    });
  });
  document.querySelectorAll('[data-day-chip]').forEach(btn => btn.addEventListener('click', () => {
    const key = btn.dataset.dayChip;
    state.editor.days.has(key) ? state.editor.days.delete(key) : state.editor.days.add(key);
    render();
  }));
  document.querySelectorAll('input[name="verification"]').forEach(r => r.addEventListener('change', () => { state.editor.verification = r.value; render(); }));
  document.querySelector('#purpose')?.addEventListener('input', e => state.editor.purpose = e.target.value);
  document.querySelector('#time')?.addEventListener('input', e => state.editor.time = e.target.value);
  document.querySelector('#saveAlarm')?.addEventListener('click', () => { notify('Cambios guardados en el prototipo'); setTimeout(() => nav('planner'), 250); });
  document.querySelector('#deleteAlarm')?.addEventListener('click', () => { notify('Alarma eliminada (demo)'); setTimeout(() => nav('planner'), 250); });
  document.querySelector('#changePhoto')?.addEventListener('click', () => notify('Selector de foto simulado'));
  document.querySelector('#removePhoto')?.addEventListener('click', () => notify('Foto quitada en el prototipo'));
}

window.addEventListener('hashchange', render);
render();
