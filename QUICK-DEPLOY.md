# 🚀 Déploiement Rapide GitHub + Netlify

## ⚡ Étapes Express (5 minutes)

### 1. **Créer le dépôt GitHub**
1. Allez sur [github.com](https://github.com) → **"New repository"**
2. Nom : `real-vizualisation`
3. Description : `REAL VIZUALISATION - Zone Côtière POINTE-Noire`
4. **Public** ✅
5. **Create repository**

### 2. **Connecter votre projet**
```bash
# Remplacez VOTRE_USERNAME par votre nom GitHub
git remote add origin https://github.com/VOTRE_USERNAME/real-vizualisation.git
git push -u origin main
```

### 3. **Déployer sur Netlify**
1. [app.netlify.com](https://app.netlify.com) → **"New site from Git"**
2. **GitHub** → Autoriser → Sélectionner `real-vizualisation`
3. **Deploy site** 🚀

### 4. **Configurer la clé API (Optionnel)**
1. Netlify → **Site settings** → **Environment variables**
2. Ajouter : `OPENAI_API_KEY` = votre clé API
3. **Redeploy**

## 🎯 Résultat

- **GitHub** : `https://github.com/VOTRE_USERNAME/real-vizualisation`
- **Site** : `https://real-vizualisation.netlify.app`
- **Déploiement automatique** à chaque push

## 🔄 Mises à jour

```bash
git add .
git commit -m "Mise à jour"
git push origin main
# Netlify déploie automatiquement ! ✨
```

## 📞 Support

- **Guide complet** : `DEPLOY-GITHUB.md`
- **Script automatique** : `./deploy-github.sh`
- **Documentation** : `README.md`

**🌊 Votre projet est prêt à impressionner les jurys ! 🌊**
