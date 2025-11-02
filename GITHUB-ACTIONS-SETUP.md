# 🚀 GitHub Actions Deployment Setup

## 📋 Overzicht

Je hebt **2 workflow opties**:

1. **`deploy.yml`** - Docker Hub (publiek/privé registry)
2. **`deploy-ghcr.yml`** - GitHub Container Registry (gratis voor publieke repos)

Kies **één** van de twee workflows en verwijder de andere!

---

## ⚙️ Setup voor Docker Hub (deploy.yml)

### Stap 1: Docker Hub Account
1. Maak account op https://hub.docker.com
2. Maak repository: `sushinja`

### Stap 2: GitHub Secrets toevoegen
Ga naar: **Repository → Settings → Secrets and variables → Actions**

Voeg toe:
- **`DOCKER_USERNAME`** - Je Docker Hub username
- **`DOCKER_PASSWORD`** - Docker Hub password of access token
- **`SERVER_HOST`** - Server IP (bijv. `185.123.45.67`)
- **`SERVER_USER`** - SSH username (bijv. `root` of `ubuntu`)
- **`SERVER_SSH_KEY`** - Je private SSH key (volledig!)

### Stap 3: Verwijder andere workflow
```bash
git rm .github/workflows/deploy-ghcr.yml
```

---

## ⚙️ Setup voor GitHub Container Registry (deploy-ghcr.yml)

### Stap 1: Package zichtbaar maken
Na eerste build:
1. Ga naar je repository
2. Klik op **Packages** (rechts)
3. Klik op `sushinja` package
4. **Package settings** → **Change visibility** → Public

### Stap 2: GitHub Secrets toevoegen
Alleen deze 3 nodig:
- **`SERVER_HOST`** - Server IP
- **`SERVER_USER`** - SSH username  
- **`SERVER_SSH_KEY`** - Private SSH key

`GITHUB_TOKEN` wordt automatisch aangemaakt! ✅

### Stap 3: Verwijder andere workflow
```bash
git rm .github/workflows/deploy.yml
```

---

## 🔐 SSH Key Setup

### Genereer SSH key (lokaal):
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/sushinja_deploy
```

### Kopieer private key naar GitHub Secret:
```bash
# Windows (PowerShell)
Get-Content ~/.ssh/sushinja_deploy | clip

# Linux/Mac
cat ~/.ssh/sushinja_deploy | pbcopy
```

### Voeg public key toe aan server:
```bash
# Kopieer public key
cat ~/.ssh/sushinja_deploy.pub

# SSH naar server
ssh user@your-server

# Voeg toe aan authorized_keys
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## 🖥️ Server Voorbereiding

### Installeer Docker op server:
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Voeg user toe aan docker groep
sudo usermod -aG docker $USER

# Log uit en in
exit
```

### Test Docker:
```bash
docker --version
docker ps
```

---

## 🚀 Deployment Proces

### Automatisch via Git:
```bash
# Maak wijzigingen
git add .
git commit -m "Update Sushinja"
git push origin main
```

**GitHub Actions doet dan:**
1. ✅ Checkout code
2. ✅ Setup Docker Buildx
3. ✅ Build Docker image
4. ✅ Push naar registry
5. ✅ SSH naar server
6. ✅ Pull nieuwe image
7. ✅ Stop oude container
8. ✅ Start nieuwe container
9. ✅ Cleanup oude images

### Status checken:
- Ga naar je repository
- Klik op **Actions** tab
- Bekijk workflow runs

---

## 🔍 Troubleshooting

### Build fails?
- Check Actions logs in GitHub
- Kijk naar Docker build errors
- Valideer Dockerfile syntax

### Deployment fails?
- Test SSH verbinding handmatig:
  ```bash
  ssh -i ~/.ssh/sushinja_deploy user@server
  ```
- Check of Docker draait op server
- Kijk naar disk space: `df -h`

### Container start niet?
SSH naar server en check:
```bash
docker logs sushinja-web
docker ps -a
```

---

## 📊 Na Deployment

### Container status:
```bash
ssh user@server
docker ps
docker logs -f sushinja-web
```

### Website checken:
- http://your-server-ip
- http://your-domain.com

### Container stoppen:
```bash
docker stop sushinja-web
```

### Container herstarten:
```bash
docker restart sushinja-web
```

---

## 🎯 Welke Workflow Kiezen?

### **Docker Hub** (`deploy.yml`)
✅ Meer bekende tool  
✅ Betere CLI integratie  
✅ Publiek én privé images  
❌ Rate limits (100 pulls/6uur voor free)

### **GitHub Container Registry** (`deploy-ghcr.yml`)
✅ Geen extra account nodig  
✅ Geen rate limits  
✅ Naadloze GitHub integratie  
✅ **Aanbevolen voor dit project!**

---

## ✅ Deployment Checklist

- [ ] Workflow gekozen (Docker Hub OF GitHub Registry)
- [ ] Andere workflow verwijderd
- [ ] GitHub Secrets toegevoegd (3-5 secrets)
- [ ] SSH keys gegenereerd en toegevoegd
- [ ] Server heeft Docker geïnstalleerd
- [ ] Test: push naar main branch
- [ ] Check: Actions tab voor build status
- [ ] Verificatie: website draait op server
- [ ] SSL certificaat toevoegen (optioneel)

---

## 🆘 Support

### Logs bekijken:
```bash
# GitHub Actions logs
# → Repository → Actions → Laatste run → Klik op job

# Server logs
ssh user@server "docker logs sushinja-web"
```

### Manual deploy test:
```bash
# Lokaal: trigger workflow handmatig
# Repository → Actions → Select workflow → Run workflow
```

---

**🎉 Klaar! Push naar main en je website wordt automatisch gedeployed via GitHub Actions!**
