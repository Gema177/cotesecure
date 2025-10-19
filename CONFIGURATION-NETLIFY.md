# 🔧 Configuration Netlify - REAL VIZUALISATION

## 🎯 Problème Résolu

Le message "⚠️ Clé API GPT Mini non configurée" indique que votre site fonctionne mais que la clé API n'est pas configurée.

## ✅ Solution : Configuration Netlify

### **Étape 1 : Accéder aux paramètres Netlify**

1. Allez sur [app.netlify.com](https://app.netlify.com)
2. Connectez-vous à votre compte
3. Cliquez sur votre site `cotesecure` (ou le nom de votre site)

### **Étape 2 : Ajouter la variable d'environnement**

1. Dans le menu de gauche, cliquez sur **"Site settings"**
2. Faites défiler vers le bas et cliquez sur **"Environment variables"**
3. Cliquez sur **"Add a variable"**
4. Remplissez :
   - **Key** : `OPENAI_API_KEY`
   - **Value** : `VOTRE_CLE_API_ICI` (remplacez par votre vraie clé API)
5. Cliquez sur **"Save"**

### **Étape 3 : Redéployer le site**

1. Allez dans l'onglet **"Deploys"**
2. Cliquez sur **"Trigger deploy"** → **"Deploy site"**
3. Attendez que le déploiement se termine (1-2 minutes)

### **Étape 4 : Tester le chatbot**

1. Allez sur votre site : `https://cotesecure.netlify.app`
2. Ouvrez la section **"Dialogue"**
3. Sélectionnez un rôle (ex: "Général")
4. Posez une question (ex: "Explique-moi le système d'alerte SAP")
5. Le chatbot devrait maintenant répondre !

## 🔑 Obtenir votre clé API OpenAI

Si vous n'avez pas encore de clé API :

1. Allez sur [platform.openai.com](https://platform.openai.com)
2. Connectez-vous ou créez un compte
3. Allez dans **"API Keys"**
4. Cliquez sur **"Create new secret key"**
5. Copiez la clé (elle commence par `sk-`)
6. **Important** : Sauvegardez-la, vous ne pourrez plus la voir !

## 🚨 Dépannage

### **Le chatbot ne répond toujours pas :**

1. **Vérifiez la variable d'environnement :**
   - Netlify → Site settings → Environment variables
   - Assurez-vous que `OPENAI_API_KEY` est bien définie

2. **Vérifiez le redéploiement :**
   - Netlify → Deploys
   - Le dernier déploiement doit être récent

3. **Vérifiez la clé API :**
   - Testez votre clé sur [platform.openai.com](https://platform.openai.com)
   - Assurez-vous qu'elle a des crédits disponibles

### **Erreur de quota :**
- Votre compte OpenAI n'a plus de crédits
- Ajoutez des crédits sur [platform.openai.com](https://platform.openai.com)

### **Erreur de clé invalide :**
- Vérifiez que la clé est correctement copiée
- Assurez-vous qu'il n'y a pas d'espaces avant/après

## 🎉 Résultat Attendu

Une fois configuré, le chatbot devrait répondre comme ceci :

**Vous** : "Explique-moi le système d'alerte SAP"
**Assistant** : "Le Système d'Alertes Précoce (SAP) est dynamique. En alerte ROUGE, la Zone Exposée/Alerte (couche rouge/orange sur la carte) s'active et surligne la zone d'évacuation immédiate..."

## 📱 Test Complet

1. ✅ **Carte interactive** : Vérifiez que la carte s'affiche
2. ✅ **Effets océaniques** : Vérifiez les vagues et particules
3. ✅ **Chatbot** : Testez une question
4. ✅ **Simulation** : Testez l'outil de simulation mangroves
5. ✅ **Alertes** : Vérifiez le système d'alerte SAP

## 🌊 Fonctionnalités Actives

Votre site inclut maintenant :
- ✅ Assistant IA fonctionnel
- ✅ Vagues océaniques animées
- ✅ Particules flottantes
- ✅ Bulles interactives
- ✅ Cartographie interactive
- ✅ Système d'alerte SAP
- ✅ Outil de simulation

**🎯 Votre projet REAL VIZUALISATION est maintenant 100% fonctionnel !**
