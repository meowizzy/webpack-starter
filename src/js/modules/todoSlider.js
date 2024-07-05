import Swiper from 'swiper';
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";

export const todoSlider = () => {
    Swiper.use([Pagination, Navigation]);

    new Swiper('.product__slider', {
        hashNavigation: {
            watchState: true,
        },
        navigation: {
            prevEl: ".product__slider-arrows .swiper-button-prev",
            nextEl: ".product__slider-arrows .swiper-button-next",
        },
        speed: 400,
        on: {
            init: function () {
                this.el.style.setProperty('--current-index', `\"${this.realIndex + 1}\"`);
            },
            slideChange: function(){
                this.el.style.setProperty('--current-index', `\"${this.realIndex + 1}\"`);
            }
        }
    });
};