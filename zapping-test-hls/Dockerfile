FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm config set legacy-peer-deps true
RUN npm install

# Bundle app source
COPY . .

# Environment variables
ENV JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzM1MDQ0MywiaWF0IjoxNzA3MzUwNDQzfQ.-YTWFILlJ62hdlZq-VSUXDQjsE-WGqUaobsQ8KiVZWw
ENV PORT=8000

# Expose the port the app runs on
EXPOSE 8000

# Serve the app
CMD ["npm", "start"]
