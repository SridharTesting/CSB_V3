FROM nginx:latest
COPY ./dist/accelerator /usr/share/nginx/html
EXPOSE 80
# 443