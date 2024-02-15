# Use Node.js version iron 20+ LTS
FROM node:lts-iron as development

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose Port
EXPOSE 3000

# Command to run the app for local development
CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true