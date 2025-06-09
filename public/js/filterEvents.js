document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  const type = document.getElementById('type');
  const results = document.getElementById('event-results');

  async function fetchEvents() {
    const query = new URLSearchParams();
    if (year.value) query.append('year', year.value);
    if (type.value) query.append('type', type.value);

    const res = await fetch(`/api/events?${query}`);
    const data = await res.json();

    results.innerHTML = '';
    if (!data.length) {
      results.innerHTML = '<p>No events found.</p>';
      return;
    }

    data.forEach(event => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3><a href="/event/${event.id}">${event.title}</a></h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Type:</strong> ${event.type}</p>
        <p><strong>Instructor:</strong> ${event.instructor}</p>
        <p>${event.description}</p>
      `;
      results.appendChild(card);
    });
  }

  year.addEventListener('change', fetchEvents);
  type.addEventListener('change', fetchEvents);
  fetchEvents(); // load all events at start
});
