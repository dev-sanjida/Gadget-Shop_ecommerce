// Image fallback: if a photo file is missing, show a neutral grey block with its filename
document.querySelectorAll('.imgbox img').forEach(function (img) {
  function fail() {
    var name = (img.getAttribute('src') || '').split('/').pop();
    img.replaceWith(document.createTextNode('Add photo: ' + name));
  }
  img.addEventListener('error', fail);
  if (img.complete && img.naturalWidth === 0) fail();
});

// Mobile menu
var tg = document.querySelector('.menu-toggle');
if (tg) tg.addEventListener('click', function () {
  document.querySelector('.mainnav').classList.toggle('open');
});

// Cart total
var total = 1785.00;
var cartEl = document.getElementById('cartTotal');
document.querySelectorAll('.add').forEach(function (b) {
  b.addEventListener('click', function () {
    total += parseFloat(b.dataset.price || 0);
    if (cartEl) cartEl.textContent = '$' + total.toFixed(2);
    b.textContent = '✓';
    setTimeout(function () { b.textContent = '+'; }, 900);
  });
});

// Home tabs
document.querySelectorAll('.tabs button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tabs button').forEach(function (x) { x.classList.remove('on'); });
    btn.classList.add('on');
    var k = btn.dataset.tab;
    document.querySelectorAll('#tabGrid .card').forEach(function (c) {
      c.classList.toggle('hidden', c.dataset.tab.split(' ').indexOf(k) === -1);
    });
  });
});

// Product filters
document.querySelectorAll('.filters button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filters button').forEach(function (x) { x.classList.remove('on'); });
    btn.classList.add('on');
    var k = btn.dataset.f;
    document.querySelectorAll('#pgrid .card').forEach(function (c) {
      c.classList.toggle('hidden', k !== 'all' && c.dataset.cat !== k);
    });
  });
});

// Search (filters on products page, otherwise goes to products page)
var sf = document.getElementById('searchForm');
if (sf) sf.addEventListener('submit', function (e) {
  e.preventDefault();
  var q = document.getElementById('q').value.trim().toLowerCase();
  var grid = document.getElementById('pgrid');
  if (grid) {
    grid.querySelectorAll('.card').forEach(function (c) {
      c.classList.toggle('hidden', q && c.textContent.toLowerCase().indexOf(q) === -1);
    });
  } else {
    location.href = 'products.html?q=' + encodeURIComponent(q);
  }
});
var qp = new URLSearchParams(location.search).get('q');
if (qp && document.getElementById('pgrid')) {
  document.getElementById('q').value = qp;
  document.getElementById('searchForm').dispatchEvent(new Event('submit'));
}

// Offer countdown (resets each load to 12h)
var t = document.getElementById('timer');
if (t) {
  var left = 12 * 3600 - 1;
  setInterval(function () {
    if (left < 0) return;
    var h = Math.floor(left / 3600), m = Math.floor(left % 3600 / 60), s = left % 60;
    var p = function (n) { return String(n).padStart(2, '0'); };
    t.innerHTML = '<span>' + p(h) + '</span>:<span>' + p(m) + '</span>:<span>' + p(s) + '</span>';
    left--;
  }, 1000);
}

// Contact form
var cf = document.getElementById('contactForm');
if (cf) cf.addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('ok').style.display = 'block';
  cf.reset();
});
