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
        pagination: {
            el: '.product__slider-pagination',
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                let out = ''
                for (let i = 1; i < total+1; i++) {
                    if (i === current) {
                        out = out + '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex='+i+' role="button" aria-label="Go to slide '+i+1+'"></span>';
                    }
                    else {
                        out = out + '<span class="swiper-pagination-bullet" tabindex='+i+' role="button" aria-label="Go to slide '+i+1+'"></span>';
                    }
                }
                return out;
            },
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