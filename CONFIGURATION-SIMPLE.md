# 🔧 Configuration Simple - REAL VIZUALISATION

## 🎯 Solution Simple et Directe

Le problème était que les variables d'environnement Netlify ne sont pas accessibles côté client. Voici la solution simple :

## ✅ Configuration en 2 étapes

### **Étape 1 : Modifier le fichier config.js**

1. **Ouvrez le fichier `config.js`** dans votre projet
2. **Remplacez** `'VOTRE_CLE_API_ICI'` par votre vraie clé API :

```javascript
window.API_CONFIG = {
    openai: {
        apiKey: 'sk-proj-votre-vraie-cle-api-ici', // Votre vraie clé API
        model: 'gpt-3.5-turbo',
        baseUrl: 'https://api.openai.com/v1/chat/completions'
    }
};
```

### **Étape 2 : Déployer les changements**

```bash
git add .
git commit -m "Configuration de la clé API"
git push origin main
```

## 🚀 Alternative : Configuration Directe

Si vous préférez, vous pouvez aussi modifier directement `script.js` ligne 7 :

```javascript
const GPT_CONFIG = window.API_CONFIG?.openai || {
    apiKey: 'sk-proj-votre-vraie-cle-api-ici', // Votre clé API ici
    model: 'gpt-3.5-turbo',
    baseUrl: 'https://api.openai.com/v1/chat/completions'
};
```

## 🔑 Obtenir votre clé API

Si vous n'avez pas encore de clé API :

1. Allez sur [platform.openai.com](https://platform.openai.com)
2. **"API Keys"** → **"Create new secret key"**
3. Copiez la clé (commence par `sk-`)
4. Ajoutez-la dans `config.js`

## 🎉 Résultat

Après le déploiement, le chatbot devrait répondre normalement au lieu d'afficher le message d'erreur.

## 🛡️ Sécurité

- Le fichier `config.js` est dans le `.gitignore` pour éviter de committer la clé
- Pour la production, vous pouvez utiliser des variables d'environnement Netlify
- Cette solution est simple et fonctionne immédiatement

**🌊 Votre projet sera alors 100% fonctionnel !**
