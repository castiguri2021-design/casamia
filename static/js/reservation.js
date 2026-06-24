
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('reservationModal');
  const btn = document.getElementById('openReservationBtn');
  const closeBtn = document.getElementById('closeReservationModal');
  const form = document.getElementById('reservationForm');

  btn?.addEventListener('click', () => modal.style.display = 'flex');
  closeBtn?.addEventListener('click', () => modal.style.display = 'none');
  window?.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true; submitBtn.innerText = 'Se procesează...';

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        alert('✅ Mulțumim! Rezervarea a fost înregistrată. Te vom contacta pentru confirmare.');
        modal.style.display = 'none'; form.reset();
      } else { alert('Eroare: ' + (result.message || 'Încearcă din nou.')); }
    } catch (err) { alert('A apărut o problemă la conectare.'); } 
    finally { submitBtn.disabled = false; submitBtn.innerText = 'Trimite Rezervarea'; }
  });
});
