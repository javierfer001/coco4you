server {
    listen 80;
    server_name coco4youusa.com;
    # sudo ln -s /etc/nginx/sites-available/coco4youusa.com /etc/nginx/sites-enabled/coco4youusa.com
    # sudo nginx -t
    # sudo systemctl reload nginx
    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}