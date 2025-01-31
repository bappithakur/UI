# Name the node stage "builder"
FROM  node:16-alpine AS builder
# Set working directory
WORKDIR /UI
# Copy all files from current directory to working dir in image
COPY UI/ /UI
# install node modules and build assets
RUN npm install

COPY UI/ /UI
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder UI/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]





