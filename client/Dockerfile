#  Use Node.js image 
FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies 
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
