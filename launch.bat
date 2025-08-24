@echo off
echo ========================================
echo    AI STEM Video Bot - Launcher
echo ========================================
echo.
echo Starting all services...
echo.

cd backend
call start_services.bat

echo.
echo Services launched! Check the command windows.
echo Frontend: http://localhost:3000
echo.
pause 