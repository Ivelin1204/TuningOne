/* TuningOne — main script */

function closeCard(e, btn) {
  e.preventDefault();
  var card = btn.closest('.card');
  var id = card.id.replace('card-', '');
  toggleCard(e, parseInt(id));
}


// Count-up for About section mini-stats
document.addEventListener('DOMContentLoaded', function() {
  var aboutStats = [
    { id: 'about-stat-1', target: 1500, suffix: '+' },
    { id: 'about-stat-2', target: 1000, suffix: '+' },
  ];
  var aboutObserved = false;
  var aboutSection = document.getElementById('about');
  var ioAbout = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !aboutObserved) {
        aboutObserved = true;
        aboutStats.forEach(function(s, i) {
          var el = document.getElementById(s.id);
          if (el) {
            el.textContent = '0' + s.suffix;
            setTimeout(function() { animateCount(el, s.target, s.suffix, 1200); }, i * 200);
          }
        });
        ioAbout.disconnect();
      }
    });
  }, { threshold: 0.3 });
  if (aboutSection) ioAbout.observe(aboutSection);
});

// Count-up animation for stats
function animateCount(el, target, suffix, duration) {
  var start = 0;
  var step = Math.ceil(target / (duration / 16));
  el.classList.add('animated');
  var timer = setInterval(function() {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = start + suffix;
  }, 16);
}

document.addEventListener('DOMContentLoaded', function() {
  var stats = [
    { id: null, selector: '.stats-inner .stat-item:nth-child(1) .stat-val', target: 1500, suffix: '+' },
    { id: null, selector: '.stats-inner .stat-item:nth-child(2) .stat-val', target: 100, suffix: '%' },
    { id: null, selector: '.stats-inner .stat-item:nth-child(3) .stat-val', target: 10,   suffix: '+' },
    { id: null, selector: '.stats-inner .stat-item:nth-child(4) .stat-val', target: 1000, suffix: '+' },
  ];
  var observed = false;
  var statsSection = document.querySelector('.stats');
  var io2 = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !observed) {
        observed = true;
        stats.forEach(function(s, i) {
          var el = document.querySelector(s.selector);
          if (el) {
            el.textContent = '0' + s.suffix;
            setTimeout(function() { animateCount(el, s.target, s.suffix, 1200); }, i * 150);
          }
        });
        io2.disconnect();
      }
    });
  }, { threshold: 0.3 });
  if (statsSection) io2.observe(statsSection);
});


