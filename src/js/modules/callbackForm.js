import {
    GOOGLE_SHEETS_URL,
    LOCAL_STORAGE_LANG_KEY,
    BASE_URL
} from "../app/constants";

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

    const createRequisition = async () => {

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

            let successFlag = false; // workaround

            button.classList.add("isLoading");

            if (window.ym) {
                window.ym(97752261,'reachGoal','generate_lead');
            }

            if (window.fbq) {
                window.fbq('track', 'Lead');
            }

            const googleSheetsResponse = await fetch(GOOGLE_SHEETS_URL, {
                method: "POST",
                body: JSON.stringify(data),
                mode: "no-cors"
            });

            successFlag = true; // workaround

            let successContent;

            if (lang === "ru" || !lang) {
                successContent = `Заявка успешно отправлена. <br> <span class="sub" style="font-size: var(--font-size-xm)">Мы свяжемся с Вами в ближайшее время.</span>`;
            } else if (lang === "uz"){
                successContent = `Ilova muvaffaqiyatli yuborildi. <br> <span class="sub" style="font-size: var(--font-size-xm)">Tez orada siz bilan bog'lanamiz.</span>`
            }

            if (googleSheetsResponse.status === 200 || successFlag) {
                form.closest(".container").classList.add("form-success");
                form.closest(".callback__col").innerHTML = `
                    <div class="success-icon">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#ffffff"> <title id="okIconTitle">Ok</title> <polyline points="4 13 9 18 20 7"/> </svg>
                    </div>
                    <div class="success text-xl">
                        ${successContent}
                    </div>
                `;

                if (gtag) {
                    gtag("event", "generate_lead", {
                        currency: "USD",
                        value: 1.00
                    });
                }
            }
        } catch (e) {
            form.insertAdjacentHTML("beforebegin", `<div class="error-message">${e.message}</div>`);
        } finally {
            button.classList.remove("isLoading");
        }
    };

    form.addEventListener("submit", onSubmit);
};