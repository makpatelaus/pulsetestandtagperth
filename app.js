const form = document.getElementById('quoteForm');
const totalEl = document.getElementById('total');
const listEl = document.getElementById('estimateList');
const statusEl = document.getElementById('status');
const responseEl = document.getElementById('autoResponse');
const nextEl = document.getElementById('nextUrl');
const summaryEl = document.getElementById('quoteSummary');
const totalHidden = document.getElementById('quoteTotal');
const gstHidden = document.getElementById('quoteGst');
const totalIncHidden = document.getElementById('quoteTotalInc');

document.getElementById('year').textContent = new Date().getFullYear();

const labels = {
  singlePhase: 'Single Phase Test & Tag',
  threePhase: '3 Phase Test & Tag',
  microwave: 'Microwave Radiation Test',
  fire: 'Fire Extinguisher Test'
};

const money = n => Number(n || 0).toLocaleString('en-AU', {
  style: 'currency', currency: 'AUD'
});

function getQuote() {
  const d = new FormData(form);
  const q = {
    singlePhase: Math.max(0, parseInt(d.get('singlePhase') || 0, 10)),
    threePhase: Math.max(0, parseInt(d.get('threePhase') || 0, 10)),
    microwave: Math.max(0, parseInt(d.get('microwave') || 0, 10)),
    fire: Math.max(0, parseInt(d.get('fire') || 0, 10))
  };
  const amounts = {
    singlePhase: q.singlePhase ? (100 + Math.max(0, q.singlePhase - 10) * 4.95) : 0,
    threePhase: q.threePhase * 15.95,
    microwave: q.microwave * 18.95,
    fire: q.fire * 18.95
  };
  const total = Object.values(amounts).reduce((a, b) => a + b, 0);
  return { q, amounts, total };
}

function buildSummary(q, amounts, total) {
  const lines = Object.keys(q)
    .filter(k => q[k] > 0)
    .map(k => `${labels[k]} x ${q[k]} = ${money(amounts[k])}`);
  const gst = total * 0.10;
  const inc = total + gst;
  return {
    text: lines.length ? lines.join(' | ') : 'No services selected',
    gst,
    inc
  };
}

function calc() {
  const { q, amounts, total } = getQuote();
  totalEl.textContent = money(total);

  const rows = Object.keys(q)
    .filter(k => q[k] > 0)
    .map(k => `<div class="estimate-row"><span>${labels[k]} × ${q[k]}</span><strong>${money(amounts[k])}</strong></div>`)
    .join('');

  listEl.innerHTML = rows || '<div class="empty-state"><span class="check-circle">✓</span><p>Select quantities to see your estimate.</p></div>';

  const summary = buildSummary(q, amounts, total);
  summaryEl.value = summary.text;
  totalHidden.value = money(total);
  gstHidden.value = money(summary.gst);
  totalIncHidden.value = money(summary.inc);
  responseEl.value = `Thank you for requesting a quote from Pulse Test and Tag Perth.\n\nYour estimated quote (excl. GST): ${money(total)}\nGST: ${money(summary.gst)}\nEstimated total incl. GST: ${money(summary.inc)}\n\nServices: ${summary.text}\n\nMak will contact you shortly to confirm the appointment and final price.`;

  // Works for both username.github.io and username.github.io/repository-name.
  nextEl.value = `${window.location.origin}${window.location.pathname.replace(/index\.html?$/, '')}thanks.html`;
  return { q, total };
}

form.addEventListener('input', calc);
form.addEventListener('submit', e => {
  const { total } = calc();
  if (total <= 0) {
    e.preventDefault();
    showStatus('Please enter at least one service quantity.', true);
    return;
  }

  showStatus('Sending your quote…');
  // Normal POST is intentional: FormSubmit autoresponses do not work with AJAX submissions.
});

function showStatus(msg, error = false) {
  statusEl.textContent = msg;
  statusEl.className = `status show ${error ? 'error' : ''}`;
}

calc();
