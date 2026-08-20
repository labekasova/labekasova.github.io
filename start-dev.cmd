@echo off
setlocal

cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js and npm were not found. Install Node.js from https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing project dependencies...
  call npm ci
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

call npm run dev -- --open
