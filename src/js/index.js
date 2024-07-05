import { languageSwitcher } from "./modules/languageSwitcher";
import { callbackForm } from "./modules/callbackForm";
import { inputMaskInit } from "./modules/inputMaskInit";
import { menuListDropDown } from "./modules/menuListDropDown";
import { mobileSlider } from "./modules/mobileSlider";
import "./libs/input-mask.min";
import { todoSlider } from "./modules/todoSlider";
import { lightGalleryInit } from "./modules/lightGalleryInit";

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
};

document.addEventListener("DOMContentLoaded", onDocumentLoaded);

