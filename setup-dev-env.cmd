@rem uses Chocolatey https://chocolatey.org/ to install everything I use for this project

call choco install git
call choco install github
call choco install visualstudiocode
call choco install nodejs
call choco install npm

call npm install -g typescript
call npm install jquery
call npm install -g handlebars
call npm install bootstrap

echo done
