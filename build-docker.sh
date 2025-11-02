#!/bin/bash

echo "🥷 Building Sushinja Docker Image..."

# Build the Docker image
docker build -t sushinja:latest .

echo "✅ Docker image 'sushinja:latest' successfully built!"

# Optional: Show image info
docker images | grep sushinja

echo ""
echo "🚀 Ready to deploy! Run with:"
echo "   docker-compose up -d"
echo "   OR"
echo "   docker run -d -p 80:80 --name sushinja-web sushinja:latest"
