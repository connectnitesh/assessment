# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port that your Express.js application listens on (e.g., 3000)
EXPOSE 4000

# Define the command to run your application
CMD ["node", "app.js"]
