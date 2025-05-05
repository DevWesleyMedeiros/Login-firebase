"use strict";

import { auth } from "@services/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

// Elementos principais
const btnLogout = document.getElementById("logout");
const inputAvatarAdd = document.getElementById("avatar-input");
const imgAvatar = document.getElementById("avatar-image");
const usuarioLogadoState = document.querySelector(".loginHomeState");
const cookiesConsentBox = document.querySelector(".banner-cookies-consent");

// janela de cookies

const COOKIE_KEY = "cookieConsent";
const btnAccept = document.querySelector(".btn-accept-cookies");
const btnReject = document.querySelector(".btn-reject-cookies");
const btnClose = document.querySelector(".btn-close-cookies");

document.addEventListener("DOMContentLoaded", () => {
    // Avatar de login (foto)
    const urlParams = new URLSearchParams(window.location.search);
    const avatarUrl = urlParams.get("photo");
    if (imgAvatar && avatarUrl) {
        imgAvatar.src = avatarUrl;
    }

    // Estado de login do usuário
    if (usuarioLogadoState) {
        onAuthStateChanged(auth, (user) => {
            usuarioLogadoState.textContent = user ? `Olá, ${user.displayName}` : "";
        });
    }

    // Preview do avatar
    inputAvatarAdd.addEventListener("change", () => {
        const file = inputAvatarAdd.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Logout
    btnLogout.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "/";
        }).catch((error) => {
            if (error.code === "auth/network-request-failed") {
                alert("Network error. Verifique sua conexão.");
            } else {
                alert("Erro ao sair. Tente novamente.");
            }
        });
    });

    

    // janela de cookies
    const getConsentStatus = () => localStorage.getItem(COOKIE_KEY);
    const setConsentStatus = (status) => localStorage.setItem(COOKIE_KEY, status);

    const showConsentBanner = () => {
        cookiesConsentBox?.classList.remove("hidden");
        cookiesConsentBox.style.display = "flex";
    };

    const hideConsentBanner = () => {
        cookiesConsentBox?.classList.add("hidden");
        cookiesConsentBox.style.display = "none";
    };

    // Mostrar após 2s se não houver consentimento salvo
    if (!getConsentStatus()) {
        setTimeout(() => {
            showConsentBanner();
        }, 2000);
    }

    btnAccept?.addEventListener("click", () => {
        setConsentStatus("accepted");
        hideConsentBanner();
    });

    btnReject?.addEventListener("click", () => {
        setConsentStatus("rejected");
        hideConsentBanner();
    });

    btnClose?.addEventListener("click", () => {
        hideConsentBanner(); // Não salva nada => voltará a aparecer
    });

    // Ação sensível: busca de livro
    const btnBuscarLivro = document.getElementById("btn_search");
    btnBuscarLivro?.addEventListener("click", () => {
        if (!getConsentStatus()) {
            showConsentBanner();
            return;
        }
        console.log("Executando busca de livros...");
        // Aqui entra sua lógica real de busca
    });
});
