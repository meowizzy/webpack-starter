import lightGallery from "lightgallery";
import "lightgallery/scss/lightgallery-bundle.scss";

export const lightGalleryInit = () => {
    lightGallery(document.querySelector(".product__slider .swiper-wrapper"), {
        speed: 500,
        loop: false,
        selector: ".product__slider-item a"
    });
};