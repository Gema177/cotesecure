#!/bin/bash

echo "🌊 REAL VIZUALISATION - Déploiement GitHub"
echo "=========================================="
echo ""

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé. Installez Git d'abord."
    exit 1
fi

# Vérifier si on est dans un dépôt Git
if [ ! -d ".git" ]; then
    echo "📦 Initialisation du dépôt Git..."
    git init
    echo "✅ Dépôt Git initialisé"
fi

# Ajouter tous les fichiers
echo "📁 Ajout des fichiers..."
git add .

# Vérifier s'il y a des changements
if git diff --staged --quiet; then
    echo "ℹ️  Aucun changement détecté."
else
    # Demander le message de commit
    echo ""
    read -p "💬 Message de commit (ou Entrée pour 'Mise à jour REAL VIZUALISATION'): " commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Mise à jour REAL VIZUALISATION avec effets océaniques"
    fi
    
    # Faire le commit
    echo "💾 Création du commit..."
    git commit -m "$commit_message"
    echo "✅ Commit créé: $commit_message"
fi

# Vérifier si une remote existe
if git remote get-url origin &> /dev/null; then
    echo "🚀 Push vers GitHub..."
    git push origin main
    echo "✅ Push réussi vers GitHub!"
    echo ""
    echo "🌐 Votre site sera déployé automatiquement sur Netlify"
    echo "📊 Consultez les logs de déploiement sur app.netlify.com"
else
    echo ""
    echo "⚠️  Aucune remote GitHub configurée."
    echo ""
    echo "🔗 Pour connecter à GitHub:"
    echo "1. Créez un dépôt sur github.com"
    echo "2. Exécutez:"
    echo "   git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "📖 Consultez DEPLOY-GITHUB.md pour les instructions complètes"
fi

echo ""
echo "🎉 Déploiement terminé!"
echo "🌊 Effets océaniques prêts à impressionner!"
