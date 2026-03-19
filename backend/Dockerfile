# Use the official Node.js image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Delete lock file to ensure fresh install
RUN rm -f package-lock.json npm-lock.json

# Install ALL dependencies (including dev)
RUN npm install --legacy-peer-deps

# Copy prisma schema
COPY prisma ./prisma/

# Copy all source code
COPY . .

# Generate Prisma Client using local installation
RUN ./node_modules/.bin/prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (we need prisma CLI)
RUN npm install --legacy-peer-deps

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Run migrations and start using local prisma
CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && npm run start:prod"]
