# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .nprc ./

# Install dependencies
RUN npm install

# Copy prisma schema and source
COPY prisma ./prisma/
COPY src ./src/
COPY nest-cli.json ./
COPY tsconfig.json ./

# Generate Prisma Client and build
RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .nprc ./

# Install ALL dependencies including dev for prisma CLI
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Copy built files
COPY --from=builder /app/dist ./dist

# Generate Prisma Client at runtime
RUN npx prisma generate

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]