FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Ensure that the node_modules directory is properly cleared and dependencies are reinstalled
RUN rm -rf node_modules
RUN npm install

# Run migrations
RUN npx sequelize db:migrate

# Build the application
RUN npm run build

# Start the application
CMD [ "npm", "run", "start" ]
