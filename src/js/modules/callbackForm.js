import { GOOGLE_SHEETS_URL, LOCAL_STORAGE_LANG_KEY } from "../app/constants";

export const callbackForm = () => {
    const form = document.querySelector(".callback__form .form");

    if (!form) return;

    const queryParams = Object.fromEntries(new URLSearchParams(location.search).entries());
    const button = form.querySelector(".lp-button");
    const lang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);

    const validatePhoneInput = (phone) => {
        if (phone.length > 19 || phone.length < 19) {
            console.log(lang);
            throw new Error(lang === "ru" ? "Некорректный номер телефона" : "Telefon raqami noto‘g‘ri");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formElements = form.elements;

        const utms = {
            utm_source: queryParams?.utm_source ? queryParams.utm_source : "-",
            utm_medium: queryParams?.utm_medium ? queryParams.utm_medium : "-",
            utm_campaign: queryParams?.utm_campaign ? queryParams.utm_campaign : "-",
            utm_term: queryParams?.utm_term ? queryParams.utm_term : "-",
            utm_content: queryParams?.utm_content ? queryParams.utm_content : "-"
        };

        const data = {
            name: formElements.name.value,
            phone: formElements.phone.value,
            ...utms
        };

        try {
            validatePhoneInput(data.phone);

            button.classList.add("isLoading");
            const response = await fetch(GOOGLE_SHEETS_URL, {
                method: "POST",
                body: JSON.stringify(data),
            });

            let successContent;

            if (lang === "ru" || !lang) {
                successContent = `Заявка успешно отправлена. <br> <span class="sub" style="font-size: var(--font-size-xm)">Мы свяжемся с Вами в ближайшее время.</span>`;
            } else if (lang === "uz"){
                successContent = `Ilova muvaffaqiyatli yuborildi. <br> <span class="sub" style="font-size: var(--font-size-xm)">Tez orada siz bilan bog'lanamiz.</span>`
            }

            if (response.status === 200) {
                form.closest(".callback__col").innerHTML = `
                    <div class="success text-xl">
                        ${successContent}
                    </div>
                `;
            }
        } catch (e) {
            form.insertAdjacentHTML("beforebegin", `<div class="error-message">${e.message}</div>`);

            formElements.phone.value = "";
            formElements.name.value = "";
        } finally {
            button.classList.remove("isLoading");
        }
    };

    form.addEventListener("submit", onSubmit);
};