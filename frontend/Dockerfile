FROM node:14-alpine
LABEL authors="comercaleuros@gmail.com"

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
