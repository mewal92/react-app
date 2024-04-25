
FROM node:18.15.0-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn install
COPY . .
RUN yarn build
CMD ["npx", "serve", "-s", "build"]
