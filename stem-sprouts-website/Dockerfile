FROM node:20-alpine

WORKDIR /app

# Copy root package.json first
COPY package*.json ./

# Copy backend server files
COPY backend/server/ ./backend/server/

# Install dependencies in the backend/server directory
WORKDIR /app/backend/server
RUN npm ci || npm install

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
