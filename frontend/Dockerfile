FROM node:14-alpine
LABEL authors="comercaleuros@gmail.com"

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
EXPOSE 3000
