# ⚡ Configuration Rapide - REAL VIZUALISATION

## 🎉 Déploiement Réussi !

Votre projet est maintenant en ligne sur GitHub : 
**https://github.com/Gema177/cotesecure**

## 🔧 Configuration de la Clé API

### **Option 1 : Configuration Locale (Test)**

1. **Créez le fichier de configuration :**
   ```bash
   cp config.example.js config.js
   ```

2. **Éditez `config.js` et ajoutez votre clé API :**
   ```javascript
   const API_CONFIG = {
       openai: {
           apiKey: 'VOTRE_CLE_API_ICI', // Remplacez par votre vraie clé
           model: 'gpt-3.5-turbo',
           baseUrl: 'https://api.openai.com/v1/chat/completions'
       }
   };
   ```

3. **Modifiez `index.html` (ligne 8) :**
   ```html
   <script src="config.js"></script>
   <script src="script.js"></script>
   ```

4. **Modifiez `script.js` (ligne 4) :**
   ```javascript
   const GPT_CONFIG = API_CONFIG.openai;
   ```

### **Option 2 : Configuration Netlify (Production)**

1. **Allez sur [app.netlify.com](https://app.netlify.com)**
2. **"New site from Git"** → **GitHub** → Sélectionnez `cotesecure`
3. **Deploy site**
4. **Site settings** → **Environment variables**
5. **Ajoutez :** `OPENAI_API_KEY` = votre clé API
6. **Redeploy**

## 🌐 URLs de votre Projet

- **GitHub** : https://github.com/Gema177/cotesecure
- **Netlify** : https://cotesecure.netlify.app (après déploiement)

## 🚀 Mises à jour Futures

```bash
git add .
git commit -m "Description de la mise à jour"
git push origin main
# Netlify déploie automatiquement !
```

## 🌊 Effets Océaniques Actifs

Votre site inclut maintenant :
- ✅ Vagues animées en arrière-plan
- ✅ Particules flottantes lumineuses
- ✅ Bulles interactives au clic
- ✅ Effets de brillance et reflets
- ✅ Titre avec dégradé océanique
- ✅ Curseur personnalisé

## 🎯 Test Rapide

1. **Ouvrez** `index.html` dans votre navigateur
2. **Testez** le chatbot (si clé API configurée)
3. **Cliquez** pour voir les bulles océaniques
4. **Scrolllez** pour voir l'effet de parallaxe

## 📞 Support

- **Guide complet** : `SECURITY-SETUP.md`
- **Déploiement** : `DEPLOY-GITHUB.md`
- **Effets** : `OCEAN-EFFECTS-DEMO.md`

**🌊 Votre projet REAL VIZUALISATION est prêt à impressionner les jurys ! 🌊**
