document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const response = document.getElementById('form-response');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
      });

      const result = await res.json();
      response.textContent = result.message;
      response.style.display = 'block';
      response.style.color = result.success ? 'limegreen' : 'red';

      if (result.success) form.reset();

    } catch (err) {
      response.textContent = 'An error occurred while sending your message.';
      response.style.display = 'block';
      response.style.color = 'red';
    }
  });
});
