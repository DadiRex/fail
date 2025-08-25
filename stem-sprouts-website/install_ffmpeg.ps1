# FFmpeg Installation Script for AI STEM Video Bot
# This script downloads and installs FFmpeg

Write-Host "🎬 FFmpeg Installation Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Create FFmpeg directory
$ffmpegDir = "C:\ffmpeg"
$binDir = "$ffmpegDir\bin"

if (-not (Test-Path $ffmpegDir)) {
    Write-Host "📁 Creating FFmpeg directory..." -ForegroundColor Blue
    New-Item -ItemType Directory -Path $ffmpegDir -Force | Out-Null
}

# Download FFmpeg
$downloadUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
$zipFile = "$env:USERPROFILE\Desktop\ffmpeg.zip"

Write-Host "⬇️  Downloading FFmpeg..." -ForegroundColor Blue
Write-Host "   URL: $downloadUrl" -ForegroundColor Gray
Write-Host "   This may take a few minutes..." -ForegroundColor Gray

try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile -UseBasicParsing
    Write-Host "✅ Download completed!" -ForegroundColor Green
} catch {
    Write-Host "❌ Download failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Please download manually from: $downloadUrl" -ForegroundColor Yellow
    exit 1
}

# Extract FFmpeg
Write-Host "📦 Extracting FFmpeg..." -ForegroundColor Blue
try {
    Expand-Archive -Path $zipFile -DestinationPath $ffmpegDir -Force
    Write-Host "✅ Extraction completed!" -ForegroundColor Green
} catch {
    Write-Host "❌ Extraction failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Find the extracted folder
$extractedFolders = Get-ChildItem -Path $ffmpegDir -Directory | Where-Object { $_.Name -like "ffmpeg-*" }
if ($extractedFolders.Count -gt 0) {
    $ffmpegBinDir = "$ffmpegDir\$($extractedFolders[0].Name)\bin"
    Write-Host "📁 Found FFmpeg in: $ffmpegBinDir" -ForegroundColor Green
} else {
    Write-Host "❌ Could not find extracted FFmpeg folder" -ForegroundColor Red
    exit 1
}

# Add to PATH
Write-Host "🔧 Adding FFmpeg to PATH..." -ForegroundColor Blue

try {
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
    
    if ($currentPath -notlike "*$ffmpegBinDir*") {
        $newPath = "$currentPath;$ffmpegBinDir"
        [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
        Write-Host "✅ Added to user PATH" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  FFmpeg already in PATH" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Could not update PATH automatically" -ForegroundColor Yellow
    Write-Host "   Please add manually: $ffmpegBinDir" -ForegroundColor Gray
}

# Clean up
Write-Host "🧹 Cleaning up..." -ForegroundColor Blue
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
    Write-Host "✅ Removed temporary files" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 FFmpeg installation completed!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Close and reopen PowerShell/Command Prompt" -ForegroundColor White
Write-Host "   2. Test with: ffmpeg -version" -ForegroundColor White
Write-Host "   3. If it doesn't work, manually add to PATH:" -ForegroundColor White
Write-Host "      $ffmpegBinDir" -ForegroundColor Gray
Write-Host ""
Write-Host "🔗 FFmpeg location: $ffmpegBinDir" -ForegroundColor Cyan
Write-Host ""

# Test if FFmpeg is accessible
try {
    $ffmpegVersion = & "$ffmpegBinDir\ffmpeg.exe" -version 2>$null | Select-Object -First 1
    if ($ffmpegVersion) {
        Write-Host "✅ FFmpeg test successful!" -ForegroundColor Green
        Write-Host "   Version: $ffmpegVersion" -ForegroundColor Gray
    }
} catch {
    Write-Host "⚠️  FFmpeg test failed - restart PowerShell to test again" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 