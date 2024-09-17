/**
 * Template Name: Butterfly
 * Template URL: https://bootstrapmade.com/butterfly-free-bootstrap-theme/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  'use strict';

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach((navmenu) => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach((navmenu) => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector('.isotope-container'),
        {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll('.isotope-filters li')
      .forEach(function (filters) {
        filters.addEventListener(
          'click',
          function () {
            isotopeItem
              .querySelector('.isotope-filters .filter-active')
              .classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({
              filter: this.getAttribute('data-filter'),
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector('.swiper-config').innerHTML.trim()
      );

      if (swiperElement.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener('load', initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll('.navmenu a.active')
          .forEach((link) => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  // let contactForm = $('.php-email-form');
  // $.post(contactForm.attr('action'), contactForm.serialize(), function (data) {
  //   console.log(data);
  // });

  // let forms = document.querySelectorAll('.php-email-form');

  // console.log(forms);

  // forms.forEach(function (e) {
  //   e.addEventListener('submit', function (event) {
  //     event.preventDefault();

  //     let thisForm = this;

  //     let action = thisForm.getAttribute('action');
  //     if (!action) {
  //       displayError(thisForm, 'The form action property is not set!');
  //       return;
  //     }
  //     thisForm.querySelector('.loading').classList.add('d-block');
  //     thisForm.querySelector('.error-message').classList.remove('d-block');
  //     thisForm.querySelector('.sent-message').classList.remove('d-block');

  //     let formData = new FormData(thisForm);
  //     php_email_form_submit(thisForm, action, formData);
  //   });
  // });

  // function php_email_form_submit(thisForm, action, formData) {
  //   fetch(action, {
  //     method: 'POST',
  //     body: formData,
  //     headers: { 'X-Requested-With': 'XMLHttpRequest' },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.ok) {
  //         return response.text();
  //       } else {
  //         throw new Error(
  //           `${response.status} ${response.statusText} ${response.url}`
  //         );
  //       }
  //     })
  //     .then((data) => {
  //       thisForm.querySelector('.loading').classList.remove('d-block');
  //       if (data.trim() == 'OK') {
  //         thisForm.querySelector('.sent-message').classList.add('d-block');
  //         thisForm.reset();
  //       } else {
  //         throw new Error(
  //           data
  //             ? data
  //             : 'Form submission failed and no error message returned from: ' +
  //               action
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       displayError(thisForm, error);
  //     });
  // }

  // function displayError(thisForm, error) {
  //   thisForm.querySelector('.loading').classList.remove('d-block');
  //   thisForm.querySelector('.error-message').innerHTML = error;
  //   thisForm.querySelector('.error-message').classList.add('d-block');
  // }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();
