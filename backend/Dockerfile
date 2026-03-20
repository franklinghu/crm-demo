# Use the official Node.js image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .nprc ./

# Install dependencies with exact versions
RUN npm install --save-exact

# Copy prisma schema
COPY prisma ./prisma/

# Copy all source code
COPY . .

# Generate Prisma Client
RUN ./node_modules/.bin/prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .nprc ./

# Install runtime dependencies + prisma for CLI
RUN npm install --save-exact --omit=dev && \
    npm install --save-exact prisma@5.22.0 @prisma/client@5.22.0

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]