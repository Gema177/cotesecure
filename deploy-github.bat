@echo off
echo 🌊 REAL VIZUALISATION - Déploiement GitHub
echo ==========================================
echo.

REM Vérifier si Git est installé
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git n'est pas installé. Installez Git d'abord.
    pause
    exit /b 1
)

REM Vérifier si on est dans un dépôt Git
if not exist ".git" (
    echo 📦 Initialisation du dépôt Git...
    git init
    echo ✅ Dépôt Git initialisé
)

REM Ajouter tous les fichiers
echo 📁 Ajout des fichiers...
git add .

REM Vérifier s'il y a des changements
git diff --staged --quiet
if errorlevel 1 (
    echo.
    set /p commit_message="💬 Message de commit (ou Entrée pour 'Mise à jour REAL VIZUALISATION'): "
    
    if "%commit_message%"=="" (
        set commit_message=Mise à jour REAL VIZUALISATION avec effets océaniques
    )
    
    echo 💾 Création du commit...
    git commit -m "%commit_message%"
    echo ✅ Commit créé: %commit_message%
) else (
    echo ℹ️  Aucun changement détecté.
)

REM Vérifier si une remote existe
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  Aucune remote GitHub configurée.
    echo.
    echo 🔗 Pour connecter à GitHub:
    echo 1. Créez un dépôt sur github.com
    echo 2. Exécutez:
    echo    git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
    echo 📖 Consultez DEPLOY-GITHUB.md pour les instructions complètes
) else (
    echo 🚀 Push vers GitHub...
    git push origin main
    echo ✅ Push réussi vers GitHub!
    echo.
    echo 🌐 Votre site sera déployé automatiquement sur Netlify
    echo 📊 Consultez les logs de déploiement sur app.netlify.com
)

echo.
echo 🎉 Déploiement terminé!
echo 🌊 Effets océaniques prêts à impressionner!
pause
