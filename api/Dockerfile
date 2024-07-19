FROM node:18-alpine

RUN npm config set registry https://registry.npmmirror.com

RUN npm i -g pnpm

RUN pnpm config set registry https://registry.npmmirror.com

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

COPY .env.production ./

COPY ./dist ./dist

RUN pnpm i

EXPOSE 8081 8080

CMD ["pnpm", "run", "start:prod"]