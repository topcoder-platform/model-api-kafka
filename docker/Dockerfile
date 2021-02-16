# Use the base image with Node.js 12.16.3
FROM node:12.16.3

# Copy the current directory into the Docker image
COPY . /processor-template

# Set working directory for future use
WORKDIR /processor-template

# Install the dependencies from package.json
RUN npm install
CMD npm start
