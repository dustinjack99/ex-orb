FROM node:12.18-alpine As builder
# ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install 
COPY . .
RUN npm run build --production
FROM nginx:1.15.8-alpine
COPY --from=builder /usr/src/app/dist/ex-orb /usr/share/nginx/html