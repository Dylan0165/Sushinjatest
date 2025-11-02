# 🏠 Self-Hosted GitHub Runner Deployment

## ✅ Voordelen Self-Hosted Runner

Met je eigen runner op de server:
- ✅ **Geen SSH keys nodig** - Direct lokale toegang
- ✅ **Geen Docker registry** - Images blijven lokaal
- ✅ **Sneller** - Geen upload/download van images
- ✅ **Goedkoper** - Geen GitHub Actions minuten verbruik
- ✅ **Meer controle** - Full access tot je server
- ✅ **Private secrets** - Keys blijven op je server

---

## 📋 Je hebt nu 3 workflows:

### 1. `deploy-selfhosted.yml` (Simpel - Aanbevolen)
**Gebruik:** Basis deployment voor development

**Features:**
- ✅ Build Docker image
- ✅ Stop oude container
- ✅ Start nieuwe container
- ✅ Cleanup oude images

**Trigger:** Push naar main

---

### 2. `deploy-production.yml` (Advanced - Production Ready)
**Gebruik:** Production deployment met safety features

**Features:**
- ✅ Build met versioning
- ✅ Image testing voor deploy
- ✅ **Backup van huidige container**
- ✅ Health checks
- ✅ **Automatische rollback bij failure**
- ✅ Deployment notifications
- ✅ Cleanup met retention (keep last 3)

**Trigger:** Push naar main (ignores .md files)

---

### 3. `deploy-ghcr.yml` (Cloud - Backup optie)
**Gebruik:** Deployment via GitHub Container Registry

**Features:**
- ✅ Build in cloud
- ✅ Push naar registry
- ✅ Deploy via SSH
- ✅ Werkt zonder self-hosted runner

**Gebruik wanneer:** Self-hosted runner offline is

---

## 🎯 Welke Workflow Gebruiken?

### **Development/Testing:**
```yaml
# .github/workflows/deploy-selfhosted.yml
runs-on: self-hosted
```
- Snel en simpel
- Perfect voor iteraties
- Directe feedback

### **Production:**
```yaml
# .github/workflows/deploy-production.yml
runs-on: self-hosted
```
- Safety features
- Rollback mogelijk
- Health monitoring
- **Aanbevolen voor live website!**

### **Backup/Fallback:**
```yaml
# .github/workflows/deploy-ghcr.yml
runs-on: ubuntu-latest
```
- Werkt altijd (ook als server down is)
- Gebruik als fallback

---

## 🚀 Quick Start

### Kies je workflow:
```bash
# Verwijder workflows die je niet wilt gebruiken
git rm .github/workflows/deploy-ghcr.yml  # Als je alleen self-hosted wilt

# Of rename zodat ze niet triggeren
mv .github/workflows/deploy-production.yml .github/workflows/deploy-production.yml.disabled
```

### Push naar main:
```bash
git add .
git commit -m "Deploy via self-hosted runner"
git push origin main
```

**De runner op je server pakt het automatisch op!**

---

## 📊 Monitor Deployment

### Check runner status:
```bash
# Op je server
cd ~/actions-runner
./run.sh status
```

### Check container:
```bash
docker ps -a
docker logs sushinja-web
```

### Check workflow:
- GitHub → Repository → **Actions** tab
- Zie real-time logs van je server!

---

## 🔧 Workflow Configuratie

### Environment Variables aanpassen:
Bewerk `deploy-production.yml`:
```yaml
env:
  IMAGE_NAME: sushinja        # Wijzig image naam
  CONTAINER_NAME: sushinja-web  # Wijzig container naam
  PORT: 80                     # Wijzig port (bijv. 8080)
```

### Port wijzigen:
```yaml
# Van port 80 naar 8080
-p 8080:80
```

### Meerdere containers draaien:
```yaml
# Frontend op port 80
docker run -d --name sushinja-web -p 80:80 sushinja:latest

# Backend API op port 3000
docker run -d --name sushinja-api -p 3000:3000 sushinja-api:latest
```

---

## 🎨 Manual Deployment

