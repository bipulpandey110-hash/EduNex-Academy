$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot 'backend')
if (-not (Test-Path '.venv')) { py -m venv .venv }
& '.\.venv\Scripts\python.exe' -m pip install -r requirements.txt
if (-not (Test-Path '.env')) { Copy-Item '.env.example' '.env' }
& '.\.venv\Scripts\python.exe' manage.py migrate
Write-Host 'Optional: create admin user with .\.venv\Scripts\python.exe manage.py createsuperuser'
& '.\.venv\Scripts\python.exe' manage.py runserver
