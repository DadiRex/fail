@echo off
echo Starting AI STEM Video Bot Services...
echo.

echo Starting Python Video Processor (Port 5000)...
start "Python Video Processor" cmd /k "python video_processor.py"

echo Waiting for Python service to start...
timeout /t 5 /nobreak >nul

echo Starting Node.js Backend (Port 3000)...
start "Node.js Backend" cmd /k "npm run dev"

echo.
echo Services are starting...
echo - Python Video Processor: http://localhost:5000
echo - Node.js Backend: http://localhost:3000
echo - Frontend: http://localhost:3000
echo.
echo Press any key to open the frontend in your browser...
pause >nul

start http://localhost:3000

echo.
echo Services are running! Keep these windows open.
echo To stop services, close the command windows.
pause 