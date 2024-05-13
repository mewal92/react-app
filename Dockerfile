
FROM node:18.15.0-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
RUN yarn install
RUN npm install
COPY . .
RUN yarn build
EXPOSE 3000
ENV PORT 3000
CMD ["npx", "serve", "-s", "build", "npm", "start", "node", "server.js"]
