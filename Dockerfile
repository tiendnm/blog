# Build BASE
FROM node:lts-alpine3.19 as BASE
LABEL author="miti"

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
RUN npm cache clean --force
# Build Image
FROM node:lts-alpine3.19 AS BUILD
LABEL author="miti"

WORKDIR /app
COPY . .
RUN npm install
RUN npm install sharp
RUN npm run build
RUN cd .next/standalone
# Build production
FROM node:lts-alpine3.19 AS PRODUCTION
LABEL author="miti"

WORKDIR /app

COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/.next/static ./.next/static
COPY --from=BUILD /app/.next/server ./.next/server

EXPOSE 3000

CMD node server.js
#docker build -t tiendnm/portfolio -f Dockerfile .