// Back to top button visibility
window.addEventListener('scroll', function() {
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// Header scroll + active nav
window.addEventListener('scroll', function() {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
  var sections = ['hero','about','services','testimonials','contact'];
  var current = 'hero';
  sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 80) current = id;
  });
  document.querySelectorAll('nav a').forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Mobile menu
function toggleMenu() {
  var m = document.getElementById('mobileMenu');
  var btn = document.querySelector('.hamburger');
  btn.textContent = m.classList.toggle('open') ? '✕' : '☰';
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.querySelector('.hamburger').textContent = '☰';
}

// ── Card expand/collapse ──
function toggleCard(e, idx) {
  e.preventDefault();
  var card = document.getElementById('card-' + idx);
  var expand = document.getElementById('expand-' + idx);
  var learnText = card.querySelector('.learn-text');
  var learnArrow = card.querySelector('.learn-arrow');
  var isOpen = expand.classList.contains('open');

  // Close all others first
  document.querySelectorAll('.card-expand.open').forEach(function(el) {
    el.classList.remove('open');
  });
  document.querySelectorAll('.card.expanded').forEach(function(el) {
    el.classList.remove('expanded');
    el.querySelector('.learn-text').textContent = 'Научи повече';
    el.querySelector('.learn-arrow').textContent = '→';
  });

  if (!isOpen) {
    expand.classList.add('open');
    card.classList.add('expanded');
    // card is now open, X shown on image
    setTimeout(function() {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

// Gallery
var galleryImages = ["assets/images/hero/hero-audi-rs5.jpg","assets/images/gallery/gallery-01.jpg","assets/images/services/ppf-protection.jpg","assets/images/services/detail-wrapping.jpg","assets/images/services/headlight-film.jpg"];
var all = [...galleryImages, ...galleryImages, ...galleryImages, ...galleryImages];
var track = document.getElementById('galleryTrack');
all.forEach(function(src) {
  var img = document.createElement('img');
  img.src = src; img.alt = 'TuningOne gallery';
  track.appendChild(img);
});

// Scroll reveal
document.addEventListener('DOMContentLoaded', function() {
  var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  els.forEach(function(el) { io.observe(el); });
});

// Phone (BG mobile: 9 digits, must start with 8, no leading 0)
function handlePhoneInput(input) {
  var digits = input.value.replace(/\D/g, '');
  if (digits.charAt(0) === '0') digits = digits.replace(/^0+/, '');
  digits = digits.slice(0, 9);
  input.value = digits;
  input.setCustomValidity(digits === '' || /^8\d{8}$/.test(digits) ? '' : 'Номерът трябва да е 9 цифри и да започва с 8 (без 0 в началото).');
}

// Contact
function submitForm(e) {
  e.preventDefault();
  document.getElementById('contactForm').classList.add('hide');
  document.getElementById('successBox').classList.add('show');
}
function resetForm() {
  document.getElementById('contactForm').reset();
  document.getElementById('contactForm').classList.remove('hide');
  document.getElementById('successBox').classList.remove('show');
}

// Order modal
var ALL_SERVICES = [
  'Затъмняване на стъкла',
  'Затъмняване на стопове',
  'Брандиране',
  'Облепване с прозрачно защитно фолио',
  'Облепване на детайли',
  'Защитно фолио за фарове'
];
function toggleServiceChip(el) {
  el.classList.toggle('active');
}
function openOrderModal(name) {
  var wrap = document.getElementById('orderServices');
  wrap.innerHTML = '';
  ALL_SERVICES.forEach(function(service) {
    var chip = document.createElement('span');
    chip.className = 'order-service-chip' + (service === name ? ' active' : '');
    chip.textContent = service;
    chip.onclick = function() { toggleServiceChip(chip); };
    wrap.appendChild(chip);
  });
  document.getElementById('orderModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('open');
  document.body.style.overflow = '';
}
function submitOrderForm(e) {
  e.preventDefault();
  var chosen = Array.from(document.querySelectorAll('.order-service-chip.active')).map(function(c) { return c.textContent; });
  if (chosen.length === 0) {
    alert('Моля, изберете поне една услуга.');
    return;
  }
  var list = document.getElementById('orderSuccessServices');
  list.innerHTML = '';
  chosen.forEach(function(service) {
    var tag = document.createElement('span');
    tag.className = 'success-tag';
    tag.textContent = service;
    list.appendChild(tag);
  });
  closeOrderModal();
  setTimeout(function() {
    document.getElementById('orderSuccessModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }, 250);
}
function closeSuccessModal() {
  document.getElementById('orderSuccessModal').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('orderForm').reset();
  document.querySelectorAll('.order-service-chip.active').forEach(function(chip) { chip.classList.remove('active'); });
}
function subscribe(e) {
  e.preventDefault();
  alert('Абонирахте се успешно!');
  e.target.reset();
}

// AI chat
var AI_BACKEND_URL = 'https://tuningone.onrender.com/api/chat';
var aiChatHistory = [];
var aiChatOpen = false;

function toggleAiChat() {
  aiChatOpen = !aiChatOpen;
  document.getElementById('aiChatPanel').classList.toggle('open', aiChatOpen);
  document.getElementById('aiChatToggle').classList.toggle('active', aiChatOpen);
  if (aiChatOpen) document.getElementById('aiChatInput').focus();
}

function appendAiMessage(text, who) {
  var wrap = document.getElementById('aiChatMessages');
  var msg = document.createElement('div');
  msg.className = 'ai-msg ai-msg-' + who;
  msg.textContent = text;
  wrap.appendChild(msg);
  wrap.scrollTop = wrap.scrollHeight;
  return msg;
}

function appendAiTyping() {
  var wrap = document.getElementById('aiChatMessages');
  var msg = document.createElement('div');
  msg.className = 'ai-msg ai-msg-bot ai-msg-typing';
  msg.id = 'aiTypingIndicator';
  msg.innerHTML = '<span></span><span></span><span></span>';
  wrap.appendChild(msg);
  wrap.scrollTop = wrap.scrollHeight;
}

function removeAiTyping() {
  var el = document.getElementById('aiTypingIndicator');
  if (el) el.remove();
}

function sendAiChatMessage(e) {
  e.preventDefault();
  var input = document.getElementById('aiChatInput');
  var text = input.value.trim();
  if (!text) return;
  appendAiMessage(text, 'user');
  var historySoFar = aiChatHistory.slice();
  aiChatHistory.push({ role: 'user', content: text });
  input.value = '';
  appendAiTyping();

  fetch(AI_BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text, history: historySoFar }),
  })
    .then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) throw new Error(data.error || 'Грешка');
        return data;
      });
    })
    .then(function (data) {
      removeAiTyping();
      appendAiMessage(data.reply, 'bot');
      aiChatHistory.push({ role: 'assistant', content: data.reply });
      if (data.suggestedService) {
        var wrap = document.getElementById('aiChatMessages');
        var btn = document.createElement('button');
        btn.className = 'ai-msg-order-btn';
        btn.textContent = 'Поръчай: ' + data.suggestedService + ' →';
        btn.onclick = function () {
          toggleAiChat();
          openOrderModal(data.suggestedService);
        };
        wrap.appendChild(btn);
        wrap.scrollTop = wrap.scrollHeight;
      }
    })
    .catch(function () {
      removeAiTyping();
      appendAiMessage('Възникна проблем при връзката. Опитайте отново.', 'bot');
    });
}

// Footer year
var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
