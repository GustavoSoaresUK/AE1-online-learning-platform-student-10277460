document.addEventListener('DOMContentLoaded', () => {
  const definition = document.getElementById('definition');
  const feedback = document.getElementById('feedback');
  const guessInput = document.getElementById('guess');

  const terms = [
    { term: 'html', definition: 'A markup language used to structure content on the web.' },
    { term: 'css', definition: 'Used to style and layout web pages.' },
    { term: 'javascript', definition: 'Programming language used to add interactivity to web pages.' },
    { term: 'node', definition: 'A JavaScript runtime for building server-side applications.' },
    { term: 'ejs', definition: 'A templating engine for rendering HTML with JavaScript.' }
  ];

  const random = terms[Math.floor(Math.random() * terms.length)];
  definition.textContent = `Definition: ${random.definition}`;

  window.checkAnswer = function () {
    const userAnswer = guessInput.value.toLowerCase().trim();
    if (userAnswer === random.term) {
      feedback.textContent = '✅ Correct!';
      feedback.style.color = 'green';
    } else {
      feedback.textContent = `❌ Wrong! The correct answer was "${random.term.toUpperCase()}".`;
      feedback.style.color = 'red';
    }
  };
});
