# Use the base image with Node.js 12.16.3
FROM node:12.22.7

# Copy the current directory into the Docker image
COPY . /model-api-kafka

# Set working directory for future use
WORKDIR /model-api-kafka

# Install the dependencies from package.json
RUN npm install
CMD npm start
