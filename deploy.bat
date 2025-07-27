@echo off
echo ========================================
echo    PharmaQuest Deployment Script
echo ========================================
echo.

echo 🔧 Initializing Git repository...
git init

echo 📁 Adding all files...
git add .

echo 💾 Creating initial commit...
git commit -m "Initial commit: PharmaQuest - Mobile-responsive pharmaceutical quiz platform"

echo 🔗 Adding remote repository...
git remote add origin https://github.com/Yalenzi/sple.git

echo 📤 Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Deployment complete!
echo 🌐 Your repository is now available at: https://github.com/Yalenzi/sple
echo 🚀 You can now deploy to Netlify using this repository
echo.
echo Next steps:
echo 1. Go to https://netlify.com
echo 2. Connect your GitHub account
echo 3. Select the 'sple' repository
echo 4. Set build command: npm run build
echo 5. Set publish directory: out
echo 6. Deploy!
echo.
pause
