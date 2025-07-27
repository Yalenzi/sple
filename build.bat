@echo off
echo ========================================
echo    Building PharmaQuest for Production
echo ========================================
echo.

echo 🧹 Cleaning previous builds...
if exist out rmdir /s /q out
if exist .next rmdir /s /q .next

echo 📦 Installing dependencies...
npm install

echo 🔨 Building application...
npm run build

echo 📁 Copying redirect file...
if exist out (
    copy _redirects out\_redirects
    echo ✅ Redirects file copied
)

echo.
echo ✅ Build complete!
echo 📁 Static files are ready in the 'out' folder
echo 🚀 Ready for deployment to Netlify
echo.
pause
