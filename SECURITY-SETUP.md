# 🔒 Configuration Sécurisée - REAL VIZUALISATION

## ⚠️ Problème Résolu

GitHub a bloqué le push car la clé API était exposée dans le code. C'est une excellente sécurité !

## ✅ Solution Implémentée

### **1. Clé API supprimée du code**
- ✅ `script.js` ne contient plus la clé API
- ✅ Message d'erreur explicite si pas de clé configurée
- ✅ Instructions de configuration ajoutées

### **2. Fichiers de configuration sécurisés**
- ✅ `config.example.js` - Exemple de configuration
- ✅ `config.js` ajouté au `.gitignore`
- ✅ Instructions de déploiement mises à jour

## 🔧 Configuration de la Clé API

### **Méthode 1 : Développement Local**

1. **Copiez le fichier d'exemple :**
   ```bash
   cp config.example.js config.js
   ```

2. **Éditez `config.js` :**
   ```javascript
   const API_CONFIG = {
       openai: {
           apiKey: 'sk-proj-VOTRE_CLE_API_ICI', // Remplacez par votre vraie clé API
           model: 'gpt-3.5-turbo',
           baseUrl: 'https://api.openai.com/v1/chat/completions'
       }
   };
   ```

3. **Modifiez `index.html` :**
   ```html
   <script src="config.js"></script>
   <script src="script.js"></script>
   ```

4. **Modifiez `script.js` :**
   ```javascript
   const GPT_CONFIG = API_CONFIG.openai;
   ```

### **Méthode 2 : Production Netlify (Recommandée)**

1. **Dans Netlify :**
   - Site settings → Environment variables
   - Ajoutez : `OPENAI_API_KEY` = votre clé API

2. **Modifiez `script.js` :**
   ```javascript
   const GPT_CONFIG = {
       apiKey: process.env.OPENAI_API_KEY || '',
       model: 'gpt-3.5-turbo',
       baseUrl: 'https://api.openai.com/v1/chat/completions'
   };
   ```

## 🚀 Déploiement Sécurisé

### **Maintenant vous pouvez pousser vers GitHub :**

```bash
git add .
git commit -m "Sécurisation : suppression de la clé API du code"
git push origin main
```

### **Configuration après déploiement :**

1. **Netlify** : Ajoutez la variable d'environnement
2. **Redeploy** : Le site utilisera la clé API sécurisée

## 🛡️ Bonnes Pratiques

### **✅ À FAIRE :**
- Utiliser des variables d'environnement en production
- Garder les clés API hors du code source
- Utiliser des fichiers de configuration locaux
- Ajouter les fichiers sensibles au `.gitignore`

### **❌ À ÉVITER :**
- Committer des clés API dans le code
- Partager des clés API publiquement
- Utiliser des clés API en dur dans le code

## 🔍 Vérification

### **Test local :**
1. Ajoutez votre clé API dans `config.js`
2. Ouvrez `index.html` dans le navigateur
3. Testez le chatbot

### **Test production :**
1. Configurez la variable d'environnement Netlify
2. Redéployez le site
3. Testez le chatbot en ligne

## 📞 Support

- **Erreur de clé API** : Vérifiez la configuration
- **Chatbot ne répond pas** : Vérifiez la clé API
- **Déploiement échoue** : Vérifiez les variables d'environnement

**🔒 Votre projet est maintenant sécurisé et prêt pour le déploiement ! 🔒**
