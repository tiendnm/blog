# Build BASE
FROM node:lts-alpine3.19 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Build Image
FROM base AS build
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm add sharp
RUN pnpm run build
RUN cd .next/standalone

# Build production
FROM node:lts-alpine3.19 AS prod
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/.next/server ./.next/server

EXPOSE 3000

CMD node server.js
