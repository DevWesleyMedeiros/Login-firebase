import React, { useEffect, useRef, useState } from "react";
import { auth } from "@services/firebaseConfig"; // Usando alias
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Para navegação

export const Header = () => {
  const inputAvatarRef = useRef(null);
  // const imgAvatarRef = useRef(null); // imgAvatarRef não está sendo usado para nada além de atribuir ref
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // Inicializar com um placeholder ou null
  const navigate = useNavigate();

  useEffect(() => {
    // Tentar obter a foto da URL não é uma prática comum para estado persistente do avatar.
    // O avatar do usuário geralmente vem do objeto 'user' do Firebase Auth.
    // const params = new URLSearchParams(window.location.search);
    // const photoFromUrl = params.get("photo");
    // if (photoFromUrl) setAvatarUrl(decodeURIComponent(photoFromUrl));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "Usuário"); // Fallback para displayName
        setAvatarUrl(user.photoURL || "/default-avatar.png"); // Usar foto do perfil do Firebase ou um placeholder
      } else {
        // Usuário deslogado, limpar informações
        setUserName("");
        setAvatarUrl("");
      }
    });
    return () => unsubscribe(); // Limpar listener
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarUrl(event.target.result);
      // Aqui você normalmente faria o upload da imagem para o Firebase Storage
      // e atualizaria o photoURL do usuário no Firebase Auth.
      // Ex: uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef)).then(url => updateProfile(auth.currentUser, { photoURL: url }))
      console.log(
        "Avatar selecionado, pronto para upload:",
        event.target.result
      );
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirecionar para login após sair
    } catch (err) {
      console.error("Erro ao sair: ", err);
      alert("Erro ao sair: " + err.message); // Evitar alert para erros, usar toasts
    }
  };

  const triggerAvatarUpload = () => {
    inputAvatarRef.current?.click();
  };

  return (
    <header>
      <div className="container-avatar">
        <div
          className="avatar-circle"
          title="Colocar uma imagem"
          onClick={triggerAvatarUpload}
          style={{ cursor: "pointer" }}
        >
          {/* Label não é necessário se o clique for no div */}
          <img
            src={avatarUrl || "/path/to/default-avatar.png"} // Tenha uma imagem de avatar padrão
            className="avatar-image"
            // ref={imgAvatarRef} // Não é necessário se não estiver manipulando diretamente
            alt="avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/path/to/default-avatar.png";
            }} // Fallback se a imagem falhar
          />
        </div>
        <input
          type="file"
          id="avatar-input" // id pode não ser necessário se não houver label explícito
          ref={inputAvatarRef}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
        <p className="loginHomeState">Olá, {userName || "Visitante"}</p>
      </div>

      <div className="search-books-container">
        <input
          type="search"
          className="search"
          placeholder="Pesquisar livros"
          id="search-books-input" // ID mais específico
        />
        <button
          className="btn_search"
          onClick={() => console.log("Executar busca de livro")}
        >
          Buscar livro
        </button>
      </div>

      <div className="btn-logout">
        <button className="logout" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
};
