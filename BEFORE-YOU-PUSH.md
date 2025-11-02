# ⚠️ PRE-DEPLOYMENT CHECKLIST

## ❌ NOG NIET KLAAR OM TE PUSHEN!

Volg deze stappen **VOOR** je pusht naar GitHub:

---

## 1️⃣ **Kies je Deployment Workflow**

Je hebt nu **2 workflows** in `.github/workflows/`:
- `deploy.yml` (Docker Hub)
- `deploy-ghcr.yml` (GitHub Container Registry)

**Kies ÉÉN en verwijder de andere:**

### Optie A: GitHub Container Registry (Aanbevolen, gratis)
```bash
git rm .github/workflows/deploy.yml
git commit -m "Use GitHub Container Registry"
```

### Optie B: Docker Hub
```bash
git rm .github/workflows/deploy-ghcr.yml
git commit -m "Use Docker Hub"
```

---

## 2️⃣ **Voeg GitHub Secrets toe**

Ga naar: **GitHub Repository → Settings → Secrets and variables → Actions → New repository secret**

### Als je **GitHub Container Registry** gebruikt (deploy-ghcr.yml):
Voeg deze **3 secrets** toe:

1. **`SERVER_HOST`**
   - Waarde: Je server IP (bijv. `185.123.45.67`)

2. **`SERVER_USER`**
   - Waarde: SSH username (bijv. `root` of `ubuntu`)

3. **`SERVER_SSH_KEY`**
   - Waarde: Private SSH key (zie stap 3)

### Als je **Docker Hub** gebruikt (deploy.yml):
Voeg deze **5 secrets** toe:

1-3: Zelfde als hierboven (SERVER_HOST, SERVER_USER, SERVER_SSH_KEY)

4. **`DOCKER_USERNAME`**
   - Waarde: Je Docker Hub username

5. **`DOCKER_PASSWORD`**
   - Waarde: Docker Hub password of access token

---

## 3️⃣ **Genereer SSH Keys**

### Op je lokale machine:
```bash
# Genereer nieuwe key
ssh-keygen -t rsa -b 4096 -C "sushinja-deploy" -f ~/.ssh/sushinja_deploy

# Druk 2x Enter (geen passphrase)
```

### Kopieer PRIVATE key naar GitHub Secret:

**Windows PowerShell:**
```powershell
Get-Content ~/.ssh/sushinja_deploy | Set-Clipboard
```

**Linux/Mac:**
```bash
cat ~/.ssh/sushinja_deploy | pbcopy
```

Plak in GitHub Secret: **`SERVER_SSH_KEY`**

### Voeg PUBLIC key toe aan server:

```bash
# Toon public key
cat ~/.ssh/sushinja_deploy.pub

# SSH naar server
ssh user@your-server-ip

# Voeg toe
mkdir -p ~/.ssh
echo "PLAK_HIER_JE_PUBLIC_KEY" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
exit
```

### Test verbinding:
```bash
ssh -i ~/.ssh/sushinja_deploy user@your-server-ip
```

Als dit werkt, is SSH setup correct! ✅

---

## 4️⃣ **Installeer Docker op je Server**

SSH naar je server en installeer Docker:

### Ubuntu/Debian:
```bash
# Update packages
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in
exit
```

### Test Docker:
```bash
ssh user@your-server
docker --version
docker ps
```

Als dit werkt, is Docker setup correct! ✅

---

## 5️⃣ **Open Firewall Poorten**

Zorg dat deze poorten open zijn op je server:

```bash
# Port 80 (HTTP)
sudo ufw allow 80/tcp

# Port 443 (HTTPS) - voor later
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

---

## 6️⃣ **Test lokaal (Optioneel)**

Voordat je pusht, test of je code build:

```bash
npm install
npm run build
```

Als dit werkt zonder errors, is de code klaar! ✅

---

## ✅ **KLAAR OM TE PUSHEN**

Als ALLE bovenstaande stappen zijn gedaan:

```bash
# Check status
git status

# Add alles
git add .

# Commit
git commit -m "Add Docker deployment with GitHub Actions"

# Push (dit triggert de deployment!)
git push origin main
```

---

## 📊 **Volg de Deployment**

1. Ga naar je GitHub repository
2. Klik op **Actions** tab
3. Zie de workflow draaien (±5-10 minuten)
4. Als het groen is: ✅ Deployment succesvol!
5. Open in browser: `http://your-server-ip`

---

## 🔴 **Als de Workflow Faalt**

### Check logs:
1. GitHub → Actions → Failed workflow → Klik op job
2. Bekijk welke step faalde
3. Kijk naar error message

### Veelvoorkomende errors:

**"Permission denied (publickey)"**
- SSH key niet correct toegevoegd
- Check stap 3 opnieuw

**"Cannot connect to Docker daemon"**
- Docker niet geïnstalleerd op server
- Check stap 4 opnieuw

**"denied: permission denied"**
- Docker Hub inloggegevens verkeerd
- Check DOCKER_USERNAME en DOCKER_PASSWORD

**"port is already allocated"**
- Port 80 al in gebruik op server
- Stop andere container: `docker stop $(docker ps -q)`

---

## 📝 **Samenvatting Checklist**

Vink af wat je hebt gedaan:

- [ ] 1. Workflow gekozen (verwijder andere)
- [ ] 2. GitHub Secrets toegevoegd (3 of 5)
- [ ] 3. SSH keys gegenereerd en toegevoegd
- [ ] 4. Docker geïnstalleerd op server
- [ ] 5. Firewall poorten geopend
- [ ] 6. Code test lokaal (`npm run build`)
- [ ] 7. `.gitignore` aanwezig
- [ ] 8. Klaar om te pushen!

---

**Als ALLES is afgevinkt, push dan naar main en volg de deployment in GitHub Actions!** 🚀

**Eerste deployment duurt ±10 minuten. Daarna sneller door caching.**
