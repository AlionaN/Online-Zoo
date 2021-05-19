'use strict';
window.addEventListener('DOMContentLoaded', () => {

  class Carousel {
    constructor (carousel) {
      this.carousel = carousel;
      this.itemsWrap = carousel.querySelector('.carousel__wrapper');
      this.itemsInner = carousel.querySelector('.carousel__items');
      this.items = carousel.querySelectorAll('.carousel__item');
      this.itemWidth = carousel.querySelector('.carousel__item').offsetWidth;
      this.nav = carousel.querySelectorAll('.carousel__nav');
      this.counterTotal = carousel.querySelector('.counter .total');
      this.counterCurrent = carousel.querySelector('.counter .current');
      this.range = carousel.querySelector('.carousel__range');
      this.itemIndex = +this.counterCurrent.innerText;
      this.itemsCount = Math.round(this.itemsWrap.clientWidth / this.itemWidth);
      this.prevRange = this.range.value;
      this.counterTotal.innerText = this.items.length < 10 ? `0${this.items.length}` : this.items.length;

      this.range.addEventListener('input', () => {
        this.$('.carousel__item_active').classList.remove('carousel__item_active');
        this.$(`.carousel__item:nth-child(${this.range.value})`).classList.add('carousel__item_active');
        this.counterCurrent.innerText = this.range.value < 10 ? `0${this.range.value}` : this.range.value;
      });

      this.$ = (selector) => {
        return document.querySelector(selector);
      }

      this.items.forEach((item) => {
        item.addEventListener('click', () => {
          this.$('.carousel__item_active').classList.remove('carousel__item_active');
          item.classList.add('carousel__item_active');
          let active = Array.from(this.items).indexOf(this.$('.carousel__item_active'));
          this.range.value = active + 1;
          this.counterCurrent.innerText = this.range.value < 10 ? `0${this.range.value}` : this.range.value;
          if (this.$('.map__sign_active')) {
            this.$('.map__sign_active').classList.remove('map__sign_active');
          }
          let animal = this.$('.carousel__item_active').getAttribute('data-animal');
          if (animal) {
            this.$(`.map__sign_${animal}`).classList.add('map__sign_active');
            this.$('.map__button .btn__link').href = `zoos/${animal}/${animal}.html`;
          }
        });
      });

      this.nav.forEach((item) => {
        item.addEventListener('click', (e) => {
          if (item.classList.contains('carousel__prev')) {
            if (this.itemIndex <= 1) {
              this.itemIndex = this.items.length;
            } else {
              this.itemIndex--;
            }
            let cur = Array.from(this.items).indexOf(this.$('.carousel__item_active'));
            this.items[cur].classList.remove('carousel__item_active');
            if (this.items[cur - 1]) {
              this.items[cur - 1].classList.add('carousel__item_active');
            } else {
              this.items[this.items.length - 1].classList.add('carousel__item_active');
            }
          } else if (item.classList.contains('carousel__next')) {
            if (this.itemIndex >= this.items.length) {
              this.itemIndex = 1;
            } else {
              this.itemIndex++;
            }
            if (this.$('.carousel__item_active + .carousel__item')) {
              this.$('.carousel__item_active + .carousel__item').classList.add('carousel__item_active');
              this.$('.carousel__item_active').classList.remove('carousel__item_active');
            } else {
              this.$('.carousel__item_active').classList.remove('carousel__item_active');
              this.items[0].classList.add('carousel__item_active');
            }
          }
          this.range.value = this.itemIndex;
          this.counterCurrent.innerText = this.range.value < 10 ? `0${this.range.value}` : this.range.value;
          if (this.$('.map__sign_active')) {
            this.$('.map__sign_active').classList.remove('map__sign_active');
          }
          let animal = this.$('.carousel__item_active').getAttribute('data-animal');
          if (animal) {
            this.$(`.map__sign_${animal}`).classList.add('map__sign_active');
            this.$('.map__button .btn__link').href = `zoos/${animal}/${animal}.html`;
          }
        });
      });
    }
  }

  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((item) => new Carousel(item));
  
});

