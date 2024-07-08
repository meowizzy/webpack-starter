import { languageSwitcher } from "./modules/languageSwitcher";
import { callbackForm } from "./modules/callbackForm";
import { inputMaskInit } from "./modules/inputMaskInit";
import { menuListDropDown } from "./modules/menuListDropDown";
import { mobileSlider } from "./modules/mobileSlider";
import { todoSlider } from "./modules/todoSlider";
import { lightGalleryInit } from "./modules/lightGalleryInit";
import { faqAccordion } from "./modules/faqAccordion";
import "./libs/input-mask.min";

const onDocumentLoaded = () => {
    const element = document.getElementById("curYear");

    if (element) {
        element.innerHTML = new Date().getFullYear();
    }

    mobileSlider();
    inputMaskInit()
    languageSwitcher();
    callbackForm();
    menuListDropDown();
    todoSlider();
    lightGalleryInit();
    faqAccordion();
};

document.addEventListener("DOMContentLoaded", onDocumentLoaded);

