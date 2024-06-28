# Use a imagem oficial do Node.js como a base
FROM node:20.11.1

# Defina o diretório de trabalho na imagem Docker
WORKDIR /app

# Copie o package.json e o package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o contêiner
COPY . .

# Construa a aplicação NestJS
RUN npm run build

# Defina a porta que a aplicação vai utilizar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
