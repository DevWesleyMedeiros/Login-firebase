# Firebase Auth & Firestore Test App

Este é um projeto de teste que conecta uma aplicação frontend com o Firebase, utilizando a autenticação (`auth`) e o armazenamento de dados no Firestore. O objetivo principal deste teste é explorar as funcionalidades do Firebase, como o login de usuários e o armazenamento de links de livros em uma aplicação mais ampla, que futuramente será uma página de download de livros.

## Tecnologias Utilizadas

- **HTML**: Estrutura da página.
- **CSS**: Estilização da página.
- **JavaScript (Vanilla)**: Lógica de interação e integração com o Firebase.
- **Firebase**: Serviços de autenticação (`auth`) e banco de dados em tempo real (`Firestore`).
- **Vite**: Ferramenta de construção e desenvolvimento rápido.

## Funcionalidades

### Autenticação com Firebase (Auth)

Este projeto utiliza a Firebase Authentication para autenticar os usuários na aplicação. O Firebase oferece vários métodos de autenticação, e no momento, dois métodos principais estão sendo utilizados:

1. **Login com E-mail e Senha**
   - Os usuários podem se registrar com um endereço de e-mail e uma senha, e então fazer login usando essas credenciais.
   
2. **Login com Google**
   - Os usuários também têm a opção de fazer login usando suas contas Google, o que facilita a autenticação sem a necessidade de criar uma nova senha.

### Firestore

O Firebase Firestore é utilizado para armazenar os dados relacionados aos livros. No caso deste projeto de teste, o Firestore será configurado para armazenar links para os livros, mas a estrutura pode ser expandida conforme as necessidades do projeto.

### Fluxo de Autenticação

1. **Login com E-mail e Senha**
   - O usuário fornece um e-mail e uma senha, que são verificados pelo Firebase.
   - Caso a autenticação seja bem-sucedida, o usuário é redirecionado para a página de conteúdo da aplicação.

2. **Login com Google**
   - O usuário clica no botão de login do Google.
   - O Firebase autentica a conta do Google do usuário e realiza o login na aplicação automaticamente.
   
## Como Executar o Projeto
### Antes de instalar e executar o projeto, certifique-se de ter o Node.js e o npm instalados em sua máquina. Além de uma conta no firebase e já configurado o métodos de login com e-mail e senha e login com google.

Feito isso, siga os passos abaixo:
### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/firebase-auth-test.git
```
### 2. Instalar as Dependências
```bash
cd firebase-auth-test
npm install
```
### 3. Rodar o projeto
```bash
npm run dev
```

