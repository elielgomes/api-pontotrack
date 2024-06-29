# Use a imagem oficial do Node.js como a base
FROM node:20.11.1

# Defina o diretório de trabalho na imagem Docker
WORKDIR /usr/src/api

# Copie o package.json e o package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências
RUN npm install --quiet --no-optional --no-fund --loglevel=error

# Instale o Prisma CLI globalmente
RUN npm install -g prisma --quiet --no-optional --no-fund --loglevel=error

# Copie o restante do código da aplicação para o contêiner
COPY . .
COPY ./.env.production.local ./.env

# Construa a aplicação NestJS
RUN npm run build

# Gere os arquivos do Prisma
RUN npx prisma generate

# Defina a porta que a aplicação vai utilizar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
