# 🌊 REAL VIZUALISATION

**Zone Côtière de POINTE-Noire - Système d'Alerte Précoce & Solutions de Résilience**

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎯 Description

REAL VIZUALISATION est une plateforme interactive de cartographie prédictive et de gestion des risques côtiers pour la Zone Côtière de POINTE-Noire. Le projet intègre un **Système d'Alerte Précoce (SAP)** dynamique, des **solutions fondées sur la nature** (reboisement de mangroves), et une **modélisation prédictive 2037**.

## ✨ Fonctionnalités

### 🗺️ **Cartographie Interactive**
- Carte Leaflet avec couches prédictives
- Zones d'alerte SAP dynamiques
- Modélisation 2037 (Zone Inconstructible)
- Solutions de reboisement (Mangroves)

### 🤖 **Assistant IA Expert**
- Intégration OpenAI GPT-3.5-turbo
- Réponses adaptées par rôle (Jury, Experts, Collectivités, Populations)
- Mémoire de conversation
- Interface vocale simulée

### 🌊 **Effets Visuels Océaniques**
- Vagues animées en arrière-plan
- Particules flottantes lumineuses
- Bulles interactives
- Effets de brillance et reflets
- Curseur personnalisé océanique

### 📊 **Outils d'Analyse**
- Simulation d'atténuation des mangroves
- Graphes climatiques ombrothermiques
- Export des données (GeoJSON, CSV)
- Galeries d'images dynamiques

### 📱 **Système d'Alerte**
- Inscription SMS (Airtel/MTN Congo)
- Alertes en temps réel
- Interface d'évacuation d'urgence
- Contribution communautaire

## 🚀 Déploiement

### **Méthode 1 : GitHub + Netlify (Recommandée)**

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/real-vizualisation.git
cd real-vizualisation

# 2. Configurer la clé API
# Éditez script.js et ajoutez votre clé OpenAI

# 3. Déployer automatiquement
./deploy-github.sh  # Linux/Mac
# ou
deploy-github.bat   # Windows
```

### **Méthode 2 : Glisser-Déposer Netlify**

1. Téléchargez tous les fichiers
2. Allez sur [app.netlify.com](https://app.netlify.com)
3. Glissez-déposez le dossier dans la zone de déploiement

## ⚙️ Configuration

### **Clé API OpenAI**

1. Obtenez votre clé sur [platform.openai.com](https://platform.openai.com)
2. Modifiez `script.js` ligne 5 :
   ```javascript
   apiKey: 'VOTRE_CLE_API_ICI'
   ```

### **Variables d'environnement (Production)**

Dans Netlify : Site Settings → Environment Variables
- `OPENAI_API_KEY` = votre clé API

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Cartographie** : Leaflet.js
- **IA** : OpenAI GPT-3.5-turbo
- **Animations** : CSS3 Animations, SVG
- **Déploiement** : Netlify, GitHub Actions
- **Design** : Responsive, Accessible

## 📁 Structure du Projet

```
real-vizualisation/
├── index.html              # Page principale
├── styles.css              # Styles et effets océaniques
├── script.js               # JavaScript et intégration IA
├── netlify.toml            # Configuration Netlify
├── _redirects              # Redirections SPA
├── cartes/                 # Images de cartes (1-18)
├── photos/                 # Photos de terrain
├── graphes/                # Graphes climatiques
├── DEPLOY-GITHUB.md        # Guide déploiement GitHub
├── DEPLOY-NETLIFY.md       # Guide déploiement Netlify
└── OCEAN-EFFECTS-DEMO.md   # Documentation effets visuels
```

## 🎨 Effets Visuels

Le projet intègre des **effets océaniques professionnels** :

- 🌊 **Vagues animées** (3 couches, parallaxe)
- ✨ **Particules flottantes** (15 particules lumineuses)
- 💫 **Bulles interactives** (clic + automatiques)
- 🌟 **Effets de brillance** (shimmer, reflets)
- 🎨 **Titre animé** (dégradé océanique)
- 🖱️ **Curseur personnalisé** (cercles lumineux)

## 📊 Données

- **Cartes** : 18 cartes d'étude et prédictives
- **Photos** : Observations terrain
- **Graphes** : Données climatiques 1990-2017
- **Modélisation** : Prédictions 2037
- **Zones** : SAP, Inconstructible, Reboisement

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Solution Express — MOUTSOU Jaurès**

- Projet : REAL VIZUALISATION
- Thème : Hackathon Océan
- Zone : Côtière de POINTE-Noire
- Année : 2025

## 🌐 Liens

- **Site en ligne** : [real-vizualisation.netlify.app](https://real-vizualisation.netlify.app)
- **GitHub** : [github.com/VOTRE_USERNAME/real-vizualisation](https://github.com/VOTRE_USERNAME/real-vizualisation)
- **Documentation** : Voir les fichiers `.md` dans le projet

## 🏆 Hackathon

Ce projet a été développé pour un **hackathon sur le thème océan**, intégrant :
- ✅ Solutions innovantes pour l'érosion côtière
- ✅ Technologies de pointe (IA, cartographie)
- ✅ Interface utilisateur immersive
- ✅ Impact social et environnemental

---

**🌊 REAL VIZUALISATION - L'avenir de la résilience côtière ! 🌊**
