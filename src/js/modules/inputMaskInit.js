export const inputMaskInit = () => {
    const phoneInputs = document.querySelectorAll('[name="phone"]');

    if (phoneInputs.length) {
        phoneInputs.forEach(phoneInput => {
            IMask(phoneInput, {
                mask: "+998 (90) 000-00-00"
            })
        })
    }
};