# REAL VIZUALISATION - Configuration Assistant IA

## Structure du projet réorganisée

Le code a été séparé en fichiers distincts pour une meilleure organisation :

- `index.html` - Structure HTML principale
- `styles.css` - Tous les styles CSS
- `script.js` - Tout le JavaScript avec intégration Assistant IA

## Configuration de votre clé API Assistant IA

### 1. Obtenir votre clé API

1. Connectez-vous à votre compte OpenAI
2. Allez dans la section "API Keys" 
3. Créez une nouvelle clé API ou utilisez une existante

### 2. Configurer la clé dans le code

Ouvrez le fichier `script.js` et modifiez la ligne 4 :

```javascript
const GPT_CONFIG = {
    apiKey: 'VOTRE_CLE_API_ICI', // Remplacez par votre vraie clé API
    model: 'gpt-3.5-turbo', // ou votre modèle préféré
    baseUrl: 'https://api.openai.com/v1/chat/completions'
};
```

### 3. Modèles disponibles

Vous pouvez utiliser différents modèles selon vos besoins :

- `gpt-3.5-turbo` - Rapide et économique
- `gpt-4` - Plus puissant mais plus cher
- `gpt-4-turbo` - Équilibre performance/coût

### 4. Personnalisation des réponses

Le système utilise des prompts adaptés selon le rôle sélectionné :

- **Général** : Réponses générales et accessibles
- **Jury** : Focus sur l'évaluation académique
- **Experts** : Détails techniques et méthodologiques
- **Collectivités** : Gouvernance et planification
- **Populations** : Explications simples pour les citoyens

## Fonctionnalités du chatbot Assistant IA

- ✅ Réponses contextuelles selon le rôle
- ✅ Mémoire de conversation (3 derniers échanges)
- ✅ Gestion des erreurs API
- ✅ Interface utilisateur intuitive
- ✅ Export des conversations

## Sécurité

⚠️ **Important** : Ne partagez jamais votre clé API publiquement. Gardez-la privée et ne la commitez pas dans un dépôt public.

## Test de fonctionnement

1. Ouvrez `index.html` dans votre navigateur
2. Allez dans la section "Dialogue"
3. Sélectionnez un rôle
4. Posez une question pour tester la connexion à notre assistant

Si la clé API n'est pas configurée, vous verrez un message d'erreur explicite.

## Support

Pour toute question sur l'intégration de l'assistant IA, consultez la documentation OpenAI ou contactez le développeur.
