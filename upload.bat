@echo off
setlocal
cd /d "%~dp0"
title Sosac web - upload na GitHub

set "OWNER=CominQo"
set "REPO=sosac-web"
set "URL=https://github.com/%OWNER%/%REPO%.git"

echo Priecinok: %CD%
echo.

echo %CD% | find /i "\Temp\" >nul
if not errorlevel 1 goto notextracted

where git >nul 2>&1
if errorlevel 1 goto nogit

echo Nahravam do https://github.com/%OWNER%/%REPO%
echo Ak sa otvori okno GitHubu, prihlas sa. Token nikam nepises.
echo.

if not exist ".git" git init -b main
git remote remove origin >nul 2>&1
git remote add origin %URL%

where gh >nul 2>&1
if errorlevel 1 goto skipgh
gh repo view %OWNER%/%REPO% >nul 2>&1
if errorlevel 1 gh repo create %OWNER%/%REPO% --public --description "Sosac web"
:skipgh

git add -A
git commit -m "Update webu"
git branch -M main
git push -u origin main
if errorlevel 1 goto pushfail

echo.
echo HOTOVO. Zapni Pages: Settings, Pages, Deploy from branch main, root.
echo Stranka pobezi na https://%OWNER%.github.io/%REPO%/
goto end

:notextracted
echo CHYBA: Skript bezi z docasneho priecinka, zrejme priamo zo zipu.
echo Najprv zip cely rozbal, napr. na plochu, a spusti upload.bat odtial.
goto end

:nogit
echo CHYBA: Git nie je nainstalovany.
echo Stiahni ho z https://git-scm.com/download/win a spusti skript znova.
goto end

:pushfail
echo.
echo CHYBA: Upload zlyhal. Pozri chybu vyssie.
echo Skontroluj, ci repo https://github.com/%OWNER%/%REPO% existuje.
echo Ak nie, vytvor ho na github.com/new pod nazvom %REPO% a spusti znova.

:end
echo.
pause
