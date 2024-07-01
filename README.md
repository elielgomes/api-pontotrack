# API para Plataforma de Rastreamento de Veículos

## 📌 Visão Geral

Este projeto é uma API RESTful para gerenciamento de usuários em uma plataforma de rastreamento de veículos. Foi desenvolvida utilizando Node.js com o framework NestJS e utiliza PostgreSQL como banco de dados. A autenticação é feita via JWT (JSON Web Token).

## 👨🏻‍💻 Tecnologias Utilizadas

![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)&nbsp;
![Nest](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)&nbsp;
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)&nbsp;
![PrismaORM](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)&nbsp;
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)&nbsp;

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **NestJS**: Framework para Node.js que facilita a criação de aplicativos escaláveis e robustos.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Prisma ORM**: ORM (Object-Relational Mapping) para trabalhar com bancos de dados SQL.
- **JWT**: JSON Web Token para autenticação segura.
- **Docker**: Para gerenciamento de contêineres e criação de ambientes consistentes.
- **Docker Compose**: Ferramenta para definir e gerenciar ambientes Docker multi-conteineres.


## 📂 Estrutura de Pastas Principais

```text
src/
│
├── modules/
│   ├── auth/              # Módulo de autenticação
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   │
│   ├── prisma/            # Configurações e serviços relacionados ao Prisma ORM
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts		 
│   │
│   └── user/              # Módulo de usuário
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.service.ts
│       ├── user.repository.ts
│       └── dto/
│           ├── create-user.dto.ts
│           ├── update-password.dto.ts
│           └── update-user.dto.ts
│
├── app.controller.ts
├── app.module.ts          # Módulo principal da aplicação
└── main.ts                # Ponto de entrada da aplicação
```

## ⚙️ Instalação e Configuração

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior.
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### 🔧 Passos para Configuração

1. **Clone o Repositório:**

```bash
git clone https://github.com/elielgomes/api-pontotrack.git
cd api-pontotrack
```

2. **Instale as Dependências:**

```bash
npm install
```

3. **Configuração do Banco de Dados:**

Utilize o Docker Compose para subir a instância do PostgreSQL:

```bash
docker-compose up -d
```

4. **Configuração das Variáveis de Ambiente:**

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/docker?schema=public"
JWT_SECRET=[Escolha uma chave segura para assinar os JWTs]
PORT=3001
APP_URL=[A URL local do seu front-end]
```

5. **Rodar as Migrações do Prisma:**

```bash
npx prisma migrate dev
```

6. 🚀 **Iniciar a Aplicação:**

```bash
npm run start:dev
```

## ✏️ Documentação dos Endpoints

### `/ping` (HEAD)

**Descrição:** Verifica se a API está ativa.

**Resposta:** Código HTTP 200 se a API estiver online.

### `/user/me` (GET)

**Descrição:** Retorna informações do usuário autenticado.

**Autenticação:** Requer um JWT no cabeçalho `Authorization`.

**Resposta:** Dados do usuário autenticado.

### `/user` (PATCH)

**Descrição:** Atualiza informações do usuário.

**Autenticação:** Requer um JWT no cabeçalho `Authorization`.

**Corpo da Requisição:** Objeto JSON com informações a serem atualizadas.

**Resposta:** Dados atualizados do usuário.

### `/user` (POST)

**Descrição:** Cria um novo usuário.

**Corpo da Requisição:** Objeto JSON com os dados do novo usuário.

**Resposta:** Dados do usuário criado.

### `/user` (DELETE)

**Descrição:** Deleta um usuário.

**Autenticação:** Requer um JWT no cabeçalho `Authorization`.

**Resposta:** Confirmação de deleção.

### `/user/password` (PATCH)

**Descrição:** Atualiza a senha do usuário.

**Autenticação:** Requer um JWT no cabeçalho `Authorization`.

**Corpo da Requisição:** Objeto JSON com a nova senha.

**Resposta:** Confirmação de atualização da senha.

### `/auth/login` (POST)

**Descrição:** Realiza o login do usuário.

**Corpo da Requisição:** Credenciais de login (email e senha).

**Resposta:** JWT para autenticação.

## 🔐 Configuração de Segurança

- **Autenticação JWT:** Utiliza JSON Web Tokens para autenticação de usuários. Assegure-se de manter o `JWT_SECRET` seguro e não o exponha em repositórios públicos.
- **CORS:** Configurado para permitir acesso apenas de domínios confiáveis. Ajuste conforme necessário para seu ambiente de produção.
- **Variáveis de Ambiente:** Nunca exponha variáveis de ambiente sensíveis. Utilize ferramentas de gerenciamento de segredos quando necessário.

## 🐋 Docker

### Arquivo `docker-compose.yml`

```yml
version: '3.9'
services:
  postgres:
    image: postgres
    ports:
      - "5432:5432"
    volumes:
      - ./.docker/postgres/:/var/lib/postgresql/data
    restart: unless-stopped
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=docker
    networks:
      - network

  pgbouncer:
    image: edoburu/pgbouncer
    environment:
      - DB_USER=docker
      - DB_PASSWORD=docker
      - DB_HOST=postgres
      - DB_NAME=docker
      - POOL_MODE=transaction
      - ADMIN_USERS=docker
      - AUTH_TYPE=plain
    ports:
      - "6432:5432"
    depends_on:
      - postgres
    networks:
      - network

networks:
  network:
    driver: bridge
```

### 🛠️ Comandos Úteis

- **Subir Contêineres:**

```bash
docker-compose up -d
```

- **Derrubar Contêineres:**

```bash
docker-compose down
```

## 📄 Licença

Este projeto está sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](https://github.com/elielgomes/api-pontotrack/blob/main/LICENSE.md).

## ✒️ Autor

Feito por [Eliel Gomes](https://github.com/elielgomes).
