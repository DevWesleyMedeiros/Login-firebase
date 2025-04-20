"use strict";

import { auth } from "@scripts/firebaseConfig";
import { signOut } from "firebase/auth";

const btnLogout = document.getElementById("logout");

document.addEventListener("DOMContentLoaded", () => {
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
