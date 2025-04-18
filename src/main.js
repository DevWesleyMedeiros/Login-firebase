"use strict";

import {
  validateEmail,
  validatePassword,
  clearAndFocusEmailInput,
  inputEmailErrorMessage,
  inputPasswordErrorMessage,
  InitLoader,
  EndLoader
} from "./Utils/functions.js";
import {
  auth
} from "./firebaseConfig";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider(); // instância do GoogleAuthProvider que nos concede acesso aos métodos do GoogleAuthProvider

const btnSubmit = document.getElementById("btn-submit");
const btnSubmitGoogle = document.getElementById("btn-submit-google");
const btnViewPassword = document.getElementById("btn-view-password");
const emailErrorMessage = document.getElementById("email-error-message");
const passwordErrorMessage = document.getElementById("password-error-message");


document.addEventListener("DOMContentLoaded", () => {

  // Mostrar/Ocultar a senha
  btnViewPassword.addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    const passwordFieldType = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = passwordFieldType;
  });

  // Função que cria login com o google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        window.alert("Login com Google bem-sucedido!");
        const user = userCredential.user;
        console.log("Usuário do Google:", user);

        // Redirecionar ou fazer outras ações após o login
        window.location.href = "./src/pages/home.html"; // Exemplo
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error("Erro no login com Google:", errorCode, errorMessage);
        window.alert("Falha no login com Google: " + errorMessage);
      });
  };

  btnSubmitGoogle.addEventListener("click", () => {
    signInWithGoogle();
  });

  // Verifica se o email e senha são válidos
  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    // Pegue os valores dentro do evento de clique
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verifique se os valores não estão vazios
    if (!email || !password) {
      window.alert("Por favor, preencha os campos de email e senha.");
      return;
    }

    // Verifique se o email e a senha são válidos
    if (!validateEmail(email)) {
      inputEmailErrorMessage(emailErrorMessage);
      return;
    }

    // Verifique se a sua senha é válida
    if (!validatePassword(password)) {
      inputPasswordErrorMessage(passwordErrorMessage);
      return;
    }

    // Mostrar o loader imediatamente
    InitLoader();

    // Registra o usuário com Firebase e espera a resposta
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user; // onde eu recebo o usuário criado
        console.log(user.uid); // mostro o usuário criado a partir do userCredential

        // Após a resposta, esconder o loader e limpar o formulário
        setTimeout(() => {
          document.getElementById("container-loader").style.display = "none";
          clearAndFocusEmailInput();
        }, 2000);

      })
      .catch((error) => {
        const errorCode = error.code; // onde criamos o código de erro
        const errorMessage = error.message;
        window.alert("Erro: " + errorMessage);
        console.log(errorCode, errorMessage);

        // Esconder o loader caso haja erro
        document.getElementById("container-loader").style.display = "none";
      });

    // Esconder o loader após 5 segundos, mesmo que o Firebase não tenha respondido
    EndLoader();
  });
});