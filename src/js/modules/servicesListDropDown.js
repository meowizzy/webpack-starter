import { isMobile } from "../helpers/isMobile";

export const servicesListDropDown = () => {
    const lists = document.querySelectorAll(".services-list--with-dropdown");
    const lang = document.documentElement.lang;

    if (!lists.length) {
        return;
    }

    const setListStyles = (list) => {
        const initialHeight = Array.from(list.children).reduce((acc, item, currentIndex) => {
            if (currentIndex < 3) {
                return acc + item.offsetHeight + (isMobile() ? 10 : 14);
            }
            return acc;
        }, 0);

        console.log(initialHeight)

        list.style.cssText = `
            max-height: ${initialHeight}px;
        `;
    };

    lists.forEach((list) => {
        const children = list.children;

        if (children.length > 3) {
            setListStyles(list);

            list.insertAdjacentHTML("afterend", `           
                <button class="dropdown-trigger">
                    <span class="dropdown-trigger__arrow"></span>
                    <span class="services-list__title">
                        ${lang === "ru" ? "Все преимущества тарифа" : "Tarifning barcha afzalliklari"}
                    </span>
                </button>
            `);
        }
    });

    const handleClick = (e) => {
        const target = e.target;
        const list = target.previousElementSibling;

        if (target.closest(".dropdown-trigger")) {
            if (target.classList.contains("active")) {
                target.classList.remove("active");
                setListStyles(list);
            } else {
                target.classList.add("active");
                list.style.maxHeight = `${list.scrollHeight}px`;
            }
        }
    };

    document.addEventListener("click", handleClick);
};