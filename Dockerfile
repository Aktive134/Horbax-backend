FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# Install npm version 8.x
RUN npm install -g npm@8

# Clean npm cache and install dependencies
RUN npm cache clean --force

# Install dependencies
RUN npm install --legacy-peer-deps || cat /root/.npm/_logs/*.log

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 4500

# Start the application
CMD ["npm", "run", "devstart"]
