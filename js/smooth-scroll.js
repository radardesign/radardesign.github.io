(function() {
  const SCROLL_TIME = 1000; // время анимации скролла в миллисекундах
  const SCROLL_EASING = "easeOutQuart"; // функция сглаживания анимации скролла
  const DELAY_TIME = 50; // задержка перед началом анимации скролла в миллисекундах

  // Определение функции анимации сглаживания
  const easings = {
    easeOutQuart: function(t, b, c, d) {
      t /= d;
      t--;
      return -c * (t * t * t * t - 1) + b;
    }
  };

  // Функция плавного скролла
  function smoothScroll(target, duration, easing) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }

      const timeElapsed = currentTime - startTime;
      const progress = easings[easing](timeElapsed, start, distance, duration);
      window.scrollTo(0, progress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Обработчик события прокрутки колеса мыши
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? -1 : 1;
    const target = window.pageYOffset + (window.innerHeight * direction * 0.5);

    setTimeout(() => {
      smoothScroll(target, SCROLL_TIME, SCROLL_EASING);
    }, DELAY_TIME);
  }, { passive: false });
})();