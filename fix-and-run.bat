@echo off
echo 🚀 PharmaQuest Development Server
echo ================================

cd /d "C:\Users\Administrator\Documents\Sple-App-Yousef"
echo 📁 Current directory: %CD%

echo.
echo 🧹 Cleaning cache and build files...
if exist .next rmdir /s /q .next 2>nul
if exist node_modules\.cache rmdir /s /q node_modules\.cache 2>nul
echo ✅ Cache cleaned

echo.
echo 🔧 Starting development server...
echo 🌐 Server will be available at: http://localhost:3000
echo ⏳ Please wait for compilation to complete...
echo.

npm run dev
