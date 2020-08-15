FROM node:12.18-alpine
# ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 
COPY . .
RUN npm run build --production
CMD ["npm", "start"]
