@echo off
title PharmaQuest Development Server
color 0A
echo.
echo ========================================
echo    PharmaQuest Development Server
echo ========================================
echo.

cd /d "C:\Users\Administrator\Documents\Sple-App-Yousef"
echo 📁 Current directory: %CD%
echo.

echo 🧹 Cleaning cache...
if exist .next (
    rmdir /s /q .next 2>nul
    echo ✅ Removed .next folder
)
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache 2>nul
    echo ✅ Removed node_modules cache
)
echo.

echo 🚀 Starting development server...
echo 🌐 Server will be available at: http://localhost:3000
echo 📱 Quiz page: http://localhost:3000/quiz/pharmaceutical
echo 🎛️ Admin panel: http://localhost:3000/admin
echo.
echo ⏳ Please wait for compilation to complete...
echo.

npm run dev
