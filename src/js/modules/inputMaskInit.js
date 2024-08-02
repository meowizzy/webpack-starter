export const inputMaskInit = () => {
    const phoneInputs = document.querySelectorAll('[name="phone"]');

    if (phoneInputs.length) {
        phoneInputs.forEach(phoneInput => {
            const iMask = IMask(phoneInput, {
                mask: "+998 (00) 000-00-00",
            });

            phoneInput.addEventListener("focus", () => {
                if (!iMask.value) {
                    iMask.value = "+998 ("
                }
            });

            phoneInput.addEventListener("blur", () => {
                if (iMask.value.length === 6) {
                    iMask.value = "";
                }
            });
        })
    }
};