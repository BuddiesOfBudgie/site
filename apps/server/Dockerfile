FROM node:19-slim AS base

FROM base as deps
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN corepack prepare yarn@stable --activate
RUN yarn --immutable
COPY node_modules ./

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build --filter="@buddiesofbudgie/server"

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/apps/server/dist /app/apps/server/*.graphql ./dist/
COPY --from=builder /app/apps/server/package.json ./package.json
RUN ls
RUN ls /app/
RUN ls /app/dist/

ENV PORT 4000
# This is off to allow for instrospection.
# We want our graphql to be easily introspectable and consumable by others
#ENV NODE_ENV production

EXPOSE 4000
CMD ["yarn", "start"]