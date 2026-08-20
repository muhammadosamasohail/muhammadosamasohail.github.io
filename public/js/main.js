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
// Respect an explicit data-saver preference and genuinely slow connections.
// Scrolling the whole grid would otherwise pull several megabytes of video.
var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var saveData = !!(conn && (conn.saveData || /^(slow-2g|2g)$/.test(conn.effectiveType || '')));

if ('IntersectionObserver' in window && !prefersReducedMotion && !saveData) {
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
        video.muted = true;
        clip.classList.remove('is-playing');
        resetSoundButton(clip);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.clip').forEach(function (clip) {
    clipObserver.observe(clip);
  });
}


function resetSoundButton(clip) {
  var btn = clip.querySelector('.clip-sound');
  if (!btn) return;
  btn.setAttribute('aria-pressed', 'false');
  btn.setAttribute('aria-label', btn.getAttribute('data-off'));
}

// Sound is opt in, one clip at a time. Autoplay is only permitted while muted,
// so unmuting has to hang off a real click.
document.querySelectorAll('.clip-sound').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var clip = btn.closest('.clip');
    var video = clip.querySelector('.clip-video');
    if (!video) return;

    var turningOn = btn.getAttribute('aria-pressed') !== 'true';

    if (turningOn) {
      document.querySelectorAll('.clip').forEach(function (other) {
        if (other === clip) return;
        var v = other.querySelector('.clip-video');
        if (v) v.muted = true;
        resetSoundButton(other);
      });

      if (!video.getAttribute('src')) {
        video.setAttribute('src', video.getAttribute('data-src'));
      }
      video.muted = false;
      var p = video.play();
      if (p && p.catch) { p.catch(function () {}); }
      clip.classList.add('is-playing');
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', btn.getAttribute('data-on'));
    } else {
      video.muted = true;
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', btn.getAttribute('data-off'));
    }
  });
});
