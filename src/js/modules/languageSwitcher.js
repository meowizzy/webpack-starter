import { LOCAL_STORAGE_LANG_KEY } from "../app/constants";

export const languageSwitcher = () => {
    const langSwitcherOpener = document.querySelector(".languageSwitcher__head .languageSwitcher__item");
    const langSwitcherOpenerIcon = document.querySelector(".languageSwitcher__head .languageSwitcher__icon");
    const langSwitcherItems = document.querySelectorAll(".languageSwitcher__body .languageSwitcher__item");
    const siteLang = document.documentElement.lang;
    const localStorageLang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);

    if (localStorageLang) {
        if (siteLang !== localStorageLang && !location.pathname.includes("textolite")) {
            window.location.href = localStorageLang === "ru" ? '/' : "/uz.html";
        }
    }

    if (siteLang === "ru") {
        langSwitcherOpenerIcon.innerHTML = langSwitcherItems[0].querySelector(".languageSwitcher__icon").outerHTML;
    } else {
        langSwitcherOpenerIcon.innerHTML = langSwitcherItems[1].querySelector(".languageSwitcher__icon").outerHTML;
    }

    const handleOpenDropdown = (e) => {
        const target = e.target;
        const dropDown = target.parentElement.nextElementSibling;

        target.parentElement.classList.toggle("active");
        dropDown.classList.toggle("opened");
    };

    const onSelectLanguage = (e) => {
        const target = e.target;
        const lang = target.dataset.lang;

        localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest(".languageSwitcher__head") &&
            !e.target.closest(".languageSwitcher__body")) {
            langSwitcherOpener.parentElement.classList.remove("active");
            langSwitcherItems[0].parentElement.classList.remove("opened");
        }
    };

    document.addEventListener("click", handleClickOutside);

    langSwitcherItems.forEach((item) => item.addEventListener("click", onSelectLanguage));
    langSwitcherOpener.addEventListener("click", handleOpenDropdown);
};