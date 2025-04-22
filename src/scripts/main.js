"use strict";

import {
  validateEmail,
  validatePassword,
  clearAndFocusEmailInput,
  inputEmailErrorMessage,
  inputPasswordErrorMessage,
  comparePasswords,
  InitLoader,
  EndLoader,
  showToast
}
from "@utils/functions";

import {
  auth
}
from "@scripts/firebaseConfig";

import {
  createUserWithEmailAndPassword, // criar um usário e uma senha
  signInWithEmailAndPassword, // logar com email e senha criados
  GoogleAuthProvider,
  signInWithPopup, // abre a janelinha de cadastro do google
} from "firebase/auth";

const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
  const btnSubmit = document.querySelector(".btn-submit");
  const btnSubmitGoogle = document.querySelector(".btn-submit-google");
  const btnViewPassword = document.querySelector(".btn-view-password");

  const emailInput = document.querySelector(".email");
  const passwordInput = document.querySelector(".password");
  const passwordMatchInput = document.querySelector(".password-match");

  const emailErrorMessage = document.querySelector(".email-error-message");
  const passwordErrorMessage = document.querySelector(".password-error-message");
  const passwordErrorMessageMatch = document.querySelector(".password-match-error-message");

  const isSignupPage = window.location.pathname.includes("signup"); // Verifica se é a página de cadastro. Se for, retorna true. Caso contrário, retorna false.
  // signup é true e login é false

  // Mostrar/Ocultar senha
  if (btnViewPassword) {
    btnViewPassword.addEventListener("click", () => {
      if (passwordInput) {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      }
    });
  }

  let photoAvatar;

  // Login com Google
  if (btnSubmitGoogle) {
    btnSubmitGoogle.addEventListener("click", (evt) => {
      evt.preventDefault();
      const provider = new GoogleAuthProvider();
      // concede acesso ao usuário com o Google

      signInWithPopup(auth, provider)
        .then((userCredential) => {
          const userWithGoogle = userCredential.user; // imagem do avatar

          showToast("Login com Google bem-sucedido!");
          window.location.href = `/src/pages/home.html?uid=${userWithGoogle.uid}&photo=${encodeURIComponent(userWithGoogle.photoURL)}`; // Redirecionar após login

        }).catch((error) => {
          console.error("Erro no login com Google:", error.code, error.message);
          showToast("Erro no login com Google!", error.message);
        });
    });
  }

  // Botão principal (Login ou Cadastro)
  if (btnSubmit) {
    btnSubmit.addEventListener("click", async (event) => {
      event.preventDefault();

      const email = emailInput?.value.trim();
      const password = passwordInput?.value.trim();
      const passwordMatch = passwordMatchInput?.value.trim();

      if (!email || !password || (isSignupPage && !passwordMatch)) {
        alert("Por favor, preencha os campos obrigatórios.");
        return;
      }

      if (!validateEmail(email)) {
        inputEmailErrorMessage(emailErrorMessage);
        return;
      }

      if (!validatePassword(password)) {
        inputPasswordErrorMessage(passwordErrorMessage);
        return;
      }

      if (isSignupPage && password !== passwordMatch) {
        comparePasswords(password, passwordMatch, passwordErrorMessageMatch);
        return;
      }

      InitLoader();

      try {
        if (isSignupPage) {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          showToast("Usuário criado com sucesso!", "success");
          window.location.href = "/index.html";
        }

        if (!isSignupPage) {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          showToast("Login bem-sucedido!", "success");
          window.location.href = `/src/pages/home.html?${userCredential.user.uid}`;
        }

        setTimeout(() => {
          EndLoader();
          clearAndFocusEmailInput();
        }, 2000);
      } catch (error) {
        console.error("Erro de autenticação:", error.code, error.message);
        showToast("Erro de autenticação: " + error.message, "error");
        EndLoader();
      }
    });
  }
}); // prittier alt + shift + f