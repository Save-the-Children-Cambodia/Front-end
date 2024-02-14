FROM node:18.18.0
WORKDIR /src/App
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
