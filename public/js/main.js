function toggleNav() {
  var links = document.querySelector('.nav-links');
  var btn = document.getElementById('nav-toggle');
  var isOpen = links.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

document.getElementById('nav-toggle').addEventListener('click', toggleNav);
