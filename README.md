# Desafio Node.js 01

Este projeto foi desenvolvido durante uma aula da formação Node.js da [Rocketseat](https://rocketseat.com.br/). O objetivo é criar uma API REST para gerenciamento de tarefas (ToDo), utilizando apenas Node.js puro, sem frameworks como Express.

## 📑 Sumário

- [📝 Descrição](#descrição)
- [⚙️ Instalação](#instalação)
- [🚀 Como usar](#como-usar)
- [🔗 Rotas da API](#rotas-da-api)
- [🛠️ Scripts](#scripts)
- [🗂️ Estrutura do Projeto](#estrutura-do-projeto)
- [📄 Licença](#licença)

---

## 📝 Descrição

A aplicação consiste em uma API para cadastro, listagem, atualização, remoção e marcação de tarefas como concluídas. Os dados são armazenados em um arquivo local (`db.json`), simulando um banco de dados.

---

## ⚙️ Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/desafio-nodejs-01.git
   cd desafio-nodejs-01
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```
   > 💡 Você pode usar `npm` ou `yarn` se preferir, mas o projeto utiliza `pnpm`.

---

## 🚀 Como usar

- **Inicie o servidor em modo desenvolvimento:**

  ```bash
  pnpm start:dev
  ```

  O servidor ficará disponível em `http://localhost:5555`.

- **Importe tarefas a partir de um arquivo CSV:**
  Coloque o arquivo `tasks.csv` na pasta `uploads/` e execute:
  ```bash
  pnpm import
  ```

---

## 🔗 Rotas da API

- **GET `/tasks`**

  - Lista todas as tarefas cadastradas.
  - Permite busca por título ou descrição usando o parâmetro de query `search`.

- **POST `/tasks`**

  - Cria uma nova tarefa.
  - Corpo esperado (JSON):
    ```json
    {
      "title": "Título da tarefa",
      "description": "Descrição da tarefa"
    }
    ```

- **PUT `/tasks/:id`**

  - Atualiza o título e/ou descrição de uma tarefa existente.
  - Corpo esperado (JSON):
    ```json
    {
      "title": "Novo título",
      "description": "Nova descrição"
    }
    ```

- **PATCH `/tasks/:id/complete`**

  - Marca uma tarefa como concluída ou reabre uma tarefa já concluída.

- **DELETE `/tasks/:id`**
  - Remove uma tarefa pelo ID.

---

## 🛠️ Scripts

- `start:dev`: Inicia o servidor com hot reload.
- `import`: Importa tarefas do arquivo `uploads/tasks.csv` para a API.

---

## 🗂️ Estrutura do Projeto

```
src/
  db/
    database.js           # Lógica de persistência dos dados em arquivo
  middleware/
    json.js               # Middleware para parse de JSON nas requisições
  routes/
    routes.js             # Definição das rotas da API
  scripts/
    import-tasks-to-csv.js# Script para importar tarefas de um CSV
  utils/
    build-rout-path.js    # Utilitário para construir regex de rotas
    extract-query-params.js # Utilitário para extrair query params
  server.js               # Inicialização do servidor HTTP
uploads/
  tasks.csv               # 📂 Exemplo de arquivo CSV para importação
```

---

## 📄 Licença

Este projeto está sob a licença MIT.

---
