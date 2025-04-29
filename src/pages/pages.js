"use strict";

import {
    auth
} from "@services/firebaseConfig";
import {
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

const btnLogout = document.getElementById("logout");
const inputAvatarAdd = document.getElementById("avatar-input");
const imgAvatar = document.getElementById("avatar-image");
const usuarioLogadoState = document.querySelector(".loginHomeState");


document.addEventListener("DOMContentLoaded", () => {
    // capiturar o link da imagem do usuário
    const urlParams = new URLSearchParams(window.location.search);
    const avatarUrl = urlParams.get("photo");
    if (imgAvatar && avatarUrl) {
        imgAvatar.src = avatarUrl;
    }

    // mudança no estado para pegar o nome do usuário. Quando eu passo a função de update, eu capturo aqui o nome pelo display tanto para login com google quanto para email e senha
    if (usuarioLogadoState) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName;
                usuarioLogadoState.textContent = `Olá, ${displayName}`;
            } else {
                usuarioLogadoState.textContent = "";
            }
        });

    }

    inputAvatarAdd.addEventListener("change", () => {
        const file = inputAvatarAdd.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    btnLogout.addEventListener("click", () => {
        signOut(auth).then(() => {
        window.location.href = "/";
        }).catch((error) => {
            if (error.code === "auth/network-request-failed") {
                alert("Network error. Por favor, verifique sua conexão com a internet.");
            } else {
                alert("An error occurred. Por favor, tente novamente mais tarde.");
            }
        });
    });
});