### Via GitHub UI:
1. Ga naar **Actions** tab
2. Selecteer workflow (links)
3. Klik **Run workflow** (rechts)
4. Klik **Run workflow** (groen)

### Via Git Tag:
```bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

Add to workflow:
```yaml
on:
  push:
    tags:
      - 'v*'
```

---

## 🔄 Rollback

### Automatisch (Production workflow):
Bij failure wordt automatisch terug gerold naar backup!

### Handmatig:
```bash
# Lijst backups
docker images sushinja --format "{{.Repository}}:{{.Tag}}" | grep backup

# Rollback naar backup
docker stop sushinja-web
docker rm sushinja-web
docker run -d --name sushinja-web -p 80:80 sushinja:backup-TIMESTAMP
```

### Naar specifieke commit:
```bash
# Build oude commit
git checkout COMMIT_HASH
docker build -t sushinja:rollback .

# Deploy
docker stop sushinja-web
docker rm sushinja-web  
docker run -d --name sushinja-web -p 80:80 sushinja:rollback
```

---

## 🐛 Troubleshooting

### Runner draait niet:
```bash
# Check status
cd ~/actions-runner
./run.sh status

# Herstart
./run.sh

# Als achtergrond service
sudo ./svc.sh start
```

### Docker permission denied:
```bash
sudo usermod -aG docker $USER
# Log uit en in
```

### Port already in use:
```bash
# Check wat er op port 80 draait
sudo lsof -i :80

# Stop oude container
docker stop $(docker ps -q --filter "publish=80")
```

### Deployment hangt:
```bash
# Check runner logs
cd ~/actions-runner
tail -f _diag/Runner_*.log
```

### Container start niet:
```bash
# Check logs
docker logs sushinja-web

# Inspect container
docker inspect sushinja-web

# Test image
docker run --rm -it sushinja:latest sh
```

---

## 📈 Monitoring & Logs

### Real-time container logs:
```bash
docker logs -f sushinja-web
```

### Disk usage:
```bash
docker system df
```

### Cleanup everything:
```bash
# Stop alle containers
docker stop $(docker ps -q)

# Remove all
docker system prune -a --volumes
```

### Health check:
```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' sushinja-web

# Manual health test
curl http://localhost
```

---

## 🔒 Security Tips

### Firewall configuratie:
```bash
# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS  
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

### Runner als service (auto-start):
```bash
cd ~/actions-runner
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
```

### Update runner:
```bash
cd ~/actions-runner
./config.sh remove
# Download nieuwe versie
# Run config.sh opnieuw
```

---

## ✅ Deployment Checklist

- [x] Self-hosted runner geïnstalleerd en draait
- [ ] Workflow gekozen (simple/production/cloud)
- [ ] Andere workflows disabled/verwijderd
- [ ] Docker draait op server
- [ ] Port 80 beschikbaar
- [ ] Firewall configured
- [ ] Runner als service (optioneel)
- [ ] Test deployment: push naar main
- [ ] Website bereikbaar

---

## 🎉 Je bent klaar!

**Deployment flow:**
```
git push origin main
    ↓
GitHub detecteert push
    ↓
Workflow triggert op je server
    ↓
Runner bouwt Docker image (lokaal!)
    ↓
Start nieuwe container
    ↓
Website live! ✅
```

**Geen externe dependencies meer - alles draait op je eigen server!** 🚀

---

## 📞 Quick Commands Reference

```bash
# Runner management
cd ~/actions-runner
./run.sh                    # Start runner foreground
sudo ./svc.sh start        # Start as service
sudo ./svc.sh stop         # Stop service
sudo ./svc.sh status       # Check status

# Docker operations
docker ps                   # Running containers
docker images              # Available images
docker logs sushinja-web   # Container logs
docker restart sushinja-web # Restart container

# Deployment
git push origin main       # Trigger deployment
# GitHub → Actions → View logs

# Emergency rollback
docker stop sushinja-web
docker rm sushinja-web
docker run -d --name sushinja-web -p 80:80 sushinja:backup-TIMESTAMP
```

---

**Support:** Check GitHub Actions logs in real-time tijdens deployment!
