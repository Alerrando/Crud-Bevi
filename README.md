## Projeto CRUD Bevi

Este é um projeto CRUD simples utilizando React para a construção da interface do usuário (UI) e Playwright para testes automatizados. O objetivo é criar, ler, atualizar e excluir (CRUD) produtos de uma loja fictícia chamada Bevi.

## Pré-requisitos
Antes de iniciar a instalação, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- <a href="https://nodejs.org/en">Node.js</a>
- <a href="https://www.git-scm.com/downloads">Git</a>

## Tecnologias Utilizadas

- <a href="https://react.dev">React</a>: Biblioteca JavaScript para construção de interfaces de usuário.
- <a href="https://playwright.dev">Playwright</a>: Ferramenta de automação de teste para aplicativos da web.
- <a href="https://tanstack.com">@tanstack/react-query</a>: Biblioteca para gerenciamento de estado e cache de dados na aplicação React.
- <a href="https://zod.dev">Zod</a>: Biblioteca para validação de esquemas de dados.
- <a href="https://sonner.emilkowal.ski">Sonner</a>: Biblioteca para exibir notificações na aplicação.

## Funcionalidades

- **Listagem de Produtos**: Visualização dos produtos cadastrados na loja.
- **Cadastro de Produtos**: Adição de novos produtos ao estoque.
- **Edição de Produtos**: Atualização das informações de um produto existente.
- **Exclusão de Produtos**: Remoção de produtos do estoque.

### Como Utilizar

1. **Instalação**: Clone o repositório e instale as dependências utilizando npm ou yarn:
    ```
      git clone https://github.com/seu-usuario/crud-bevi.git
      cd crud-bevi
      npm install
    ```

2. **Execução do Servidor de Desenvolvimento**: Execute o servidor de desenvolvimento para visualizar a aplicação no navegador:

    ```
      npm run dev
    ```

3. **Execução dos Testes Automatizados:**: Execute os testes automatizados utilizando o Playwright:

    ```
      npm test
    ```

## Detalhes dos Testes Automatizados
Os testes automatizados foram escritos utilizando Playwright e abrangem as seguintes funcionalidades:

1. **Cadastro de Produto:** Verifica se é possível adicionar um novo produto ao estoque.

2. **Mensagem de Erro no Cadastro:** Verifica se é exibida uma mensagem de erro ao tentar cadastrar um produto com dados inválidos.

3. **Validação dos Campos no Cadastro:** Verifica se as mensagens de erro são exibidas corretamente quando os campos do formulário de cadastro não são preenchidos corretamente.

4. **Listagem de Produtos:** Verifica se a listagem de produtos é exibida corretamente na tela principal.

5. **Exibição de Mensagem de Erro na Listagem:** Verifica se é exibida uma mensagem de erro quando não há produtos para listar.

6. **Edição de Produto:** Verifica se é possível editar as informações de um produto existente.

7. **Exclusão de Produto:** Verifica se é possível excluir um produto do estoque.

## Estrutura do Projeto
A estrutura do projeto está organizada da seguinte forma:
```
crud-bevi/
│
├── public/                   # Arquivos públicos
├── src/                      # Código fonte
│   ├── api/                  # Funções de solicitação de API
│         ├── mock/           # Funções de mock para simulação de requisições de API durante os testes.
│   ├── components/           # Componentes reutilizáveis
│   ├── util/                 # Funções utilitárias
│   ├── pages/                # Páginas principais
│   ├── App.tsx               # Componente App
│   ├── main.tsx              # Função principal
│   └── vite-env.d.ts         # Tipos de ambiente Vite
├── test/                     # Playwright testes
├── .eslintrc.js              # ESLint configuração
├── jest.config.js            # Jest configuração
├── package.json              # Dependências e scripts do projeto
├── tsconfig.json             # TypeScript configuração
└── vite.config.ts            # Vite configuração
```

## Playwright Testes
Playwright é usado para teste end-to-end.

#### Configuration
Playwright configuration is defined in playwright.config.ts:
```
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://localhost:50789",
  },
  webServer: {
    command: "npm run dev:test",
    url: "http://localhost:50789",
    reuseExistingServer: !process.env.CI,
  },
});
```

### Executando Testes
Para executar os testes ni Playwright:

```
npx playwright test
```

### Demo
<img src="./github/Animação.gif" />

## Demos Páginas
<img src="./github/img-home.png" />
<img src="./github/img-register.png" />
