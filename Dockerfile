# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/ ./

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
