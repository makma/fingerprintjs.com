import tippy from 'tippy.js';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import $ from 'jquery-slim';
import 'regenerator-runtime/runtime';
import Swiper, { Navigation, Pagination } from 'swiper';
import { initFpjsWidget } from './fpjs-widget';
import 'swiper/swiper-bundle.css';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// DOM Elements
const BODY = $('body');
const mobileToggler = $('.mobile-toggler');
const rangeSlider = $('.slider');
const rangeSliderInput = $('.slider-input');
const rangeSliderLabelOutput = $('.slider-output');
const rangeSliderPriceOutput = $('.payment-per-month .price');
const paymentSwitcher = $('.payment-switcher');
const paymentSwitcherAnnually = $('.payment-switcher__button--annually');
const paymentSwitcherMonthly = $('.payment-switcher__button--monthly');
const starCounter = document.querySelectorAll('.btn--github .github-counter');
const mobileLinksSubmenu = $('.main-links__link--has-submenu');

// Pricing Table
const pricingTable = [
  { label: '100K', value: 100000 },
  { label: '250K', value: 250000 },
  { label: '500K', value: 500000 },
  { label: '1M', value: 1000000 },
  { label: '5M', value: 5000000 },
  { label: '10M', value: 10000000 },
  { label: '20M', value: 20000000 },
];

document.addEventListener('DOMContentLoaded', () => {
  // FPJS widget
  initFpjsWidget();

  // StarCounter
  const getStars = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/fingerprintjs/fingerprintjs');
      if (response.ok) {
        let json = await response.json();
        starCounter.forEach((counter) => {
          counter.innerHTML = new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
            maximumFractionDigits: 1,
          }).format(json.stargazers_count);
        });
      }

      // return response.data.stargazers_count;
    } catch (error) {
      console.error({ error });
    }
  };
  // Set stars
  getStars();

  // Code highlights
  Prism.highlightAll();

  // Tooltips initializations
  tippy('[data-tippy-content]', {
    animation: 'shift-away',
    interactive: true,
    arrow: false,
    trigger: 'click',
  });

  // Mobile menu toggle
  mobileToggler.click(toggleMobileMenu);

  // Mobile menu dropdowns
  mobileLinksSubmenu.click(toggleMobileLinksSubmenu);

  function toggleMobileLinksSubmenu() {
    this.classList.toggle('isOpen');
  }

  function toggleMobileMenu() {
    BODY.toggleClass('isMobileMenuOpen');
  }

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 1024px)').matches) {
      BODY.removeClass('isMobileMenuOpen');
    }

    // if (window.matchMedia('(max-width: 640px)').matches) {
    //   if (proToolsSplide.State.is(proToolsSplide.STATES.DESTROYED)) {
    //     proToolsSplide.refresh();
    //     proToolsSplide.mount();
    //   }
    //   if (proToolsSplide.State.is(proToolsSplide.STATES.MOUNTED)) {
    //     return;
    //   } else if (proToolsSplide.State.is(proToolsSplide.STATES.CREATED)) {
    //     proToolsSplide.mount();
    //   }
    // } else {
    //   proToolsSplide.destroy();
    // }
  });

  // Range slider
  rangeSliderInput.change(handlePriceChange);
  rangeSliderInput[0].addEventListener('input', handlePriceChange);

  function handlePriceChange(e) {
    const minValue = Number(e.target.min);
    const maxValue = Number(e.target.max);
    const value = Number(e.target.value);
    const magicNumber = ((value - minValue) * 100) / (maxValue - minValue);
    const valueLabel = pricingTable[value].label;
    const newPrice = calculatePrice(pricingTable[value].value, paymentSwitcher[0].dataset.type);

    rangeSlider[0].style.setProperty(
      '--left',
      `calc(${magicNumber}% + (${15 - magicNumber * 0.3}px))`,
    );
    rangeSliderLabelOutput.html(valueLabel);
    rangeSliderPriceOutput.html(newPrice);
  }

  function calculatePrice(price, type) {
    const currencyFormatOptions = {
      maximumSignificantDigits: 3,
      style: 'currency',
      currencyDisplay: 'symbol',
      currency: 'USD',
      notation: 'standard',
    };

    if (type === 'monthly') {
      return new Intl.NumberFormat('en-US', currencyFormatOptions).format(price / 1000);
    }
    if (type === 'annually') {
      return new Intl.NumberFormat('en-US', currencyFormatOptions).format((price / 1000) * 0.8);
    }
  }

  // Switch billing types
  paymentSwitcherAnnually.click(switchToType);
  paymentSwitcherMonthly.click(switchToType);

  function switchToType(e) {
    paymentSwitcher[0].dataset.type = e.target.dataset.type;

    paymentSwitcherAnnually.removeClass('payment-switcher__button--active');
    paymentSwitcherMonthly.removeClass('payment-switcher__button--active');

    rangeSliderInput.trigger('change');
    e.target.classList.add('payment-switcher__button--active');

    if (e.target.dataset.type === 'annually') {
      document.getElementById('billed_annual_text').textContent = 'billed yearly';
    } else {
      document.getElementById('billed_annual_text').textContent = 'billed monthly';
    }
  }

  // Toggle Incognito
  $('.nav__link--logo').click(() => document.documentElement.classList.toggle('incognito'));

  // Swipers
  const logoSwiper = new Swiper('#swiper--trusted-by', {
    spaceBetween: 30,
    slidesPerView: 6,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 6 },
    },
  });

  const proToolsSwiper = new Swiper('#swiper--pro-tools', {
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      768: {
        slidesPerView: 2,
        slidesPerColumn: 3,
        slidesPerColumnFill: 'row',
        spaceBetween: 28,
      },
      1024: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 28,
        slidesPerColumnFill: 'row',
      },
    },
  });

  // const proToolsSplide = new Splide('.splide--pro-tools', {
  //   type: 'loop',
  //   perPage: 1,
  //   padding: {
  //     left: '5rem',
  //     right: '5rem',
  //   },
  //   gap: '2rem',
  //   pagination: true,
  //   arrows: false,
  // });
  // if (window.innerWidth < 641) {
  //   proToolsSplide.mount();
  // }

  // const liveDemoMobileSplide = new Splide('.live-demo-mobile-container', {
  //   type: 'slide',
  //   perPage: 1,
  //   focus: 0,
  //   padding: {
  //     left: '5rem',
  //     right: '5rem',
  //   },
  //   gap: '2rem',
  //   pagination: true,
  //   arrows: false,
  // });
  // liveDemoMobileSplide.mount();
  // liveDemoMobileButtonsPrev.click(() => liveDemoMobileSplide.go('-'));
  // liveDemoMobileButtonsNext.click(() => liveDemoMobileSplide.go('+'));
});
