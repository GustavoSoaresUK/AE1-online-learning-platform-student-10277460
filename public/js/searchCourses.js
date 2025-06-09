document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const courseList = document.getElementById('course-list');

  async function fetchCourses(query = '') {
    const res = await fetch(`/search-courses?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    courseList.innerHTML = '';
    if (data.length === 0) {
      courseList.innerHTML = '<p>No courses found.</p>';
      return;
    }

    data.forEach(course => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
        <h3>${course.name}</h3>
        <p><strong>Instructor:</strong> ${course.instructor}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
      `;
      courseList.appendChild(div);
    });
  }

  searchInput.addEventListener('input', () => fetchCourses(searchInput.value));
  fetchCourses(); // load all initially
});
