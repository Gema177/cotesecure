# 🚀 Déploiement sur Netlify - REAL VIZUALISATION

## 📋 Prérequis

1. **Compte Netlify** : Créez un compte gratuit sur [netlify.com](https://netlify.com)
2. **Fichiers du projet** : Tous les fichiers sont prêts dans le dossier
3. **Clé API configurée** : Votre clé API est déjà dans `script.js`

## 🎯 Méthode 1 : Déploiement par glisser-déposer (Recommandé)

### Étapes :

1. **Connectez-vous à Netlify**
   - Allez sur [app.netlify.com](https://app.netlify.com)
   - Connectez-vous avec votre compte

2. **Déployez par glisser-déposer**
   - Dans le tableau de bord Netlify, trouvez la zone "Want to deploy a new site without connecting to Git?"
   - Glissez-déposez **tout le dossier** de votre projet dans cette zone
   - Netlify va automatiquement détecter les fichiers et déployer

3. **Attendez le déploiement**
   - Le processus prend 1-2 minutes
   - Vous verrez une URL temporaire générée automatiquement

4. **Personnalisez le nom de domaine**
   - Cliquez sur "Site settings"
   - Allez dans "Site details"
   - Changez le nom du site (ex: `real-vizualisation`)

## 🎯 Méthode 2 : Déploiement via Git (Optionnel)

Si vous voulez utiliser Git pour des mises à jour automatiques :

1. **Créez un dépôt GitHub**
   - Créez un nouveau dépôt sur GitHub
   - Uploadez tous vos fichiers

2. **Connectez à Netlify**
   - Dans Netlify : "New site from Git"
   - Connectez votre dépôt GitHub
   - Netlify détectera automatiquement la configuration

## ⚙️ Configuration automatique

Le fichier `netlify.toml` est déjà configuré avec :

- ✅ **Redirections** : Toutes les routes pointent vers `index.html`
- ✅ **Headers CORS** : Pour les appels API
- ✅ **Cache optimisé** : Images mises en cache 24h
- ✅ **Publish directory** : Dossier racine

## 🔧 Variables d'environnement (Sécurité)

**IMPORTANT** : Pour sécuriser votre clé API :

1. **Dans Netlify Dashboard** :
   - Allez dans "Site settings" → "Environment variables"
   - Ajoutez : `OPENAI_API_KEY` = votre clé API

2. **Modifiez `script.js`** :
   ```javascript
   const GPT_CONFIG = {
       apiKey: process.env.OPENAI_API_KEY || '', // Utilise la variable d'environnement
       model: 'gpt-3.5-turbo',
       baseUrl: 'https://api.openai.com/v1/chat/completions'
   };
   ```

## 🌐 Domaine personnalisé (Optionnel)

1. **Dans Netlify** : "Domain settings"
2. **Ajoutez votre domaine** : Ex: `realviz.mondomaine.com`
3. **Configurez DNS** : Suivez les instructions Netlify

## 📊 Monitoring et Analytics

- **Netlify Analytics** : Activé automatiquement
- **Form submissions** : Pour les formulaires d'inscription
- **Performance** : Monitoring automatique

## 🔄 Mises à jour

### Via glisser-déposer :
- Modifiez vos fichiers localement
- Glissez-déposez à nouveau sur Netlify

### Via Git :
- Committez vos changements
- Push vers GitHub
- Netlify déploie automatiquement

## 🚨 Dépannage

### Problèmes courants :

1. **Erreur 404** : Vérifiez que `index.html` est à la racine
2. **API ne fonctionne pas** : Vérifiez les variables d'environnement
3. **Images ne s'affichent pas** : Vérifiez les chemins des fichiers

### Logs de déploiement :
- Dans Netlify : "Deploys" → Cliquez sur un déploiement
- Consultez les logs pour diagnostiquer

## ✅ Checklist de déploiement

- [ ] Tous les fichiers sont dans le dossier
- [ ] `netlify.toml` est présent
- [ ] Clé API configurée (ou variable d'environnement)
- [ ] Test local réussi
- [ ] Déploiement sur Netlify
- [ ] Test de l'URL générée
- [ ] Vérification du chatbot
- [ ] Test des fonctionnalités

## 🎉 Résultat

Votre site sera accessible via une URL comme :
`https://real-vizualisation.netlify.app`

**Félicitations !** Votre projet REAL VIZUALISATION est maintenant en ligne ! 🚀
