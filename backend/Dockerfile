# Use the official Node.js image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all package files
COPY package*.json ./

# Install ALL dependencies (including dev)
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Copy all source code
COPY . .

# Generate Prisma Client and build
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (we need prisma CLI)
RUN npm install

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Run migrations and start
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
