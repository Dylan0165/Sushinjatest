# Fix Docker Permission voor GitHub Runner

## ❌ Het probleem
```
permission denied while trying to connect to the Docker daemon socket
```

De GitHub Actions runner draait als de user `student` maar heeft geen toegang tot Docker.

## ✅ Oplossing

Voer deze commando's uit **op je Ubuntu server**:

### 1. Voeg de student user toe aan de docker groep
```bash
sudo usermod -aG docker student
```

### 2. Herstart de GitHub Runner service
```bash
# Stop de runner
cd ~/actions-runner
./svc.sh stop

# Start de runner opnieuw
./svc.sh start
```

### 3. Verifieer dat het werkt
```bash
# Test of student user docker kan gebruiken
sudo -u student docker ps
```

Als dit werkt zonder error, dan is het gefixt! ✅

## 🚀 Nu opnieuw deployen

1. **Push je code opnieuw** (of gebruik Re-run in GitHub Actions)
```bash
git commit --allow-empty -m "Trigger deployment after docker permissions fix"
git push origin main
```

2. **Check de workflow** - Nu zou de Docker build moeten werken!

## 🔍 Alternatieve methode (als service niet werkt)

Als je de runner handmatig draait (niet als service):

```bash
# Stop de huidige runner (Ctrl+C)

# Log uit en weer in (of gebruik newgrp)
newgrp docker

# Start runner opnieuw
cd ~/actions-runner
./run.sh
```

## ⚠️ Belangrijke noten

- De user moet **uitloggen en opnieuw inloggen** voordat groepswijzigingen actief zijn
- Als je de runner als service draait, moet je de service **herstarten**
- Test altijd met `docker ps` voordat je opnieuw pushed

## 🎯 Verwacht resultaat

Na de fix zou je dit moeten zien in GitHub Actions:
```
✅ Build Docker image
✅ Stop and remove old container  
✅ Run new container
✅ Cleanup old images
✅ Display deployment info
```
