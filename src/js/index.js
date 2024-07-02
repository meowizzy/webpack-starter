import { languageSwitcher } from "./modules/languageSwitcher";
import { callbackForm } from "./modules/callbackForm";
import { inputMaskInit } from "./modules/inputMaskInit";
import { servicesListDropDown } from "./modules/servicesListDropDown";
import { menuListDropDown } from "./modules/menuListDropDown";
import { mobileSlider } from "./modules/mobileSlider";
import "./libs/input-mask.min";

const onDocumentLoaded = () => {
    const element = document.getElementById("curYear");

    if (element) {
        element.innerHTML = new Date().getFullYear();
    }
    setTimeout(servicesListDropDown, 300);
    mobileSlider();
    inputMaskInit()
    languageSwitcher();
    callbackForm();
    menuListDropDown();
};

document.addEventListener("DOMContentLoaded", onDocumentLoaded);