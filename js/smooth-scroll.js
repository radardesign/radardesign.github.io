(function() {
  // Определение операционной системы
  const isMacOS = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  // Если операционная система - macOS, не запускать скрипт
  if (isMacOS) {
    return;
  }

  let isScriptEnabled = true;

  // Функция для проверки ширины окна и включения/отключения скрипта
  function checkWindowSize() {
    if (window.innerWidth < 1024) {
      isScriptEnabled = false;
    } else {
      isScriptEnabled = true;
    }
  }

  // Проверяем ширину окна при загрузке страницы
  checkWindowSize();

  // Проверяем ширину окна при изменении размера
  window.addEventListener('resize', checkWindowSize);

  const SCROLL_TIME = 1000;
  const SCROLL_EASING = "easeOutQuart";
  const DELAY_TIME = 50;

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
    if (isScriptEnabled) {
      e.preventDefault();
      const direction = e.deltaY < 0 ? -1 : 1;
      const target = window.pageYOffset + (window.innerHeight * direction * 0.5);

      setTimeout(() => {
        smoothScroll(target, SCROLL_TIME, SCROLL_EASING);
      }, DELAY_TIME);
    }
  }, { passive: false });
})();