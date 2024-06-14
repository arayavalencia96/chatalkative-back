# Stage 1: Base stage
FROM node:node:20-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./

# Stage 2: Dependencies
FROM base AS dependencies
RUN yarn install --frozen-lockfile

# Stage 3: Development dependencies
FROM dependencies AS dev-dependencies
RUN yarn install --frozen-lockfile --dev

# Stage 4: Build
FROM dev-dependencies AS build
COPY . .
RUN yarn build

# Stage 5: Production
FROM base AS prod-dependencies
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]

# Stage 6: Development
FROM dev-dependencies AS development
COPY . .
CMD ["yarn", "start:dev"]
