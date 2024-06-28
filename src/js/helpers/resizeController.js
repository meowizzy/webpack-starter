export const resizeController = (size, cb, cb1) => {
    if (!size && typeof cb !== "function" && typeof cb1 !== "function") return;

    window.innerWidth <= size ? cb() : cb1();

    window.addEventListener("resize", function () {
        window.innerWidth <= size ? cb() : cb1();
    });
};