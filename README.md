# API para Plataforma de Rastreamento de Veículos

## 📌 Visão Geral

Este projeto é uma API RESTful para gerenciamento de usuários em uma plataforma de rastreamento de veículos. Foi desenvolvida utilizando Node.js com o framework NestJS e utiliza PostgreSQL como banco de dados. A autenticação é feita via JWT.

## 👨🏻‍💻 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **NestJS**: Framework para Node.js que facilita a criação de aplicativos escaláveis e robustos.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Prisma ORM**: ORM para trabalhar com bancos de dados SQL.
- **JWT**: JSON Web Token para autenticação segura.
- **Docker**: Para gerenciamento de contêineres e criação de ambientes consistentes.
- **Docker Compose**: Ferramenta para definir e gerenciar ambientes Docker multi-conteineres.

## Estrutura de Pastas Principais

```text
src/
│
├── modules/
|   |
|   ├── auth/              # Módulo de autenticação
|   │   ├── decorators/
|   │   ├── guards/
|   │   ├── middlewares/
|   │   ├── models/
|   │   ├── strategies/
|   │   ├── auth.controller.ts
|   │   ├── auth.module.ts
|   │   └── auth.service.ts
|   │
|   ├── prisma/            # Configurações e serviços relacionados ao Prisma ORM
|   │   ├── prisma.module.ts
|   │   └── prisma.service.ts		 
|   │
|   └── user/              # Módulo de usuário
|       ├── user.controller.ts
|       ├── user.module.ts
|       ├── user.service.ts
|       ├── user.repository.ts
|       └── dto/
|           ├── create-user.dto.ts
|           ├── update-password.dto.ts
|           └── update-user.dto.ts
|
├── app.controller.ts
├── app.module.ts      # Módulo principal da aplicação
└── main.ts            # Ponto de entrada da aplicação
```

## ⚙️ Instalação e Configuração

### 📋 Pré-requisitos

- Node.js >=18
- Docker e Docker Compose instalados

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
Verifica se a API está ativa.

**Descrição:** Este endpoint verifica se a API está online.

### `/user/me` (GET)
Retorna informações do usuário autenticado.

**Descrição:** Recebe um JWT nos Headers Authorization e retorna os detalhes do usuário logado.

### `/user` (PATCH)
Atualiza informações do usuário.

**Descrição:** Recebe um objeto com informações para atualizar o usuário.

### `/user` (POST)
Cria um novo usuário.

**Descrição:** Cria um novo usuário com os dados fornecidos.

### `/user` (DELETE)
Deleta um usuário.

**Descrição:** Remove o usuário especificado.

### `/user/password` (PATCH)
Atualiza a senha do usuário.

**Descrição:** Recebe um JWT e uma nova senha para atualizar a senha do usuário.

### `/auth/login` (POST)
Realiza o login do usuário.

**Descrição:** Recebe as credenciais de login e autentica o usuário.

## 🔐 Configuração de Segurança

- Autenticação JWT: Utiliza JSON Web Tokens para autenticação de usuários. Assegure-se de manter o JWT_SECRET seguro.
- CORS: Configurado para permitir acesso apenas de domínios confiáveis.
- Env Variables: Nunca exponha as variáveis de ambiente sensíveis em repositórios públicos.

## 🐋 Docker
### Arquivo docker-compose.yml

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
- Subir Contêiners
```bash
docker-compose up -d
```

- Derrubar Contêiners
```bash
docker-compose up -d
```

## 📄 Licença
Este projeto está sob a licença MIT

## ✒️ Autor
Feito por Eliel Gomes