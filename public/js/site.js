(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };

  // ---- hero: ஒவ்வொரு நேர்காணலுக்கும் தனி hero அட்டை ----
  var HR = $('.hero'), sj = $('#slides');
  if (HR && sj) {
    var D = JSON.parse(sj.textContent), cur = 0, tm;
    var E = [$('#hl'), $('#pt'), $('#bks'), $('#dsc')];
    var fill = function (i) {
      var s = D[i];
      $('#nm1').innerHTML = ''; var sp = document.createElement('span'); sp.textContent = s.name; $('#nm1').appendChild(sp);
      $('#rl').textContent = s.role ? s.role + ' · ' + s.date : s.date;
      $('#qt').textContent = s.quote ? '“ ' + s.quote + ' ”' : '';
      $('#ds').textContent = s.desc;
      $('#bt').href = '/interview/' + s.slug;
      $('#pti').src = s.img; $('#pti').alt = s.name; $('#phi').src = s.img; $('#phi').alt = s.name;
      HR.classList.toggle('photo', !s.cut);
      var b = $('#bks'); b.innerHTML = '';
      s.spines.forEach(function (t) { var e = document.createElement('b'); e.textContent = t; b.appendChild(e); });
      $('#cn').textContent = String(i + 1).padStart(2, '0');
    };
    var go = function (i) {
      cur = (i + D.length) % D.length;
      HR.dataset.s = D[cur].theme;
      E.forEach(function (e) { e && e.classList.add('sw'); });
      setTimeout(function () { fill(cur); E.forEach(function (e) { e && e.classList.remove('sw'); }); }, 380);
    };
    var rs = function () { clearInterval(tm); if (D.length > 1) tm = setInterval(function () { go(cur + 1); }, 8000); };
    if (D.length > 1) {
      $('#nx').onclick = function () { go(cur + 1); rs(); };
      $('#pv').onclick = function () { go(cur - 1); rs(); };
      HR.onmouseenter = function () { clearInterval(tm); };
      HR.onmouseleave = rs;
      rs();
    }
  }

  // ---- மேற்கோள் அட்டைகள் 3D சாய்வு ----
  document.addEventListener('mousemove', function (e) {
    var c = e.target.closest && e.target.closest('.qc'); if (!c) return;
    var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.setProperty('--ry', ((x - .5) * 12) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 10) + 'deg');
    c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
  });

  // ---- சந்தா படிவம் -> /api/form ----
  var f = $('#nf');
  if (f) f.onsubmit = function (e) {
    e.preventDefault();
    var msg = $('#nm'); msg.textContent = 'அனுப்பப்படுகிறது…';
    var d = { type: 'newsletter' }; new FormData(f).forEach(function (v, k) { d[k] = v; });
    fetch('/api/form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.ok) { msg.textContent = f.dataset.ok; f.reset(); } else msg.textContent = j.error || 'அனுப்ப இயலவில்லை. பின்னர் முயலுங்கள்.';
      }); })
      .catch(function () { msg.textContent = 'அனுப்ப இயலவில்லை. இணைய இணைப்பைச் சரிபார்க்கவும்.'; });
  };
})();



