/**
 * Valida um endereço de e-mail.
 * @param {string} email - O e-mail a ser validado.
 * @returns {boolean} - True se o e-mail for válido, false caso contrário.
 */
export function validateEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).trim());
  }
  
  /**
   * Valida uma senha com base em critérios específicos.
   * Critérios: Pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula,
   * um número e um caractere especial.
   * @param {string} password - A senha a ser validada.
   * @returns {boolean} - True se a senha for válida, false caso contrário.
   */
  export function validatePassword(password) {
    if (!password) return false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(String(password).trim());
  }
  
  /**
   * Valida um nome de usuário.
   * Critério: Pelo menos 3 caracteres.
   * @param {string} name - O nome a ser validado.
   * @returns {boolean} - True se o nome for válido, false caso contrário.
   */
  export function validateName(name) {
    if (!name) return false;
    return String(name).trim().length >= 3;
  }
  