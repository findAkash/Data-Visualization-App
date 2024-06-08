FROM node:v20.3.1

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8000
CMD ["npm", "start"]