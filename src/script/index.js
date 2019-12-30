import Splite from './_splite';

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const $$splite = document.querySelector('.js-splite');

    const splite = new Splite($$splite, 100, 5, 0);
    splite.init();

    console.log('example template');
  });
})();
