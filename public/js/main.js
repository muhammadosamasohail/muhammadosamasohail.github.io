function toggleNav() {
  var links = document.querySelector('.nav-links');
  var btn = document.getElementById('nav-toggle');
  var isOpen = links.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

document.getElementById('nav-toggle').addEventListener('click', toggleNav);

var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('is-visible');
  });
}

// Clip loops. Nothing downloads until a tile is on screen, and each one pauses
// again when it scrolls away so a wall of video does not chew through battery.
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  var clipObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var clip = entry.target;
      var video = clip.querySelector('.clip-video');
      if (!video) return;

      if (entry.isIntersecting) {
        if (!video.getAttribute('src')) {
          video.setAttribute('src', video.getAttribute('data-src'));
        }
        var playing = video.play();
        if (playing && playing.catch) {
          playing.catch(function () { clip.classList.remove('is-playing'); });
        }
        clip.classList.add('is-playing');
      } else {
        video.pause();
        clip.classList.remove('is-playing');
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.clip').forEach(function (clip) {
    clipObserver.observe(clip);
  });
}
