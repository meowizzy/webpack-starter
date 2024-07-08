import Swiper from 'swiper';
import { Pagination, Autoplay } from "swiper/modules";
import { resizeController } from "../helpers/resizeController";
import "swiper/css";

export const mobileSlider = () => {
    resizeController(639, () => {
        if (!Swiper) return;
        Swiper.use([Pagination, Autoplay]);

        new Swiper('.banner__mobile-slider', {
            hashNavigation: {
                watchState: true,
            },
            pagination: {
                el: '.banner__mobile-slider-pagination',
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
            speed: 800,
            autoplay: {
                delay: 5000,
            },
        })
    }, () => {});
};