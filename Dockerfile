# Use uma imagem base do Node.js com a versão especificada
FROM node:20.11.1

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração e dependências primeiro
COPY package*.json ./

# Instale as dependências
RUN npm install --quiet --no-optional --no-fund --loglevel=error

# Copie todo o restante do código da aplicação
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Compile o código TypeScript para JavaScript
RUN npm run build

# Defina a variável de ambiente para produção
ENV NODE_ENV=production

# Exponha a porta que a aplicação irá escutar
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
