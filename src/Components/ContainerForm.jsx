import React from 'react'

export const ContainerForm = () => (
  <div className="container-form">
    <h1 className="form-title">Entrar na sua conta</h1>
    <form className="form__container">
      <label htmlFor="email-login">Digite seu Email</label>
      <input
        type="email"
        placeholder="Digite seu Email"
        className="inputs__form email"
        autoComplete="on"
        required=""
        id="email-login"
      />
      <label htmlFor="password-login">Digite sua Senha</label>
      <input
        type="password"
        placeholder="Digite sua senha"
        className="inputs__form password"
        id="password-login"
        required=""
        maxLength={8}
      />
      <div className="container-btn-submit">
        <input
          type="submit"
          defaultValue="Logar"
          className="inputs__form input-submit btn__form btn-submit"
        />
        <input
          type="button"
          defaultValue="Logar com Google"
          className="inputs__form btn__form input-submit btn-submit-google"
        />
      </div>
      <a href="/signup.html" target="_self" className="btn__signup">
        <span>Não possui conta? </span>
        Cadastre-se
      </a>
    </form>
  </div>
);
