import React from "react";
// Certifique-se que os caminhos dos aliases estão corretos e as pastas existem com esses nomes
import { Header } from "@components/Header";
import { BannerCookies } from "@components/BannerCookies";
import { MainContent } from "@components/MainContent";

// Correção na declaração e exportação do componente
const Home = () => {
  return (
    <div className="home">
      <Header />
      <BannerCookies />
      <MainContent />
    </div>
  );
};

export default Home;
