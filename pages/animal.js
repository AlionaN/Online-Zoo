'use strict';
window.addEventListener('DOMContentLoaded', () => {

  class Carousel {
    constructor (carousel) {
      this.carousel = carousel;
      this.itemsWrap = carousel.querySelector('.carousel__wrapper');
      this.itemsInner = carousel.querySelector('.carousel__items');
      this.items = carousel.querySelectorAll('.carousel__item');
      this.nav = carousel.querySelectorAll('.carousel__nav');
      this.itemIndex = 0;

      this.$ = (selector) => {
        return document.querySelector(selector);
      }

      this.nav.forEach((item) => {
        item.addEventListener('click', () => {
          if (item.classList.contains('carousel__prev')) {
            
          } else if (item.classList.contains('carousel__next')) {
            if (this.$('.carousel__item_active + .carousel__item')) {
              window.location.href = this.$('.carousel__item_active + .carousel__item a').href;
            } else {
              window.location.href = this.items[0].querySelector('a').href;
            }
          }
        });
      });
    }
  }

  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((item) => new Carousel(item));

  let videos = document.querySelectorAll('.animal-videos__small');
  let bigVideo = document.querySelector('animal-videos__big')
  let bigVideoWrap = document.querySelector('.animal-videos__big-wrap');
  let smallVideosWrap = document.querySelector('.animal-videos__small-wrap');

  videos.forEach((item) => {
    item.addEventListener('click', () => {
      console.log(item);
      bigVideoWrap.append(item);
      smallVideosWrap.append(bigVideo);
    });
  });

});