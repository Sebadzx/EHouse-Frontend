# Etapa de construcción
FROM node:20-alpine AS build-step

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/house-jesus /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



