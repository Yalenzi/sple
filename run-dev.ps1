Write-Host "🚀 Starting PharmaQuest Development Server..." -ForegroundColor Green
Set-Location "C:\Users\Administrator\Documents\Sple-App-Yousef"

Write-Host "📁 Current directory: $(Get-Location)" -ForegroundColor Yellow

Write-Host "🧹 Cleaning cache and build files..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "✅ Cleaned .next directory" -ForegroundColor Green
}

if (Test-Path "node_modules\.cache") {
    Remove-Item "node_modules\.cache" -Recurse -Force
    Write-Host "✅ Cleaned node_modules cache" -ForegroundColor Green
}

Write-Host "🔧 Starting development server..." -ForegroundColor Cyan
Write-Host "🌐 Server will be available at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "⏳ Please wait for compilation to complete..." -ForegroundColor Cyan

& npm run dev
