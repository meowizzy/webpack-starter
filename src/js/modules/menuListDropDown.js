export const menuListDropDown = () => {
    const handleClick = (e) => {
        const target = e.target;

        if (target.closest(".footer__list li:first-child")) {
            if (target.tagName.toLowerCase() === "li") {
                target.parentElement.classList.toggle("active");
            } else {
                target.parentElement.parentElement.classList.toggle("active");
            }
        }
    };

    document.addEventListener("click", handleClick);
};