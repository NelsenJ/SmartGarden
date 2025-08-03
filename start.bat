@echo off
echo ========================================
echo    SmartGarden Project Starter
echo ========================================
echo.

echo Checking prerequisites...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 14+ from https://nodejs.org
    pause
    exit /b 1
)

echo Prerequisites check passed!
echo.

echo Starting SmartGarden Project...
echo.

echo [1/3] Installing Python dependencies...
cd api
pip install -r requirements.txt >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)
cd ..

echo [2/3] Installing Node.js dependencies...
cd frontend
npm install >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)
cd ..

echo [3/3] Starting servers...
echo.

echo Starting API Server (FastAPI)...
start "SmartGarden API" cmd /k "cd api && echo Starting API at http://localhost:8000 && uvicorn app:app --reload --host 0.0.0.0 --port 8000"

echo Waiting for API to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend (React)...
start "SmartGarden Frontend" cmd /k "cd frontend && echo Starting Frontend at http://localhost:3000 && npm start"

echo.
echo ========================================
echo    SmartGarden is starting...
echo ========================================
echo.
echo 🌐 API Server: http://localhost:8000
echo 📊 API Docs:   http://localhost:8000/docs
echo 🏠 Frontend:   http://localhost:3000
echo.
echo ⏳ Please wait for both servers to start...
echo.
echo 💡 Tips:
echo    - API will auto-reload when you change code
echo    - Frontend will auto-reload when you change code
echo    - Check browser console for any errors
echo    - Close this window when done
echo.
pause 