'use strict';

window.addEventListener('DOMContentLoaded', () => {

  //  Theme Switcher

  const lightThemeVars = {
    '--body-back': '#fbfbfb',
    '--not-landing-body-back': '#fbfbfb',
    '--light-blocks-back': '#f2f2f2',
    '--header-back': '#ffffff',
    '--switcher-circle-back': '#ffffff',
    '--testimonials-back': '#ffffff',
    '--map-descr-back': '#fefefe',
    '--main-color': '#333333',
    '--text-color': '#4f4f4f',
    '--counter-color': '#828282',
    '--counter-current-color': '#333333',
  }
  const darkThemeVars = {
    '--body-back': '#333333',
    '--not-landing-body-back': '#4f4f4f',
    '--light-blocks-back': '#4f4f4f',
    '--header-back': '#333333',
    '--switcher-circle-back': '#1b1b1b',
    '--testimonials-back': '#3c3c3c',
    '--map-descr-back': '#333333',
    '--main-color': '#fefefe',
    '--text-color': '#f2f2f2',
    '--counter-color': '#bdbdbd',
    '--counter-current-color': '#fefefe',
  }
  const switcher = document.querySelector('.theme-switcher');
  const mapImg = document.querySelector('.map img');

  function setRootProperty(props) {
    const root = document.documentElement;
    for (let prop in props) {
      root.style.setProperty(prop, props[prop]);
    }
  }
  setRootProperty(lightThemeVars);

  switcher.addEventListener('click', () => {
    if (switcher.classList.contains('theme-switcher__left')) {
      switcher.classList.remove('theme-switcher__left');
      switcher.classList.add('theme-switcher__right');
      setRootProperty(darkThemeVars);
      mapImg.src = mapImg.closest('.map-page') ? '../assets/images/dark-map.svg' : 'assets/images/dark-map.svg';
    } else {
      switcher.classList.add('theme-switcher__left');
      switcher.classList.remove('theme-switcher__right');
      setRootProperty(lightThemeVars);
      mapImg.src = mapImg.closest('.map-page') ? '../assets/images/map.svg' : 'assets/images/map.svg';
    }
  });

  

});