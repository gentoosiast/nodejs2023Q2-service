# build image for local development

FROM node:18-alpine AS development

USER node

WORKDIR /usr/src/app

COPY --chown=node:node prisma package*.json ./

RUN npm ci && npx prisma generate && npm cache clean --force

COPY --chown=node:node . .

# build image for production

FROM node:18-alpine AS build

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

# copy production build files & start the server

FROM node:18-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/src/main.js"]
