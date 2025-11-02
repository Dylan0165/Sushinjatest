@echo off
echo 🥷 Building Sushinja Docker Image...

docker build -t sushinja:latest .

if %ERRORLEVEL% EQU 0 (
    echo ✅ Docker image 'sushinja:latest' successfully built!
    docker images | findstr sushinja
    echo.
    echo 🚀 Ready to deploy! Run with:
    echo    docker-compose up -d
    echo    OR
    echo    docker run -d -p 80:80 --name sushinja-web sushinja:latest
) else (
    echo ❌ Build failed!
)

pause
