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

function topbar(active) {
  return `
    <header class="topbar">
      <div class="brand">Pendiente</div>
      <nav class="tabs" aria-label="Navegación principal">
        <button class="tab ${active === 'planner' ? 'active' : ''}" data-nav="planner">Planificador</button>
        <button class="tab ${active === 'progress' ? 'active' : ''}" data-nav="progress">Mi progreso</button>
      </nav>
      <div class="top-actions">
        ${active === 'planner' ? '<span>Cumplimiento 68%</span>' : ''}
        <button class="avatar" aria-label="Perfil" data-nav="profile">CR</button>
      </div>
    </header>`;
}

function planner() {
  const events = {
    0: [{top: 70, title: 'Levantarme'}],
    1: [{top: 70, title: 'Levantarme'}, {top: 124, title: 'Remedios', photo: true}],
    2: [{top: 70, title: 'Levantarme'}],
    3: [{top: 70, title: 'Levantarme'}, {top: 124, title: 'Remedios', photo: true}],
    4: [{top: 70, title: 'Levantarme'}, {top: 458, title: 'Sacar la ropa', photo: true}],
    5: [], 6: []
  };
  for (const d of state.dropped) events[d.day].push({top: d.top, title: d.title, dropped: true});
  const dayCols = ['L','M','M','J','V','S','D'].map((day, i) => `
    <div class="day-column" data-day="${i}">
      ${(events[i] || []).map(e => `<div class="event ${e.dropped ? 'drop-event' : ''}" style="top:${e.top}px"><strong>${e.title}</strong>${e.photo ? '<small>FOTO</small>' : ''}</div>`).join('')}
    </div>`).join('');
  return `
    <main class="shell">
      ${topbar('planner')}
      <section class="content planner-layout">
        <aside>
          <h2 class="sidebar-title">Mis alarmas</h2>
          <div class="alarm-card" draggable="true" data-alarm="Gimnasio"><strong>Gimnasio</strong><small>06:00</small></div>
          <div class="alarm-card" draggable="true" data-alarm="Remedios de mamá"><span class="photo-badge">FOTO</span><strong>Remedios de mamá</strong><small>06:30</small></div>
          <div class="alarm-card" draggable="true" data-alarm="Sacar la ropa"><span class="photo-badge">FOTO</span><strong>Sacar la ropa</strong><small>18:30</small></div>
          <button class="secondary full" data-nav="editor">+ Nueva alarma</button>
          <p class="helper">Arrastrá una alarma a la grilla</p>
        </aside>
        <div class="week">
          <div class="week-header">${['L','M','M','J','V','S','D'].map(d => `<div class="day-head">${d}</div>`).join('')}</div>
          <div class="week-grid">${dayCols}</div>
        </div>
      </section>
    </main>`;
}

function editor() {
  const days = [['L','L'],['M1','M'],['M2','M'],['J','J'],['V','V'],['S','S'],['D','D']];
  return `
    <main class="shell">
      <header class="editor-header">
        <button class="text-button" data-nav="planner">← Volver</button>
        <h1>Editar alarma</h1>
        <button class="primary" id="saveAlarm">Guardar</button>
      </header>
      <section class="editor-grid">
        <div class="editor-pane">
          <div class="field"><label for="purpose">¿Para qué es?</label><input id="purpose" type="text" value="${state.editor.purpose}" /></div>
          <div class="field"><label for="time">Hora (formato 24 h)</label><input id="time" class="time-input" type="time" value="${state.editor.time}" /></div>
          <div class="field"><span class="section-label">Repetir</span><div class="day-chips">${days.map(([key,label]) => `<button class="day-chip ${state.editor.days.has(key) ? 'selected' : ''}" data-day-chip="${key}">${label}</button>`).join('')}</div></div>
        </div>
        <div class="editor-pane">
          <div class="field"><span class="section-label">Foto de propósito</span>
            <div class="photo-row"><div class="photo-placeholder">los remedios</div><div class="photo-actions"><button class="text-button" id="changePhoto">Cambiar</button><button class="text-button" id="removePhoto">Quitar</button></div></div>
          </div>
          <div class="field"><span class="section-label">Verificación</span>
            <div class="radio-list">
              ${[['none','Ninguna'],['motion','Movimiento'],['scan','Escanear objeto'],['math','Operación matemática']].map(([value,label]) => `<label class="radio-row"><input type="radio" name="verification" value="${value}" ${state.editor.verification === value ? 'checked' : ''}/> ${label}</label>`).join('')}
            </div>
            <p class="privacy">La imagen se procesa en tu equipo; no se guarda ni se envía.</p>
          </div>
          <button class="secondary danger" id="deleteAlarm">Eliminar alarma</button>
        </div>
      </section>
    </main>`;
}

function render() {
  const route = (location.hash || '#planner').slice(1);
  app.innerHTML = route === 'editor' ? editor() : route === 'progress' ? progress() : route === 'profile' ? profile() : route === 'verification' ? verification() : planner();
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
      const top = Math.max(10, Math.min(540, e.clientY - bounds.top - 20));
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
  document.querySelectorAll('input[name="verification"]').forEach(r => r.addEventListener('change', () => state.editor.verification = r.value));
  document.querySelector('#purpose')?.addEventListener('input', e => state.editor.purpose = e.target.value);
  document.querySelector('#time')?.addEventListener('input', e => state.editor.time = e.target.value);
  document.querySelector('#saveAlarm')?.addEventListener('click', () => { notify('Cambios guardados en el prototipo'); setTimeout(() => nav('planner'), 250); });
  document.querySelector('#deleteAlarm')?.addEventListener('click', () => { notify('Alarma eliminada (demo)'); setTimeout(() => nav('planner'), 250); });
  document.querySelector('#changePhoto')?.addEventListener('click', () => notify('Selector de foto simulado'));
  document.querySelector('#removePhoto')?.addEventListener('click', () => notify('Foto quitada en el prototipo'));
}

window.addEventListener('hashchange', render);
render();
