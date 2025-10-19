// Fichier d'exemple pour la configuration de l'API
// Copiez ce fichier vers config.js et ajoutez votre clé API

const API_CONFIG = {
    openai: {
        apiKey: 'VOTRE_CLE_API_ICI', // Remplacez par votre vraie clé API
        model: 'gpt-3.5-turbo',
        baseUrl: 'https://api.openai.com/v1/chat/completions'
    }
};

// Pour utiliser ce fichier, modifiez script.js :
// 1. Ajoutez : <script src="config.js"></script> avant script.js dans index.html
// 2. Modifiez GPT_CONFIG dans script.js pour utiliser API_CONFIG.openai
