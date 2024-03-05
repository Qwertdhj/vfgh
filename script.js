$('.wrapper').each(function () {
  var $slider = $(this);
  var numberOfSlides = $slider.find('.panel').length;
  var canScroll = true; // Флаг, показывающий, можно ли прокручивать слайдер

  $slider.find('.panel:eq(0)').addClass('_active');
  $slider.find('.nav-dot:eq(0)').addClass('active');

  var $activeSlide = $slider.find('.panel._active');
  var $nextBtn = $slider.find('.next-btn');
  var $prevBtn = $slider.find('.prev-btn');

  $('.nav-dot').on('click', function () {
    var slideToGo = $(this).data('slide');
    goToSlide(slideToGo);
  });

  $slider.on('slide.changed', function () {
    console.log('slide changed !');
    $('.nav-dot').removeClass('active');
    var $activeDot = $('.nav-dot[data-slide="' + $('.panel._active').data('slide') + '"]');
    console.log();
    $activeDot.addClass('active');
  });

  $nextBtn.on('click', function (event) {
    nextSlide();
  });

  $prevBtn.on('click', function (event) {
    prevSlide();
  });

  $slider.on('wheel', function (e) {
    if (!canScroll) {
      return; // Если прокрутка заблокирована, выходим из обработчика
    }
    e.preventDefault(); // Отменяем стандартное поведение прокрутки страницы
    if (e.originalEvent.deltaY < 0) {
      prevSlide(); // Прокрутка вверх
    } else {
      nextSlide(); // Прокрутка вниз
    }
    canScroll = false; // Блокируем возможность прокрутки
    setTimeout(function () {
      canScroll = true; // Через 5 секунд разблокируем прокрутку
    }, 2000);
  });
  $slider.on('touchstart', function (e) {
    e.preventDefault();
    if (!canScroll) {
      return; // Если прокрутка заблокирована, выходим из обработчика
    }
    var touch = e.originalEvent.touches[0];
    var currentY = touch.clientY;
    var deltaY = currentY - startY;

    if (deltaY < 0) {
      prevSlide();
    } else {
      nextSlide();
    }

    canScroll = false; // Блокируем возможность прокрутки
    setTimeout(function () {
      canScroll = true; // Через 5 секунд разблокируем прокрутку
    }, 2000);
  });

  $slider.on('touchmove', function (e) {
    if (!canScroll) {
      return; // Если прокрутка заблокирована, выходим из обработчика
    }
    e.preventDefault();
    var touch = e.originalEvent.touches[0];
    startY = touch.clientY;
  });
  function nextSlide() {
    $activeSlide = $slider.find('.panel._active');
    var $nextSlide = $activeSlide.next('.panel');
    $activeSlide.removeClass('_active');
    $nextSlide.addClass('_active');

    //$activeSlide = $nextSlide;

    var slideIndex = $slider.find('.panel._active').index('.panel');
    console.log(slideIndex);

    if (slideIndex >= numberOfSlides || slideIndex <= -1) {
      firstSlide();
      $slider.trigger('slide.changed');

    } else {
      $slider.trigger('slide.changed');
    }

  }

  function prevSlide() {
    $activeSlide = $slider.find('.panel._active');
    var $prevSlide = $activeSlide.prev('.panel');

    if ($prevSlide.length === 0) { // Проверяем, является ли текущий слайд первым
      return; // Если да, то выходим из функции
    }

    $activeSlide.removeClass('_active');
    $prevSlide.addClass('_active');

    var slideIndex = $slider.find('.panel._active').index('.panel');
    console.log(slideIndex);

    if (slideIndex <= -1) {
      lastSlide();
      $slider.trigger('slide.changed');
    } else {
      $slider.trigger('slide.changed');
    }
  }

  const slides = document.querySelectorAll('.slide-1, .slide-2');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  document.querySelector('.prev').addEventListener('click', () => {
    if (currentSlide === 1) {
      currentSlide = 0;
      showSlide(currentSlide);
    }
  });

  document.querySelector('.next').addEventListener('click', () => {
    if (currentSlide === 0) {
      currentSlide = 1;
      showSlide(currentSlide);
    }
  });

  showSlide(currentSlide);

  function firstSlide() {
    $('.panel._active').removeClass('_active');
    $slider.find('.panel:eq(0)').addClass('_active');
    $activeSlide = $slider.find('.panel:eq(0)');

  }

  function lastSlide() {

    $('.panel._active').removeClass('_active');
    $slider.find('.panel').eq(numberOfSlides - 1).addClass('_active');

  }

  function goToSlide(slideToGo) {
    $('.panel._active').removeClass('_active');
    $slider.find('.panel').eq(slideToGo - 1).addClass('_active');
    $activeSlide = $slider.find('.panel').eq(slideToGo - 1).addClass('_active');
    $slider.trigger('slide.changed');
  }

});