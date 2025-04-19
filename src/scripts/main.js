"use strict";

import {
  validateEmail,
  validatePassword,
  clearAndFocusEmailInput,
  inputEmailErrorMessage,
  inputPasswordErrorMessage,
  comparePasswords,
  InitLoader,
  EndLoader
}
from "@utils/functions";

import {
  auth
}
from "@scripts/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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

  const isSignupPage = window.location.pathname.includes("signup"); // Verifica se é a página de cadastro

  // Mostrar/Ocultar senha
  if (btnViewPassword) {
    btnViewPassword.addEventListener("click", () => {
      if (passwordInput) {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      }
      if (passwordMatchInput) {
        passwordMatchInput.type = passwordMatchInput.type === "password" ? "text" : "password";
      }
      });
  }

  // Login com Google
  if (btnSubmitGoogle) {
    btnSubmitGoogle.addEventListener("click", (evt) => {
          evt.preventDefault();
          signInWithPopup(auth, provider)
            .then((userCredential) => {
          alert("Login com Google bem-sucedido!");
          console.log("Usuário do Google:", userCredential.user);
          window.location.href = "../../index.html"; // Redirecionar após login
          })
          .catch((error) => {
          console.error("Erro no login com Google:", error.code, error.message);
          alert("Falha no login com Google: " + error.message);
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
          window.alert(`Usuário cadastrado:", ${userCredential.user.uid}`);
        } else {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log(`Usuário logado: ${userCredential.user.uid}`);
        }

        setTimeout(() => {
          EndLoader();
          clearAndFocusEmailInput();
        }, 2000);
      } catch (error) {
        console.error("Erro de autenticação:", error.code, error.message);
        alert("Erro: " + error.message);
        EndLoader();
      }
    });
  }
});