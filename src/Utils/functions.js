// validação do email
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}
// Validação da senha
export function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password.trim());
}

// função que limpa e da focus no input de email e outros textos
export function clearAndFocusEmailInput(){
    const emailInput = document.querySelector(".email");
    const passwordInput = document.querySelector(".password");
    const passwordMatchInput = document.querySelector(".password-match");
    const emailErrorMessage = document.querySelector(".email-error-message");
    const passwordErrorMessage = document.querySelector(".password-error-message");
    emailErrorMessage.textContent = "";
    passwordErrorMessage.textContent = "";
    passwordMatchInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    emailInput.focus();
};
// função que mostra a mensagem de erro do email
export function inputEmailErrorMessage(errorMessageElement){
    errorMessageElement.classList.add("validation-message");
    errorMessageElement.textContent = "Email inválido.";
}
// função que mostra a mensagem de erro da senha
export function inputPasswordErrorMessage(errorMessageElement){
    errorMessageElement.classList.add("validation-message");
    errorMessageElement.textContent = "Senha inválida.";
}
// função que compara duas senhas se elas estão iguais
export function comparePasswords(password, confirmPassword, errorMessageElement) {
    if (password === confirmPassword) {
        errorMessageElement.textContent = "";
        return true;
    } else {
        errorMessageElement.textContent = "As senhas não coincidem.";
        errorMessageElement.classList.add("validation-message");
        return false;
    }
}

export function InitLoader(){
    document.querySelector(".container-loader").style.display = "flex";
}
export function EndLoader(){
    setTimeout(() => {
        document.querySelector(".container-loader").style.display = "none";
    }, 1000);
}
// validader email e password
// /^[^\s@]+@[^\s@]+\.[^\s@]+$/ significa que eu podero colocar qualquer coisa antes do @ e depois do @ e depois do .
// (?=.*[a-z]) significa que eu preciso de pelo menos uma letra minuscula
// (?=.*[A-Z]) significa que eu preciso de pelo menos uma letra maiuscula
// (?=.*\d) significa que eu preciso de pelo menos um numero
// (?=.*[@$!%*?&]) significa que eu preciso de pelo menos um caractere especial
// [A-Za-z\d@$!%*?&]{8,} significa que eu preciso de pelo menos 8 caracteres
// $ terminar a expressão