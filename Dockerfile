# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (production-only)
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose the port on which the app will run
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]
