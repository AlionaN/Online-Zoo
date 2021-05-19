'use strict';
window.addEventListener('DOMContentLoaded', () => {

  let heroCarouselCards = document.querySelectorAll('.carousel:not(.card-click-carousel) .carousel__item:not(.hero .carousel__item_active)');
  heroCarouselCards.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('carousel__item_active');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('carousel__item_active');
    });
  });

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
      this.offset = 0;
      this.itemsCount = Math.round(this.itemsWrap.clientWidth / this.itemWidth);
      this.counterTotalText = this.itemsCount > 1 && !this.carousel.classList.contains('card-click-carousel') ? Math.round(this.items.length / this.itemsCount) : this.items.length;
      this.prevRange = this.range.value;
      this.counterTotal.innerText = this.counterTotalText < 10 ? `0${this.counterTotalText}` : this.counterTotalText;

      this.range.addEventListener('input', () => {
        this.itemIndex = this.range.value;
        if (this.carousel.classList.contains('card-click-carousel')) {
          if (this.prevRange < this.range.value) {
            this.next();
          } else {
            this.prev();
          }
        } else {
          this.offset = (this.itemIndex - 1) * this.itemWidth * this.itemsCount;
          this.itemsInner.style.transform = `translateX(-${this.offset}px)`;
        }
        this.counterCurrent.innerText = this.itemIndex < 10 ? `0${this.itemIndex}` : this.itemIndex;
        this.prevRange = this.range.value;
      });

      this.$ = (selector) => {
        return document.querySelector(selector);
      }

      this.next = () => {
        this.$('.carousel__item_active').classList.add('prev');
        this.$('.carousel__item_active').classList.remove('carousel__item_active');

        this.$('.next').classList.add('carousel__item_active');
        this.$('.next').classList.remove('next');
        this.$('.next-new').classList.remove('next-new');

        this.$('.last').classList.add('next', 'next-new');
        this.$('.last').classList.remove('last');

        let toRelocate = this.$('.prev');
        toRelocate.classList.remove('prev');
        toRelocate.classList.add('last');
        this.itemsInner.appendChild(toRelocate);
        if (this.range.value >= this.items.length) {
          this.range.value = 1;
        } else {
          this.range.value++;
        }
        this.counterCurrent.innerText = this.range.value < 10 ? `0${this.range.value}` : this.range.value;
      }
      this.prev = () => {
        this.$('.next').classList.add('next-new');

        this.$('.carousel__item_active').classList.add('next');
        this.$('.carousel__item_active').classList.remove('carousel__item_active');

        this.$('.prev').classList.add('carousel__item_active');
        this.$('.prev').classList.remove('prev');

        let toRelocate = this.$('.last');
        toRelocate.classList.remove('last');
        toRelocate.classList.add('prev');
        this.itemsInner.prepend(toRelocate);

        let last = this.$('.carousel__items .carousel__item:last-child');
        last.classList.add('last');
        last.classList.remove('next', 'next-new');

        if (this.range.value <= 1) {
          this.range.value = this.items.length;
        } else {
          this.range.value--;
        }
        this.counterCurrent.innerText = this.range.value < 10 ? `0${this.range.value}` : this.range.value;
      }

      this.itemsInner.addEventListener('click', (e) => {
        if (e.target.closest('.prev')) {
          this.prev();
        } else if (e.target.closest('.next')) {
          this.next();
        }
      });

      this.nav.forEach((item) => {
        item.addEventListener('click', () => {
          if (item.classList.contains('carousel__prev')) {
            if (this.offset <= 0) {
              this.offset = this.items.length % this.itemsCount === 0 ? (this.items.length - this.itemsCount) * this.itemWidth : (this.items.length - this.items.length % this.itemsCount) * this.itemWidth;
              this.range.value = this.counterTotalText;
              this.counterCurrent.innerText = this.counterTotalText < 10 ? `0${this.counterTotalText}` : this.counterTotalText;
            } else {
              this.offset -= +this.itemWidth * this.itemsCount;
              this.range.value--;
              this.counterCurrent.innerText = this.range.value < 10 ? `0${this.range.value}` : this.range.value;
            }
            this.itemsInner.style.transform = `translateX(-${this.offset}px)`;
          } else if (item.classList.contains('carousel__next')) {
            if (this.offset >= (this.items.length - this.itemsCount) * this.itemWidth) {
              this.offset = 0;
              this.range.value = 1;
              this.counterCurrent.innerText = `01`;
            } else {
              this.offset += this.itemWidth * this.itemsCount;
              this.range.value++;
              this.counterCurrent.innerText = this.range.value < 10 ? `0${this.range.value}` : this.range.value;
            }
            this.itemsInner.style.transform = `translateX(-${this.offset}px)`;
          }
        });
      });
    }
  }

  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((item) => new Carousel(item));

});