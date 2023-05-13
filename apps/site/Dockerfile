# Based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

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
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build --filter="@buddiesofbudgie/site"

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/apps/site/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/apps/site/next.config.js ./
COPY --from=builder /app/apps/site/.next/standalone ./
COPY --from=builder /app/apps/site/.next/static ./.next/static
ENV PORT 3000
EXPOSE 3000

CMD ["node", "apps/site/server.js"]