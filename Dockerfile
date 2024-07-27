# Stage 1: Build the React application
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . . 

# Build the application
RUN npm run build

# Stage 2: Serve the application using nginx
FROM docker.io/library/nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]