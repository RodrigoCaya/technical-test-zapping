FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm config set legacy-peer-deps true
RUN npm install
RUN npm install -g serve

# Bundle app source
COPY . .

RUN npm run build

# Environment variables
ENV REACT_APP_API_URL=http://localhost:3001
ENV REACT_APP_VIDEO_URL=http://localhost:8000

# Expose the port the app runs on
EXPOSE 3000

# Serve the app with start:prod
CMD ["npm", "run", "start:prod"]
