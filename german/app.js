(() => {
  // ---------- data ----------
  const EX = {};
  for (const raw of (window.EXAMPLES_RAW || '').split('\n')) {
    const p = raw.split('|').map(s => s.trim());
    if (p.length === 4) EX[p[0]] = { de: p[1], en: p[2], he: p[3] };
  }
  // A1 lives in words.js; A2/B1 come from LEVEL_RAW (word | en | he | example de | en | he)
  for (const w of WORDS) w.level = 'A1';
  for (const c of CATEGORIES) c.level = 'A1';
  const LEVELS = ['A1'];
  for (const [lvl, raw] of Object.entries(window.LEVEL_RAW || {})) {
    LEVELS.push(lvl);
    let cat = null;
    for (const line of raw.split('\n')) {
      const tx = line.trim(); if (!tx) continue;
      if (tx.startsWith('#')) { const [key, en, he] = tx.slice(1).split('|').map(x => x.trim()); cat = { key, en, he, level: lvl }; CATEGORIES.push(cat); continue; }
      const p = tx.split('|').map(x => x.trim()); if (p.length !== 6) continue;
      const m = p[0].match(/^(der|die|das) /);
      WORDS.push({ id: lvl + ':' + cat.key + ':' + p[0], de: p[0], en: p[1], he: p[2], cat: cat.key, level: lvl,
        article: m ? m[1] : null, ex: { de: p[3], en: p[4], he: p[5] } });
    }
  }
  const CAT = Object.fromEntries(CATEGORIES.map(c => [c.key, c]));

  // ---------- UI strings ----------
  const T = {
    en: {
      title: 'German flashcards', dirDe: 'DE → EN', dirTr: 'EN → DE', cards: 'Cards', quiz: 'Quiz',
      topics: 'Topics', all: 'Select all', none: 'Clear', reset: 'Reset progress',
      resetQ: 'Reset progress for this level?', again: 'Again', got: 'Got it', tap: 'Tap to flip',
      mastered: (a, b) => `${a} / ${b} mastered`, ofTopics: (a, b) => `${a} of ${b}`,
      doneT: 'All done here! 🎉', doneS: 'Every word in these topics is mastered.',
      review: 'Review them anyway', pick: 'Pick at least one topic.', next: 'Next',
      correct: 'Correct', wrong: 'Wrong', streak: 'Streak',
      keys: 'Space = flip · → = got it · ← = again · S = speak · 1–4 in quiz',
      credit: 'Based on the Goethe-Zertifikat word lists.',
      boxes: ['New', 'Seen once', 'Seen twice', 'Learned'], verb: 'Verb', adj: 'Adjektiv', wort: 'Wort'
    },
    he: {
      title: 'כרטיסיות גרמנית', dirDe: 'מגרמנית', dirTr: 'לגרמנית', cards: 'כרטיסיות', quiz: 'חידון',
      topics: 'נושאים', all: 'בחר הכול', none: 'נקה', reset: 'איפוס התקדמות',
      resetQ: 'לאפס את ההתקדמות ברמה הזאת?', again: 'שוב', got: 'ידעתי', tap: 'הקש כדי להפוך',
      mastered: (a, b) => `${a} / ${b} נלמדו`, ofTopics: (a, b) => `${a} מתוך ${b}`,
      doneT: 'סיימת! 🎉', doneS: 'כל המילים בנושאים האלה נלמדו.',
      review: 'לחזור עליהן בכל זאת', pick: 'בחר לפחות נושא אחד.', next: 'הבא',
      correct: 'נכון', wrong: 'טעות', streak: 'רצף',
      keys: 'רווח = הפוך · חץ ימינה = ידעתי · חץ שמאלה = שוב · S = השמע · 1–4 בחידון',
      credit: 'מבוסס על רשימות המילים של Goethe-Zertifikat.',
      boxes: ['חדש', 'פעם אחת', 'פעמיים', 'נלמד'], verb: 'Verb', adj: 'Adjektiv', wort: 'Wort'
    }
  };

  // ---------- state ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('deA1.' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('deA1.' + k, JSON.stringify(v)); } catch {} }
  };
  const S = {
    lang: store.get('lang', 'en'),
    dir: store.get('dir', 'de'),
    mode: store.get('mode', 'cards'),
    level: store.get('level', 'A1'),
    off: new Set(store.get('off', null) || (() => {               // topics switched off (migrates old 'cats' list)
      const on = store.get('cats', null); return on ? CATEGORIES.filter(c => c.level === 'A1' && !on.includes(c.key)).map(c => c.key) : [];
    })()),
    box: store.get('box', {}),           // word id -> level (0..); >=3 = mastered
    reviewAll: false,
    deck: [], cur: null, flipped: false,
    quiz: { right: 0, wrong: 0, streak: 0, answered: false, options: [] }
  };
  const MASTER = 3;
  const t = k => T[S.lang][k];
  const tr = w => w[S.lang];
  const save = () => { store.set('lang', S.lang); store.set('dir', S.dir); store.set('mode', S.mode); store.set('level', S.level); store.set('off', [...S.off]); store.set('box', S.box); };

  // ---------- speech ----------
  const canSpeak = 'speechSynthesis' in window;
  let deVoice = null;
  const pickVoice = () => {
    const vs = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith('de'));
    deVoice = vs.find(v => /google|premium|enhanced|natural/i.test(v.name)) || vs[0] || null;
  };
  if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text) {
    if (!canSpeak) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/\s*\([^)]*\)/g, '').trim());
    u.lang = 'de-DE'; u.rate = 0.9;
    if (deVoice) u.voice = deVoice;
    speechSynthesis.speak(u);
  }
  const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
  const speakBtn = (text, sm) => canSpeak ? `<button class="speak${sm ? ' sm' : ''}" data-say="${esc(text)}" title="Play" aria-label="Play pronunciation">${ICON}</button>` : '';

  // ---------- helpers ----------
  const $ = id => document.getElementById(id);
  function esc(s) { return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  if (!LEVELS.includes(S.level)) S.level = 'A1';
  const levelCats = () => CATEGORIES.filter(c => c.level === S.level);
  const onCats = () => levelCats().filter(c => !S.off.has(c.key));
  const pool = () => WORDS.filter(w => w.level === S.level && !S.off.has(w.cat));
  const isMastered = w => (S.box[w.id] || 0) >= MASTER;
  const trSpan = text => `<span ${S.lang === 'he' ? 'dir="rtl" lang="he"' : ''}>${esc(text)}</span>`;
  function deHtml(w) {
    if (!w.article) return `<span>${esc(w.de)}</span>`;
    return `<span><span class="a ${w.article}">${w.article}</span> ${esc(w.de.slice(w.article.length + 1))}</span>`;
  }
  // index-card divider tab: gender color for nouns, yellow for everything else
  function tabHtml(w, hide) {
    if (hide) return `<span class="tab blank">?</span>`;
    if (w.article) return `<span class="tab ${w.article}">${w.article}</span>`;
    const lbl = /verbs$/.test(w.cat) ? t('verb') : /adjectives|describe/.test(w.cat) ? t('adj') : t('wort');
    return `<span class="tab misc" lang="de">${lbl}</span>`;
  }
  const ICO_AGAIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>';
  const ICO_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5 9.5 18 20 6.5"/></svg>';
  const catName = k => CAT[k][S.lang];

  function exampleHtml(w) {
    const e = w.ex || EX[w.de];
    if (!e) return '';
    return `<div class="example" dir="ltr"><div class="de" lang="de">${esc(e.de)} ${speakBtn(e.de, true)}</div>
      <div class="tr">${trSpan(e[S.lang])}</div></div>`;
  }

  // ---------- render chrome ----------
  function renderChrome() {
    document.documentElement.lang = S.lang;
    document.documentElement.dir = S.lang === 'he' ? 'rtl' : 'ltr';
    document.title = t('title');
    document.querySelectorAll('[data-i]').forEach(el => { el.textContent = t(el.dataset.i); });
    $('lvl').textContent = S.level;
    for (const [id, val] of [['levelSeg', S.level], ['langSeg', S.lang], ['dirSeg', S.dir], ['modeSeg', S.mode]])
      $(id).querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === val));
    $('chips').innerHTML = levelCats().map(c => {
      const ws = WORDS.filter(w => w.cat === c.key);
      const m = ws.filter(isMastered).length;
      return `<button class="chip ${S.off.has(c.key) ? '' : 'on'}" data-cat="${c.key}">${esc(c[S.lang])}<small>${m}/${ws.length}</small></button>`;
    }).join('');
    $('catSummary').textContent = t('ofTopics')(onCats().length, levelCats().length);
    const p = pool(), counts = [0, 0, 0, 0];
    for (const w of p) counts[Math.min(S.box[w.id] || 0, MASTER)]++;
    const kasten = $('kasten');
    if (!kasten.children.length) kasten.innerHTML = counts.map((_, i) => `<div class="fach${i === 3 ? ' fin' : ''}"><div class="fill"></div><div class="lbl"><span></span><b></b></div></div>`).join('');
    [...kasten.children].forEach((f, i) => {
      f.querySelector('.fill').style.height = p.length ? Math.max(counts[i] ? 6 : 0, 100 * counts[i] / p.length) + '%' : '0';
      f.querySelector('span').textContent = t('boxes')[i];
      f.querySelector('b').textContent = counts[i];
      f.classList.toggle('has', counts[i] > 0);
    });
    kasten.setAttribute('aria-label', t('mastered')(counts[3], p.length));
  }

  // ---------- deck ----------
  function buildDeck() {
    const p = pool();
    let d = S.reviewAll ? p : p.filter(w => !isMastered(w));
    // weakest words first, randomized within the same level
    d = shuffle(d.slice()).sort((a, b) => (S.box[a.id] || 0) - (S.box[b.id] || 0));
    S.deck = d;
  }
  function nextWord() {
    if (!S.deck.length) buildDeck();
    S.cur = S.deck.shift() || null;
    S.flipped = false;
  }

  // ---------- cards ----------
  function renderCards() {
    const st = $('stage');
    if (!onCats().length) { st.innerHTML = `<div class="quiz-q done"><p>${t('pick')}</p></div>`; return; }
    if (!S.cur) {
      st.innerHTML = `<div class="quiz-q done"><h2>${t('doneT')}</h2><p>${t('doneS')}</p><button class="btn primary" id="reviewBtn">${t('review')}</button></div>`;
      $('reviewBtn').onclick = () => { S.reviewAll = true; buildDeck(); nextWord(); render(); };
      return;
    }
    const w = S.cur;
    const deSide = `<div class="word" lang="de" dir="ltr">${deHtml(w)} ${speakBtn(w.de)}</div>`;
    const trSide = `<div class="word small">${trSpan(tr(w))}</div>`;
    const front = S.dir === 'de' ? deSide : trSide;
    const back = (S.dir === 'de' ? trSide + `<div class="sub" dir="ltr" lang="de">${deHtml(w)}</div>` : deSide + `<div class="sub">${trSpan(tr(w))}</div>`) + exampleHtml(w);
    st.innerHTML = `
      <div class="card-area"><div class="card ${S.flipped ? 'flipped' : ''}" id="card">
        <div class="face front">${tabHtml(w, S.dir !== 'de')}<span class="topic">${esc(catName(w.cat))}</span>${front}<span class="hint">${t('tap')}</span></div>
        <div class="face back">${tabHtml(w)}<span class="topic">${esc(catName(w.cat))}</span>${back}</div>
      </div></div>
      <div class="actions" dir="ltr">
        <button class="btn again" id="againBtn">${ICO_AGAIN}${t('again')}</button>
        <button class="btn got" id="gotBtn">${ICO_OK}${t('got')}</button>
      </div>`;
    fitCard();
    $('card').onclick = e => { if (!e.target.closest('.speak')) flip(); };
    $('againBtn').onclick = () => grade(false);
    $('gotBtn').onclick = () => grade(true);
    bindSwipe($('card'));
  }
  function fitCard() {
    const card = $('card'); if (!card) return;
    const h = Math.max(...[...card.querySelectorAll('.face')].map(f => { f.style.position = 'relative'; const v = f.scrollHeight; f.style.position = ''; return v; }));
    card.style.minHeight = '';
    const base = card.getBoundingClientRect().height;
    card.style.minHeight = Math.max(base, h) + 'px';
  }
  function flip() {
    S.flipped = !S.flipped;
    $('card').classList.toggle('flipped', S.flipped);
    if (S.flipped && S.dir === 'tr') speak(S.cur.de);
  }
  let busy = false;
  function grade(ok) {
    const w = S.cur; if (!w || busy) return;
    if (ok) S.box[w.id] = (S.box[w.id] || 0) + 1;
    else { S.box[w.id] = 0; S.deck.splice(Math.min(4, S.deck.length), 0, w); }
    save();
    const card = $('card');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!card || reduce) { nextWord(); renderChrome(); render(); return; }
    busy = true;
    card.classList.add(ok ? 'out-ok' : 'out-no');
    setTimeout(() => { busy = false; nextWord(); renderChrome(); render(); }, 260);
  }
  function bindSwipe(el) {
    let x0 = null;
    el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 70) { e.preventDefault(); grade(dx > 0); }
    });
  }

  // ---------- quiz ----------
  function setupQuestion() {
    const w = S.cur; if (!w) return;
    const same = WORDS.filter(x => x.id !== w.id && x.cat === w.cat && tr(x) !== tr(w) && x.de !== w.de);
    const others = WORDS.filter(x => x.id !== w.id && x.cat !== w.cat && x.level === w.level && tr(x) !== tr(w));
    const picks = shuffle(same.slice()).slice(0, 3);
    while (picks.length < 3) picks.push(others[Math.random() * others.length | 0]);
    S.quiz.options = shuffle([w, ...picks]);
    S.quiz.answered = false;
  }
  function renderQuiz() {
    const st = $('stage');
    if (!onCats().length) { st.innerHTML = `<div class="quiz-q done"><p>${t('pick')}</p></div>`; return; }
    if (!S.cur) { renderCards(); return; }
    if (!S.quiz.options.length) setupQuestion();
    const w = S.cur, q = S.quiz;
    const prompt = S.dir === 'de'
      ? `<div class="word" lang="de" dir="ltr">${deHtml(w)} ${speakBtn(w.de)}</div>`
      : `<div class="word small">${trSpan(tr(w))}</div>`;
    st.innerHTML = `
      <div class="quiz-q">${tabHtml(w, S.dir !== 'de' && !q.answered)}<span class="topic">${esc(catName(w.cat))}</span>${prompt}
        ${q.answered ? exampleHtml(w) : ''}</div>
      <div class="options">${q.options.map((o, i) => {
        const label = S.dir === 'de' ? trSpan(tr(o)) : `<span lang="de" dir="ltr">${deHtml(o)}</span>`;
        let cls = '';
        if (q.answered) { if (o.id === w.id) cls = 'right'; else if (o.id === q.chosen) cls = 'wrong'; }
        return `<button class="opt ${cls}" data-o="${i}" ${q.answered ? 'disabled' : ''}><span class="k">${i + 1}</span>${label}</button>`;
      }).join('')}</div>
      ${q.answered ? `<div class="actions" style="grid-template-columns:1fr"><button class="btn primary" id="nextBtn">${t('next')}</button></div>` : ''}
      <div class="score"><span>${t('correct')} <b>${q.right}</b></span><span>${t('wrong')} <b>${q.wrong}</b></span><span>${t('streak')} <b>${q.streak}</b></span></div>`;
    st.querySelectorAll('.opt').forEach(b => b.onclick = () => answer(+b.dataset.o));
    if (q.answered) $('nextBtn').onclick = nextQuestion;
  }
  function answer(i) {
    const q = S.quiz; if (q.answered) return;
    const o = q.options[i]; if (!o) return;
    const w = S.cur, ok = o.id === w.id;
    q.answered = true; q.chosen = o.id;
    if (ok) { q.right++; q.streak++; S.box[w.id] = (S.box[w.id] || 0) + 1; }
    else { q.wrong++; q.streak = 0; S.box[w.id] = 0; S.deck.splice(Math.min(5, S.deck.length), 0, w); }
    save(); speak(w.de); renderChrome(); render();
  }
  function nextQuestion() { nextWord(); S.quiz.options = []; render(); }

  // ---------- main ----------
  function render() { S.mode === 'quiz' ? renderQuiz() : renderCards(); }
  function restart() { S.reviewAll = false; buildDeck(); nextWord(); S.quiz.options = []; renderChrome(); render(); }

  $('levelSeg').onclick = e => { const v = e.target.dataset.v; if (v && v !== S.level) { S.level = v; save(); restart(); } };
  $('langSeg').onclick = e => { const v = e.target.dataset.v; if (v) { S.lang = v; save(); S.quiz.options = []; renderChrome(); render(); } };
  $('dirSeg').onclick = e => { const v = e.target.dataset.v; if (v) { S.dir = v; save(); S.flipped = false; S.quiz.options = []; renderChrome(); render(); } };
  $('modeSeg').onclick = e => { const v = e.target.dataset.v; if (v) { S.mode = v; save(); S.flipped = false; S.quiz.options = []; renderChrome(); render(); } };
  $('chips').onclick = e => {
    const b = e.target.closest('.chip'); if (!b) return;
    const k = b.dataset.cat; S.off.has(k) ? S.off.delete(k) : S.off.add(k); save(); restart();
  };
  $('allBtn').onclick = () => { levelCats().forEach(c => S.off.delete(c.key)); save(); restart(); };
  $('noneBtn').onclick = () => { levelCats().forEach(c => S.off.add(c.key)); save(); restart(); };
  $('resetBtn').onclick = () => { if (confirm(t('resetQ'))) { WORDS.filter(w => w.level === S.level).forEach(w => delete S.box[w.id]); save(); restart(); } };
  document.addEventListener('click', e => { const b = e.target.closest('.speak'); if (b) { e.stopPropagation(); speak(b.dataset.say); } }, true);
  window.addEventListener('resize', fitCard);

  document.addEventListener('keydown', e => {
    if (e.target.closest('input,textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    if (S.mode === 'cards') {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (S.cur) flip(); }
      else if (e.key === 'ArrowRight') grade(true);
      else if (e.key === 'ArrowLeft') grade(false);
    } else {
      if (/^[1-4]$/.test(e.key)) answer(+e.key - 1);
      else if ((e.key === 'Enter' || e.key === ' ') && S.quiz.answered) { e.preventDefault(); nextQuestion(); }
    }
    if ((e.key === 's' || e.key === 'S') && S.cur) speak(S.cur.de);
  });

  restart();
})();
