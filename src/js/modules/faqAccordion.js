export const faqAccordion = () => {
    const items = document.querySelectorAll(".faq__item-head");

    if (!items) return;

    items.forEach(item => {
        const initialHeight = item.nextElementSibling.scrollHeight;
        item.addEventListener("click", () => {
            item.parentElement.classList.toggle("active");
            item.parentElement.style.setProperty("--initial-height", `${initialHeight}px`);
        });
    })
}