# Happy: Back-end

### ⚒️ Features

- [x] Cadastro de orfanato
- [x] Listagem de orfanatos
- [x] Detalhes d orfanato
- [x] Upload de imagens

### ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 👩‍💻 Utilização

#### Clonando o repositório

```bash
# Clone este repositório
$ git clone <git@github.com:Fekleite/happy.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd happy
```

#### Instalando as dependências

```bash
# Acesse a pasta do servidor no terminal/cmd
$ cd backend

# Instale as dependências
$ yarn install 
```

#### Iniciando o servidor

```bash
# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

### 🚀 Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sqlite](https://www.sqlite.org/index.html)
- [TypeORM](https://typeorm.io#/)

### 🚀 Endpoints:

- **GET**: `/orphanages` - Listagem de orfanatos
- **POST**: `/orphanages` - Cadastro de orfanato
- **GET**: `/orphanages/:id` - Detalhes do orfanato
