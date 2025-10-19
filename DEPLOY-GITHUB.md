# 🚀 Déploiement via GitHub - REAL VIZUALISATION

## 📋 Prérequis

1. **Compte GitHub** : Créez un compte sur [github.com](https://github.com)
2. **Git installé** : Vérifiez avec `git --version`
3. **Projet prêt** : Tous vos fichiers sont dans le dossier

## 🎯 Étapes de Déploiement

### 1. **Initialiser Git dans votre projet**

```bash
# Dans le dossier de votre projet
git init
git add .
git commit -m "Initial commit: REAL VIZUALISATION avec effets océaniques"
```

### 2. **Créer un dépôt sur GitHub**

1. Allez sur [github.com](https://github.com)
2. Cliquez sur **"New repository"**
3. Nom : `real-vizualisation` (ou votre choix)
4. Description : `REAL VIZUALISATION - Zone Côtière de POINTE-Noire avec effets océaniques`
5. **Public** (pour déploiement gratuit Netlify)
6. **Ne pas** cocher "Add README" (vous en avez déjà un)
7. Cliquez **"Create repository"**

### 3. **Connecter votre projet local à GitHub**

```bash
# Remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/VOTRE_USERNAME/real-vizualisation.git
git branch -M main
git push -u origin main
```

### 4. **Déployer sur Netlify via GitHub**

1. Allez sur [app.netlify.com](https://app.netlify.com)
2. Cliquez **"New site from Git"**
3. Choisissez **"GitHub"**
4. Autorisez Netlify à accéder à votre GitHub
5. Sélectionnez votre dépôt `real-vizualisation`
6. Cliquez **"Deploy site"**

### 5. **Configuration automatique**

Netlify détectera automatiquement :
- ✅ **Build command** : Aucun (site statique)
- ✅ **Publish directory** : `/` (racine)
- ✅ **Fichier `netlify.toml`** : Configuration déjà présente

## 🔧 Configuration Avancée

### **Variables d'environnement (Sécurité)**

1. Dans Netlify : **"Site settings"** → **"Environment variables"**
2. Ajoutez :
   - `OPENAI_API_KEY` = votre clé API
3. Modifiez `script.js` pour utiliser la variable :

```javascript
const GPT_CONFIG = {
    apiKey: process.env.OPENAI_API_KEY || 'votre-clé-par-défaut',
    model: 'gpt-3.5-turbo',
    baseUrl: 'https://api.openai.com/v1/chat/completions'
};
```

### **Domaine personnalisé**

1. Dans Netlify : **"Domain settings"**
2. Cliquez **"Add custom domain"**
3. Entrez votre domaine (ex: `realviz.mondomaine.com`)
4. Suivez les instructions DNS

## 🔄 Mises à jour automatiques

### **Workflow de mise à jour :**

```bash
# 1. Modifiez vos fichiers localement
# 2. Ajoutez les changements
git add .

# 3. Committez avec un message descriptif
git commit -m "Ajout de nouvelles fonctionnalités océaniques"

# 4. Poussez vers GitHub
git push origin main

# 5. Netlify déploie automatiquement ! 🚀
```

## 📊 Avantages du déploiement GitHub

### ✅ **Automatisation**
- Déploiement automatique à chaque push
- Pas besoin de glisser-déposer manuellement
- Historique des versions

### ✅ **Collaboration**
- Plusieurs développeurs peuvent contribuer
- Pull requests pour les révisions
- Issues pour le suivi des bugs

### ✅ **Sécurité**
- Variables d'environnement sécurisées
- Clés API protégées
- Accès contrôlé

### ✅ **Performance**
- CDN global de Netlify
- Cache optimisé
- HTTPS automatique

## 🎯 URLs générées

- **GitHub** : `https://github.com/VOTRE_USERNAME/real-vizualisation`
- **Netlify** : `https://real-vizualisation.netlify.app`
- **Domaine personnalisé** : `https://votre-domaine.com`

## 🚨 Dépannage

### **Problèmes courants :**

1. **Erreur de push** :
   ```bash
   git pull origin main --allow-unrelated-histories
   git push origin main
   ```

2. **Déploiement échoué** :
   - Vérifiez les logs dans Netlify
   - Assurez-vous que `index.html` est à la racine

3. **API ne fonctionne pas** :
   - Vérifiez les variables d'environnement
   - Testez localement d'abord

## 📝 Checklist de déploiement

- [ ] Git initialisé localement
- [ ] Dépôt GitHub créé
- [ ] Projet connecté à GitHub
- [ ] Premier push réussi
- [ ] Site Netlify connecté au dépôt
- [ ] Déploiement automatique testé
- [ ] Variables d'environnement configurées
- [ ] Domaine personnalisé (optionnel)
- [ ] Test de toutes les fonctionnalités

## 🎉 Résultat

Votre projet sera accessible via :
- **URL Netlify** : `https://real-vizualisation.netlify.app`
- **Déploiement automatique** à chaque modification
- **Effets océaniques** visibles en ligne
- **Assistant IA** fonctionnel

**Félicitations ! Votre projet REAL VIZUALISATION est maintenant déployé professionnellement !** 🌊🚀
