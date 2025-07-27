@echo off
cd /d "C:\Users\Administrator\Documents\Sple-App-Yousef"
echo Cleaning previous build...
if exist .next rmdir /s /q .next
echo Starting PharmaQuest development server...
npm run dev
pause
