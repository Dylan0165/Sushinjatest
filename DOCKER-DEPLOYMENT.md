# 🥷 Sushinja - Docker Deployment Guide

## 📦 Bestanden
- `Dockerfile` - Multi-stage Docker build (Node.js + Nginx)
- `docker-compose.yml` - Docker Compose configuratie
- `nginx.conf` - Nginx server configuratie
- `.dockerignore` - Files die Docker moet negeren
- `build-docker.sh` / `build-docker.bat` - Build scripts

---

## 🚀 Quick Start

### Optie 1: Docker Compose (Aanbevolen)
```bash
# Build en start container
docker-compose up -d

# Stop container
docker-compose down

# Logs bekijken
docker-compose logs -f

# Rebuild na wijzigingen
docker-compose up -d --build
```

### Optie 2: Docker CLI
```bash
# Build image
docker build -t sushinja:latest .

# Run container
docker run -d -p 80:80 --name sushinja-web sushinja:latest

# Stop container
docker stop sushinja-web

# Verwijder container
docker rm sushinja-web

# Logs bekijken
docker logs -f sushinja-web
```

### Optie 3: Build Scripts
**Windows:**
```cmd
build-docker.bat
```

**Linux/Mac:**
```bash
chmod +x build-docker.sh
./build-docker.sh
```

---

## 🔧 VS Code Docker Extension

### Installeer Docker Extension:
1. Open VS Code
2. Ga naar Extensions (Ctrl+Shift+X)
3. Zoek "Docker" (van Microsoft)
4. Klik op Install

### Build via VS Code:
1. Open Command Palette (Ctrl+Shift+P)
2. Type: **"Docker: Build Image"**
3. Selecteer Dockerfile
4. Tag: `sushinja:latest`

### Run via VS Code:
1. Command Palette → **"Docker: Run"**
2. Selecteer image `sushinja:latest`
3. Port mapping: `80:80`

---

## 🌐 Toegang tot de App

Na het starten:
- **Lokaal:** http://localhost
- **Server:** http://[jouw-server-ip]

---

## 📊 Docker Image Details

### Build Proces:
1. **Stage 1 (Builder):**
   - Node.js 18 Alpine
   - `npm ci` - Clean install
   - `npm run build` - Vite build naar `dist/`

2. **Stage 2 (Production):**
   - Nginx Alpine (klein!)
   - Copy dist files
   - Serve static files

### Image Size:
- **Total:** ~50MB (Alpine + Nginx)
- **Build time:** ~2-3 minuten

---

## 🔍 Troubleshooting

### Build fails?
```bash
# Clean build zonder cache
docker build --no-cache -t sushinja:latest .
```

### Port 80 al in gebruik?
```bash
# Gebruik andere port (bijv. 8080)
docker run -d -p 8080:80 --name sushinja-web sushinja:latest
```

### Container logs bekijken:
```bash
docker logs sushinja-web
```

### In container gaan:
```bash
docker exec -it sushinja-web sh
```

---

## 🚢 Deployment naar Server

### 1. Build en save image:
```bash
docker build -t sushinja:latest .
docker save sushinja:latest | gzip > sushinja-docker.tar.gz
```

### 2. Upload naar server:
```bash
scp sushinja-docker.tar.gz user@server:/tmp/
```

### 3. Load op server:
```bash
ssh user@server
cd /tmp
gunzip -c sushinja-docker.tar.gz | docker load
docker run -d -p 80:80 --name sushinja-web sushinja:latest
```

### Alternatief: Docker Registry
```bash
# Tag voor registry
docker tag sushinja:latest your-registry/sushinja:latest

# Push naar registry
docker push your-registry/sushinja:latest

# Pull op server
docker pull your-registry/sushinja:latest
docker run -d -p 80:80 --name sushinja-web your-registry/sushinja:latest
```

---

## 🔒 Production Setup

### SSL met Let's Encrypt:
```yaml
# docker-compose.yml aanpassen
version: '3.8'

services:
  sushinja-web:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
```

### Environment Variables:
```bash
docker run -d \
  -p 80:80 \
  -e NODE_ENV=production \
  -e API_URL=https://api.sushinja.nl \
  --name sushinja-web \
  sushinja:latest
```

---

## 📝 Handige Commands

```bash
# Alle containers bekijken
docker ps -a

# Alle images bekijken
docker images

# Disk usage
docker system df

# Cleanup oude images/containers
docker system prune -a

# Container resources bekijken
docker stats sushinja-web

# Container herstarten
docker restart sushinja-web

# Container updaten
docker-compose pull
docker-compose up -d
```

---

## ✅ Checklist Deployment

- [ ] Docker geïnstalleerd op server
- [ ] Dockerfile getest lokaal
- [ ] Build succesvol
- [ ] Container draait op :80
- [ ] Website toegankelijk
- [ ] Nginx configuratie correct
- [ ] SSL certificaat (productie)
- [ ] Firewall regels (port 80/443)
- [ ] Domain DNS naar server
- [ ] Monitoring setup

---

**🎉 Je Sushinja website draait nu in Docker!**

Voor vragen: Check `docker logs sushinja-web`
