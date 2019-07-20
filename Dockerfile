# Wrap CRA-based code with Nginx
FROM nginx:alpine

# copy static content and serve it
COPY build /usr/share/nginx/html
