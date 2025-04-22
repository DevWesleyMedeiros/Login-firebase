"use strict";

import { auth } from "@scripts/firebaseConfig";
import { signOut } from "firebase/auth";

const btnLogout = document.getElementById("logout");
const inputAvatarAdd = document.getElementById("avatar-input");
const imgAvatar = document.getElementById("avatar-image");

document.addEventListener("DOMContentLoaded", () => {
    // capiturar o link da imagem do usuário
    const urlParams = new URLSearchParams(window.location.search);
    const avatarUrl = urlParams.get("photo");
    if (imgAvatar && avatarUrl) {
        imgAvatar.src = avatarUrl;
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
