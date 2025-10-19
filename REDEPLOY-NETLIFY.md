# 🔄 Redéploiement Netlify - Variables d'environnement

## ✅ Situation Actuelle

Vous avez déjà configuré les variables d'environnement dans Netlify, c'est parfait ! Le problème était que le code n'utilisait pas encore `process.env.OPENAI_API_KEY`.

## 🔧 Solution : Redéploiement

Maintenant que le code a été mis à jour pour utiliser les variables d'environnement, il faut redéployer :

### **Étape 1 : Vérifier les variables d'environnement**

1. Allez sur [app.netlify.com](https://app.netlify.com)
2. Cliquez sur votre site
3. **"Site settings"** → **"Environment variables"**
4. Vérifiez que `OPENAI_API_KEY` est bien présente

### **Étape 2 : Redéployer le site**

1. Allez dans l'onglet **"Deploys"**
2. Cliquez sur **"Trigger deploy"** → **"Deploy site"**
3. Attendez que le déploiement se termine (1-2 minutes)

### **Étape 3 : Tester le chatbot**

1. Allez sur votre site
2. Section **"Dialogue"**
3. Sélectionnez un rôle
4. Posez une question
5. Le chatbot devrait maintenant répondre !

## 🎯 Changement Effectué

**Avant :**
```javascript
apiKey: '', // Clé vide
```

**Maintenant :**
```javascript
apiKey: process.env.OPENAI_API_KEY || '', // Utilise la variable d'environnement
```

## 🚨 Si le problème persiste

### **Vérifiez la variable d'environnement :**
- Nom exact : `OPENAI_API_KEY` (sensible à la casse)
- Valeur : votre clé API complète (commence par `sk-`)

### **Vérifiez le redéploiement :**
- Le dernier déploiement doit être récent
- Status : "Published" (pas "Failed")

### **Vérifiez la clé API :**
- Testez sur [platform.openai.com](https://platform.openai.com)
- Assurez-vous qu'elle a des crédits disponibles

## 🎉 Résultat Attendu

Après le redéploiement, le chatbot devrait répondre normalement au lieu d'afficher le message d'erreur.

**Votre projet sera alors 100% fonctionnel avec tous les effets océaniques !** 🌊✨
