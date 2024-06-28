import Swiper from 'swiper';
import { Pagination, Autoplay } from "swiper/modules";
import { resizeController } from "../helpers/resizeController";
import "swiper/css";

export const mobileSlider = () => {
    resizeController(480, () => {
        if (!Swiper) return;
        Swiper.use([Pagination, Autoplay]);

        new Swiper('.banner__mobile-slider', {
            pagination: {
                slidesPerView: 1,
                spaceBetween: 30,
                el: ".banner__mobile-slider-pagination",
                clickable: true,
            },
            speed: 800,
            autoplay: {
                delay: 5000,
            },
        })
    }, () => {});
};