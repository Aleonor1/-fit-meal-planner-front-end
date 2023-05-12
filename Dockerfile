FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "start" ]

