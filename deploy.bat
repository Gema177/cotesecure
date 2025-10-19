@echo off
echo ========================================
echo   DEPLOIEMENT REAL VIZUALISATION
echo ========================================
echo.
echo Instructions pour deploiement Netlify :
echo.
echo 1. Allez sur https://app.netlify.com
echo 2. Connectez-vous a votre compte
echo 3. Glissez-deposez ce dossier dans la zone de deploiement
echo 4. Attendez 1-2 minutes
echo 5. Votre site sera en ligne !
echo.
echo URL de votre site : https://[nom-du-site].netlify.app
echo.
echo ========================================
echo   FICHIERS PRETS POUR LE DEPLOIEMENT
echo ========================================
echo.
dir /b *.html *.css *.js *.toml *.txt *.xml
echo.
echo Total des fichiers : 
dir /b | find /c /v ""
echo.
pause
