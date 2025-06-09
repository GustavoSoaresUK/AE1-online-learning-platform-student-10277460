document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailField = document.querySelector('#email');
  const nameField = document.querySelector('#name');
  const messageField = document.querySelector('#message');

  form.addEventListener('submit', (e) => {
    let errors = [];

    if (!nameField.value.trim()) {
      errors.push("Name is required.");
    }

    if (!emailField.value.includes('@') || !emailField.value.includes('.')) {
      errors.push("Please enter a valid email address.");
    }

    if (!messageField.value.trim()) {
      errors.push("Message cannot be empty.");
    }

    if (errors.length > 0) {
      e.preventDefault();
      alert(errors.join('\n'));
    }
  });
});
