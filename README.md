# TechBlog Web 🚀

Frontend moderno e responsivo desenvolvido em React para o ecossistema TechBlog. Este projeto integra-se com uma API REST em NestJS para gerenciamento de artigos e comentários.

## 🛠 Tecnologias e Ferramentas

- **Core:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Estilização:** [Material UI (MUI)](https://mui.com/) para componentes seguindo o design do Figma
- **Estado Global & Cache:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Navegação:** [React Router Dom](https://reactrouter.com/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/)
- **Chamadas API:** [Axios](https://axios-http.com/) com interceptors para JWT

## 📋 Pré-requisitos

- **Node.js:** >= 20.0.0
- **Gerenciador de pacotes:** npm ou pnpm

## 🚀 Começando

1. **Clone o repositório:**
   ```bash
   git clone <..>

   cd tech-blog-web
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto:**
   ```bash
   VITE_API_URL=http://localhost:3000
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🏗 Estrutura do Projeto

- **src/components:** Componentes reutilizáveis de UI
- **src/pages:** Páginas da aplicação (Landing, Login, Atigos, etc)
- **src/theme:** Configuração de temas e fontes (Newsreader) para o MUI
- **src/utils:** Funções auxiliares e helpers de validação


Desenvolvido por Gabriel Rodrigues 💻